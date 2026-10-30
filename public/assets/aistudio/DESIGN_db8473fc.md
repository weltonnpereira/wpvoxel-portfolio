---
name: Voxel Runtime Architecture
colors:
  surface: '#071426'
  surface-dim: '#071426'
  surface-bright: '#2e3a4d'
  surface-container-lowest: '#030e20'
  surface-container-low: '#0f1c2e'
  surface-container: '#142032'
  surface-container-high: '#1e2a3d'
  surface-container-highest: '#293549'
  on-surface: '#d7e3fc'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#d7e3fc'
  inverse-on-surface: '#253144'
  outline: '#859399'
  outline-variant: '#3c494e'
  surface-tint: '#47d6ff'
  primary: '#a5e7ff'
  on-primary: '#003543'
  primary-container: '#00d2ff'
  on-primary-container: '#00566a'
  inverse-primary: '#00677f'
  secondary: '#4ae176'
  on-secondary: '#003915'
  secondary-container: '#00b954'
  on-secondary-container: '#004119'
  tertiary: '#edd4ff'
  on-tertiary: '#490080'
  tertiary-container: '#dab1ff'
  on-tertiary-container: '#730dc2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b6ebff'
  primary-fixed-dim: '#47d6ff'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004e60'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#f0dbff'
  tertiary-fixed-dim: '#ddb7ff'
  on-tertiary-fixed: '#2c0051'
  on-tertiary-fixed-variant: '#6900b3'
  background: '#071426'
  on-background: '#d7e3fc'
  surface-variant: '#293549'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  telemetry-headline:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 22px
  telemetry-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  badge-label:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

### Brand Personality & Philosophy
The design system embodies high-throughput backend infrastructure merged with the iconic volumetric geometry of Minecraft voxel worlds. It communicates hyper-optimization, zero-garbage-collection latency, low-level JVM precision, and production-grade stability. The visual persona is that of a senior systems architect: disciplined, exact, technically transparent, and uncompromising on performance.

### Target Audience
Enterprise server network owners, competitive Minecraft network leads, studio directors, and high-concurrency platform developers who prioritize tick stability (20.0 TPS), multithreaded runtime safety (Folia-ready architectures), and bespoke game mechanics over generic plugins.

### Emotional Response
The interface must inspire absolute technical confidence, elite engineering rigor, and nostalgic immersion. It contrasts deep midnight voids with neon cyan pulses, glowing runtime telemetry, and subtle animated ambient pixel entities (floating Allays), creating an atmosphere that feels like an advanced systems monitoring suite fused with volumetric game design.

### Design Movement & Aesthetic
- **High-Performance Dark Terminal / Voxel Futurism:** Precision HUD aesthetics with monospaced telemetry, sharp modular segmenting, and translucent midnight surfaces.
- **Glassmorphic Volumetric Layering:** Deep Navy base tones layered with frosted runtime containers, 1px sub-surface borders (`rgba(255, 255, 255, 0.08)`), and directional cyan photon glows (`#00d2ff`).
- **Tactile Grid Instrumentation:** Monospaced data readouts, status pills, SLA turnaround meters, and terminal consoles mimicking active IDE/JVM states.

## Colors

### Palette Architecture
The palette is rooted in an ultra-deep midnight voxel hierarchy, accented by functional signals that convey system states, runtime health, and architectural layers.

#### Structural Surfaces & Canvas
- **Surface Base (`#071426`):** Midnight Voxel Navy canvas; anchors the viewports and background blends.
- **Surface Lowest (`#030e20`):** Deep abyssal backing used for terminal bodies, code canvases, and nested telemetry blocks.
- **Surface Low (`#0f1c2e`):** Resting state for cards, secondary toolbars, and inactive panels.
- **Surface Container (`#142238`):** Elevated card tiers, modular containers, modal sheets, and form surfaces.
- **Surface Bright / Elevated (`#2e3a4d`):** Hover states, active tabs, floating popovers, and high-focus borders.

#### Signal Accents & Brand Energy
- **Accent Cyan (`#00d2ff` / `#38bdf8`):** Primary action vector, interactive focus outlines, primary button backgrounds, and bioluminescent photon flares.
- **TPS Stability Green (`#22c55e` / `#10b981`):** Represents optimal tickrate (20.0 TPS), health metrics, verified SLAs, and active thread states.
- **Arcane Purple (`#a855f7`):** Marks async computation, custom NMS/bytecode injection layers, and Folia multithreading badges.
- **Redstone Ruby (`#e11d48` / `#ef4444`):** Denotes GC pressure warnings, critical thread alerts, destructive actions, and latency spikes.

#### Text & Visual Hierarchy
- **Text Primary (`#ffffff`):** Uncompromised high-contrast headlines, primary metrics, and active states.
- **Text Secondary (`rgba(255, 255, 255, 0.70)`): Body context, technical descriptions, and passive labels.
- **Text Muted / Mono (`rgba(255, 255, 255, 0.45)`): Code telemetry, terminal line counters, timestamp annotations, and inactive paths.
- **Borders & Dividers (`rgba(255, 255, 255, 0.08)`): Base hairpins across all containers, dynamically amplified to `rgba(0, 210, 255, 0.40)` on hover.

## Typography

### Structural Pairings & Hierarchy
- **Primary Display & Body (`Space Grotesk`):** Chosen for its technical geometry, sharp aperture cuts, and balanced modern proportions. Powers all promotional headings, conversational UI bubbles, service descriptions, and primary body content.
- **Runtime Telemetry & Code (`JetBrains Mono`):** Engineered for developers. Provides explicit character disambiguation, monospaced tabular alignment for real-time counters (TPS, tick timings, thread execution times), terminal code displays (`VoxelCore.kt`), and system badges.

### Responsive Scaling Rules
- Font sizes exceeding 32px automatically compress via mobile-specific styles (`display-hero-mobile`, `headline-xl-mobile`).
- Monospaced badges retain fixed pixel bounds with horizontal scroll guards on constrained viewports to prevent line-wrapping technical identifiers.

## Layout & Spacing

### Layout Architecture
- **Grid Structure:** Desktop layouts conform to a 12-column fluid grid system bounded by a max-width container of `1280px`. Tablet transitions to an 8-column grid (`768px` - `1024px`), and mobile collapses to a 4-column column flow (`<768px`).
- **Telemetry Bar Layout:** Four-metric horizontal shelf spanning the hero base. On mobile, this transforms into a 2x2 grid with centered dividers.
- **Featured Systems & Services:** Balanced 3-column modular layouts collapsing to single columns under `840px`.
- **Milestone Process:** 4-column connected node pipeline with horizontal directional lines on desktop, converting to a vertical linear timeline with node connectors on mobile.

### Section Spacing Cadence
- Major vertical sections are separated by `space-3xl` (96px) on desktop and `space-2xl` (64px) on mobile.
- Cards enforce interior structural padding of `space-lg` (24px).
- Internal element gaps (badges, title-to-body, buttons) adhere strictly to `space-xs` through `space-md`.

## Elevation & Depth

### Volumetric Stacking Philosophy
Depth is created without heavy drop shadows; visual hierarchy relies instead on layered midnight surface tones, translucent glassmorphic backdrops, and cyan photon glows.

### Elevation Levels
- **Tier 0 (Canvas Base):** `#071426` with subtle dark radial gradients blending downward into subsequent sections.
- **Tier 1 (Resting Modular Surfaces):** `#0f1c2e` filled at `85%` opacity with `backdrop-filter: blur(12px)`. Enclosed by a crisp 1px stroke of `rgba(255, 255, 255, 0.08)`.
- **Tier 2 (Elevated & Active Surfaces):** `#142238` filled at `95%` opacity. Used for terminal windows, modals, active inputs, and elevated cards. Border: `rgba(255, 255, 255, 0.12)`.
- **Tier 3 (Cyan Photon Radiance / Hover Focus):** Elements at this tier emit a dual-layer glow:
  - Outer: `0 0 24px -4px rgba(0, 210, 255, 0.35)`
  - Inner / Edge: `inset 0 0 0 1px rgba(0, 210, 255, 0.60)`
- **Tier 4 (Floating Ambient Entities):** Dedicated visual planes for floating Allay sprites and tooltips utilizing zero base shadows, relying purely on animated canvas transforms and CSS floating keyframes.

## Shapes

### Geometry & Edge Philosophy
The shape language uses controlled, soft geometry (`roundedness: 1`). Radii stay tight and structured, preserving the voxel-inspired aesthetic while remaining contemporary and refined.

- **Base Components (Cards, Panels, Terminals):** `0.5rem` (8px) border radius.
- **Buttons, Inputs, & Form Fields:** `0.375rem` (6px) border radius.
- **Status Pills, Architectural Tags, SLA Badges:** `9999px` (full pill) or `0.25rem` (4px) block tags depending on system context.
- **Speech Bubble (`Hey, I'm WP!`):** `0.5rem` (8px) with a directional voxel tail polygon pointing down-left toward the avatar.

## Components

### 1. Navigation Header
- **Container:** Glassmorphic bar with `backdrop-filter: blur(16px)`, background `rgba(7, 20, 38, 0.85)`, and border bottom `1px solid rgba(255, 255, 255, 0.08)`.
- **Left:** High-resolution Voxel emblem paired with monospaced logotype.
- **Status Indicator:** Pill container with green pulse animation (`#22c55e`), displaying `20.0 TPS | PRODUCTION READY`.
- **Nav Links:** `Space Grotesk` regular, color `rgba(255, 255, 255, 0.70)`, transitioning to `#00d2ff` on hover.
- **Primary CTA:** "Let's Talk" button with cyan gradient fill and hover glow. No user login or avatar elements.

### 2. Hero Telemetry Shelf
- A 4-slot grid containing real-time performance indicators:
  1. `20.0 TPS` (Stability Green indicator)
  2. `Java 17/21 & Kotlin` (Architecture indicator)
  3. `Async Threads` (Folia/Concurrent indicator)
  4. `0 Memory Leaks` (Garbage collection reliability indicator)
- **Voxel Avatar Presentation:** Voxel developer character positioned adjacent to an interactive speech bubble reading `"Hey, I'm WP!"` coupled with a live status tag: `VoxelCore::ready()`.

### 3. Featured Systems Cards (3-Column)
- **Header:** Platform compatibility flags (`Paper 1.20+`, `Purpur / Spigot`, `Folia Ready`).
- **Body:** System title, performance benchmarks, and architecture feature tags.
- **Interactive Code Previews:** Nested monospaced syntax blocks displaying API hooks and event listeners.
- **Actions:** "Inspect Architecture" and live interactive demo triggers.

### 4. Service Matrix (Numbered 3-Column)
- Numbered node layout (`01`, `02`, `03`) with cyan gradient numerals.
- High-visibility SLA turnaround time tags (e.g., `SLA: 48-72h`, `SLA: 7-14 Days`).
- Bulleted technical capabilities paired with custom checkmark indicators.

### 5. Engineering Process Timeline (4-Phase Pathway)
- Horizontal step path: `01 Understand` &rarr; `02 Plan` &rarr; `03 Build` &rarr; `04 Deliver`.
- Connected by dotted neon transit lines that illuminate sequentially on scroll.

### 6. Terminal & Bio Console
- **Terminal Window Header:** Three macOS-style window dots styled in midnight voxel tones, file title `VoxelCore.kt`.
- **Embedded Telemetry:** Tick Reliability readout locked at `99.98%`.
- **Verification Guarantee:** Monospaced checklist with green checkmark glyphs affirming thread safety, zero reflection overhead, and strict garbage collector optimization.

### 7. Interactive Allays & Direct Contact Section
- **Ambient Animated Allays:** Floating vector/pixel Allay entities traversing horizontally across the contact canvas, dynamically flipping (`scaleX(-1)`) upon path reversal.
- **Direct Discord Hook:** Direct connection component showing user ID (`https://discord.com/users/291955215446441984`), verified badge, and one-click ID tag copy button with active visual feedback (`Copied!`).
- **Commission Dispatch Form:** Dark inputs with `#030e20` background, `rgba(255, 255, 255, 0.1)` border, focusing to `#00d2ff` with a glowing shadow.

### 8. Footer
- Minimal three-column architecture index: Navigation, Ecosystem, and Direct Links.
- Prominent legal disclaimer: *"Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft."*