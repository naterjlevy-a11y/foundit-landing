# Found It! — Visual Audit + Design Brief
> Honest walkthrough of what's broken and what needs to change. Backend agent: read this top to bottom.

---

## SCREENSHOTS TAKEN (6 scroll positions)
1. `fi-top` — intro state, magnifying glass on black
2. `fi-portal` — mid-scroll through portal transition
3. `fi-hero` — where "Found It!" headline should be visible
4. `fi-feat1` — scroll position right after the portal zone ends
5. `fi-feat2` — features grid ("Everything. Nothing extra.")
6. `fi-cta` — waitlist section + footer

---

## PROBLEM 1: The hero reveal is invisible (critical)

**What should happen:** After scrolling through the portal, a giant "Found It!" headline fades in with a waitlist form below it.

**What actually happens:** The screen is almost entirely black. Tiny faint text is barely visible at the very top edge of the viewport. The hero reveal is effectively invisible.

**Why:** The `HeroReveal` component relies on `heroOpacity` which is driven by `scrollProgress` through GSAP ScrollTrigger. The opacity only starts coming in at `scrollProgress = 0.80` and completes at `1.0`. In practice this means the hero is barely showing by the time the user has fully scrolled through the 400vh pin zone. The text fades in too late and too slowly — it needs to start earlier (at `0.70`) and arrive faster.

**Fix:** In `PortalSequence.tsx`, change:
```
const heroOpacity = useTransform(scrollProgress, [0.80, 1.0], [0, 1]);
const heroY = useTransform(scrollProgress, [0.80, 1.0], [48, 0]);
```
to:
```
const heroOpacity = useTransform(scrollProgress, [0.68, 0.92], [0, 1]);
const heroY = useTransform(scrollProgress, [0.68, 0.92], [32, 0]);
```
Also make the clip-path expand earlier — change `[0.48, 0.88]` to `[0.42, 0.80]` so the portal opens sooner and gives the hero more time to breathe.

---

## PROBLEM 2: Massive black void between portal and features (critical)

**What actually happens:** After the 400vh pin zone ends, there is a huge dead stretch of nearly-pure black before the features grid starts. The `fi-feat1` screenshot is just black with a faint blue glow — nothing is there. The transition from the cinematic portal sequence to the features content is completely dead.

**Why:** The portal takes 400vh. Then FeaturesGrid starts immediately but all its content is hidden behind `whileInView` opacity-0 animations that haven't triggered yet. So you scroll off the portal into a black wall, then the features appear.

**Fix:** Add a transitional element between PortalSequence and FeaturesGrid. Either:
- A full-width `<div>` with `min-h-[30vh]` that has the product's key stats or a floating glass element, so there's something visible in the transition space.
- OR reduce the portal height from `400vh` to `300vh` — the current 400vh is too long. The magic is gone by the 3rd viewport height; the last 100vh is just waiting.

---

## PROBLEM 3: Features cards are nearly invisible against black background (major)

**What actually happens:** In `fi-feat2`, the feature cards are so dark they blend into the black page. You can barely tell there's a card there at all. The `MagneticCard` component presumably has a very dark `bg-white/[0.03]` or similar background that disappears on black.

**Fix:** Increase card background opacity. In `MagneticCard.tsx`, change whatever the background color is from `bg-white/[0.03]` (or similar) to at least `bg-white/[0.06]`. Also add a slightly more visible border: `border-white/[0.10]` instead of whatever it currently is. The cards need to be legible as distinct objects from the page background.

---

## PROBLEM 4: The features section has no visual anchor or flow (major)

**What actually happens:** In `fi-feat2`, you see "Everything. Nothing extra." (good headline) and then immediately small dark cards. There's no visual breathing room, no sense of hierarchy. It feels like a block of compressed content dumped after the cinematic intro.

**Why it looks bad:** The gap between the headline and the first row of cards is too short. The section label `§ 01 · What you get` is so faint (white/25) that it reads as noise, not structure. The icon boxes at the top of each card are tiny (40×40px) and don't register visually.

**Fix:**
- Increase icon size from `w-10 h-10` to `w-12 h-12`, and increase the icon itself from `w-5 h-5` to `w-6 h-6`.
- Add `mb-32` (or `mb-40`) between the section header block and the first grid row.
- Make the section label slightly brighter: `text-white/40` instead of `text-white/25`.
- Increase `gap-3` to `gap-5` between grid rows and columns.

---

## PROBLEM 5: The CTA section looks generic and too small (moderate)

**What actually happens:** In `fi-cta`, the `"Your files are waiting."` headline is good, but the form below it is tiny — the input field and button are small and centrally compressed. The whole section feels like it could be any SaaS landing page form. There's also no visual interest — just text, then a small form, then a footer.

**Fix:**
- Make the email input full-width on this section (it already tries to be `max-w-md`, but push to `max-w-lg`).
- The button should be bigger: `py-5` instead of `py-4`, and `text-lg` instead of `text-base`.
- Add a subtle large ghost magnifying glass circle (just the ring, no fill, `opacity: 0.04`, `w-[500px] h-[500px]`) absolutely positioned behind the headline. It ties the visual language back to the intro.

---

## PROBLEM 6: No logo / wordmark visible after the portal (moderate)

**What actually happens:** There is no navbar, no logo, nothing to identify the product after the portal sequence ends. The `HeroReveal` has "Found It!" as the headline which acts as a logo, but once you scroll past the hero and into the features section, there is zero branding. You've forgotten what app you're looking at.

**Fix:** Add a minimal sticky nav that appears after the portal zone ends (i.e., only after `scrollY > 400vh`). Just a single line: `Found It!` wordmark on the left (small, `text-sm font-black`), and a `Join waitlist` link on the right. Height `h-12`. Background `bg-black/80 backdrop-blur-md`. No other elements. This should `position: fixed` and only become visible after the scroll threshold.

---

## PROBLEM 7: There's a red debug button visible on every page (cosmetic but embarrassing)

**What actually happens:** Every single screenshot shows a red button in the bottom-left corner. This appears to be a Next.js dev tools indicator or a Supabase / staging badge. It's on every viewport.

**Fix:** Find whatever is rendering this and wrap it in `process.env.NODE_ENV === 'development'` only, or remove it entirely if it's a component that was left in.

---

## PROBLEM 8: The portal mid-state is just a dark blue smear (moderate)

**What actually happens:** In `fi-portal`, during the transition, the screen is a plain dark blue gradient. There's nothing interesting to look at during the actual scrolling. The whole point of the portal is supposed to be magical — but mid-scroll it's just blue-black.

**Why:** The clip-path hasn't expanded yet, and the void layer (magnifying glass) has faded out. There's a dead zone between them.

**Fix:** The `voidOpacity` fades from `[0.72, 0.90]`. The clip-path starts at `[0.48, 0.88]`. So between `0.48` and `0.72` there's a period where the glass is gone AND the clip hasn't expanded. Add something here — e.g., a pulse of radial light (`bg-[#2563EB]/20 blur-[200px]`) that peaks at `scrollProgress 0.55–0.65` to give the void a heartbeat during the transition.

---

## WHAT IS ACTUALLY WORKING (don't break these)

- The magnifying glass SVG itself at the start — looks great. The blue glow, the shimmer arc, the ring. Keep it.
- The dark black/blue color palette — it's correct.
- The `"Everything. Nothing extra."` and `"Your files are waiting."` copy — the editorial voice is right.
- The noise grain texture — barely perceptible but adds premium quality.
- The `font-black tracking-tight` typographic style on headings — correct direction.

---

## PRIORITY ORDER FOR FIXES

1. **Fix hero opacity/timing** (Problem 1) — the page has no payoff right now
2. **Reduce portal from 400vh → 300vh** (Problem 2) — removes the dead zone
3. **Fix card background visibility** (Problem 3) — features are unreadable
4. **Add transitional breathing room in features** (Problem 4) — layout rhythm
5. **Fix CTA form sizing + ghost glass** (Problem 5) — final impression
6. **Add minimal sticky nav** (Problem 6) — branding continuity
7. **Remove debug button** (Problem 7) — obvious
8. **Add void heartbeat pulse** (Problem 8) — polish

---

## FILES TO TOUCH

| File | Problem |
|------|---------|
| `src/components/intro/PortalSequence.tsx` | Problems 1, 2, 8 |
| `src/components/blocks/MagneticCard.tsx` | Problem 3 |
| `src/components/blocks/FeaturesGrid.tsx` | Problems 4, 6 |
| `src/components/blocks/WaitlistCTA.tsx` | Problem 5 |
| `src/app/page.tsx` | Problem 6 (add nav), Problem 7 |
| `src/app/globals.css` | Problem 7 (if badge is CSS-based) |
