#!/usr/bin/env python3
"""
Generate placeholder team photos, apple-touch-icon, and OG image for Laxora.
Run from the repo root: python3 scripts/generate-assets.py
"""

import os
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets")
TEAM_DIR = os.path.join(OUT_DIR, "team")
os.makedirs(TEAM_DIR, exist_ok=True)

BG      = (250, 250, 248)   # --bg-alt
HEAD    = (15, 23, 42)       # --text-head
MUTED   = (148, 163, 184)    # --text-muted
ACCENT  = (15, 118, 110)     # --accent
WHITE   = (255, 255, 255)


def get_font(size):
    candidates = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSDisplay.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def team_placeholder(initials, filename):
    size = 800
    img = Image.new("RGB", (size, size), BG)
    d = ImageDraw.Draw(img)

    # Subtle background circle
    margin = 80
    d.ellipse(
        [margin, margin, size - margin, size - margin],
        outline=(*MUTED, 60),
        width=2,
    )

    # Initials centered
    font = get_font(220)
    bbox = d.textbbox((0, 0), initials, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (size - w) / 2 - bbox[0]
    y = (size - h) / 2 - bbox[1] - 10  # slight optical lift
    d.text((x, y), initials, fill=HEAD, font=font)

    path = os.path.join(TEAM_DIR, filename)
    img.save(path, "JPEG", quality=92)
    print(f"  {path}")


def apple_touch_icon():
    size = 180
    img = Image.new("RGB", (size, size), ACCENT)
    d = ImageDraw.Draw(img)

    font = get_font(110)
    bbox = d.textbbox((0, 0), "L", font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (size - w) / 2 - bbox[0]
    y = (size - h) / 2 - bbox[1] - 4
    d.text((x, y), "L", fill=WHITE, font=font)

    path = os.path.join(OUT_DIR, "apple-touch-icon.png")
    img.save(path, "PNG")
    print(f"  {path}")


def og_image():
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)

    # Accent bar at top
    d.rectangle([0, 0, w, 8], fill=ACCENT)

    # Wordmark
    font_logo = get_font(96)
    font_tag = get_font(38)
    font_sub = get_font(28)

    d.text((80, 130), "Laxora", fill=HEAD, font=font_logo)
    d.text((80, 270), "The AI front desk for modern", fill=HEAD, font=font_tag)
    d.text((80, 325), "healthcare practices.", fill=HEAD, font=font_tag)
    d.text((80, 400), "laxora.ai", fill=ACCENT, font=font_sub)

    # Decorative accent block
    d.rectangle([1100, 540, 1160, 600], fill=ACCENT)
    d.rectangle([1110, 510, 1150, 535], fill=(*MUTED, 120))

    path = os.path.join(OUT_DIR, "og-image.png")
    img.save(path, "PNG")
    print(f"  {path}")


if __name__ == "__main__":
    print("Generating Laxora assets...")
    team_placeholder("AH", "akash.jpg")
    team_placeholder("P",  "pratik.jpg")
    apple_touch_icon()
    og_image()
    print("Done.")
