# In-Site Plugin Demo Video Modal

A responsive, high-fidelity cinematic theater modal enabling visitors to watch Minecraft plugin demonstration videos directly on the portfolio website without leaving the page.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX decisions were confirmed during clarification:
> - **Modal Trigger**: Triggered via both a dedicated "Watch on Site" button in the project card actions and by directly clicking the video preview container on each card.
> - **Modal Experience**: Cinematic theater lightbox presenting an unobstructed 16:9 responsive YouTube player, accompanied by the plugin title, platform tag, and quick external links (YouTube, GitHub, SpigotMC, Hangar).
> - **Multi-Device Responsiveness**: Fully responsive overlay adapting seamlessly from compact mobile viewports to ultra-wide desktop monitors with strict aspect-ratio enforcement.

---

## 1. Overview & Core Concept

- **What It Does**: Allows visitors to launch and watch plugin video showcases directly in a dark-themed, theater-style lightbox overlay. Users can interact with the video in full resolution and follow direct resource links while remaining immersed in the portfolio.
- **Target Audience**: Minecraft server owners, network administrators, and developers reviewing plugin mechanics, TPS efficiency, and gameplay systems.
- **Key Value**: Eliminates external tab-switching friction and provides a high-retention, focused viewing experience across mobile, tablet, and desktop devices.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Discovery & Trigger**:
   - On the "Featured Systems & Production Plugins" grid, each card features a prominent **"Watch on Site"** button alongside the existing action buttons.
   - Hovering over the card video container displays an obsidian overlay with a play glyph and `CLICK TO EXPAND` hint.
2. **Modal Launch**:
   - Clicking either the "Watch on Site" button or the card video container immediately opens the modal with a smooth fade and subtle scale-up transition (`duration-200`).
   - Background scroll is locked (`overflow: hidden` on `document.body`) to prevent background jump.
3. **Theater Viewing**:
   - **Header Bar**: Displays the plugin title in bold crisp typography, the target platform (e.g. `Paper 1.20+`, `Purpur / Spigot`, `Folia Ready`), and a prominent high-contrast close button (`✕` with `[ESC]` badge).
   - **Video Stage**: Rigid 16:9 container with YouTube nocookie embed initialized with autoplay (`?autoplay=1&rel=0&modestbranding=1`).
   - **Action Bar**: Bottom tray providing direct external links to YouTube, GitHub (if open-source), SpigotMC, and Paper Hangar.
4. **Dismissal**:
   - The modal can be closed via the close button, pressing the `ESC` key, or clicking the semi-transparent backdrop (`bg-black/85 backdrop-blur-md`).
   - When closed, the video unmounts cleanly to stop audio playback immediately.

### Visual Identity & Theme

- **Aesthetic**: Obsidian terminal / cyberpunk Minecraft developer palette (`#030e20`, `#0B1F38`, `#142032`, `#67E8F9`, `#00b954`).
- **Typography**: Display font for titles, `JetBrains Mono` for platform badges, action buttons, and keyboard shortcut indicators.
- **Geometry & Spatial Math**:
  - Max container width: `max-w-4xl` (960px) on desktop, scaling smoothly down to 100% width minus padding on mobile.
  - Video aspect ratio: strict `aspect-video` (16:9) preventing layout distortion or black bars.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Direct Video Click & Action Button Dual-Affordance**
  - *Chosen Approach*: Wire both the video preview container and a dedicated action button on each card.
  - *Why*: Provides immediate visual affordance for both power users clicking media and casual users looking for labelled buttons.
- **Decision 2: Body Scroll Lock & Lifecycle Cleanup**
  - *Chosen Approach*: Manage body overflow via a `useEffect` hook in React (and DOM class toggle in standalone HTML), alongside unmounting the iframe on modal close.
  - *Why*: Eliminates background page jumping on mobile touch devices and prevents phantom video audio from continuing to play after dismissal.
- **Decision 3: Standalone Mirroring**
  - *Chosen Approach*: Implement the modal in both `src/App.tsx` and `public/standalone-landing.html`.
  - *Why*: Ensures the single-file offline distribution remains 100% feature-complete with the React SPA.

---

## 4. Technical Architecture & Component Mapping

```
┌────────────────────────────────────────────────────────┐
│                   App.tsx (Root State)                 │
│  activeModalProject: ProjectDetails | null             │
└────────────┬───────────────────────────────┬───────────┘
             │                               │
             ▼                               ▼
┌─────────────────────────┐     ┌────────────────────────┐
│ Project Showcase Cards  │     │   PluginVideoModal     │
│ - Preview click handler │     │ - Backdrop blur & lock │
│ - "Watch on Site" button│────▶│ - Top title/ESC bar    │
│ - External resource links│    │ - 16:9 Iframe Stage    │
└─────────────────────────┘     │ - Bottom action grid   │
                                └────────────────────────┘
```

### State & Event Handlers

- `activeModalProject`: `ProjectDetails | null` state tracking which plugin is currently presented in the modal.
- `openModal(project: ProjectDetails)`: Sets active project, locks body scroll.
- `closeModal()`: Resets active project to `null`, unlocks body scroll, unmounts YouTube iframe.
- `handleKeyDown(e: KeyboardEvent)`: Listens for `Escape` key to dismiss modal.

---

## 5. Verification Plan

1. **Compilation & Syntax**: Run `compile_applet` and `lint_applet` to ensure zero build errors or TypeScript issues.
2. **Interactive Testing**:
   - Open modal for each of the 3 featured plugins (Parkour, Custom Enchants, Folia Minigames).
   - Test dismissal via close button, backdrop click, and `ESC` key.
   - Verify audio immediately stops upon dismissal.
   - Verify all external action links (YouTube, GitHub, Spigot, Hangar) inside the modal open correctly in new tabs.
3. **Responsiveness Audit**: Verify modal layout, margins, and video scaling on mobile (375px), tablet (768px), and desktop (1440px).
4. **Unit Tests**: Run `npx tsx --test src/utils/formValidation.test.ts` to ensure regression safety.
