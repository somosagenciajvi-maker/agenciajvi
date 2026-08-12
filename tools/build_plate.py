#!/usr/bin/env python3
"""
Prancha 01 — a identidade da Agência JVI apresentada como artefato.

"Rigor Luminoso": a marca ao lado da grade que a gerou, e abaixo o campo de
acumulação — a mesma célula repetida noventa e seis vezes sob uma envoltória
que sobe. O crescimento não é desenhado, é medido.

Uso:  python3 tools/build_plate.py
"""

import math
from pathlib import Path

import build_logo as L

OUT = Path(__file__).resolve().parents[1] / "public" / "brand"
MONO = L.Face(Path(__file__).resolve().parent / "fonts" / "GeistMono-Regular.ttf")

W, H = 2400.0, 3200.0
M = 200.0  # margem
BLUE, BLACK, WHITE = L.BLUE, L.BLACK, L.WHITE

# a marca, ampliada, ancorada na grade da prancha
MARK_PX = 900.0
K = MARK_PX / L.MARK  # fator de ampliação
MX = (W - MARK_PX) / 2  # 750
MY = 620.0
GU = MARK_PX / 20  # o módulo, na escala da prancha = 45


def micro(text, x, baseline, size=19.0, track=0.20, fill=WHITE, op=0.42, anchor="start"):
    d, w, left = L.run(MONO, text, size, track * size)
    if not d:
        return ""
    dx = {"start": -left, "end": -left - w, "middle": -left - w / 2}[anchor]
    return (
        f'<g fill="{fill}" opacity="{op}" transform="translate('
        f'{x + dx:.2f},{baseline:.2f})"><path d="{d}"/></g>'
    )


def rule(y, x0=M, x1=W - M, op=0.13):
    return (
        f'<line x1="{x0:.1f}" y1="{y:.1f}" x2="{x1:.1f}" y2="{y:.1f}" '
        f'stroke="{WHITE}" stroke-opacity="{op}" stroke-width="1"/>'
    )


def construction():
    """A grade que gerou a marca, visível apenas o suficiente."""
    out = [f'<g stroke="{WHITE}" stroke-opacity="0.07" stroke-width="1">']
    for i in range(21):
        p = i * GU
        out.append(
            f'<line x1="{MX + p:.2f}" y1="{MY:.2f}" x2="{MX + p:.2f}" y2="{MY + MARK_PX:.2f}"/>'
            f'<line x1="{MX:.2f}" y1="{MY + p:.2f}" x2="{MX + MARK_PX:.2f}" y2="{MY + p:.2f}"/>'
        )
    out.append("</g>")
    # cota vertical: o degrau de 4U, cinco vezes
    ax = MX - 96.0
    out.append(
        f'<line x1="{ax:.1f}" y1="{MY:.1f}" x2="{ax:.1f}" y2="{MY + MARK_PX:.1f}" '
        f'stroke="{WHITE}" stroke-opacity="0.22" stroke-width="1"/>'
    )
    for i in range(6):
        y = MY + MARK_PX - i * 4 * GU
        out.append(
            f'<line x1="{ax - 11:.1f}" y1="{y:.1f}" x2="{ax + 11:.1f}" y2="{y:.1f}" '
            f'stroke="{WHITE}" stroke-opacity="0.32" stroke-width="1"/>'
        )
        out.append(micro(f"{i * 4}U", ax - 30, y + 7, 17, 0.14, op=0.34, anchor="end"))
    return "".join(out)


def corners():
    """O quadrado perfeito declarado pelos cantos — por fora, para não brigar
    com o azul. Vai por cima da marca, então os quatro sempre leem."""
    t, o = 40.0, 18.0  # braço e afastamento
    out = []
    for cx, cy, sx, sy in (
        (MX - o, MY - o, 1, 1),
        (MX + MARK_PX + o, MY - o, -1, 1),
        (MX - o, MY + MARK_PX + o, 1, -1),
        (MX + MARK_PX + o, MY + MARK_PX + o, -1, -1),
    ):
        out.append(
            f'<path d="M{cx + sx * t:.1f} {cy:.1f}H{cx:.1f}V{cy + sy * t:.1f}" '
            f'fill="none" stroke="{WHITE}" stroke-opacity="0.34" stroke-width="1.5"/>'
        )
    return "".join(out)


def field(y0, height, n=96):
    """Campo de acumulação: a célula 12·16·20 repetida sob envoltória que sobe.

    É o gráfico que a marca abstrai — muitas medidas, uma tendência só.
    """
    cell = (12.0, 16.0, 20.0)
    span = W - 2 * M
    pitch = span / n
    bw = pitch * 0.46
    out = []
    for i in range(n):
        t = i / (n - 1)
        # envoltória: sobe devagar, com respiração senoidal — cresce, não é reta
        env = 0.34 + 0.66 * (t**1.35) + 0.045 * math.sin(t * math.pi * 6.0)
        h = height * (cell[i % 3] / 20.0) * env
        x = M + i * pitch + (pitch - bw) / 2
        op = 0.26 + 0.66 * (t**1.5)
        out.append(
            f'<rect x="{x:.2f}" y="{y0 + height - h:.2f}" width="{bw:.2f}" '
            f'height="{h:.2f}" fill="{BLUE}" opacity="{op:.3f}"/>'
        )
    return "".join(out)


def plate():
    b = [f'<rect width="{W:g}" height="{H:g}" fill="{BLACK}"/>']

    # ---- cabeçalho
    b.append(micro("AGÊNCIA JVI", M, 232, 21, 0.26, op=0.78))
    b.append(micro("SISTEMA DE IDENTIDADE VISUAL", M + 340, 232, 21, 0.26, op=0.34))
    b.append(micro("PRANCHA 01 / 01", W - M, 232, 21, 0.26, op=0.34, anchor="end"))
    b.append(rule(286))

    # ---- a marca sobre a grade que a gerou
    b.append(construction())
    b.append(
        f'<g transform="translate({MX - K * L.MARK_X:.2f},{MY - K * L.MARK_TOP:.2f}) '
        f'scale({K:.5f})">{L.mark(BLUE, WHITE)}</g>'
    )
    b.append(corners())

    # ---- legenda da marca
    cap_y = MY + MARK_PX + 132
    b.append(micro("FIG. 01 — A MARCA", M, cap_y, 19, 0.22, op=0.55))
    b.append(
        micro(
            "MÓDULO U = L/20   ·   BARRA 6U   ·   CANAL 1U   ·   DEGRAU 4U   ·   CORPO 4U",
            W - M,
            cap_y,
            19,
            0.22,
            op=0.34,
            anchor="end",
        )
    )
    b.append(rule(cap_y + 46, op=0.09))

    # ---- campo de acumulação
    fy, fh = 2020.0, 520.0
    b.append(field(fy, fh))
    b.append(rule(fy + fh + 1, op=0.22))
    b.append(micro("FIG. 02 — 96 MEDIDAS, UMA TENDÊNCIA", M, fy + fh + 62, 19, 0.22, op=0.55))
    b.append(micro("n = 96", W - M, fy + fh + 62, 19, 0.22, op=0.34, anchor="end"))

    # ---- a frase âncora
    b.append(
        micro(
            "CRESCIMENTO É UMA MEDIDA, NÃO UMA PROMESSA",
            W / 2,
            2812,
            27,
            0.30,
            op=0.80,
            anchor="middle",
        )
    )

    # ---- rodapé
    b.append(rule(H - 246, op=0.13))
    b.append(micro("RIGOR LUMINOSO", M, H - 186, 19, 0.24, op=0.34))
    b.append(micro("#0A5CFF", W / 2, H - 186, 19, 0.24, fill=BLUE, op=0.95, anchor="middle"))
    b.append(micro("CONTRASTE 5.2:1", W - M, H - 186, 19, 0.24, op=0.34, anchor="end"))

    return L.svg("".join(b), W, H)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / "jvi-prancha-01.svg"
    p.write_text(plate() + "\n", encoding="utf-8")
    print(f"  {p.name}  {p.stat().st_size} bytes")


if __name__ == "__main__":
    main()
