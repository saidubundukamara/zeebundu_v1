# Zeebundu brand direction — "Forest & gold"

Status: **proposed, awaiting client sign-off** (Phase 1). Tokens live in `src/app/(frontend)/globals.css`; the live sheet is at `/wireframes`.

## Idea

An established Sierra Leonean group: steady, rooted, trustworthy. Deep forest green (land, agriculture, the green of the national flag) carries the brand. Muted gold is a sparing highlight for calls to action and key numbers. Warm off-white "paper" backgrounds keep it from feeling cold or corporate-grey.

## Name

Always **Zeebundu** (one word, capital Z only). Never "ZeeBundu", "Zee Bundu" or "Bundu". Group name in formal copy: **Zeebundu Group**.

## Colour

| Role               | Token        | Hex       | Use                                                  |
| ------------------ | ------------ | --------- | ---------------------------------------------------- |
| Primary            | `forest-800` | `#0F3D2E` | Headings, primary buttons, header/footer bands       |
| Highlight          | `gold-400`   | `#C8A24A` | CTA buttons, stat numbers **on dark**, small accents |
| Gold text on light | `gold-700`   | `#8A6A1F` | Eyebrows/labels on light backgrounds                 |
| Background         | `stone-50`   | `#FBFAF6` | Page background                                      |
| Paper              | `stone-100`  | `#F7F5EF` | Alternating sections, muted panels                   |
| Ink                | `ink`        | `#16181A` | Body text                                            |
| Muted text         | `stone-600`  | `#66635A` | Secondary text                                       |
| Border             | `stone-200`  | `#ECE8DE` | Dividers, card borders                               |

Full 50–950 scales for forest, gold and stone are in `globals.css`.

### Contrast rules (WCAG 2.2 AA)

| Pair                      | Ratio     | OK for                 |
| ------------------------- | --------- | ---------------------- |
| forest-800 on stone-100   | 11.2:1    | all text               |
| ink on stone-100          | 16.3:1    | all text               |
| stone-600 on stone-100    | 5.7:1     | body text              |
| gold-700 on stone-100     | 4.6:1     | body text (just)       |
| forest-800 on gold-400    | 5.1:1     | button labels          |
| gold-400 on forest-800    | 5.1:1     | text on dark bands     |
| **gold-400 on stone-100** | **2.2:1** | **never use for text** |

## Type

- **Display:** Fraunces (variable serif, optical sizing) — `font-heading`, applied to h1–h3 automatically.
- **Text/UI:** Geist — `font-sans`.
- Fluid scale (360→1280px): `text-display` 40→72px, `text-h1` 32→52px, `text-h2` 26→38px, `text-h3` 20→26px, `text-lead` 18→21px; body 16px.

## Shape & motion

- Radius 6px (`--radius: 0.375rem`) — squarer than default shadcn for a more institutional feel.
- Motion restrained: 150–250ms fades/slides, respect `prefers-reduced-motion`.
- Photography over illustration: real Sierra Leone people, places and operations. No stock-looking office shots.

## Logo

No usable logo exists from the old site. Interim: wordmark "ZEEBUNDU" set in Fraunces, forest-800. **[TODO: client]** confirm whether an existing logo should be supplied or a new lockup designed.

## Open questions for the client

1. Approve the palette and typefaces, or request adjustments.
2. Existing logo files? Otherwise, commission a new lockup.
3. Do individual businesses keep their own logos/colours inside the group template (recommended: own logo, group colours)?
4. Photography: existing photo library, or plan a shoot?
