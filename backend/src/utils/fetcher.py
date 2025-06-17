import os, time, random
import requests
from dotenv import load_dotenv

load_dotenv()

HEADERS = {
    "User-Agent": os.getenv("USER_AGENT", "Mozilla/5.0")
}

def fetch_html(url):
    """Fetch page HTML with simple retry and rate-limit."""
    for attempt in range(3):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=10)
            resp.raise_for_status()
            time.sleep(random.uniform(1.0, 2.0))
            return resp.text
        except requests.RequestException as e:
            print(f"[fetch_html] {url} attempt {attempt+1} failed: {e}")
            time.sleep(2)
    raise RuntimeError(f"Failed to fetch {url}")