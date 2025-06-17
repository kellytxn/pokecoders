from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json, os

app = FastAPI()

# enable CORS so your RN app (on localhost:3000, etc.) can fetch
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(__file__), os.pardir, "data")

@app.get("/products/{site}")
def get_products(site: str):
    path = os.path.join(DATA_DIR, f"{site}.json")
    if not os.path.isfile(path):
        raise HTTPException(404, f"No data for site '{site}'")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
