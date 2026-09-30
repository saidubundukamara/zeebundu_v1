---
name: Zeebundu Group
description: A Sierra Leone group of 16 businesses, drawn as one orienteering course with an 8-sector legend.
colors:
  ground: "#fbfcfa"
  ink: "#15171b"
  ink-soft: "#50565e"
  rule: "#e3e6e0"
  rule-strong: "#c9cdc6"
  card: "#ffffff"
  paper: "#f2f4f0"
  course: "#7b2cbf"
  course-strong: "#6621a3"
  course-soft: "#f1e8fa"
  on-course: "#ffffff"
  contour: "#8c5a2b"
  contour-soft: "#d9b48c"
  thicket: "#a5b36a"
  thicket-soft: "#e4ead0"
  open: "#ffd24d"
  open-soft: "#fff1c2"
  water: "#5fa7d6"
  water-soft: "#d6e9f5"
  destructive: "#c0392b"
  night-ground: "#121410"
  night-ink: "#eceee9"
  night-ink-soft: "#a4aaa2"
  night-rule: "#2a2d27"
  night-input: "#3a3f42"
  night-card: "#171a15"
  night-paper: "#191c16"
  night-course: "#a36fe3"
  night-course-soft: "#251a33"
  night-on-course: "#140a20"
  night-contour: "#c79a6c"
  night-thicket: "#1b2317"
  night-open: "#33301b"
  night-water: "#13232d"
  night-destructive: "#ff7a6b"
typography:
  display:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(3.25rem, 1.6rem + 4.2vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.88
  headline:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(2.75rem, 1.9rem + 3.8vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.92
  headline-business:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(3.5rem, 2rem + 3.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
  section:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(2.125rem, 1.6rem + 2.2vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.95
  title:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(1.5rem, 1.3rem + 0.8vw, 2rem)"
    fontWeight: 800
    lineHeight: 1
  card-title:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1
  control-numeral:
    fontFamily: "Big Shoulders, sans-serif"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
  lead:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "ss01"
  body:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "ss01"
  body-small:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "ss01"
  label:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    letterSpacing: "0.04em"
  nav:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    letterSpacing: "0.03em"
rounded:
  none: "0px"
  sm: "2px"
  md: "3px"
  lg: "4px"
  full: "9999px"
spacing:
  gutter: "16px"
  gutter-md: "32px"
  container: "1360px"
  header: "64px"
  section: "80px"
  section-md: "112px"
  split-gap: "40px"
  split-gap-lg: "56px"
  card-x: "20px"
  card-y: "16px"
components:
  button-primary:
    backgroundColor: "{colors.course}"
    textColor: "{colors.on-course}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.course-strong}"
    textColor: "{colors.on-course}"
  button-primary-compact:
    backgroundColor: "{colors.course}"
    textColor: "{colors.on-course}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "40px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  control-mark:
    backgroundColor: "transparent"
    textColor: "{colors.course}"
    typography: "{typography.control-numeral}"
    rounded: "{rounded.full}"
    size: "44px"
  control-mark-active:
    backgroundColor: "{colors.course}"
    textColor: "{colors.on-course}"
    rounded: "{rounded.full}"
    size: "44px"
  control-mark-large:
    textColor: "{colors.course}"
    rounded: "{rounded.full}"
    size: "80px"
  chip-sector:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "40px"
  chip-sector-active:
    backgroundColor: "{colors.course}"
    textColor: "{colors.on-course}"
    rounded: "{rounded.sm}"
    height: "40px"
  input-field:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "4px 10px"
    height: "44px"
  input-search:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 0 0 32px"
    height: "44px"
  card-business:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
  band-finish:
    backgroundColor: "{colors.course}"
    textColor: "{colors.on-course}"
    padding: "80px 16px"
---

# Design System: Zeebundu Group

## Overview

**Creative North Star: "The Course Map"**

Zeebundu is drawn as an orienteering map. The group's 16 businesses are numbered controls on one course, and its 8 sectors are the map's legend. The page is the white "runnable" ground of a printed map: generated contour terrain in brown, with olive thicket, yellow open land and blue marsh, sits behind the content and fades out wherever text needs to be read. One ink, course purple, carries the route, the active state and the primary action. Everything else is black ink, soft ink and hairline rules.

The system is dense but calm. It reads like a map sheet and a control-description sheet: legend tables, ruled lists, numbered circles, condensed uppercase names. Headings are posters set in Big Shoulders; running text is Mona Sans. Containers are square, controls are round, and there is nothing in between. Depth comes from terrain and ink rules, not from shadows or tinted panels.

The world deliberately refuses the holding-company default of a photo hero, a stats band and a sector card grid. Photos exist, but they are framed as surveyed evidence that "develops" once, never as the opening frame. The day map (light) is the default for every visitor. The night map is opt-in from a header toggle: the same inks printed on near-black paper, with the course lifted for contrast and vegetation printed as dot screens.

**Key Characteristics:**
- One accent (course purple) with a hard usage rule; map inks everywhere else.
- Condensed uppercase display (Big Shoulders 800) against a plain text face (Mona Sans with `ss01`).
- Square containers (0 to 4px) and circular controls; no pill or mid-radius shapes.
- Every business has a stable two-digit control code, numbered in sector order.
- Generated, seeded contour terrain as the only texture, masked away from text.
- A small, named motion vocabulary that becomes fully static under reduced motion.
- Light is the default for everyone, whatever their system setting. A sun/moon toggle in the header (and in the mobile menu) switches to the night map; the choice is stored in localStorage (`zb-theme`) and applied before first paint by an inline script, so there is no flash.

## Colors

A printed map palette: white ground, black and grey ink, four terrain inks, and one purple reserved for the course.

### Primary
- **Course Purple** (#7b2cbf): the course lines, start triangle and finish circles on the map; control circles and control numerals everywhere they appear; the active state (current nav underline, active sector chip, hovered or current control badge, lit legend row); the primary action button; focus outlines, text selection and input caret; and the one closing call-to-action band. White text on it (#ffffff).
- **Course Purple, Pressed** (#6621a3): hover state of the primary button, and the text colour on the soft purple accent surface.
- **Course Wash** (#f1e8fa): the soft accent surface behind a selected menu item. Used rarely.
- **Night Course** (#a36fe3): the course on the night map, lifted for contrast on near-black. Text on a night-course fill is near-black violet (#140a20), not white.

### Secondary (terrain inks)
These are map inks. They appear in the generated terrain and in the legend symbols, and nowhere in the interface chrome.
- **Contour Brown** (#8c5a2b), soft (#d9b48c), night (#c79a6c): contour lines and the knoll legend symbol.
- **Thicket Olive** (#a5b36a), soft (#e4ead0), night (#1b2317): vegetation areas and the vegetation and special-vegetation legend symbols.
- **Open-Land Yellow** (#ffd24d), soft (#fff1c2), night (#33301b): open land and the open-land legend symbol.
- **Marsh Blue** (#5fa7d6), soft (#d6e9f5), night (#13232d): water and marsh, and the water legend symbol.

The terrain SVGs carry their own tuned inks from `scripts/generate-terrain.mjs` (light: contour #b98a5c, index contour #9a6a3a, thicket #dfe6c2 and #c9d59a, open #ffe28a, water #cfe4f2 with line #7fb6dc; night: contour #6f5236, index #94704a, water #16303f with line #3a7aa3, vegetation and open land as dot-screen patterns in #56663a and #8a7428). Regenerate them with the script rather than editing the files.

### Neutral
- **Runnable Ground** (#fbfcfa): the page background. Night: #121410.
- **Map Ink** (#15171b): headings, body text, strong rules under legend and list headers, the outline button. Night: #eceee9.
- **Soft Ink** (#50565e): secondary text, summaries, breadcrumbs, captions, inactive nav. Night: #a4aaa2.
- **Hairline Rule** (#e3e6e0): borders between rows, card borders, the header's bottom edge. Night: #2a2d27.
- **Strong Rule** (#c9cdc6): form input borders and the scrollbar thumb. Night: #3a3f42.
- **Card White** (#ffffff): business cards, form fields and popovers. Night: #171a15.
- **Paper Band** (#f2f4f0): the quiet tinted section band used to separate dense passages on detail pages. Night: #191c16.
- **Error Red** (#c0392b): form errors only. Night: #ff7a6b.

### Named Rules
**The Course Ink Rule.** Course purple marks only the course (lines, controls, control numerals), the active state and the primary action. It is never a decorative accent, a label colour or a background tint for emphasis. If you cannot say which of those three jobs a purple mark is doing, it should be ink.

**The Map Ink Rule.** Thicket, open land, marsh and contour colours are terrain. They live in the generated terrain and the legend symbols and never become button, badge, chip or text colours.

**The Night Map Rule.** The night map (opt-in, `<html data-theme="dark">`) is the same map printed on near-black paper, not an inverted UI. Swap the ink values, lift the course to #a36fe3, and let the terrain switch to its night file with dot-screened vegetation.

## Typography

**Display Font:** Big Shoulders (variable `opsz`, from `next/font/google`, exposed as `--font-display` and `font-heading`)
**Body Font:** Mona Sans (variable `wdth`, exposed as `--font-sans`), with stylistic set `ss01` on the body

**Character:** A condensed street-signage face set in heavy uppercase, like the names printed on a map sheet, against a plain, open sans for everything people actually read. The display face also sets every number that identifies a control.

### Hierarchy
- **Display** (800, clamp(3.25rem, 1.6rem + 4.2vw, 6rem), line-height 0.88, uppercase): the home page thesis only, split into masked lines of at most 14 characters.
- **Headline** (800, clamp(2.75rem, 1.9rem + 3.8vw, 5.5rem), line-height 0.92, uppercase): page titles (`text-h1`) and the closing band headline. Business and CMS hero titles step up to clamp(3.5rem, 2rem + 3.6vw, 6rem) on large screens.
- **Section** (800, clamp(2.125rem, 1.6rem + 2.2vw, 3.75rem), line-height 0.95, uppercase): section headings (`text-h2`) and the chairman's quote.
- **Title** (800, clamp(1.5rem, 1.3rem + 0.8vw, 2rem), line-height 1, uppercase): small headings (`text-h3`). Card and row names use a fixed 1.5rem (1.875rem for control-index rows on tablet and up).
- **Lead** (Mona Sans 400, clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem), line-height 1.55): sublines under headings, in soft ink, capped at 44 to 60ch.
- **Body** (Mona Sans 400, 1rem): running text. Summaries and captions use 0.875rem with relaxed leading. Rich text uses the Tailwind typography plugin.
- **Label** (Big Shoulders 700, 1rem to 1.125rem, letter-spacing 0.04em, uppercase): large buttons and inline text actions with an arrow. Navigation uses 1.125rem at 0.03em.
- **Control numeral** (Big Shoulders 800, tabular figures, line-height 1): control codes in badges, legend rows, chips, stats and the map. Always in course purple unless it sits on a purple fill.

All h1, h2 and h3 elements are Big Shoulders 800, uppercase and `text-wrap: balance` by default.

### Named Rules
**The Poster Heading Rule.** Headings are condensed uppercase posters that carry themselves. They do not need a kicker, eyebrow or small label above them.

**The Numbered Control Rule.** A business's number is always set as a control numeral in the display face with tabular figures, never in the text face.

## Layout

The page is a single centred container (max 1360px) with 16px side gutters on phones and 32px from tablet up. Sections breathe on a fixed rhythm: 80px top and bottom on phones, 112px from tablet up, with a hairline rule between sections instead of alternating background colours. The sticky header is 64px tall.

Wide layouts are asymmetric two-column splits on a 12-part ratio, never equal halves: 5 to 7 for the home hero (thesis left, course map right) and the business hero (title left, photo right); 7 to 5 for the control index (rows left, a sticky photo frame right) and the impact statement; 4 to 8 for latest news. Split gaps are 40px, widening to 56px on large screens.

The home hero fills the first viewport on large screens (100dvh minus the header) with the legend directly under the map. On phones the map stacks under the thesis, the terrain is masked so it only shows below the text, and the legend drops to one column. Sector chips become a horizontally scrolling, snap-aligned strip. The control index's photo frame is hidden below 1024px, and the hover card on the map is hidden below 768px.

Lists are ruled tables: a strong ink rule on top, hairline rules between rows, generous row padding (16px, 20px from tablet up). The legend, the control index, latest news and the footer all use this grammar.

Headlines are split into lines by `splitHeadline`: at sentence ends first, then wherever a line would pass the character cap (14 for the home and business titles, 18 for CMS heroes, 22 for inner page titles).

## Elevation & Depth

The system is flat. Depth comes from the terrain behind the content and from ink rules, not from shadows or stacked panels. Terrain is decorative, `aria-hidden`, and masked so the ground stays "runnable" where text sits: it fades in from the right behind page headers (transparent to 28%, full by 62%), fades out at the edges behind the impact statement, and runs at 70 to 90% opacity. Text laid over terrain gets a translucent ground backing (70 to 80%) when it needs one.

The sticky header is the only translucent surface: ground at 75 to 90% with a medium backdrop blur, over a hairline bottom rule.

### Shadow Vocabulary
- **Control description card** (`box-shadow: 0 12px 32px -12px rgb(21 23 27 / 0.35)`): the one floating card that appears over a hovered control on the course map. Nothing else casts a shadow.

### Named Rules
**The Surveyed Ground Rule.** Texture means generated terrain from `scripts/generate-terrain.mjs` (seeded, so it is stable), in the `hero`, `band` or `tile` variant, with its light and night files. No gradients, grain, blobs or photo overlays stand in for it.

## Shapes

Two shapes only. Containers, cards, photos, buttons, chips and inputs are square or nearly square: 0px for cards, photos and panels; 2px for buttons and chips; 3px to 4px at most for form fields. Every radius token above 4px is clamped to 4px, so no pill or soft-rounded shape can appear by accident. Controls, and only controls, are full circles.

Borders are 1px hairlines in the rule colour, or 1px ink where a line needs to read as a structural rule (legend header, list tops, active card border, pillar tags). Control circles use heavier strokes that scale with size: 1.5px small, 2px medium, 3px large, and a 4-unit stroke on the course map (6 units when focused).

The orienteering course symbols are the recurring silhouettes: the start triangle (also the interim logo mark), the control circle and the finish double circle. The 8 sector legend symbols follow ISOM map symbols and are assigned by sector order (index modulo 8): Energy, a man-made object cross in ink; Hospitality, a solid ink building; Agriculture & Food, a thicket dot screen; Food & Beverage Production, water lines in blue; Construction, a cliff tag line in ink; Health & Beauty, a special-vegetation ring in olive; Financial Services, a knoll dot in brown; Retail, open land in yellow with an ink edge. Reordering sectors in the CMS reassigns symbols.

## Components

### Buttons
Square, confident and uppercase.
- **Shape:** gently squared corners (2px).
- **Primary:** course purple fill, white text (near-black violet on the night map). Large size is 40px tall with 16px side padding; extra large is 48px with 24px. Both set the label in Big Shoulders 700 uppercase at 0.04em. Every primary action uses this, including the header's "Send an enquiry".
- **Hover / Focus:** fill deepens to #6621a3 (on the night map, 85% opacity) over 200ms ease-out; pressing scales to 0.98. Focus shows the course ring.
- **Outline:** transparent with an 80% ink border; on hover it fills with ink and the text turns to ground. Used for secondary actions such as WhatsApp and "Clear filters". On the purple finish band it inverts: white fill with purple text, going transparent on hover.
- **Text action:** a label-style link with a light Phosphor arrow that slides 4px right on hover over 300ms. This is the default secondary action next to a primary button.
- **Link:** purple text with a hover underline, for inline CMS links.

### Chips (sector filter)
- **Style:** 40px tall, 2px corners, hairline border, ink text, with the sector's control codes after the name in course purple.
- **State:** hover darkens the border to ink. The active chip is filled with course purple and white text; the fill slides from chip to chip as a shared layout element (0.45s, expo ease). "All sectors" comes first. Chips are `aria-pressed` toggle buttons.

### Cards / Containers
- **Business card (control description):** square, 1px hairline border on card white; hover darkens the border to ink. A 4:3 photo on top scales to 1.04 on hover over 700ms. Below it, a ruled header row holds the control badge, the name in Big Shoulders 800 at 1.5rem, and an arrow; the badge fills purple on hover and the arrow slides and turns purple. Summary text below in soft ink. Internal padding 16px by 20px.
- **Sector card:** borderless 4:5 photo, then the name and business count with codes over an ink rule; the name turns purple on hover.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Paper band:** the tinted `paper` section tone separates dense passages on detail pages. The purple `dark` tone is reserved for the one closing call to action.

### Inputs / Fields
- **Enquiry form fields:** 44px tall, card white, 1px strong-rule border, corners at 4px, 16px text (14px on larger screens).
- **Search:** no box. A single ink underline with a light magnifier icon on the left; on focus the underline thickens to 2px and turns course purple.
- **Focus:** a 3px course ring at 50% opacity plus a course border. Globally, any focused element gets a 2px solid course outline offset by 3px.
- **Error / Disabled:** errors turn the border and ring to error red with a red message below; form-level errors sit on a 10% red wash. Disabled fields drop to 50% opacity.

### Navigation
- **Header:** the start-triangle wordmark on the left (the triangle rotates 120 degrees on hover), primary links centred on large screens, the primary button on the right, and a sheet menu on smaller screens. A skip link appears on focus as a purple chip.
- **Links:** Big Shoulders 700 uppercase at 1.125rem in soft ink; hover turns them to ink and a 2px course underline grows from the left (300ms, expo ease). The current page keeps the underline.
- **Breadcrumbs:** soft ink text separated by short purple dashes, the current page in ink.
- **Footer:** doubles as the map legend: every sector heading with its businesses listed beside small (28px) control badges, which fill purple on hover. The copyright line starts with the finish symbol.

### Control Mark (signature)
The ISOM control circle holding a business's two-digit code. Course-purple ring and numeral on a transparent centre. Sizes: small 32px (1.5px ring), medium 44px (2px ring), large 80px, 96px from tablet up (3px ring). Active or hovered, it fills purple with white numerals. The same badge morphs between the control index or a business card and the business page through a named view transition. On a business page, a row of 36px marks joined by 2px purple legs lets visitors step between the businesses in the same sector.

Control codes come from `src/lib/course.ts`: businesses are numbered 1 to 16 in sector order, then business order within the sector, and padded to two digits ("01"). The course map prints the unpadded number; every list prints the padded code. The numbers stay stable as long as sector and business order in the CMS stay the same.

### Course Map (signature)
The home hero: an SVG course on terrain (1000 by 640 units). A start triangle leads to 16 control circles (radius 30) along an authored route with legs of different lengths and bearings, ending at the finish double circle. Legs stop short of each circle, as on a printed course. Each number sits on the side facing away from both of its legs so it never lands on a line. Hovering or focusing a control fills it and shows the control description card (code, sector, name). Hovering or focusing a legend row lights that sector's controls and legs and dims the rest to about 20% opacity. Controls beyond the authored 16 continue on a gentle arc so the map never breaks.

### Legend (signature)
A two-column ruled table under the map headed "Legend" with the sector and business count. Each row is the sector symbol, the sector name, its control codes in purple, and an arrow that fades in on hover. It links to the sector page.

### Motion
A small set of named moves, each played once:
- **Course draw:** the start triangle scales in (0.5s), then each leg draws itself (0.3s) and each control pops in (0.45s), 0.11s apart, with the finish fading in last.
- **Line rise:** each headline line rises out of its own mask (1s, 90ms apart after a 120ms delay). Pure CSS, so it runs without JavaScript.
- **Develop:** photos wipe up from the bottom edge (1.1s, drawer ease) while easing from greyscale and 1.08 scale to full colour (1.6s, expo ease). Above-the-fold photos do this in CSS on load; others do it once when 20% visible.
- **Reveal:** content settles in once from 28px lower with a 6px blur (0.9s); list items stagger 0.06s apart (0.7s each).
- **Control morph:** the control badge morphs between list and business page (450ms, expo ease, with a brief 3px blur midway). Page changes fade out in 180ms and rise in 8px over 320ms.
- **Frame swap:** in the control index, the hovered row's photo wipes down over the previous one (0.7s, drawer ease).

Two curves carry all of it: expo out, `cubic-bezier(0.16, 1, 0.3, 1)`, for arrivals and hover; drawer, `cubic-bezier(0.32, 0.72, 0, 1)`, for clip wipes.

**The Static Map Rule.** With reduced motion on, everything is static: CSS animations and transitions are cut to 0.01ms, smooth scrolling and view-transition animations are off, and every motion component renders its final state immediately (the course fully drawn, photos in colour, content in place, frame swaps instant).

## Do's and Don'ts

### Do:
- **Do** use course purple (#7b2cbf, night #a36fe3) only for the course and controls, the active state and the primary action.
- **Do** number businesses as controls in sector order and show the two-digit code in a control mark or as a purple control numeral wherever a business is listed.
- **Do** set headings in Big Shoulders 800 uppercase and let them carry the section on their own.
- **Do** keep containers at 0 to 4px radius and reserve full circles for controls.
- **Do** separate content with ink and hairline rules in a legend-table grammar rather than boxed cards or shadows.
- **Do** use the generated terrain for texture, masked away from text, and swap to the night file when the night map is on (Terrain renders both files; `dark:` shows the right one).
- **Do** assign legend symbols by sector order so the key matches a real ISOM map key.
- **Do** make every animation play once, use the expo or drawer curve, and render the final state under reduced motion.
- **Do** keep a visible focus state (2px course outline, 3px offset) on everything interactive.

### Don't:
- **Don't** use purple as decoration: not for labels, eyebrows, tinted panels or highlights.
- **Don't** put a kicker, eyebrow or small uppercase label above a heading.
- **Don't** use terrain inks (olive, yellow, blue, brown) for buttons, chips, badges or text.
- **Don't** open a page with a photo hero, a stats band or a sector card grid.
- **Don't** use rounded pills, soft 8px+ corners or drop shadows (the control description card is the one exception).
- **Don't** add gradients, grain, glassmorphism or decorative blobs in place of the terrain.
- **Don't** use the legacy "Forest & gold" colours (forest, gold, stone); they exist only for the `/wireframes` route.
