# Dynamic Hero Video Background & High-Impact Bat Flock Scaling

This plan outlines the architecture and execution strategy to transform the Hero section into a dynamic, cinematic experience with an ambient looping Minecraft video background (complete with audio/playback toggles and instant poster fallback) and scale the animated bats to 2x–3x their current size, distributing a flock of 6–8 bats across multiple elevation depths and flight patterns.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during the interactive Phase 1 consultation:

- **Hero Video Background**: Configured as an ambient cinematic Minecraft loop with a high-fidelity poster image fallback and interactive overlay controls (Mute/Unmute, Pause/Play, and status badge).
- **Bat Scale & Distribution**: Bats are expanded from 56–72px to prominent 110–180px silhouettes (2x to 3x larger), organized into a flock of 7 bats traversing different depths (foreground, mid-ground, and background altitudes) with natural horizontal direction flipping (`scaleX(-1)`) and swooping flight keyframes.

---

### 1. Overview & Core Concept

- **What It Does**: Upgrades the visual presence of the WP Voxel landing page by replacing the static hero canvas with a rich, looping cinematic Minecraft world video and enlivening the nocturnal starry portfolio background with a noticeable, atmospheric swarm of flying bats.
- **Target Audience**: Server owners, network managers, and Minecraft studio directors evaluating custom plugin engineering and network performance.
- **Key Value**: Delivers immediate visual immersion and dynamic energy while maintaining strict WCAG AA text legibility and zero main-thread CPU drag.

---

### 2. User Experience & Visual Design

#### A. Hero Video Architecture & Controls
- **Background Layering**:
  - `video` element with attributes: `autoPlay`, `loop`, `muted`, `playsInline`, and `poster={ASSETS.heroWallpaper}`.
  - Multi-stop darkness scrim: `linear-gradient` from `rgba(7, 20, 38, 0.85)` to `rgba(7, 20, 38, 0.95)` with radial photon glow and subtle voxel grid lines to ensure all hero typography and metrics exceed 4.5:1 contrast.
  - Ambient video controls widget positioned subtly in the bottom-right of the hero:
    - **Play / Pause** toggle with live icon indicator.
    - **Audio Mute / Unmute** toggle (starts muted by default to adhere to browser autoplay policies).
    - Status pill: `[Cinematic 1080p Loop]`.
  - Seamless fallback: If the video fails or is delayed, the high-resolution static landscape wallpaper seamlessly displays without layout shift.

#### B. Nocturnal Bat Flock Scaling & Distribution
- **Scale Increase**:
  - Small bats: 110px $\times$ 110px (was ~56px).
  - Medium bats: 140px $\times$ 140px (was ~64px).
  - Large foreground bats: 180px $\times$ 180px (was ~72px).
- **Flock Distribution (7 Staggered Trajectories)**:
  1. *Bat Alpha (High Altitude, Left-to-Right)*: 140px, speed 15s, upper canopy path.
  2. *Bat Beta (Upper-Mid, Right-to-Left)*: 120px, speed 19s, delay 2s, sweeping dive.
  3. *Bat Gamma (Foreground Lead, Left-to-Right)*: 180px, speed 13s, delay 5s, deep swoop with enhanced drop-shadow.
  4. *Bat Delta (Mid-Depth, Left-to-Right)*: 110px, speed 17s, delay 7s, erratic flutter.
  5. *Bat Epsilon (Center-Flock, Right-to-Left)*: 160px, speed 14s, delay 9s, diving cross-screen.
  6. *Bat Zeta (Lower-Mid, Left-to-Right)*: 130px, speed 21s, delay 4s, slow cruising speed.
  7. *Bat Eta (Low Horizon, Right-to-Left)*: 150px, speed 16s, delay 11s, low skimming flight.
- **Flight Motion Enhancements**:
  - Horizontal flipping (`scaleX(-1)` vs `scaleX(1)`) according to travel vector.
  - Organic wing wobble and vertical swoops via composited CSS `@keyframes`.
  - `pointer-events-none` ensuring zero interference with cards or interactive project links.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: HTML5 Native `<video>` vs. YouTube iFrame**
  - *Chosen Approach*: Native HTML5 `<video>` using direct streaming video format with static poster fallback.
  - *Why*: Eliminates heavy third-party YouTube branding, cookie trackers, and iframe security overhead. Enables instant start and programmatic mute/play control.
- **Decision 2: Pure CSS Keyframe Animation vs. Canvas Sprite Simulation**
  - *Chosen Approach*: Pure CSS 3D hardware-accelerated animations (`translate3d`, `rotate`, `scale`).
  - *Why*: Zero JavaScript tick overhead on the main thread, 60fps hardware acceleration, and full responsiveness across mobile, tablet, and ultra-wide displays.

---

### 4. Technical Architecture & Component Flow

```
┌─────────────────────────────────────────────────────────────┐
│                       Hero Section                          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ HTML5 Looping Cinematic Video (Poster Image Fallback) │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Multi-tier Contrast Scrims (Navy Gradient + Glow)     │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────┐ ┌───────────────────┐  │
│  │ Hero Content (H1, CTA, Metrics) │ │ Minecraft Rig 3D  │  │
│  └─────────────────────────────────┘ └───────────────────┘  │
│                                      [Play/Mute Control]    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Featured Projects Section                   │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Starry Night Sky Horizon + Dark Mountain Vignette     │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 7 Scaled Bats Flock (110px-180px) Multi-Path Flight   │  │
│  │ (Compositor-only transforms: translate3d + scaleX)    │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 3-Column Architectural Project Cards & Inspector      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 5. Verification & Testing Strategy

1. **Functional Unit Tests**: Run `npx --yes tsx --test src/utils/formValidation.test.ts` to ensure zero regressions in existing logic.
2. **Visual & Responsive Verification via Playwright**:
   - Verify video autoplay behavior, poster loading, and play/pause/mute toggle functionality.
   - Verify that all 7 bats render at 2x–3x size and traverse across desktop (`1440x900`) and mobile (`390x844`) without horizontal overflow or clipping.
   - Verify standalone HTML file (`public/standalone-landing.html`) reflects identical video and bat upgrades.
