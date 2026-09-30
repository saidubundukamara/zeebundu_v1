# Zeebundu brand direction: "Orienteering map"

Status: **proposed, awaiting client sign-off.** This replaces the earlier "Forest & gold" draft, which was never approved. The tokens live in `src/app/(frontend)/globals.css`. `DESIGN.md` documents the full system.

## Idea

Zeebundu is drawn as an orienteering map. Each of its 16 businesses is a numbered control on one course, and the 8 sectors form the map's legend. It is an honest picture of a group that covers the everyday economy of one country. The map gives visitors a clear way in: they pick a sector from the legend, find its controls, and reach the business.

## Name

- Always write **Zeebundu**: one word, capital Z only.
- Never write "ZeeBundu", "Zee Bundu" or "Bundu".
- In formal copy, use **Zeebundu Group**.

## Colour (map inks)

| Role | Light | Dark (night map) | Use |
| --- | --- | --- | --- |
| Ground | `#FBFCFA` | `#121410` | Page background ("runnable" white) |
| Ink | `#15171B` | `#ECEEE9` | Text, headings |
| Soft ink | `#50565E` | `#A4AAA2` | Secondary text |
| Course purple | `#7B2CBF` | `#A36FE3` | **Only** the course, the active state and the primary action |
| Contour brown | `#8C5A2B` | `#C79A6C` | Terrain, one legend symbol |
| Thicket, open land, water | `#A5B36A`, `#FFD24D`, `#5FA7D6` | Printed as dot screens | Terrain and legend symbols only, never UI |

Purple is the one accent. Don't use it for decoration.

The site is light (the day map) for every visitor by default. A sun/moon toggle in the header switches to the night map, and the browser remembers that choice.

## Type

- **Display:** Big Shoulders, set in condensed uppercase. It is used for headings, control numbers and buttons.
- **Text:** Mona Sans.

## Shape and motion

- Containers and buttons are square, with a radius of 4px or less. Controls are circles. Nothing sits in between.
- Motion has a small set of named moves:
  - The course draws itself in.
  - Headline lines rise out of masks.
  - Photos "develop" once from grey.
  - A control badge morphs from a list into its business page.
- Everything is static when the visitor has reduced motion turned on.

## Logo

No logo exists yet. The interim wordmark is "ZEEBUNDU" in Big Shoulders next to the orienteering start triangle. **[TODO: client]** Supply a logo, or approve a new lockup.

## Photography

The current photos are temporary Unsplash images, listed in `src/seed/media/CREDITS.md`. Real photos of Zeebundu people, places and operations must replace them before launch.
