# Project Context — Igara site

> Fonte de verdade da estratégia de marca: `../brand-kit/brand-guidelines.md` (pasta `brand-kit/` na raiz IgaraLead).
> Voz e posicionamento: Seção 8 (a definir aqui quando necessário).
> Esta Seção 12 é o canon visual executável. Implementação em `src/styles.css`.

## 12. Visual Identity

**Colors**: Primary `#0A8BCC` (seed/accent, RGB 10, 139, 204), CTA e texto azul sempre Primary-strong `#0977AF` (4.92:1 no branco, único azul com AA para texto normal), Secondary `#276386`, Tertiary `#175582`. Backgrounds `#F4F8FB` (light) / `#0D1218` (dark). Foreground `#141B21` / `#DFE7ED`. Surfaces `#E8EEF3` / `#151D25`, high `#E0E7ED` / `#1E2832`. Muted text `#52616E` / `#8B9AA7`. Border `#BECAD4` / `#2E3A46`. Hero bg `#DBE8F0` / `#070E14`. Verde `#13876C` fora do canon.

**Typography**: Headings Inter Variable 700 (Hero H1 800), cor foreground; Body Inter Variable 400, 0.95rem, 1.6; Dados Red Hat Mono Variable (CNPJ, valores, números). Sem travessões nos textos.

**Sizes**: Hero H1 `clamp(3rem, 7vw, 5.5rem)`, H1 `clamp(2rem, 5vw, 3.75rem)`, H2 `clamp(1.875rem, 4vw, 3rem)`, H3 1.25rem (1.05rem no processo), body 0.95rem.

**Spacing**: Base 8px; container max 1600px, padding lateral 1rem; seções 4rem (5rem em ≥1024px), vitrine/processo 6rem topo / 4rem base; radius sm 0.25 / md 0.5 / lg 0.75 / xl 1rem; botões `0.625rem 1.25rem`.

**Layout**: Header fixo flutuante (max 72rem, glass); ordem da home hero → processo → vitrine → contato; header da vitrine centrado, do processo à esquerda; um momento de accent por página (hero).

**Logo**: wordmark (`../brand-kit/logos/igara-wordmark-white.svg` no dark, `igara-wordmark-black.svg` no light; site usa o white com `brightness(0)` no light), header 1.75rem / footer 2rem, clear space = altura do "I", mínimo 24px. Mark antigo (I e L no negativo, igaralead) aposentado, sem esticar, recolorir ou sombra.

**Motion**: Hover só cor/brilho/sombra, sem translate/scale; CTA primário com gloss de 1s no background (`btn-bg-shine`); `prefers-reduced-motion` desliga keyframes, Dither e shine.

**A11y**: Texto normal ≥4.5:1 (azul só via Strong), texto large ≥3:1, foco visível 2px `var(--ring)`, nunca só cor para estado.
