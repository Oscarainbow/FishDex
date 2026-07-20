import copy
import json
from pathlib import Path

import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader


DATA_DIR = Path("dataset")
TRAIN_DIR = DATA_DIR / "train"
VALID_DIR = DATA_DIR / "valid"

MODEL_DIR = Path("models")
MODEL_PATH = MODEL_DIR / "fishdex_resnet18.pth"
CLASS_NAMES_PATH = MODEL_DIR / "class_names.json"

BATCH_SIZE = 16
IMAGE_SIZE = 224
NUM_EPOCHS = 15
LEARNING_RATE = 0.0003


def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    train_transforms = transforms.Compose([
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(
            brightness=0.2,
            contrast=0.2,
            saturation=0.2,
        ),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225],
        ),
    ])

    valid_transforms = transforms.Compose([
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225],
        ),
    ])

    train_dataset = datasets.ImageFolder(
        root=TRAIN_DIR,
        transform=train_transforms,
    )

    valid_dataset = datasets.ImageFolder(
        root=VALID_DIR,
        transform=valid_transforms,
    )

    class_names = train_dataset.classes
    num_classes = len(class_names)

    print(f"Classes: {class_names}")
    print(f"Number of classes: {num_classes}")
    print(f"Train images: {len(train_dataset)}")
    print(f"Valid images: {len(valid_dataset)}")

    with open(CLASS_NAMES_PATH, "w", encoding="utf-8") as file:
        json.dump(class_names, file, indent=2)

    train_loader = DataLoader(
        train_dataset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        num_workers=2,
    )

    valid_loader = DataLoader(
        valid_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=2,
    )

    model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)

    model.fc = nn.Linear(
        model.fc.in_features,
        num_classes,
    )

    model = model.to(device)

    criterion = nn.CrossEntropyLoss()

    optimizer = optim.Adam(
        model.parameters(),
        lr=LEARNING_RATE,
    )

    best_model_weights = copy.deepcopy(model.state_dict())
    best_valid_accuracy = 0.0

    for epoch in range(NUM_EPOCHS):
        print(f"\nEpoch {epoch + 1}/{NUM_EPOCHS}")
        print("-" * 30)

        model.train()

        train_loss = 0.0
        train_correct = 0

        for images, labels in train_loader:
            images = images.to(device)
            labels = labels.to(device)

            optimizer.zero_grad()

            outputs = model(images)
            loss = criterion(outputs, labels)

            loss.backward()
            optimizer.step()

            _, predictions = torch.max(outputs, 1)

            train_loss += loss.item() * images.size(0)
            train_correct += torch.sum(predictions == labels).item()

        epoch_train_loss = train_loss / len(train_dataset)
        epoch_train_accuracy = train_correct / len(train_dataset)

        model.eval()

        valid_loss = 0.0
        valid_correct = 0

        with torch.no_grad():
            for images, labels in valid_loader:
                images = images.to(device)
                labels = labels.to(device)

                outputs = model(images)
                loss = criterion(outputs, labels)

                _, predictions = torch.max(outputs, 1)

                valid_loss += loss.item() * images.size(0)
                valid_correct += torch.sum(predictions == labels).item()

        epoch_valid_loss = valid_loss / len(valid_dataset)
        epoch_valid_accuracy = valid_correct / len(valid_dataset)

        print(
            f"Train Loss: {epoch_train_loss:.4f} "
            f"Train Acc: {epoch_train_accuracy:.4f}"
        )

        print(
            f"Valid Loss: {epoch_valid_loss:.4f} "
            f"Valid Acc: {epoch_valid_accuracy:.4f}"
        )

        if epoch_valid_accuracy > best_valid_accuracy:
            best_valid_accuracy = epoch_valid_accuracy
            best_model_weights = copy.deepcopy(model.state_dict())
            torch.save(best_model_weights, MODEL_PATH)

            print(f"Saved best model: {best_valid_accuracy:.4f}")

    print("\nTraining complete.")
    print(f"Best validation accuracy: {best_valid_accuracy:.4f}")
    print(f"Model saved to: {MODEL_PATH}")
    print(f"Class names saved to: {CLASS_NAMES_PATH}")


if __name__ == "__main__":
    main()