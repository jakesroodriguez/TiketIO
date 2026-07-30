---
name: Fintech Fresco Nocturne
colors:
  surface: '#101416'
  surface-dim: '#101416'
  surface-bright: '#363a3c'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#181c1e'
  surface-container: '#1c2022'
  surface-container-high: '#262b2c'
  surface-container-highest: '#313537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#bccabf'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#86948a'
  outline-variant: '#3d4a42'
  surface-tint: '#57dea3'
  primary: '#57dea3'
  on-primary: '#003824'
  primary-container: '#2ebd85'
  on-primary-container: '#00462d'
  inverse-primary: '#006c48'
  secondary: '#ebbe9b'
  on-secondary: '#462a11'
  secondary-container: '#624227'
  on-secondary-container: '#dcb08d'
  tertiary: '#c0c6da'
  on-tertiary: '#2a3040'
  tertiary-container: '#a0a7ba'
  on-tertiary-container: '#363c4c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#77fbbd'
  primary-fixed-dim: '#57dea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005235'
  secondary-fixed: '#ffdcc2'
  secondary-fixed-dim: '#ebbe9b'
  on-secondary-fixed: '#2d1602'
  on-secondary-fixed-variant: '#5f4025'
  tertiary-fixed: '#dce2f6'
  tertiary-fixed-dim: '#c0c6da'
  on-tertiary-fixed: '#151b2a'
  on-tertiary-fixed-variant: '#404757'
  background: '#101416'
  on-background: '#e0e3e5'
  surface-variant: '#313537'
  surface-primary: '#0A111F'
  surface-secondary: '#161E2E'
  surface-tertiary: '#222B3D'
  mint-glow: rgba(46, 189, 133, 0.15)
  earth-accent: '#D4A373'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding-mobile: 1.25rem
  container-padding-desktop: 2.5rem
  gutter: 1.5rem
  section-gap: 4rem
---

## Brand & Style

The design system transition to dark mode evolves the "Swiss-Flat" aesthetic into a high-performance, low-light environment. The brand personality remains refined, trustworthy, and fresh, but shifts its focus toward "Executive Focus"—reducing eye strain while maintaining the precision of a high-end financial instrument.

The style is strictly **Minimalist** with a "Flat" core. It rejects skeuomorphism, shadows, and blurs in favor of structural color blocking and pure geometry. Depth is communicated through value shifts in the blue spectrum rather than traditional elevation. The aesthetic evokes the feeling of a premium dark-mode dashboard: sophisticated, calm, and hyper-legible.

## Colors

The palette is anchored by **Night Blue (#0A111F)**, serving as the primary "Canvas." To maintain the "Swiss-Flat" depth without shadows, we utilize three distinct surface tiers that increase in lightness as they "rise" toward the user.

- **Primary Action:** Mint Green (#2EBD85) is the soul of the interface. In dark mode, it is paired with a subtle, non-blurred 1px stroke or a flat background tint to ensure it appears vibrant against the deep blue.
- **Organic Sophistication:** The Earth Brown from the original system is lifted to a warmer, more legible **Coffee/Camel tone (#D4A373)** for dark mode. It is used sparingly for premium indicators and secondary accents.
- **Typography:** We avoid #FFFFFF to prevent "halation" (the glow effect of white text on black). Instead, we use a high-contrast **Off-White (#F4F7F9)** for primary content and a muted slate-grey for secondary metadata.

## Typography

This design system uses **Hanken Grotesk** for all primary interface elements. Its sharp, contemporary geometry reinforces the Swiss-Flat aesthetic. For financial data, transaction IDs, and currency amounts, we introduce **JetBrains Mono** to provide a technical, high-precision feel that aids in digit scanning.

Type is treated as a structural element. Headlines are tight and bold, while body copy is given ample line height to ensure maximum legibility against the dark background. Letter spacing is slightly increased for smaller labels to prevent the light text from "bleeding" into the dark background.

## Layout & Spacing

The layout philosophy follows a **Strict Fluid Grid** based on an 8px base unit. To maintain the "generous whitespace" requirement in a dark environment, we increase margins compared to light mode to prevent the UI from feeling claustrophobic.

- **Desktop:** 12-column grid with a 1200px max-width.
- **Mobile:** Single column with 20px (1.25rem) side margins.
- **Data Density:** While the overall layout is "airy," data tables and lists utilize a tighter vertical rhythm (8px or 16px) to keep financial information visible without excessive scrolling, balanced by wide horizontal gutters.

## Elevation & Depth

Depth in this design system is purely **Chromatic**, not spatial. We do not use shadows. Instead, we use "Layered Surfaces" to indicate hierarchy:

1.  **Level 0 (Canvas):** Night Blue (#0A111F) — The furthest background layer.
2.  **Level 1 (Cards/Navigation):** Surface-Secondary (#161E2E) — Used for the main content containers.
3.  **Level 2 (Inputs/Overlays):** Surface-Tertiary (#222B3D) — Used for elements that sit "on top" of cards, such as text fields or active menu items.

To separate elements of the same color, use a subtle 1px solid border in a slightly lighter slate (#2D3748) rather than a shadow. This maintains the "Flat" requirement while providing the necessary contrast for accessibility.

## Shapes

The shape language is defined by "Organic Precision." While the grid is rigid and Swiss, the corners are extremely soft to provide a "friendly" fintech experience.

- **Containers & Cards:** Use a consistent 32px radius.
- **Buttons & Chips:** Use a full "Pill" shape (999px) or a minimum of 16px to maintain the organic feel.
- **Interactive States:** When an element is pressed or active, it does not grow in size; instead, it undergoes a flat color shift (e.g., Mint Green to a slightly darker Teal).

## Components

### Buttons
Primary buttons are solid **Mint Green** with **Night Blue** text for maximum legibility. Secondary buttons use a transparent background with a 2px Mint Green border (Ghost Style).

### Cards
Cards are always **Surface-Secondary (#161E2E)** with a 32px corner radius. They contain no shadows. For "Premium" account features, use a thin 1px border in **Earth Accent (#D4A373)**.

### Input Fields
Fields use the **Surface-Tertiary (#222B3D)** fill. Labels are placed above the field in Label-MD JetBrains Mono. The active state is indicated by a 2px Mint Green bottom-border only, maintaining the flat look.

### Chips & Tags
Used for transaction categories. They should be low-contrast (Surface-Tertiary) with Off-White text, unless they indicate a positive status (Mint Green) or an alert.

### Lists
Transaction lists should have generous 24px vertical padding between items. Use a 1px divider in Surface-Tertiary to separate items, ensuring the divider does not touch the edges of the container.