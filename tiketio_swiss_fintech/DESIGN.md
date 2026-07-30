---
name: TiketIO Swiss Fintech
colors:
  surface: '#fbf8fc'
  surface-dim: '#dbd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#efedf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e2e5'
  on-surface: '#1b1b1e'
  on-surface-variant: '#45464e'
  inverse-surface: '#303033'
  inverse-on-surface: '#f2f0f3'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4f5e83'
  primary: '#000109'
  on-primary: '#ffffff'
  primary-container: '#0a1b3d'
  on-primary-container: '#7584ac'
  inverse-primary: '#b7c6f1'
  secondary: '#006c4d'
  on-secondary: '#ffffff'
  secondary-container: '#86f8c8'
  on-secondary-container: '#007352'
  tertiary: '#040100'
  on-tertiary: '#ffffff'
  tertiary-container: '#321400'
  on-tertiary-container: '#ab7a59'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b7c6f1'
  on-primary-fixed: '#091a3c'
  on-primary-fixed-variant: '#37466a'
  secondary-fixed: '#86f8c8'
  secondary-fixed-dim: '#69dbad'
  on-secondary-fixed: '#002115'
  on-secondary-fixed-variant: '#005139'
  tertiary-fixed: '#ffdcc7'
  tertiary-fixed-dim: '#f4ba95'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#653d21'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e2e5'
  night-blue: '#0A1B3D'
  mint-green: '#3EB489'
  pure-white: '#FFFFFF'
  slate-gray: '#F2F4F7'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-bold:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
spacing:
  baseline: 8px
  gutter: 16px
  margin-mobile: 24px
  margin-desktop: 64px
  section-gap: 48px
---

## Brand & Style

This design system is anchored in the **Swiss Design** movement—a philosophy of hyper-minimalism, precision, and objectivity. It is tailored for a sophisticated fintech audience that values clarity over decoration. The brand personality is clinical yet fresh, evoking an emotional response of absolute financial control and transparency.

The visual narrative is "Ultra-Flat." By stripping away all ornamentation—gradients, shadows, and depth effects—the system relies entirely on a rigid mathematical grid, generous negative space, and high-contrast typography to guide the user. The "El Gráfico Oculto" logo serves as the primary visual anchor, utilizing the serrated edge of a receipt as a geometric motif throughout the interface to bridge the gap between physical paper and digital data.

## Colors

The palette is restricted to three functional pillars to maintain maximum visual signal-to-noise ratios.

*   **Pure White (#FFFFFF):** Used for all primary backgrounds. Negative space is treated as a structural element, not just an empty area.
*   **Night Blue (#0A1B3D):** The core of the identity. Used for all typography, primary geometric shapes, navigation bars, and "Food" category visualizations. It represents institutional trust and unwavering security.
*   **Mint Green (#3EB489):** The action catalyst. Reserved exclusively for interactive elements (buttons), the OCR scanning interface, and "Cosmetics/Saving" charts. It provides the "Freshness" required to make financial management feel optimistic.

**Note:** Absolutely no tints or shades are permitted. Colors must be used at 100% opacity to maintain the "Flat" aesthetic.

## Typography

The system utilizes **Hanken Grotesk** for its razor-sharp geometry and neutral character, echoing classic Swiss typefaces like Helvetica but with a modern digital rendering. 

Contrast is achieved through dramatic shifts in weight and size rather than color. Large headlines should use 'ExtraBold' weights with tight tracking to create a "block" effect, while body text remains 'Regular' for legibility. **JetBrains Mono** is introduced as a secondary label font for OCR data, receipt line items, and currency values to emphasize the "data extraction" nature of the product. All type must be rendered in **Night Blue** against **Pure White** backgrounds.

## Layout & Spacing

This system employs a **12-column fixed grid** for desktop and a **4-column fluid grid** for mobile, governed by a strict 8px baseline rhythm.

The layout philosophy is "Alignment over Decoration." Every element must snap to the grid. Margins are intentionally oversized (24px minimum on mobile) to ensure the content feels prestigious and unhurried. 

**Reflow Rules:**
- **Mobile:** Single column vertical stack. Scan interface occupies the top 50% of the viewport.
- **Desktop:** Dashboard widgets span 4 or 6 columns. Negative space is used to center the content, preventing it from stretching to the screen edges.

## Elevation & Depth

In accordance with Swiss Design principles, this system has **zero physical depth**. 

- **No Shadows:** Contrast and hierarchy are created through color blocking and size, never through drop shadows or glows.
- **Tonal Separation:** If a layer must be visually separated from the background (e.g., a card), use a 1px solid border in Night Blue or a flat fill of Slate Gray. 
- **The "Flat" Rule:** Elements do not "hover." They exist on the same 2D plane. Interaction states (hover/active) are communicated via color inversions (e.g., Mint Green button becomes Night Blue on press) rather than lifting effects.

## Shapes

The shape language is strictly **Sharp (0)**. 

To maintain the "Atemporal" and "Geometric" aesthetic, all buttons, input fields, cards, and image containers must have 0px corner radii. The only exception to the rectangular rule is the use of perfect circles for "Mint Green" savings charts and the specific serrated receipt motif used for section dividers, which mimics the top and bottom of the official logo.

## Components

**Buttons**
Large, rectangular blocks of solid Mint Green. Typography is centered, Night Blue, and Bold. There are no borders or shadows. On-press state involves a 100% color swap to Night Blue with White text.

**OCR Scanner**
The camera view is framed by a 2px solid Mint Green stroke. Scanned items appear in real-time as a list of Night Blue text on a Pure White background, using the `label-mono` typography style.

**Cards & Containers**
Defined by 1px Night Blue borders or solid Night Blue fills with White text. Cards never have rounded corners.

**Input Fields**
Simple 1px Night Blue bottom-border only (underlined style) to maximize whitespace. Labels use `label-mono` in Night Blue.

**Charts**
- **Bar Charts (Spending):** Solid Night Blue blocks, varied only by height.
- **Pie Charts (Categories):** Solid Mint Green segments for savings, using thin White lines as separators between segments.