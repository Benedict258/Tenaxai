---
name: Engineering Rigor
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
  on-surface-variant: '#44483b'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75796a'
  outline-variant: '#c5c8b7'
  surface-tint: '#4d661c'
  primary: '#4d661c'
  on-primary: '#ffffff'
  primary-container: '#d9f99d'
  on-primary-container: '#597428'
  inverse-primary: '#b3d17a'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#505f76'
  on-tertiary: '#ffffff'
  tertiary-container: '#e5eeff'
  on-tertiary-container: '#5c6c83'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ceee93'
  primary-fixed-dim: '#b3d17a'
  on-primary-fixed: '#131f00'
  on-primary-fixed-variant: '#364e03'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

The design system is built upon the philosophy of **Engineering Rigor**. It is designed for high-performance environments where clarity, precision, and technical excellence are paramount. The aesthetic is a fusion of **Modern Minimalism** and **Technical Utility**, evoking the feeling of a clean terminal or a high-end IDE.

The target audience consists of technical stakeholders, engineers, and decision-makers who value efficiency over decoration. The UI should feel intentional and calculated, utilizing a pure white canvas punctuated by a subtle geometric grid that suggests a foundation of structured data and architectural stability. It communicates trust through legibility and professional restraint.

## Colors

The palette is anchored by a **vibrant lime-green primary accent**, used sparingly to draw attention to high-value actions (the "North Star" of the interaction). This is set against a **pure white (#ffffff) background** to maximize white space and maintain a pristine, clinical atmosphere.

- **Primary:** High-visibility lime-green (#d9f99d) for call-to-actions and active states.
- **Surface/Neutral:** A scale of slates and zincs (from #0f172a for text down to #f8fafc for subtle card fills) provides the structural hierarchy.
- **Technical Grid:** A transparent black or soft grey stroke creates a geometric overlay, reinforcing the "engineering" metaphor without distracting from the content.

## Typography

This design system utilizes **Geist** for its entire type scale to ensure a modern, developer-centric feel. Geist’s geometric nature and wide apertures provide exceptional readability in both large display formats and dense data tables.

- **Headlines:** Use heavy weights (700) with tight letter-spacing to create a "monumental" feel for key value propositions.
- **Body Text:** Scaled for long-form readability with a generous 1.6x line height to prevent visual fatigue.
- **Technical Accents:** For metadata or small labels, an optional switch to a monospaced font (like JetBrains Mono) can be used to reinforce the engineering aesthetic.

## Layout & Spacing

The layout follows a **12-column fluid grid** within a fixed maximum container width of 1280px. The spacing rhythm is strictly based on an **8px linear scale**, ensuring that every element—from the smallest icon to the largest margin—is a multiple of 8.

- **Geometric Grid:** A background pattern of 40px squares should be applied globally. On desktop, this grid can be slightly distorted using a CSS perspective transform (e.g., `rotateX(20deg)`) to create a sense of depth and architectural drafting.
- **Breakpoints:**
  - **Mobile (<768px):** Single column, 16px margins. Headlines scale down to `display-lg-mobile`.
  - **Tablet (768px - 1024px):** 8 columns, 24px margins.
  - **Desktop (>1024px):** 12 columns, 64px margins, 24px gutters.

## Elevation & Depth

Hierarchy in the design system is achieved through **Tonal Layers** and **Ambient Shadows** rather than heavy color blocking. 

- **Level 0 (Background):** Pure white with the geometric grid overlay.
- **Level 1 (Cards/Containers):** Pure white background with a 1px border (#e2e8f0) and a very soft, highly diffused shadow (Blur: 40px, Opacity: 4%, Color: #000).
- **Interactive Depth:** Upon hover, cards should lift slightly using a slightly more pronounced shadow and a subtle Y-axis translation (-2px) to signify interactivity.
- **Glassmorphism (Optional):** For navigation bars or floating menus, a backdrop blur of 12px with 80% opacity white fill can be used to maintain context of the background grid.

## Shapes

The design system employs **Roundedness Level 2**. This balance ensures the UI feels modern and engineered but remains approachable. 

- **Standard Components:** Buttons and input fields use a `0.5rem` (8px) corner radius.
- **Containers:** Large cards and sections use a `1rem` (16px) or `1.5rem` (24px) corner radius to create clear visual containment.
- **Badges/Chips:** Use a fully pill-shaped radius to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Lime-green (#d9f99d) background with dark slate text (#0f172a). No border. Bold Geist type.
- **Secondary/Ghost:** Transparent background with a 1px border (#e2e8f0). Subtle background fill (#f8fafc) on hover.
- **Icon Integration:** Use simple, stroke-based icons (1.5px weight) aligned with the text.

### Cards
- White fill, 1px slate-200 border, and soft elevation. 
- Internal padding should be generous (default 32px) to allow content to breathe.
- Feature "Stats" within cards using large display type and small labels below.

### Chips & Badges
- Small, uppercase Geist Mono or Semibold labels.
- Light gray stroke or very subtle fill to categorize without drawing excessive focus away from primary CTAs.

### Input Fields
- Minimalist design. A simple 1px bottom border or a full-stroke with no fill. 
- Focus state should utilize the lime-green primary color as the border stroke color to provide clear feedback.

### Social Links
- Horizontal list of icons with accompanying Geist labels. 
- Low-contrast default state (Slate-500) that shifts to high-contrast (Slate-900) on hover.