---
name: Fintech Fresco Evolution
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3d4a42'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6d7a71'
  outline-variant: '#bccabf'
  surface-tint: '#006c48'
  primary: '#006c48'
  on-primary: '#ffffff'
  primary-container: '#2ebd85'
  on-primary-container: '#00462d'
  inverse-primary: '#57dea3'
  secondary: '#006c46'
  on-secondary: '#ffffff'
  secondary-container: '#7efaba'
  on-secondary-container: '#00734a'
  tertiary: '#565e74'
  on-tertiary: '#ffffff'
  tertiary-container: '#9fa7c0'
  on-tertiary-container: '#353c51'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#77fbbd'
  primary-fixed-dim: '#57dea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005235'
  secondary-fixed: '#7efaba'
  secondary-fixed-dim: '#60dda0'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#005233'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 24px
  gutter: 16px
  glass-padding: 24px
---

## Brand & Style

This design system evolves the "Fintech Fresco" core into a sophisticated, multi-layered experience. It targets a modern, financially-literate audience that values clarity but appreciates a premium, high-fidelity tactile feel. 

The design style is a hybrid of **Glassmorphism** and **Tactile Minimalism**. It moves away from 100% flat surfaces to embrace "Depth and Volume." By utilizing translucent layers, soft shadows, and subtle gradients, the UI creates a spatial hierarchy where interactive elements appear to float above a frosted glass substrate. The emotional response is one of security, precision, and futuristic elegance.

## Colors

The palette is anchored by a "Mint Green" primary duo used for physical interactive elements.
- **Primary & Secondary:** A directional gradient from `#2EBD85` to `#1AA870` is used for high-emphasis actions to provide volume.
- **Tertiary (Night Blue):** `#0F172A` is reserved for text, deep-contrast backgrounds, and high-relief interactive chips.
- **Neutral:** A clean, cool-toned slate background (`#F8FAFC`) serves as the base layer for the glass surfaces.
- **Glass Tint:** Translucent white is used for container surfaces, providing a "frost" effect that bridges the gap between the solid background and the floating elements.

## Typography

This design system utilizes **Hanken Grotesk** for all typographic roles to maintain its contemporary fintech roots. 

To ensure accessibility and high contrast against glassmorphic backgrounds:
- **Headlines:** Use high weights (600-700) and Night Blue (`#0F172A`) to anchor the layout.
- **Body Text:** Maintain a minimum 16px size for readability over translucent surfaces.
- **Legibility:** On glass surfaces, text must never fall below 4.5:1 contrast ratio. If background blur is insufficient, use a subtle 10% black text shadow for clarity.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy with generous internal padding to emphasize the floating nature of the components. 

- **Grid:** A 12-column system on desktop, collapsing to 4 columns on mobile.
- **Margins:** A consistent 24px safe area ensures glass surfaces don't feel cramped against the screen edges.
- **Floating Containers:** Glass surfaces should have ample margins (min 16px) from each other to allow the background blur and drop shadows to remain visible, creating clear spatial separation.

## Elevation & Depth

Hierarchy is established through a three-tier elevation model:

1. **Base Layer:** Solid `#F8FAFC` background. 
2. **Glass Layer:** Translucent surfaces (`rgba(255, 255, 255, 0.7)`) featuring a **20px Backdrop Blur**. These surfaces use a very soft, large-radius shadow: `0 20px 40px rgba(0, 0, 0, 0.06)`. A 1px white border at 40% opacity provides a crisp "edge" to the frost.
3. **Floating Layer (Interactive):** Physical buttons and active chips sit at the highest elevation. They use more aggressive shadows to suggest they can be pressed down into the glass layer.

## Shapes

The shape language is highly organic and approachable. 
- **Standard Containers:** Use a 16px (`rounded-lg`) radius.
- **Glass Surfaces:** Use a 24px (`rounded-xl`) radius to emphasize the "soft" frost aesthetic.
- **Interactive Elements:** Buttons and chips use a **32px radius** (Pill-shaped) to maximize the tactile, "friendly" fintech feel.

## Components

### Buttons
- **Physical Style:** Primary buttons feature a linear gradient from Mint Green `#2EBD85` to `#1AA870` at 135°. 
- **Elevation:** They sit on a `0 12px 24px rgba(46, 189, 133, 0.25)` drop shadow. 
- **State:** On hover, the shadow expands; on tap, the button moves 2px down and the shadow tightens.

### Chips
- **Relief Style:** Active chips use the Night Blue (`#0F172A`) background.
- **Inner Detail:** To create volume, active chips include a subtle 1px white inner-border (top-only) or a 10% white inner shadow to suggest a raised "relief" texture.

### Glass Cards
- Used for grouping related financial data. Always feature the backdrop blur and the soft diffused shadow. Padding should be a minimum of 24px to give content "room to breathe."

### Input Fields
- Semi-transparent backgrounds with a 1px solid border. Upon focus, the border transitions to the Mint Green primary and the background opacity increases slightly to feel "active."

### Lists
- Separated by thin, low-opacity lines (rgba 0,0,0,0.05). In glass containers, list items can use a subtle hover state that increases the local blur or adds a soft white tint.