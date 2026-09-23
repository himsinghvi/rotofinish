"""Download assets from rotofinishblasting.com for local use."""

import urllib.request
from pathlib import Path

BASE = "https://www.rotofinishblasting.com/"
OUT = Path(__file__).resolve().parent.parent / "frontend" / "public" / "images"

ASSETS = {
    "logo/header-logo.png": "uploads/contact/header_logo_20260308_090401_61225185.png",
    "logo/footer-logo.png": "img/logos/logo-footer-small-white.png",
    "about/why-choose.png": "uploads/about/about_20260310_002551_1e25e8cc.png",
    "slider/slide-1.png": "uploads/slider/slide_20260604_090116_7160b0c1.png",
    "slider/slide-2.png": "uploads/slider/slide_20260604_090101_bb640abc.png",
    "products/plasma-spray.jpeg": "uploads/products/thumbs/5/thumb_20260706_215713_f9e6c60a.jpeg",
    "products/swing-table.png": "uploads/products/thumbs/4/thumb_20260604_085336_2baee38c.png",
    "products/shot-blasting.png": "uploads/products/thumbs/3/thumb_20260604_085512_0914131b.png",
    "products/cabinet.png": "uploads/products/thumbs/1/thumb_20260604_085635_a13686e0.png",
    "industries/aviation.png": "uploads/industries/industries_20260604_090602_e9c514d1.png",
    "industries/automotive.png": "uploads/industries/industries_20260604_091844_d3f439b5.png",
    "industries/gas.png": "uploads/industries/industries_20260604_092044_29133043.png",
    "industries/foundry.png": "uploads/industries/industries_20260604_092244_1bba4695.png",
    "industries/railways.png": "uploads/industries/industries_20260604_091349_cd3762ee.png",
    "industries/fabrication.png": "uploads/industries/industries_20260604_091455_8a036904.png",
    "brands/igi.webp": "uploads/brands/brands_20260306_131157_1aef487e.webp",
    "brands/atg.webp": "uploads/brands/brands_20260306_131249_7cd82085.webp",
    "brands/bkt.webp": "uploads/brands/brands_20260306_131304_d12bb18a.webp",
    "brands/yokohama.webp": "uploads/brands/brands_20260306_131319_a07ddf15.webp",
    "brands/flowmore.webp": "uploads/brands/brands_20260306_131336_d00e6aac.webp",
    "brands/atlas.webp": "uploads/brands/brands_20260306_131348_64b033eb.webp",
    "brands/bhel.webp": "uploads/brands/brands_20260306_131358_42e58034.webp",
    "brands/case.webp": "uploads/brands/brands_20260306_131409_c4a3788a.webp",
    "brands/gri.webp": "uploads/brands/brands_20260306_131425_01a66ead.webp",
    "brands/mf.webp": "uploads/brands/brands_20260306_131448_8bf894e0.webp",
    "brands/jsp.webp": "uploads/brands/brands_20260306_131500_7fcf0ea5.webp",
    "brands/jsw.webp": "uploads/brands/brands_20260306_131518_5fa59a15.webp",
    "brands/kp.webp": "uploads/brands/brands_20260306_133046_96c54ab6.webp",
    "brands/lt.webp": "uploads/brands/brands_20260306_133100_b9fcff03.webp",
    "brands/ms.webp": "uploads/brands/brands_20260306_133111_9d0ead78.webp",
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for local, remote in ASSETS.items():
        dest = OUT / local
        dest.parent.mkdir(parents=True, exist_ok=True)
        url = BASE + remote
        print(f"Downloading {url} -> {dest}")
        try:
            urllib.request.urlretrieve(url, dest)
        except Exception as e:
            print(f"  FAILED: {e}")


if __name__ == "__main__":
    main()
