import json
from scrapers.patagonia_scraper import PatagoniaScraper
from scrapers.reformation_scraper import ReformationScraper

def normalize_price(price):
    """Convert float or None price to string with $ or empty string."""
    if price is None:
        return ""
    return f"${price:.2f}"

def build_catalogue():
    # 1) Load site configs
    with open("backend/config/sites.json") as f:
        sites_config = json.load(f)

    # 2) Instantiate scrapers with configs
    patagonia_scraper = PatagoniaScraper(sites_config["patagonia"])
    reformation_scraper = ReformationScraper(sites_config["reformation"])

    # 3) Fetch and parse products from each scraper
    patagonia_html = patagonia_scraper.fetch()
    patagonia_products = patagonia_scraper.parse(patagonia_html)

    reformation_html = reformation_scraper.fetch()
    reformation_products = reformation_scraper.parse(reformation_html)

    # 4) Combine all products into one list
    raw_products = patagonia_products + reformation_products

    # 5) Normalize and enrich products to your catalogue format
    catalogue = []
    for idx, p in enumerate(raw_products, start=1):
        product = {
            "id": str(idx),
            "name": p.get("title", "") or p.get("name", ""),
            "price": normalize_price(p.get("price")),
            "image": p.get("image", ""),
            "fabricComposition": [],  # TODO: enrich with real data if possible
            "ethicalCauses": [],      # TODO: enrich with real data if possible
            "dealBreakers": [],       # TODO: enrich with real data if possible
            "purchaseUrl": p.get("url", ""),
        }
        catalogue.append(product)

    # 6) Save catalogue as JSON
    with open("catalogue.json", "w") as f:
        json.dump(catalogue, f, indent=2)

    print(f"Saved {len(catalogue)} products to catalogue.json")

if __name__ == "__main__":
    build_catalogue()
