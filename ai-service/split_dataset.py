import random
import shutil
from pathlib import Path

RAW_DIR = Path("dataset/raw")
TRAIN_DIR = Path("dataset/train")
VALID_DIR = Path("dataset/valid")
TEST_DIR = Path("dataset/test")

TRAIN_RATIO = 0.7
VALID_RATIO = 0.15
TEST_RATIO = 0.15

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

random.seed(42)


def clear_split_dirs():
    for split_dir in [TRAIN_DIR, VALID_DIR, TEST_DIR]:
        if split_dir.exists():
            shutil.rmtree(split_dir)
        split_dir.mkdir(parents=True, exist_ok=True)


def split_species(species_dir: Path):
    fish_id = species_dir.name

    images = [
        file
        for file in species_dir.iterdir()
        if file.suffix.lower() in IMAGE_EXTENSIONS
    ]

    random.shuffle(images)

    total = len(images)
    train_count = int(total * TRAIN_RATIO)
    valid_count = int(total * VALID_RATIO)

    train_images = images[:train_count]
    valid_images = images[train_count:train_count + valid_count]
    test_images = images[train_count + valid_count:]

    split_map = {
        TRAIN_DIR / fish_id: train_images,
        VALID_DIR / fish_id: valid_images,
        TEST_DIR / fish_id: test_images,
    }

    for target_dir, files in split_map.items():
        target_dir.mkdir(parents=True, exist_ok=True)

        for file in files:
            shutil.copy2(file, target_dir / file.name)

    print(
        f"{fish_id}: total={total}, "
        f"train={len(train_images)}, "
        f"valid={len(valid_images)}, "
        f"test={len(test_images)}"
    )


def main():
    clear_split_dirs()

    species_dirs = [
        path
        for path in RAW_DIR.iterdir()
        if path.is_dir()
    ]

    for species_dir in species_dirs:
        split_species(species_dir)

    print("Dataset split complete.")


if __name__ == "__main__":
    main()