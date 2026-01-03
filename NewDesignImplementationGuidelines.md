# MOZAIK Split-Screen Hero: Complete Implementation Brief for Roocode Agent

---

## CONTEXT DOCUMENT FOR IMPLEMENTATION AGENT

You are about to implement a critical feature for the MOZAIC digital agency website. This document contains everything you need to understand the project, the existing codebase, and exactly what needs to be built.

**Read this entire document before writing any code.**

---

## SECTION 1: PROJECT OVERVIEW

### 1.1 What is MOZAIC?

MOZAIK is a digital & creative studio with two core divisions:

| Division | Name | Focus | Team Lead |
|----------|------|-------|-----------|
| **Left** | MOZAIC STUDIO | Creative services (AI content, brand films, motion graphics) | Tawfik |
| **Right** | MOZAIC TECH | Technical services (web dev, software, cloud, AI automation) | Oussama & Med Amine |

The brand name comes from "mosaic" — multiple pieces coming together to form a complete picture. **This split-screen implementation is the literal visual representation of this brand concept.**

### 1.2 Design Language

The website uses a design system called **"Technical Brutalism"** or **"Cyber-Industrial"**:

| Element | Specification |
|---------|---------------|
| **Base palette** | Pure Black (`#000000`) and Pure White (`#FFFFFF`) |
| **Accent colors** | Red (`#FF0000`), Green (`#00FF00`), Blue (`#0000FF`) |
| **Typography** | Inter (headlines), Monospace (labels/data) |
| **Visual motifs** | Corner brackets, crosshairs, HUD elements, system status indicators |
| **Feel** | Like a tactical interface or system terminal, not a traditional webpage |

### 1.3 Tech Stack

```
Framework:      Next.js 16 (App Router)
Language:       TypeScript (strict mode)
Styling:        Tailwind CSS v4 + Shadcn/ui
Animation:      Framer Motion
WebGL:          Unicorn Studio (CDN injection)
Icons:          Lucide React
```

---

## SECTION 2: CURRENT HERO IMPLEMENTATION

### 2.1 File Location

```
components/mozaic-hero.tsx
```

### 2.2 Current Structure

The existing hero is a **single full-viewport section** with the following layers:

```
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 0: Background                                            │
│  ├── Desktop: WebGL Canvas (Unicorn Studio fluid effect)        │
│  └── Mobile: CSS Starfield fallback                             │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 1: HUD Frame (Fixed Overlays)                            │
│  ├── Top Bar: Logo + Navigation                                 │
│  ├── Corner Brackets: Green (TL/BR) + Red (TR/BL)               │
│  └── Bottom Status Bar: "SYSTEM.ACTIVE" + status indicators     │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 2: Content (Right-aligned, 50% width on desktop)         │
│  ├── Decorators: Green infinity symbol + hairline               │
│  ├── Headline: "COMPLETE DIGITAL SYSTEMS."                      │
│  ├── Tech accents: Red dots row, green square target            │
│  ├── Action buttons: Primary (red solid) + Secondary (outline)  │
│  └── Stats footer: 3 columns with color-coded bullets           │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Key Implementation Details of Current Hero

**Background handling:**
- Desktop: Unicorn Studio WebGL canvas injected via `useEffect`
- Mobile: Pure CSS `.stars-bg` using `radial-gradient` layers
- Dither overlay: CSS pattern for retro texture

**Styling approach:**
- 95% Tailwind CSS utilities
- `<style jsx>` for complex gradients/patterns
- Responsive breakpoint at `lg:` (1024px)

**Content positioning:**
- Main content uses `flex justify-end`
- Content occupies right 50% on desktop
- Left 50% is negative space showing background

---

## SECTION 3: WHAT WE ARE BUILDING

### 3.1 The Goal

Transform the single hero into a **split-screen hero** where:

- **Left panel** = MOZAIC STUDIO (Creative division)
- **Right panel** = MOZAIC TECH (Technical division)

Both panels share the same visual language but with different accent colors and content.

### 3.2 Final Visual State (After Animation)

```
┌─────────────────────────────────────────────────────────────────┐
│                     SHARED TOP BAR                              │
│  Logo | EST. 2026                    SERVICES | WORK | TEAM     │
├───────────────────────────┬─────────────────────────────────────┤
│                           │                                     │
│   ┌─ Green corners        │        Blue corners ─┐              │
│   │                       │                      │              │
│   │   MOZAIC              │              MOZAIC  │              │
│   │   STUDIO              │                TECH  │              │
│   │                       │                      │              │
│   │   Full-stack          │          Full-stack  │              │
│   │   Creative            │           Technical  │              │
│   │   Systems             │             Systems  │              │
│   │                       │                      │              │
│   │   CREATIVE.ACTIVE     │     SYSTEMS.ONLINE   │              │
│   │                       │                      │              │
│   │   [EXPLORE STUDIO]    │      [EXPLORE TECH]  │              │
│   │        (RED)          │           (BLUE)     │              │
│   │                       │                      │              │
│   └─                      │                     ─┘              │
│                           │                                     │
│      Red accent glow      │         Blue accent glow            │
│                           │                                     │
├───────────────────────────┴─────────────────────────────────────┤
│                     SHARED BOTTOM BAR                           │
│  SYSTEM.ACTIVE ████▌██                     ● ● ● RENDERING      │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Color Mapping

| Element | STUDIO (Left Panel) | TECH (Right Panel) |
|---------|--------------------|--------------------|
| **Primary accent** | `#FF0000` (Red) | `#0000FF` (Blue) |
| **Corner brackets** | Green + Red | Green + Blue |
| **Primary button** | Red solid | Blue solid |
| **Status indicator** | `CREATIVE.ACTIVE` | `SYSTEMS.ONLINE` |
| **Decorative elements** | Red dots, red accents | Blue dots, blue accents |

---

## SECTION 4: ANIMATION SPECIFICATION

### 4.1 Animation Type

**Split-screen reveal with opposing left/right entrance animations triggered on initial load.**

This is a **one-time entrance animation** that runs when the page first loads.

### 4.2 Animation Timeline

```
INITIAL STATE (Before Animation):
─────────────────────────────────
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                     VIEWPORT (empty/black)                      │
│                                                                 │
│  ◀━━ LEFT PANEL                         RIGHT PANEL ━━▶        │
│      off-screen                          off-screen             │
│      translateX: -100%                   translateX: +100%      │
│      opacity: 0                          opacity: 0             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘


ANIMATION PHASE (0ms → 800ms):
──────────────────────────────
Timeline:
  0ms     → Panels begin moving
  100ms   → Opacity ramps up (panels become visible)
  400ms   → Panels at ~70% of journey (fast initial movement)
  700ms   → Panels approaching final position (decelerating)
  800ms   → Panels lock into final position (soft landing)

Movement: Transform-based (translateX), NOT position-based
Easing:   cubic-bezier(0.16, 1, 0.3, 1)  // "expo-out" feel
          Fast start, soft landing


SETTLED STATE (After Animation):
────────────────────────────────
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────┬───────────────────────────┐       │
│  │                         │                           │       │
│  │      LEFT PANEL         │       RIGHT PANEL         │       │
│  │      (50% width)        │       (50% width)         │       │
│  │      translateX: 0      │       translateX: 0       │       │
│  │      opacity: 1         │       opacity: 1          │       │
│  │                         │                           │       │
│  └─────────────────────────┴───────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Framer Motion Implementation Pattern

```typescript
// LEFT PANEL
<motion.div
  className="left-panel"
  initial={{ x: "-100%", opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ 
    duration: 0.8, 
    ease: [0.16, 1, 0.3, 1] // expo-out
  }}
>
  <StudioContent />
</motion.div>

// RIGHT PANEL
<motion.div
  className="right-panel"
  initial={{ x: "100%", opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ 
    duration: 0.8, 
    ease: [0.16, 1, 0.3, 1] // expo-out
  }}
>
  <TechContent />
</motion.div>
```

---

## SECTION 5: HOVER BEHAVIOR SPECIFICATION

### 5.1 Hover Effect: Expand (No Dim)

When user hovers over a panel, that panel expands slightly. The other panel contracts but does NOT dim.

```
DEFAULT STATE:
┌─────────────────────────┬─────────────────────────┐
│                         │                         │
│          50%            │          50%            │
│                         │                         │
└─────────────────────────┴─────────────────────────┘

HOVER LEFT:
┌───────────────────────────────┬───────────────────┐
│                               │                   │
│            60%                │        40%        │
│         (expanded)            │    (contracted)   │
│                               │                   │
└───────────────────────────────┴───────────────────┘

HOVER RIGHT:
┌───────────────────┬───────────────────────────────┐
│                   │                               │
│        40%        │            60%                │
│    (contracted)   │         (expanded)            │
│                   │                               │
└───────────────────┴───────────────────────────────┘
```

### 5.2 Implementation Pattern

```typescript
// Using CSS flex with transition
// OR Framer Motion variants

const [hoveredPanel, setHoveredPanel] = useState<'left' | 'right' | null>(null);

// Panel flex values
const getFlexValue = (panel: 'left' | 'right') => {
  if (hoveredPanel === null) return 1;        // 50/50
  if (hoveredPanel === panel) return 1.5;     // 60% (expanded)
  return 0.7;                                  // 40% (contracted)
};
```

Transition timing: `300ms ease-out`

---

## SECTION 6: CLICK BEHAVIOR SPECIFICATION

### 6.1 Full Takeover on Click

When user clicks "EXPLORE STUDIO" or "EXPLORE TECH", the selected panel expands to 100% width and the other panel slides out.

```
USER CLICKS [EXPLORE STUDIO]:

┌─────────────────────────┬─────────────────────────┐
│                         │                         │
│      STUDIO             │         TECH            │
│                         │                         │
└─────────────────────────┴─────────────────────────┘
                    │
                    ▼ (animation ~500ms)
                    
┌─────────────────────────────────────────────────────┐
│                                                     │
│                    STUDIO (100%)                    │
│                                                     │
│   Right panel has slid out to translateX: +100%    │
│                                                     │
│   [← BACK]                        [GO TO TECH →]   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 6.2 State Management

```typescript
type ViewState = 'split' | 'studio' | 'tech';

const [viewState, setViewState] = useState<ViewState>('split');

// Transitions:
// 'split' → 'studio': Left expands, Right slides out right
// 'split' → 'tech': Right expands, Left slides out left
// 'studio' → 'split': Right slides back in
// 'tech' → 'split': Left slides back in
// 'studio' → 'tech': Cross-fade or slide transition
// 'tech' → 'studio': Cross-fade or slide transition
```

### 6.3 Navigation in Expanded State

When in expanded state, provide:
- Back button to return to split view
- Direct link to other side (optional)

```
EXPANDED STUDIO VIEW:
┌─────────────────────────────────────────────────────┐
│  [← BACK TO SPLIT]              [MOZAIC TECH →]    │
│─────────────────────────────────────────────────────│
│                                                     │
│                 STUDIO CONTENT                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## SECTION 7: MOBILE BEHAVIOR SPECIFICATION

### 7.1 Mobile Layout (Same Split Concept)

On mobile, maintain the split but stack vertically:

```
MOBILE DEFAULT:
┌─────────────────────────┐
│                         │
│   STUDIO (50vh)         │
│                         │
│   [TAP TO EXPLORE]      │
│                         │
├─────────────────────────┤
│                         │
│   TECH (50vh)           │
│                         │
│   [TAP TO EXPLORE]      │
│                         │
└─────────────────────────┘
```

### 7.2 Mobile Expansion

Tap or swipe expands the selected section:

```
USER TAPS STUDIO:
┌─────────────────────────┐
│                         │
│                         │
│   STUDIO (100vh)        │
│                         │
│   [← BACK]              │
│                         │
│                         │
└─────────────────────────┘

TECH section is now off-screen below (translateY: 100%)
```

### 7.3 Mobile Animation

- Use `translateY` instead of `translateX` for vertical stacking
- Same easing and duration as desktop
- Entrance: Top slides from top, Bottom slides from bottom

---

## SECTION 8: SHARED ELEMENTS

### 8.1 Elements That Remain Constant

These elements should NOT be part of the split panels. They exist in a shared layer:

```
SHARED LAYER (z-index above panels):
├── Top Navigation Bar
│   ├── Logo (left)
│   ├── EST. 2026 (left)
│   └── NAV LINKS (right): SERVICES | WORK | TEAM
│
├── Bottom Status Bar  
│   ├── SYSTEM.ACTIVE + graph (left)
│   └── RENDERING + dots (right)
│
└── WebGL Background Canvas (z-index below panels)
    └── Single shared canvas for both panels
```

### 8.2 Visual Divider

A subtle vertical line or gap between panels:

```
Options:
1. 1px white line at 10% opacity
2. 2-4px gap showing background through
3. No visible divider (panels touch)

Recommendation: 2px gap showing WebGL background
```

---

## SECTION 9: COMPONENT ARCHITECTURE

### 9.1 Proposed File Structure

```
components/
├── split-hero/
│   ├── split-hero.tsx          # Main orchestrator component
│   ├── split-hero-panel.tsx    # Reusable panel wrapper (handles animation)
│   ├── studio-content.tsx      # Left panel content
│   ├── tech-content.tsx        # Right panel content
│   └── shared-elements.tsx     # Top bar, bottom bar, background
│
├── mozaic-hero.tsx             # KEEP THIS - Original hero for reference
│
└── ui/
    └── ... (existing shadcn components)
```

### 9.2 Component Hierarchy

```tsx
<SplitHero>
  {/* Shared background - single WebGL canvas */}
  <SharedBackground />
  
  {/* Shared top navigation */}
  <SharedTopBar />
  
  {/* The two panels */}
  <PanelContainer>
    <SplitHeroPanel 
      side="left" 
      accentColor="red"
      isExpanded={viewState === 'studio'}
      isHidden={viewState === 'tech'}
    >
      <StudioContent />
    </SplitHeroPanel>
    
    <SplitHeroPanel 
      side="right" 
      accentColor="blue"
      isExpanded={viewState === 'tech'}
      isHidden={viewState === 'studio'}
    >
      <TechContent />
    </SplitHeroPanel>
  </PanelContainer>
  
  {/* Shared bottom status bar */}
  <SharedBottomBar />
</SplitHero>
```

### 9.3 Props Interface

```typescript
interface SplitHeroPanelProps {
  side: 'left' | 'right';
  accentColor: 'red' | 'blue';
  isExpanded: boolean;
  isHidden: boolean;
  onHover: () => void;
  onHoverEnd: () => void;
  onExpand: () => void;
  children: React.ReactNode;
}

interface SplitHeroState {
  viewState: 'split' | 'studio' | 'tech';
  hoveredPanel: 'left' | 'right' | null;
  hasAnimated: boolean; // Tracks if entrance animation has played
}
```

---

## SECTION 10: CONTENT SPECIFICATION

### 10.1 Left Panel (STUDIO) Content

```
DECORATORS:
- Red infinity symbol (∞) + hairline (matching current hero)

HEADLINE:
- "MOZAIC" (smaller, tracking-wider)
- "STUDIO" (large, bold)

SUBHEADLINE:
- "Full-stack Creative Systems"

DESCRIPTION:
- "AI-enhanced content. Brand films. Motion graphics. 
   Creative strategy that scales."

STATUS INDICATOR:
- "CREATIVE.ACTIVE" (green text, monospace)

TECH ACCENTS:
- Row of red dots
- Red corner brackets on content area

BUTTON:
- [EXPLORE STUDIO] - Red solid button with corner hover effect

MINI STATS (optional):
- "AI-FIRST" | "SCALABLE" | "MULTI-FORMAT"
```

### 10.2 Right Panel (TECH) Content

```
DECORATORS:
- Blue infinity symbol (∞) + hairline

HEADLINE:
- "MOZAIC" (smaller, tracking-wider)
- "TECH" (large, bold)

SUBHEADLINE:
- "Full-stack Technical Systems"

DESCRIPTION:
- "Web & software development. Cloud infrastructure. 
   AI automation. Systems that perform."

STATUS INDICATOR:
- "SYSTEMS.ONLINE" (green text, monospace)

TECH ACCENTS:
- Row of blue dots
- Blue corner brackets on content area

BUTTON:
- [EXPLORE TECH] - Blue solid button with corner hover effect

MINI STATS (optional):
- "SECURE" | "SCALABLE" | "PERFORMANT"
```

---

## SECTION 11: ACCESSIBILITY REQUIREMENTS

### 11.1 Reduced Motion

```typescript
// Check user preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// If true:
// - Skip entrance animation (panels start in final position)
// - Disable hover expansion
// - Use instant transitions for click expansion
```

### 11.2 Keyboard Navigation

```
TAB order:
1. Top nav links
2. Left panel [EXPLORE STUDIO] button
3. Right panel [EXPLORE TECH] button
4. Bottom bar elements (if interactive)

ENTER/SPACE on panel button → triggers expansion
ESC in expanded view → returns to split view
```

### 11.3 Screen Readers

```tsx
<section aria-label="Choose your MOZAIC experience">
  <div 
    role="region" 
    aria-label="MOZAIC Studio - Creative Services"
  >
    {/* Studio content */}
  </div>
  <div 
    role="region" 
    aria-label="MOZAIC Tech - Technical Services"
  >
    {/* Tech content */}
  </div>
</section>
```

### 11.4 No Layout Shift (CLS)

Critical requirement:
- Panels must be in the DOM from initial render
- Only `transform` and `opacity` should animate
- Never animate `width`, `height`, `left`, `right`
- Container dimensions must be fixed before animation

---

## SECTION 12: IMPLEMENTATION CHECKLIST

Before considering this feature complete, verify:

### Animation
- [ ] Entrance animation plays once on page load
- [ ] Left panel slides from left (-100% → 0)
- [ ] Right panel slides from right (+100% → 0)
- [ ] Both panels animate simultaneously
- [ ] Easing feels smooth (fast start, soft landing)
- [ ] Duration is 800ms
- [ ] Animation does not replay on route change/re-render

### Hover
- [ ] Hovering left expands left to ~60%
- [ ] Hovering right expands right to ~60%
- [ ] Other panel contracts to ~40%
- [ ] No opacity change (no dimming)
- [ ] Transition is 300ms ease-out
- [ ] Mouse leave returns to 50/50

### Click Expansion
- [ ] Clicking "Explore Studio" expands left to 100%
- [ ] Clicking "Explore Tech" expands right to 100%
- [ ] Non-selected panel slides completely off-screen
- [ ] Back button returns to split view
- [ ] Cross-navigation between expanded views works

### Mobile
- [ ] Panels stack vertically (50vh each)
- [ ] Tap expands selected panel to 100vh
- [ ] Other panel slides off (translateY)
- [ ] Back navigation works
- [ ] No horizontal overflow issues

### Visual
- [ ] Studio uses red accent color
- [ ] Tech uses blue accent color
- [ ] Corner brackets match color scheme
- [ ] WebGL background shows through both panels
- [ ] Shared elements (nav, status bar) remain visible in all states

### Accessibility
- [ ] `prefers-reduced-motion` is respected
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] ARIA labels are present
- [ ] No CLS (Cumulative Layout Shift)

### Code Quality
- [ ] TypeScript strict mode passes
- [ ] No console errors
- [ ] Components are reusable
- [ ] State is managed cleanly
- [ ] Animation logic is encapsulated

---

## SECTION 13: WHAT YOU WILL RECEIVE NEXT

After this context document, you will receive:

1. **The current `mozaic-hero.tsx` file** — This is the existing hero that represents the STUDIO side. Study its structure, styling patterns, and implementation details.

2. **A new hero component file** — This will represent the TECH side. It follows the same structure but with different content and blue accent colors.

Your task will be to:

1. Create a new `split-hero.tsx` component that combines both
2. Implement the entrance animation
3. Implement hover behavior
4. Implement click-to-expand behavior
5. Handle mobile responsiveness
6. Ensure accessibility compliance

---

## SECTION 14: KEY REMINDERS

### Do NOT:
- Change the visual style or design language
- Use `position: left/right` for animations (use `transform: translateX`)
- Create layout shift (CLS)
- Forget reduced motion support
- Make the animation replay on re-renders

### DO:
- Keep the "Technical Brutalism" aesthetic
- Use Framer Motion for animations (already in the project)
- Use Tailwind CSS for styling (already in the project)
- Maintain the existing component patterns
- Keep the WebGL background as a single shared canvas
- Make hover/click interactions feel snappy and intentional

---

## SECTION 15: SUCCESS CRITERIA

The implementation is successful when:

1. **A first-time visitor sees** two panels slide in from opposite sides and lock into a 50/50 split

2. **Hovering** creates a subtle expansion that hints at interactivity

3. **Clicking "Explore"** creates a satisfying full-screen takeover that feels intentional

4. **The brand message is clear**: MOZAIC is two complementary halves forming one complete solution

5. **The code is clean**: Future developers can understand and modify it easily

6. **Performance is excellent**: No jank, no layout shift, smooth 60fps animations

---

## END OF CONTEXT DOCUMENT

**You are now prepared to receive the component code files and begin implementation.**

When you receive the code files, your first step should be to:

1. Read both hero component files completely
2. Identify the shared patterns between them
3. Plan the component architecture
4. Implement incrementally (entrance → hover → click → mobile)
5. Test each phase before moving to the next

**Confirm you have understood this context before proceeding.**