# src/scrape.py
import os, json
from config import sites  # assuming you import the JSON as a dict
from scrapers.reformation_scraper import ReformationScraper

OUT_DIR = os.path.join(os.path.dirname(__file__),"../data")
os.makedirs(OUT_DIR, exist_ok=True)

def scrape_site(name, ScraperClass):
    cfg     = sites[name]
    scraper = ScraperClass(cfg)
    html    = scraper.fetch()
    items   = scraper.parse(html)
    path    = os.path.join(OUT_DIR, f"{name}.json")
    with open(path,"w",encoding="utf-8") as f:
        json.dump(items,f,ensure_ascii=False,indent=2)
    print(f"[{name}] wrote {len(items)} items to {path}")

if __name__=="__main__":
    scrape_site("reformation", ReformationScraper)
    #Add more sites as needed
