#!/usr/bin/env python3
"""
Gera o kit de logo da Agência JVI — filosofia "Rigor Luminoso".

A marca inteira é construída sobre um módulo único (U). Nada é medida
solta: barra = 6U, canal = 1U, alturas em degraus de 4U. A barra mais alta
tem 20U, que é exatamente a largura do conjunto — a marca ocupa um quadrado
perfeito. As letras não são aplicadas sobre as barras: são vazadas delas.

Um único azul. Sem gradiente, sem brilho, sem sombra, sem canto arredondado.

Uso:  python3 tools/build-logo.py
"""

from pathlib import Path

from fontTools.misc.transform import Transform
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
TOOLFONTS = Path(__file__).resolve().parent / "fonts"
OUT = ROOT / "public" / "brand"

# ---------------------------------------------------------------- paleta
BLUE = "#0a5cff"  # o acento único
BLACK = "#050505"
WHITE = "#ffffff"
INK = "#0a0a0c"


# ---------------------------------------------------------------- tipografia
class Face:
    """Um arquivo de fonte, capaz de cuspir paths SVG já escalados."""

    def __init__(self, path):
        self.tt = TTFont(path)
        self.upem = self.tt["head"].unitsPerEm
        self.gs = self.tt.getGlyphSet()
        self.cmap = self.tt.getBestCmap()

    def _glyph(self, ch):
        return self.gs[self.cmap[ord(ch)]]

    def advance(self, ch, size):
        return self._glyph(ch).width * size / self.upem

    def path(self, ch, size, x=0.0, y=0.0):
        s = size / self.upem
        pen = SVGPathPen(self.gs, ntos=lambda v: f"{v:.2f}")
        self._glyph(ch).draw(TransformPen(pen, Transform(s, 0, 0, -s, x, y)))
        return pen.getCommands()

    def bounds(self, ch, size, x=0.0, y=0.0):
        s = size / self.upem
        pen = BoundsPen(self.gs)
        self._glyph(ch).draw(TransformPen(pen, Transform(s, 0, 0, -s, x, y)))
        return pen.bounds

    def cap_ratio(self):
        """Altura de caixa alta em relação ao em, medida no 'I'."""
        _, y0, _, y1 = self.bounds("I", 1000.0)
        return (y1 - y0) / 1000.0

    def size_for_cap(self, cap):
        return cap / self.cap_ratio()


outfit = Face(TOOLFONTS / "Outfit-Bold.ttf")
outfit_rg = Face(TOOLFONTS / "Outfit-Regular.ttf")


def run(face, text, size, tracking=0.0):
    """Desenha uma palavra. Devolve (path, largura_de_tinta, esquerda_da_tinta)."""
    paths, x = [], 0.0
    lo = hi = None
    for ch in text:
        b = face.bounds(ch, size, x, 0.0)
        if b:
            lo = b[0] if lo is None else min(lo, b[0])
            hi = b[2] if hi is None else max(hi, b[2])
        paths.append(face.path(ch, size, x, 0.0))
        x += face.advance(ch, size) + tracking
    return " ".join(p for p in paths if p), (hi - lo), lo


def word(face, text, size, tracking, cx, baseline):
    """Palavra centrada opticamente (pela tinta) em cx."""
    d, w, left = run(face, text, size, tracking)
    return f'<g transform="translate({cx - w / 2 - left:.2f},{baseline:.2f})">' f'<path d="{d}"/></g>', w


# ---------------------------------------------------------------- o módulo
U = 28.0  # a unidade. tudo abaixo é múltiplo dela.

BAR_W = 6 * U  # 168
CHANNEL = 1 * U  # 28
MARK = 20 * U  # 560 — largura do conjunto E altura da barra maior
BAR_H = [12 * U, 16 * U, 20 * U]  # degraus de 4U

S = 1000.0  # canvas quadrado
MARK_X = (S - MARK) / 2  # 220
MARK_TOP = 150.0
MARK_BASE = MARK_TOP + MARK  # 710

# o corpo da letra é exatamente o degrau de altura entre uma barra e a
# seguinte — a mesma medida governa o crescimento e a tipografia
LETTER_CAP = 4 * U  # 112
LETTER_BASE = MARK_BASE - 3 * U  # 626 — base comum das três letras

WORD_TRACK = 0.18  # apertado. o espaçamento largo é insegurança.
WORD_W = 15 * U  # 420 — três quartos exatos da largura da marca
WORD_GAP = 2.5 * U  # 70


def word_size():
    """Corpo resolvido para a palavra medir WORD_W — não é chute, é conta."""
    probe = 100.0
    _, w0, _ = run(outfit_rg, "AGÊNCIA", probe, WORD_TRACK * probe)
    size = probe * WORD_W / w0
    return size, size * outfit_rg.cap_ratio()


WORD_SIZE, WORD_CAP = word_size()
WORD_BASE = MARK_BASE + WORD_GAP + WORD_CAP


def bar_x(i):
    return MARK_X + i * (BAR_W + CHANNEL)


def letters_paths():
    """J, V e I — cada uma centrada na sua barra, sobre uma base comum."""
    size = outfit.size_for_cap(LETTER_CAP)
    out = []
    for i, ch in enumerate("JVI"):
        _, w, left = run(outfit, ch, size, 0.0)
        dx = bar_x(i) + BAR_W / 2 - w / 2 - left
        out.append(outfit.path(ch, size, dx, LETTER_BASE))
    return out


def mark(bar_fill=None, letter_fill=WHITE, mono=None):
    """A marca.

    Em cor: barras cheias com as letras aplicadas em branco — é o que
    sustenta o contraste (branco sobre o azul dá 5.2:1; o vazado dava 3.9).
    Em mono: barras e letras num path só, contraformas vazadas (evenodd),
    porque numa cor só o aplicado sumiria.
    """
    rects = [
        f"M{bar_x(i):.2f} {MARK_BASE - h:.2f}H{bar_x(i) + BAR_W:.2f}"
        f"V{MARK_BASE:.2f}H{bar_x(i):.2f}Z"
        for i, h in enumerate(BAR_H)
    ]
    if mono:
        d = " ".join(rects + letters_paths())
        return f'<path fill="{mono}" fill-rule="evenodd" d="{d}"/>'
    letters = "".join(f'<path d="{d}"/>' for d in letters_paths())
    return (
        f'<path fill="{bar_fill}" d="{" ".join(rects)}"/>'
        f'<g fill="{letter_fill}">{letters}</g>'
    )


def wordmark(fill, opacity=1.0, cx=S / 2, baseline=WORD_BASE):
    g, _ = word(outfit_rg, "AGÊNCIA", WORD_SIZE, WORD_TRACK * WORD_SIZE, cx, baseline)
    op = f' opacity="{opacity}"' if opacity != 1.0 else ""
    return f'<g fill="{fill}"{op}>{g}</g>'


# ---------------------------------------------------------------- montagem
def svg(body, vw=S, vh=S):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw:g} {vh:g}" '
        f'width="{vw:g}" height="{vh:g}" role="img" aria-label="Agência JVI">'
        f"<title>Agência JVI</title>{body}</svg>"
    )


def logo(bg=None, bars=BLUE, letters=WHITE, mono=None, word_fill=WHITE, word_op=0.92):
    parts = []
    if bg:
        parts.append(f'<rect width="{S:g}" height="{S:g}" fill="{bg}"/>')
    parts.append(mark(bars, letters, mono))
    parts.append(wordmark(word_fill, word_op))
    return svg("".join(parts))


def icon(bg=None, bars=BLUE, letters=WHITE, mono=None):
    """Só a marca, centrada no quadrado com respiro de 4U."""
    pad = 4 * U
    scale = (S - 2 * pad) / MARK
    tx = pad - scale * MARK_X
    ty = pad - scale * MARK_TOP
    parts = []
    if bg:
        parts.append(f'<rect width="{S:g}" height="{S:g}" fill="{bg}"/>')
    parts.append(
        f'<g transform="translate({tx:.2f},{ty:.2f}) scale({scale:.4f})">'
        f"{mark(bars, letters, mono)}</g>"
    )
    return svg("".join(parts))


def horizontal(bars=BLUE, letters=WHITE, word_fill=WHITE, word_op=0.92, bg=None):
    """Marca à esquerda, AGÊNCIA à direita. Alinhamento pela base das barras."""
    scale = 0.5
    pad = 3 * U * scale
    gap = 5 * U * scale
    cap = 40.0

    mark_side = MARK * scale
    vh = mark_side + 2 * pad
    size = outfit_rg.size_for_cap(cap)
    d, w, left = run(outfit_rg, "AGÊNCIA", size, WORD_TRACK * size)
    word_x = pad + mark_side + gap
    vw = word_x + w + pad

    tx = pad - scale * MARK_X
    ty = pad - scale * MARK_TOP
    body = (
        f'<g transform="translate({tx:.2f},{ty:.2f}) scale({scale:.4f})">'
        f"{mark(bars, letters)}</g>"
    )
    op = f' opacity="{word_op}"' if word_op != 1.0 else ""
    body += (
        f'<g fill="{word_fill}"{op} transform="translate({word_x - left:.2f},'
        f'{pad + mark_side:.2f})"><path d="{d}"/></g>'
    )
    back = f'<rect width="{vw:.2f}" height="{vh:.2f}" fill="{bg}"/>' if bg else ""
    return svg(back + body, round(vw), round(vh))


def favicon():
    """Só as barras. Nas 16px as contraformas fecham, então elas saem."""
    u = 3.0
    x0, base = 8.0, 46.0
    rects = "".join(
        f'<rect x="{x0 + i * 7 * u:g}" y="{base - h * u:g}" '
        f'width="{6 * u:g}" height="{h * u:g}" fill="{BLUE}"/>'
        for i, h in enumerate((7.0, 9.5, 12.0))
    )
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" '
        'height="64" role="img" aria-label="Agência JVI">'
        f'<rect width="64" height="64" fill="{BLACK}"/>{rects}</svg>'
    )


# ---------------------------------------------------------------- escrita
def main():
    OUT.mkdir(parents=True, exist_ok=True)
    files = {
        "jvi-logo.svg": logo(bg=BLACK),
        "jvi-logo-transparente.svg": logo(),
        "jvi-logo-fundo-claro.svg": logo(bg=WHITE, word_fill=INK),
        "jvi-logo-mono-branco.svg": logo(mono=WHITE, word_fill=WHITE, word_op=1.0),
        "jvi-logo-mono-preto.svg": logo(mono=INK, word_fill=INK, word_op=1.0),
        "jvi-logo-horizontal.svg": horizontal(),
        "jvi-logo-horizontal-fundo-claro.svg": horizontal(word_fill=INK),
        "jvi-icone.svg": icon(bg=BLACK),
        "jvi-icone-transparente.svg": icon(),
    }
    for name, data in files.items():
        (OUT / name).write_text(data + "\n", encoding="utf-8")
        print(f"  {name:36} {len(data):>6} bytes")
    (ROOT / "public" / "favicon.svg").write_text(favicon() + "\n", encoding="utf-8")
    print(f"  {'favicon.svg':36} (public/)")


if __name__ == "__main__":
    main()
