---
name: Architectural Data Management
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.02em
  mono:
    fontFamily: monospace
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is rooted in the principles of **Executive Minimalism**. It serves a sophisticated enterprise audience managing critical data relays, requiring a UI that feels reliable, high-fidelity, and intellectually calm. The aesthetic avoids unnecessary ornamentation, focusing instead on the clarity of data and the precision of the interface.

Drawing from **Modern Corporate** and **Minimalist** movements, the style emphasizes structural integrity through generous whitespace and a rigorous typographic hierarchy. The emotional response is one of controlled authority and technical excellence. Elements are layered subtly to reflect the depth of information without overwhelming the user, ensuring the application feels like a high-end professional tool rather than a consumer utility.

## Colors

The palette is anchored by a deep slate and charcoal foundation, providing a "weighted" professional feel. **Deep Slate** functions as the primary neutral for text and high-contrast elements, while **Charcoal** is used for secondary structural components.

- **Primary & Secondary:** Deep Slate (#0F172A) and Slate-700 (#334155) form the core of the interface.
- **Accents:** A subtle Corporate Blue is used sparingly for primary actions and focus states to guide the eye without breaking the minimalist harmony.
- **Statuses:** System health is communicated through a "Soft Emerald" for active states and a "Muted Crimson" for downtime. These colors are slightly desaturated to maintain the sophisticated tone of the application.
- **Surface:** The use of "Clean White" as the primary background is essential for maintaining a sense of openness and airiness.

## Typography

This design system utilizes **Inter** for all interface elements to leverage its exceptional legibility in data-heavy environments. The hierarchy is strictly enforced through weight and scale. 

- **Headlines:** Use semi-bold weights with tighter letter spacing to create a sense of density and importance.
- **Body Text:** Standard body text uses a 14px base to maximize information density while maintaining readability through generous line heights.
- **Data Points:** For relay logs and technical IDs, a monospaced font is permitted to ensure character alignment and precision.
- **Labels:** Small labels use medium weights and slight tracking (letter spacing) to ensure they remain legible at small scales.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** system for main content areas to maintain a controlled, editorial feel, while sidebar and navigation components remain fluid. 

A 12-column grid is utilized for dashboards, with 24px gutters providing significant breathing room between data widgets. The "Plenty of Whitespace" mandate is achieved by using the `xl` (48px) spacing unit for vertical section separation and `lg` (24px) for internal card padding. All measurements are multiples of a 4px baseline, ensuring a rhythmic and predictable flow across all screens.

## Elevation & Depth

Depth in this design system is communicated through **Tonal Layers** and **Ambient Shadows**. Instead of traditional heavy shadows, the system uses "Soft Shadows"—highly diffused, low-opacity (2-4%) blurs that barely lift the element off the surface.

- **Level 0:** The primary application background (Clean White).
- **Level 1:** Cards and primary containers, defined by a 1px minimalist border in #E2E8F0.
- **Level 2:** Active or hovered elements, utilizing the soft ambient shadow to indicate interactivity.
- **Overlays:** Modals and dropdowns use a slightly more pronounced shadow with a backdrop blur (glassmorphism) to maintain context of the underlying data without visual clutter.

## Shapes

To maintain a "Professional and Sophisticated" aesthetic, the design system employs a **Soft** shape language. Extreme rounding is avoided to prevent the UI from appearing too casual or "bubbly."

Standard components like buttons and input fields use a 4px (0.25rem) corner radius. Larger containers, such as data cards or modal windows, use an 8px (0.5rem) radius. This subtle rounding softens the technical nature of the data relay management application while preserving a crisp, engineered appearance.

## Components

### Buttons
Primary buttons use the Deep Slate background with white text for high contrast. Secondary buttons use a minimalist border with no fill. Ghost buttons are reserved for tertiary actions. All buttons feature a subtle transition on hover, shifting the background color slightly.

### Input Fields
Fields are defined by 1px borders in a muted gray. Focus states utilize a 1px solid Corporate Blue border with a very faint blue outer glow (2px).

### Data Cards
The core of the ABM experience. Cards must have a 1px border and no shadow in their default state. They use `lg` (24px) internal padding to ensure data isn't cramped.

### Status Indicators
Small, circular "pips" for status. Active relays use a soft emerald glow, while down relays use a flat muted crimson. Statuses should always be accompanied by a text label for accessibility.

### Relay Lists
Lists use subtle horizontal dividers rather than boxes. Row-hover states should be a very pale gray (#F8FAFC) to provide a "track" for the user's eyes without being jarring.

### Chips & Tags
Used for filtering and metadata. They feature a light gray background with Slate-700 text and the "Soft" (4px) corner radius.