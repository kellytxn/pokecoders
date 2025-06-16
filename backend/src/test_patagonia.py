# src/test_patagonia.py

import json
from scrapers.patagonia_scraper import PatagoniaScraper

def main():
    cfg     = json.load(open("config/sites.json"))["patagonia"]
    scraper = PatagoniaScraper(cfg)

    html     = scraper.fetch()
    products = scraper.parse(html)

    print(f"Fetched {len(html)} characters of HTML")
    print(f"Found {len(products)} products\n")

    for i, p in enumerate(products[:5], 1):
        print(f"--- Product #{i} ---")
        print(f"Title: {p['title']}")
        print(f"URL  : {p['url']}")
        print(f"Image: {p['image']}")
        print(f"Price: {p['price']}\n")

if __name__ == "__main__":
    main()
