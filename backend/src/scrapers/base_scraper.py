from utils.fetcher import fetch_html

class BaseScraper:
    def __init__(self, config):
        self.config = config

    def fetch(self):
        """Fetch the list page HTML."""
        return fetch_html(self.config["list_url"])

    def parse(self, html):
        """Extract products from HTML—override in subclass."""
        raise NotImplementedError("Override in subclass")