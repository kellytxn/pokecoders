from bs4 import BeautifulSoup
from urllib.parse import urljoin
from scrapers.base_scraper import BaseScraper

class ReformationScraper(BaseScraper):
    def parse(self, html):
        soup = BeautifulSoup(html, "lxml")
        products = []
        for tile in soup.select(self.config["product_tile"]):
            # Extract product URL
            url_el = tile.select_one(self.config["url"])
            product_url = urljoin(self.config["list_url"], url_el.get("href", "")) if url_el else ""

            # Extract title
            title_el = tile.select_one(self.config["title"])
            title = title_el.get_text(strip=True) if title_el else ""

            # Extract image URL - priority to srcset/data-srcset over src
            img_el = tile.select_one(self.config["image"])
            image_url = ""
            if img_el:
                srcset = img_el.get("srcset") or img_el.get("data-srcset") or ""
                if srcset:
                    # Take first URL from srcset string
                    image_url = srcset.split(",")[0].split()[0].strip()
                else:
                    image_url = img_el.get("src", "")

            # Extract price
            price_el = tile.select_one(self.config["price"])
            price = None
            if price_el and price_el.has_attr("content"):
                try:
                    price = float(price_el["content"])
                except (ValueError, TypeError):
                    price = None

            # Assign default ethical causes
            ethical_causes = [
                "Carbon Footprint",
                "Recycled Materials"
            ]

            products.append({
                "title": title,
                "url": product_url,
                "image": image_url,
                "price": price,
                "ethicalCauses": ethical_causes,
            })

        return products