# Logo — Agência JVI

Marca construída sobre um módulo único (**U**). Nada aqui é medida solta.

```
barra    6U          canal   1U          degrau de altura  4U
alturas  12U · 16U · 20U     corpo da letra  4U
conjunto 20U de largura por 20U de altura — quadrado perfeito
```

O degrau entre uma barra e a seguinte e o corpo das letras são a mesma
medida (4U). A palavra `AGÊNCIA` tem exatamente três quartos da largura da
marca (15U de 20U), com o corpo resolvido por conta, não por chute.

Sem seta, sem gradiente, sem brilho, sem sombra, sem canto arredondado. Um
azul só. A ideia de crescimento vive na progressão das barras — era isso
que a seta duplicava.

A filosofia de desenho está em [`FILOSOFIA.md`](./FILOSOFIA.md). A
apresentação da identidade está em `jvi-prancha-01.png`.

## Arquivos

| Arquivo | Quando usar |
| --- | --- |
| `jvi-logo.svg` | Principal. Fundo preto da marca. |
| `jvi-logo-transparente.svg` | Sobre foto ou fundo escuro qualquer. |
| `jvi-logo-fundo-claro.svg` | Papelaria, documento, fundo branco. |
| `jvi-logo-mono-branco.svg` | Uma cor só, sobre fundo escuro ou colorido. |
| `jvi-logo-mono-preto.svg` | Uma cor só, sobre fundo claro. Carimbo, serigrafia. |
| `jvi-logo-horizontal.svg` | Cabeçalho de site, assinatura de e-mail, rodapé. |
| `jvi-logo-horizontal-fundo-claro.svg` | Mesma coisa, no claro. |
| `jvi-icone.svg` | Foto de perfil, avatar, app. Só a marca. |
| `jvi-icone-transparente.svg` | Ícone sem fundo. |
| `jvi-prancha-01.svg` | Prancha de apresentação da identidade. |

PNGs prontos (`*-1080.png`, `*-2048.png`, `*-512.png`) saem dos mesmos
SVGs. Para o perfil do Instagram use `jvi-icone-512.png` ou
`jvi-logo-1080.png`.

**Cor e mono são construções diferentes.** Nas versões em cor as letras são
aplicadas em branco sobre o azul — dá 5,2:1 de contraste, contra 3,9:1 do
vazado. Nas versões mono elas são vazadas das barras, porque numa cor só o
aplicado sumiria.

## Cores

| | Hex | Onde |
| --- | --- | --- |
| Azul | `#0a5cff` | as barras. acento único. |
| Branco | `#ffffff` | letras J V I |
| Preto | `#050505` | fundo |
| Tinta | `#0a0a0c` | texto sobre fundo claro |

## Regras de uso

- **Respiro:** no mínimo 4U em volta — a largura de uma barra e mais um pouco.
- **Tamanho mínimo:** o logo completo aguenta até ~140px de largura; o ícone,
  até ~64px. Abaixo disso as letras fecham — use o `favicon.svg`, que é só
  as barras e foi desenhado para o tamanho pequeno.
- **Não faça:** girar, inclinar, esticar fora de proporção, mudar o azul,
  colocar sombra ou brilho, aplicar a marca em cor sobre fundo claro sem
  contraste, ou devolver a seta.

## Como regerar

O desenho é gerado por código. Os glifos saem das fontes já convertidos em
curvas, então os SVGs não dependem de nenhuma fonte instalada.

```bash
python3 tools/build_logo.py     # SVGs + favicon
python3 tools/build_plate.py    # prancha de apresentação
python3 tools/render_logo.py    # PNGs (precisa do Chromium)
```

Para mexer no desenho, edite as constantes no topo de `tools/build_logo.py`
— `U` governa tudo. Tipografia: Outfit (marca e wordmark) e Geist Mono
(marcações técnicas da prancha), ambas OFL, em `tools/fonts/`.
