import hashlib
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image

FISH_SPECIES = [
    ("largemouth-bass", "Micropterus salmoides"),
    ("smallmouth-bass", "Micropterus dolomieu"),
    ("bluegill", "Lepomis macrochirus"),
    ("black-crappie", "Pomoxis nigromaculatus"),
    ("white-crappie", "Pomoxis annularis"),
    ("channel-catfish", "Ictalurus punctatus"),
    ("flathead-catfish", "Pylodictis olivaris"),
    ("rainbow-trout", "Oncorhynchus mykiss"),
    ("northern-pike", "Esox lucius"),
    ("yellow-perch", "Perca flavescens"),
]

RAW_DIR = Path("dataset/raw")

TARGET_COUNT = 300
PAGE_SIZE = 100


# -----------------------------
# safe request
# -----------------------------
def get_json(url: str, retries: int = 3):
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "FishDex"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.loads(r.read().decode())
        except Exception as e:
            print(f"[retry {i+1}] {e}")
            time.sleep(2)

    return None


# -----------------------------
# GBIF species key
# -----------------------------
def get_species_key(name: str):
    url = f"https://api.gbif.org/v1/species/match?name={urllib.parse.quote(name)}"
    data = get_json(url)
    return data.get("usageKey")


# -----------------------------
# image validation
# -----------------------------
def is_valid_image(path: Path):
    try:
        img = Image.open(path)
        img.verify()
        return True
    except:
        return False


def md5(data: bytes):
    return hashlib.md5(data).hexdigest()


# -----------------------------
# download single image
# -----------------------------
def download_image(url: str, path: Path):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "FishDex"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()

        if len(data) < 10000:
            return False

        path.write_bytes(data)

        if not is_valid_image(path):
            path.unlink(missing_ok=True)
            return False

        return data

    except:
        return False


# -----------------------------
# fetch page of occurrences
# -----------------------------
def fetch_page(species_key, offset):
    params = urllib.parse.urlencode({
        "speciesKey": species_key,
        "mediaType": "StillImage",
        "hasCoordinate": "true",
        "limit": PAGE_SIZE,
        "offset": offset,
    })

    url = f"https://api.gbif.org/v1/occurrence/search?{params}"
    return get_json(url)


# -----------------------------
# main downloader
# -----------------------------
def download_species(fish_id, scientific_name):

    print(f"\n=== {fish_id} ===")

    species_key = get_species_key(scientific_name)
    if not species_key:
        print("No species key")
        return

    folder = RAW_DIR / fish_id
    folder.mkdir(parents=True, exist_ok=True)

    # 已存在图片
    existing = list(folder.glob("*.jpg"))
    count = len(existing)

    hashes = set()
    for f in existing:
        try:
            hashes.add(md5(f.read_bytes()))
        except:
            pass

    offset = 0

    while count < TARGET_COUNT:

        data = fetch_page(species_key, offset)
        if not data:
            break

        results = data.get("results", [])

        if not results:
            break

        for item in results:

            if count >= TARGET_COUNT:
                break

            media = item.get("media", [])

            for m in media:
                url = m.get("identifier")

                if not url or not url.startswith("http"):
                    continue

                img_data = download_image_bytes(url)
                if not img_data:
                    continue

                h = md5(img_data)
                if h in hashes:
                    continue

                filename = f"{fish_id}_{count+1:04d}.jpg"
                path = folder / filename

                path.write_bytes(img_data)

                if not is_valid_image(path):
                    path.unlink(missing_ok=True)
                    continue

                hashes.add(h)
                count += 1

                print(f"{fish_id}: {count}/{TARGET_COUNT}")

                time.sleep(0.2)

        offset += PAGE_SIZE
        time.sleep(0.5)

    print(f"Done {fish_id}: {count}")


def download_image_bytes(url: str):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "FishDex"})
        with urllib.request.urlopen(req, timeout=20) as r:
            data = r.read()

        if len(data) < 10000:
            return None

        return data
    except:
        return None


def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    for fish_id, name in FISH_SPECIES:
        download_species(fish_id, name)

    print("\nALL DONE")


if __name__ == "__main__":
    main()