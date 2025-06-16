from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re
from scrapers.base_scraper import BaseScraper


class ReformationScraper(BaseScraper):
    def parse(self, html):
        soup     = BeautifulSoup(html, "lxml")
        products = []
        for tile in soup.select(self.config["product_tile"]):
            href        = tile.get("href", "")
            product_url = urljoin(self.config["list_url"], href)
            title_el = tile.select_one(self.config["title"])
            title    = title_el.get_text(strip=True) if title_el else ""
            img_el = tile.select_one(self.config["image"])
            image_url = ""
            if img_el:
                srcset = img_el.get("srcset") or img_el.get("data-srcset") or ""

                if srcset:
                    image_url = srcset.split(",")[0].split()[0].strip()
                else:
                    image_url = img_el.get("src", "")

            price_el = tile.select_one(self.config["price"])
            price = None

            if price_el and price_el.has_attr("content"):
                try:
                    price = float(price_el["content"])
                except (ValueError, TypeError):
                    price = None

            products.append({
                "title": title,        
                "url":   product_url,  
                "image": image_url,    
                "price": price         
            })

        return products