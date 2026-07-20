import json
from pathlib import Path

import torch
import torch.nn as nn
from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader

DATA_DIR = Path("dataset")
TEST_DIR = DATA_DIR / "test"

MODEL_PATH = Path("models/fishdex_resnet18.pth")
CLASS_NAMES_PATH = Path("models/class_names.json")

BATCH_SIZE = 16
IMAGE_SIZE = 224


def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    with open(CLASS_NAMES_PATH, "r", encoding="utf-8") as file:
        class_names = json.load(file)

    num_classes = len(class_names)

    test_transforms = transforms.Compose([
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225],
        ),
    ])

    test_dataset = datasets.ImageFolder(
        root=TEST_DIR,
        transform=test_transforms,
    )

    test_loader = DataLoader(
        test_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=2,
    )

    model = models.resnet18(weights=None)

    model.fc = nn.Linear(
        model.fc.in_features,
        num_classes,
    )

    model.load_state_dict(
        torch.load(MODEL_PATH, map_location=device)
    )

    model = model.to(device)
    model.eval()

    correct = 0
    total = 0

    class_correct = [0 for _ in class_names]
    class_total = [0 for _ in class_names]

    with torch.no_grad():
        for images, labels in test_loader:
            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)
            _, predictions = torch.max(outputs, 1)

            total += labels.size(0)
            correct += torch.sum(predictions == labels).item()

            for label, prediction in zip(labels, predictions):
                class_total[label.item()] += 1

                if label.item() == prediction.item():
                    class_correct[label.item()] += 1

    accuracy = correct / total

    print(f"\nTest Accuracy: {accuracy:.4f}")
    print("\nPer-class accuracy:")

    for index, class_name in enumerate(class_names):
        if class_total[index] == 0:
            acc = 0
        else:
            acc = class_correct[index] / class_total[index]

        print(
            f"{class_name}: {acc:.4f} "
            f"({class_correct[index]}/{class_total[index]})"
        )


if __name__ == "__main__":
    main()