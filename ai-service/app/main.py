import json
from pathlib import Path

import torch
import torch.nn as nn

from fastapi import FastAPI, UploadFile, File
from PIL import Image
from torchvision import models, transforms


app = FastAPI()


MODEL_PATH = Path("models/fishdex_resnet18.pth")
CLASS_PATH = Path("models/class_names.json")


device = torch.device(
    "cuda" if torch.cuda.is_available()
    else "cpu"
)


with open(CLASS_PATH, "r") as f:
    class_names = json.load(f)


model = models.resnet18(weights=None)

model.fc = nn.Linear(
    model.fc.in_features,
    len(class_names)
)


model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=device
    )
)


model.to(device)
model.eval()



transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    )
])



@app.get("/")
def home():
    return {
        "status":"FishDex AI running"
    }



@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    image = Image.open(
        file.file
    ).convert("RGB")


    image = transform(image)

    image = image.unsqueeze(0)

    image = image.to(device)



    with torch.no_grad():

        output = model(image)

        probability = torch.softmax(
            output,
            dim=1
        )


        confidence, index = torch.max(
            probability,
            1
        )


    fish_id = class_names[index.item()]


    return {
        "fishId": fish_id,
        "confidence": round(
            confidence.item(),
            4
        )
    }