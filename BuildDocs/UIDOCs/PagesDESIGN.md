---
name: Tenax Logic
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#44483b'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#75796a'
  outline-variant: '#c5c8b7'
  surface-tint: '#4d661c'
  primary: '#4d661c'
  on-primary: '#ffffff'
  primary-container: '#d9f99d'
  on-primary-container: '#597428'
  inverse-primary: '#b3d17a'
  secondary: '#575e70'
  on-secondary: '#ffffff'
  secondary-container: '#d9dff5'
  on-secondary-container: '#5c6274'
  tertiary: '#494bd6'
  on-tertiary: '#ffffff'
  tertiary-container: '#eeebff'
  on-tertiary-container: '#5659e4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ceee93'
  primary-fixed-dim: '#b3d17a'
  on-primary-fixed: '#131f00'
  on-primary-fixed-variant: '#364e03'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The design system is engineered for a technical, high-precision AI platform. The brand personality is **clinical, innovative, and highly legible**, evoking a sense of structural integrity and forward-thinking intelligence.

The visual style is a sophisticated blend of **Modern Corporate** and **Glassmorphism**. It utilizes a technical "blueprint" aesthetic—using subtle grid patterns and mono-spaced accents—grounded by high-contrast typography and vibrant functional color. The interface should feel like a high-performance developer tool that remains accessible to enterprise stakeholders. It prioritizes clarity through generous whitespace and a "layered" depth model.

## Colors

The color palette is designed for maximum clarity and functional highlighting.

- **Primary (Lime/Yellow-Green):** Reserved exclusively for high-priority actions and status indicators. It provides a sharp, energetic contrast against the dark text.
- **Secondary (Charcoal):** Used for primary headings and heavy body text to ensure AAA accessibility and a sense of "ink-on-paper" authority.
- **Tertiary (Indigo):** Utilized for interactive icons, secondary links, and data visualization highlights.
- **Neutral:** A range of cool grays from `#F9FAFB` (background) to `#E5E7EB` (borders) creates the structural foundation.
- **Surface & Background:** The main canvas is a very light gray with a subtle 32px grid pattern rendered in `#F1F5F9`.

## Typography

This design system uses a dual-font strategy to balance technical precision with readability.

**Geist** is used for headlines and labels. Its geometric, slightly technical character reinforces the AI/Engineering focus. **Inter** is used for all body text and UI labels where maximum legibility at small sizes is required.

Hierarchy is established through aggressive weight variations—using Bold (700) or SemiBold (600) for headers against Regular (400) body text. For data-heavy displays, use a tabular figures variant of Geist to ensure column alignment.

## Layout & Spacing

The layout utilizes a **Fixed Grid** system for desktop, centering the content within a 1280px container. 

- **Grid:** 12-column layout with 24px (1.5rem) gutters.
- **Rhythm:** An 8px base unit governs all internal padding and margin.
- **Reflow:** On mobile, columns collapse to a single stack. Margins reduce to 16px to maximize screen real estate for technical data.
- **Grid Background:** A persistent background grid provides a "canvas" feel. UI cards should align their borders strictly to this underlying grid where possible.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and soft, layered shadows rather than heavy fills.

- **Base Layer:** The grid background.
- **Mid Layer (Cards):** Semi-transparent white surfaces (`rgba(255, 255, 255, 0.8)`) with a `backdrop-filter: blur(12px)`. This creates a frosted-glass effect that lets the grid background peek through.
- **Shadows:** Use a "Natural Ambient" shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)`.
- **Outlines:** Every elevated card must have a 1px solid border in `#E5E7EB` to maintain definition against the light background.

## Shapes

The shape language is **Structured & Friendly**. 

We utilize a standard 0.5rem (8px) radius for most UI elements (buttons, inputs), while primary containers and feature cards use a larger 1rem (16px) radius to feel more approachable. This creates a clear distinction between "functional" small elements and "content" large containers. Interactive icons and small tags (chips) should use pill-shaped rounding for high-contrast visual interest.

## Components

### Buttons
- **Primary:** Background `#D9F99D`, Text `#111827`, SemiBold weight. No shadow, flat fill.
- **Secondary:** Background transparent, 1px Border `#E5E7EB`, Hover state adds a subtle `#F9FAFB` fill.

### Cards
- Standard containers use the Glassmorphism style: white background with 80% opacity, 12px backdrop blur, 16px corner radius, and a 1px soft gray border.

### Inputs
- Clean fields with a 1px border. Focus state should utilize a 2px outer glow using the Tertiary Indigo color at 20% opacity.

### Chips/Tags
- Small, uppercase labels with increased letter spacing. Use high-contrast backgrounds (very light gray or primary lime) to denote categories or AI-detected entities.

### Lists
- Lists should utilize horizontal dividers in `#F1F5F9`. For data points, use a "Key-Value" pair styling where the Key is `label-caps` and the Value is `body-md` in the Secondary Charcoal color.