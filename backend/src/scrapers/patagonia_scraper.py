# src/scrapers/patagonia.py

import ast
from bs4 import BeautifulSoup
from urllib.parse import urljoin

from scrapers.base_scraper import BaseScraper

class PatagoniaScraper(BaseScraper):
    def parse(self, html):
        soup     = BeautifulSoup(html, "lxml")
        cfg      = self.config
        products = []

        # 1) Loop over each <product-tile class="product-tile">…
        for tile in soup.select(cfg["product_tile"]):
            # ——— Parse the JS-style dict in data-tealium ———
            raw = tile.get("data-tealium", "")
            try:
                # Convert single-quoted JS dict to Python dict
                info = ast.literal_eval(raw)
            except Exception:
                info = {}

            # Title is first element of the product_name list
            title_list = info.get("product_name", [])
            title      = title_list[0] if title_list else ""

            # Price is first element of the product_unit_price list (strings like "179.00")
            price_list = info.get("product_unit_price", [])
            try:
                price = float(price_list[0]) if price_list else None
            except Exception:
                price = None

            # ——— URL ———
            link_el     = tile.select_one(cfg["url"])
            href        = link_el.get("href", "") if link_el else ""
            product_url = urljoin(cfg["list_url"], href)

            # ——— Image ———
            meta_el   = tile.select_one(cfg["image_meta"])
            image_url = meta_el["content"] if meta_el and meta_el.has_attr("content") else ""

            products.append({
                "title": title,
                "url":   product_url,
                "image": image_url,
                "price": price
            })

        return products
