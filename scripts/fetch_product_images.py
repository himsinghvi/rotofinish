"""Fetch product detail images from original site."""

import re
import urllib.request

BASE = "https://www.rotofinishblasting.com/index.php?page=product_detail&prod="

for prod in [1, 2, 3, 4, 5, 6, 7, 8]:
    url = BASE + str(prod)
    try:
        html = urllib.request.urlopen(url, timeout=15).read().decode("utf-8", "ignore")
        imgs = [m for m in re.findall(r"uploads/products[^\"']+", html)]
        print(f"prod={prod}: {imgs[:5]}")
    except Exception as e:
        print(f"prod={prod}: ERROR {e}")
