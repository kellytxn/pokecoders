import json
from scrapers.reformation_scraper import ReformationScraper

def main():
    # 1) load the config for Reformation
    cfg = json.load(open("config/sites.json"))["reformation"]

    # 2) instantiate your scraper
    scraper = ReformationScraper(cfg)

    # 3) fetch the HTML from the site
    html = scraper.fetch()
    print(f"Fetched {len(html)} characters of HTML.")

    # 4) parse the HTML into product data
    products = scraper.parse(html)
    print(f"Found {len(products)} products.\n")

    # 5) print the first 5 products for inspection
    for i, p in enumerate(products[:5], start=1):
        print(f"--- Product #{i} ---")
        print(f"Title : {p['title']}")
        print(f"URL   : {p['url']}")
        print(f"Image : {p['image']}")
        print(f"Price : {p['price']}\n")

if __name__ == "__main__":
    main()