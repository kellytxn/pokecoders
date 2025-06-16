# src/main.py

import os, json, asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from scrape import scrape_site
from scrapers.reformation_scraper import ReformationScraper


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# map each site key to its scraper class
SCRAPERS = {
    "reformation": ReformationScraper,
}

DATA_DIR = os.path.join(os.path.dirname(__file__), os.pardir, "data")


@app.on_event("startup")
async def do_initial_scrape():
    """
    Runs once when the FastAPI server boots, so you always have fresh data.
    """
    loop = asyncio.get_event_loop()
    for site, cls in SCRAPERS.items():
        # run scrape_site(site, cls) in a thread
        await loop.run_in_executor(None, scrape_site, site, cls)


@app.get("/products/{site}")
async def get_products(site: str):
    """
    Read data/{site}.json (written by scrape_site) and return it.
    """
    path = os.path.join(DATA_DIR, f"{site}.json")
    if not os.path.isfile(path):
        raise HTTPException(404, f"No data for site '{site}'")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


@app.post("/scrape/{site}")
async def trigger_scrape(site: str):
    """
    On‐demand scraping: call this from your RN app whenever you want fresh data.
    """
    if site not in SCRAPERS:
        raise HTTPException(404, f"Unknown site '{site}'")
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, scrape_site, site, SCRAPERS[site])
    return {"status": "ok", "site": site}

if __name__ == "__main__":
    # Launches the Uvicorn server when you run `python src/main.py`
    import uvicorn
    uvicorn.run(
        "src.main:app",   # module:path to your FastAPI `app` object
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
