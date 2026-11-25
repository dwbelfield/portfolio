"""Cut a Claude Academy badge out of its rectangle.

The issued badge is a PDF (or image) with the badge shape on a flat coloured
rectangle. This writes a transparent PNG of the shape alone, cropped to it,
ready for public/media/badges/.

    python scripts/cut-badge.py <badge.pdf|badge.png> public/media/badges/<name>.png

Needs Pillow. The PDF path reads the single embedded image directly, so no
PDF library is required.
"""

import re
import sys
import zlib

from PIL import Image, ImageChops, ImageDraw, ImageFilter

OUT_WIDTH = 640  # about 2x the size the carousel shows it at
OUTSIDE, SHAPE = 128, 200


def load(path: str) -> Image.Image:
    if not path.lower().endswith(".pdf"):
        return Image.open(path).convert("RGB")
    data = open(path, "rb").read()
    for m in re.finditer(rb"<<(.*?)>>\s*stream\r?\n", data, re.S):
        head = m.group(1)
        if b"/Subtype /Image" not in head or b"/FlateDecode" not in head:
            continue
        w = int(re.search(rb"/Width\s+(\d+)", head).group(1))
        h = int(re.search(rb"/Height\s+(\d+)", head).group(1))
        raw = zlib.decompress(data[m.end() : data.find(b"endstream", m.end())].rstrip(b"\r\n"))
        if len(raw) == w * h * 3:
            return Image.frombytes("RGB", (w, h), raw)
    raise SystemExit("No plain RGB image found in the PDF.")


def cut(src: Image.Image) -> Image.Image:
    # Work at a size where a Python flood fill is quick.
    scale = 1600 / src.width
    work = src.resize((1600, round(src.height * scale)), Image.LANCZOS)

    # 255 wherever a pixel differs from the rectangle's colour (taken from a corner).
    flat = Image.new("RGB", work.size, work.getpixel((4, 4)))
    diff = ImageChops.difference(work, flat).convert("L").point(lambda v: 255 if v > 14 else 0)

    # Everything the rectangle colour reaches from the corner is outside the badge.
    # Same-coloured details inside the shape are enclosed, so they survive.
    ImageDraw.floodfill(diff, (0, 0), OUTSIDE)
    inside = diff.point(lambda v: 0 if v == OUTSIDE else 255)

    # Keep only the piece connected to the centre: drops the logo and date line
    # that sit on the rectangle outside the shape.
    ImageDraw.floodfill(inside, (inside.width // 2, inside.height // 2), SHAPE)
    mask = inside.point(lambda v: 255 if v == SHAPE else 0)

    # Pull the edge in a touch so no rectangle colour fringes the shape.
    mask = mask.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(0.8))

    out = work.convert("RGBA")
    out.putalpha(mask)
    out = out.crop(mask.getbbox())
    return out.resize((OUT_WIDTH, round(out.height * OUT_WIDTH / out.width)), Image.LANCZOS)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    badge = cut(load(sys.argv[1]))
    badge.save(sys.argv[2], optimize=True)
    print(f"{sys.argv[2]}: {badge.width}x{badge.height}")
