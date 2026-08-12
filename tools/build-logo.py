#!/usr/bin/env python3
"""
Gera o kit de logo minimalista da Agência JVI.

Fonte da verdade do desenho: este script. Os SVGs em public/brand/ são
artefatos gerados — os glifos saem convertidos em paths (Anton + Oswald,
as mesmas fontes do site), então os arquivos não dependem de fonte
instalada em lugar nenhum.

Uso:  python3 tools/build-logo.py
"""

from pathlib import Path

from fontTools.misc.transform import Transform
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / "public" / "fonts"
OUT = ROOT / "public" / "brand"

# ---------------------------------------------------------------- paleta
BLACK = "#050505"
WHITE = "#ffffff"
INK = "#0a0a0c"
# progressão das barras: do azul profundo (menor) ao azul da marca (maior)
BARS = ["#0b2fb8", "#0a46dc", "#0a5cff"]


# ---------------------------------------------------------------- tipografia
class Face:
    """Um arquivo de fonte, capaz de cuspir paths SVG já escalados."""

    def __init__(self, filename):
        self.tt = TTFont(FONTS / filename)
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
        """Altura de caixa alta em relação ao em, medida no 'I' (sem overshoot)."""
        x0, y0, x1, y1 = self.bounds("I", 1000.0)
        return (y1 - y0) / 1000.0

    def size_for_cap(self, cap):
        return cap / self.cap_ratio()


def run(face, text, size, tracking=0.0):
    """Desenha uma palavra. Devolve (path, largura_de_tinta, esquerda_da_tinta)."""
    paths, x = [], 0.0
    ink_min, ink_max = None, None
    for ch in text:
        b = face.bounds(ch, size, x, 0.0)
        if b:
            ink_min = b[0] if ink_min is None else min(ink_min, b[0])
            ink_max = b[2] if ink_max is None else max(ink_max, b[2])
        paths.append(face.path(ch, size, x, 0.0))
        x += face.advance(ch, size) + tracking
    return " ".join(p for p in paths if p), (ink_max - ink_min), ink_min


def centered(face, text, size, tracking, cx, baseline):
    """Mesma coisa, mas centrada opticamente (pela tinta) em cx."""
    d, w, left = run(face, text, size, tracking)
    dx = cx - w / 2 - left
    return f'<g transform="translate({dx:.2f},{baseline:.2f})"><path d="{d}"/></g>'


# ---------------------------------------------------------------- geometria
S = 1000.0  # canvas quadrado

BAR_W = 176.0
BAR_GAP = 36.0
GROUP_W = 3 * BAR_W + 2 * BAR_GAP  # 600
GROUP_X = (S - GROUP_W) / 2  # 200
BAR_BASE = 640.0  # linha de base das barras
BAR_H = [270.0, 360.0, 450.0]  # degraus de 90

LETTER_CAP = 112.0
LETTER_BASE = 578.0  # base compartilhada — "JVI" continua sendo uma palavra
WORD_CAP = 50.0
WORD_BASE = 800.0

anton = Face("anton-400-latin.woff2")
oswald = Face("oswald-300-latin.woff2")
oswald_bold = Face("oswald-500-latin.woff2")


def bar_x(i):
    return GROUP_X + i * (BAR_W + BAR_GAP)


def bars_markup(colors):
    out = []
    for i, h in enumerate(BAR_H):
        out.append(
            f'<rect x="{bar_x(i):.2f}" y="{BAR_BASE - h:.2f}" '
            f'width="{BAR_W:.2f}" height="{h:.2f}" fill="{colors[i]}"/>'
        )
    return "".join(out)


def letters_markup(fill=None):
    """J, V e I centrados em cada barra, sobre uma base comum."""
    size = anton.size_for_cap(LETTER_CAP)
    glyphs = []
    for i, ch in enumerate("JVI"):
        glyphs.append(centered(anton, ch, size, 0.0, bar_x(i) + BAR_W / 2, LETTER_BASE))
    attr = f' fill="{fill}"' if fill else ""
    return f"<g{attr}>{''.join(glyphs)}</g>"


def word_markup(fill, opacity=1.0, cx=S / 2, baseline=WORD_BASE, target_w=GROUP_W):
    """AGÊNCIA com o entreletras resolvido para casar com a largura das barras."""
    size = oswald.size_for_cap(WORD_CAP)
    _, base_w, _ = run(oswald, "AGÊNCIA", size, 0.0)
    tracking = (target_w - base_w) / (len("AGÊNCIA") - 1)
    g = centered(oswald, "AGÊNCIA", size, tracking, cx, baseline)
    op = f' opacity="{opacity}"' if opacity != 1.0 else ""
    return f'<g fill="{fill}"{op}>{g}</g>'


# ---------------------------------------------------------------- montagem
HEAD = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw} {vh}" '
    'width="{vw}" height="{vh}" role="img" aria-label="Agência JVI">'
    "<title>Agência JVI</title>"
)


def svg(body, vw=S, vh=S):
    return HEAD.format(vw=f"{vw:g}", vh=f"{vh:g}") + body + "</svg>"


def logo(bg=None, word_fill=WHITE, word_opacity=0.85, colors=None, letter_fill=WHITE):
    parts = []
    if bg:
        parts.append(f'<rect width="{S:g}" height="{S:g}" fill="{bg}"/>')
    parts.append(bars_markup(colors or BARS))
    parts.append(letters_markup(letter_fill))
    parts.append(word_markup(word_fill, word_opacity))
    return svg("".join(parts))


def logo_mono(color):
    """Uma cor só: as letras são vazadas das barras (evenodd)."""
    bars = []
    for i, h in enumerate(BAR_H):
        x, y = bar_x(i), BAR_BASE - h
        bars.append(f"M{x:.2f} {y:.2f}H{x + BAR_W:.2f}V{BAR_BASE:.2f}H{x:.2f}Z")
    size = anton.size_for_cap(LETTER_CAP)
    for i, ch in enumerate("JVI"):
        d, w, left = run(anton, ch, size, 0.0)
        dx = bar_x(i) + BAR_W / 2 - w / 2 - left
        pen = SVGPathPen(anton.gs, ntos=lambda v: f"{v:.2f}")
        s = size / anton.upem
        anton._glyph(ch).draw(
            TransformPen(pen, Transform(s, 0, 0, -s, dx, LETTER_BASE))
        )
        bars.append(pen.getCommands())
    body = f'<path fill="{color}" fill-rule="evenodd" d="{" ".join(bars)}"/>'
    body += word_markup(color, 1.0)
    return svg(body)


def icon(bg=None, colors=None):
    """Só a marca — sem palavra. Recentrada e com respiro para uso pequeno."""
    pad = 110.0
    mark_h = max(BAR_H)
    scale = (S - 2 * pad) / GROUP_W
    body = bars_markup(colors or BARS) + letters_markup(WHITE)
    # leva o grupo de barras para o centro do quadro e amplia
    tx = S / 2 - scale * (GROUP_X + GROUP_W / 2)
    ty = S / 2 - scale * (BAR_BASE - mark_h / 2)
    parts = []
    if bg:
        parts.append(f'<rect width="{S:g}" height="{S:g}" fill="{bg}"/>')
    parts.append(f'<g transform="translate({tx:.2f},{ty:.2f}) scale({scale:.4f})">{body}</g>')
    return svg("".join(parts))


def horizontal(word_fill=WHITE, word_opacity=0.85, bg=None):
    """Barras à esquerda, AGÊNCIA à direita — para cabeçalho e assinatura."""
    scale = 0.62
    margin = 80.0
    gap = 84.0
    word_cap = 46.0

    mark_w = GROUP_W * scale
    mark_h = max(BAR_H) * scale
    vh = mark_h + 2 * 70.0

    size = oswald.size_for_cap(word_cap)
    d, word_w, left = run(oswald, "AGÊNCIA", size, 0.34 * size)

    word_x = margin + mark_w + gap
    vw = word_x + word_w + margin

    tx = margin - scale * GROUP_X
    ty = (vh - mark_h) / 2 - scale * (BAR_BASE - max(BAR_H))
    mark = (
        f'<g transform="translate({tx:.2f},{ty:.2f}) scale({scale:.4f})">'
        f"{bars_markup(BARS)}{letters_markup(WHITE)}</g>"
    )
    op = f' opacity="{word_opacity}"' if word_opacity != 1.0 else ""
    word = (
        f'<g fill="{word_fill}"{op} transform="translate('
        f'{word_x - left:.2f},{vh / 2 + word_cap / 2:.2f})"><path d="{d}"/></g>'
    )
    back = f'<rect width="{vw:.2f}" height="{vh:.2f}" fill="{bg}"/>' if bg else ""
    return svg(back + mark + word, round(vw), round(vh))


def favicon():
    """Barras puras: nas 16px as letras viram sujeira, então saem."""
    vb = 64.0
    w, gap = 12.0, 4.0
    group = 3 * w + 2 * gap
    x0 = (vb - group) / 2
    base = 46.0
    hs = [18.0, 25.0, 32.0]
    rects = "".join(
        f'<rect x="{x0 + i * (w + gap):g}" y="{base - hs[i]:g}" '
        f'width="{w:g}" height="{hs[i]:g}" fill="{BARS[i]}"/>'
        for i in range(3)
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
        "jvi-logo-fundo-claro.svg": logo(bg=WHITE, word_fill=INK, word_opacity=0.9),
        "jvi-logo-mono-branco.svg": logo_mono(WHITE),
        "jvi-logo-mono-preto.svg": logo_mono(BLACK),
        "jvi-logo-horizontal.svg": horizontal(),
        "jvi-logo-horizontal-fundo-claro.svg": horizontal(INK, 0.9),
        "jvi-icone.svg": icon(bg=BLACK),
        "jvi-icone-transparente.svg": icon(),
    }
    for name, data in files.items():
        (OUT / name).write_text(data + "\n", encoding="utf-8")
        print(f"  {name:34} {len(data):>6} bytes")
    (ROOT / "public" / "favicon.svg").write_text(favicon() + "\n", encoding="utf-8")
    print(f"  {'favicon.svg':34} (public/)")


if __name__ == "__main__":
    main()
