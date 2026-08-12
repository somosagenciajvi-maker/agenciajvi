# Logo — Agência JVI

Versão minimalista da marca: **sem a seta**, sem gradiente metálico, sem
brilho, sem textura e sem borda arredondada. O que sobrou é o essencial —
três barras que sobem, com J, V e I sobre uma linha de base comum, e
`AGÊNCIA` com o entreletras calculado para ter exatamente a mesma largura
do grupo de barras.

A ideia de crescimento continua ali: ela agora está na própria progressão
das barras (altura e tom subindo da esquerda para a direita), que era o que
a seta duplicava.

## Arquivos

| Arquivo | Quando usar |
| --- | --- |
| `jvi-logo.svg` | Principal. Fundo preto da marca. |
| `jvi-logo-transparente.svg` | Sobre foto ou fundo escuro qualquer. |
| `jvi-logo-fundo-claro.svg` | Papelaria, documento, fundo branco. |
| `jvi-logo-mono-branco.svg` | Uma cor só, sobre fundo escuro/colorido. |
| `jvi-logo-mono-preto.svg` | Uma cor só, sobre fundo claro. Carimbo, fax, serigrafia. |
| `jvi-logo-horizontal.svg` | Cabeçalho de site, assinatura de e-mail, rodapé. |
| `jvi-logo-horizontal-fundo-claro.svg` | Mesma coisa, no claro. |
| `jvi-icone.svg` | Foto de perfil, avatar, app. Só a marca. |
| `jvi-icone-transparente.svg` | Ícone sem fundo. |

PNGs prontos (`*-1080.png`, `*-2048.png`, `*-512.png`) saem dos mesmos SVGs
e servem para Instagram, WhatsApp e qualquer lugar que não aceite vetor.
Para perfil do Instagram use `jvi-icone-512.png` ou `jvi-logo-1080.png`.

## Cores

| | Hex | Onde |
| --- | --- | --- |
| Azul profundo | `#0b2fb8` | barra 1 |
| Azul médio | `#0a46dc` | barra 2 |
| Azul da marca | `#0a5cff` | barra 3 |
| Preto | `#050505` | fundo |
| Branco | `#ffffff` | letras J V I |

## Regras de uso

- **Respiro:** deixe em volta do logo pelo menos a largura de uma barra.
- **Tamanho mínimo:** o logo completo aguenta até ~120px de largura; o
  ícone, até ~64px. Abaixo disso as letras somem — use o `favicon.svg`
  (só as barras, sem letras), que foi desenhado para o tamanho pequeno.
- **Não faça:** girar, inclinar, esticar fora de proporção, trocar as cores
  das barras, colocar sombra/brilho, ou devolver a seta.

## Como regerar

O desenho é gerado por código — os glifos saem das próprias fontes do site
(Anton e Oswald) já convertidos em curvas, então os SVGs não dependem de
nenhuma fonte instalada.

```bash
python3 tools/build-logo.py    # SVGs + favicon
python3 tools/render-logo.py   # PNGs (precisa do Chromium)
```

Para mexer no desenho, edite as constantes de geometria no topo de
`tools/build-logo.py` (largura de barra, degrau de altura, corpo das letras)
e rode os dois comandos.
