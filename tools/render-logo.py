#!/usr/bin/env python3
"""
Rasteriza os SVGs de public/brand/ em PNG usando o Chromium headless.

Uso:  python3 tools/render-logo.py
"""

import re
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
CHROME = "/opt/pw-browsers/chromium"

# (svg, png, largura_alvo, transparente) — a altura sai do viewBox
JOBS = [
    ("jvi-logo.svg", "jvi-logo-1080.png", 1080, False),
    ("jvi-logo.svg", "jvi-logo-2048.png", 2048, False),
    ("jvi-logo-transparente.svg", "jvi-logo-transparente-2048.png", 2048, True),
    ("jvi-logo-fundo-claro.svg", "jvi-logo-fundo-claro-1080.png", 1080, False),
    ("jvi-logo-horizontal.svg", "jvi-logo-horizontal-2400.png", 2400, True),
    ("jvi-icone.svg", "jvi-icone-512.png", 512, False),
    ("jvi-icone-transparente.svg", "jvi-icone-transparente-1024.png", 1024, True),
]


def viewbox(svg: Path):
    m = re.search(r'viewBox="([\d.\s-]+)"', svg.read_text(encoding="utf-8"))
    _, _, w, h = (float(v) for v in m.group(1).split())
    return w, h

PAGE = """<!doctype html><meta charset="utf-8">
<style>html,body{{margin:0;padding:0;background:{bg}}}
img{{display:block;width:{w}px;height:{h}px}}</style>
<img src="{src}">
"""


def shoot(html: Path, out: Path, w: int, h: int, transparent: bool):
    with tempfile.TemporaryDirectory() as profile:
        cmd = [
            CHROME,
            "--headless",
            "--disable-gpu",
            "--no-sandbox",
            "--hide-scrollbars",
            f"--user-data-dir={profile}",
            f"--window-size={w},{h}",
            "--force-device-scale-factor=1",
            f"--screenshot={out}",
        ]
        if transparent:
            cmd.append("--default-background-color=00000000")
        cmd.append(html.as_uri())
        subprocess.run(cmd, check=True, capture_output=True)


def main():
    if not shutil.which(CHROME) and not Path(CHROME).exists():
        raise SystemExit(f"Chromium não encontrado em {CHROME}")
    with tempfile.TemporaryDirectory() as tmp:
        for svg, png, w, transparent in JOBS:
            vw, vh = viewbox(BRAND / svg)
            h = round(w * vh / vw)
            page = Path(tmp) / (png + ".html")
            page.write_text(
                PAGE.format(
                    bg="transparent" if transparent else "#050505",
                    w=w,
                    h=h,
                    src=(BRAND / svg).as_uri(),
                ),
                encoding="utf-8",
            )
            shoot(page, BRAND / png, w, h, transparent)
            size = (BRAND / png).stat().st_size
            print(f"  {png:38} {w}x{h}  {size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
