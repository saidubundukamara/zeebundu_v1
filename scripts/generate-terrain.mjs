// Generates the orienteering-map terrain used across the site (public/terrain/*.svg).
// Seeded, so re-running produces the same files. Run: node scripts/generate-terrain.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { contours } from 'd3-contour'
import { createNoise2D } from 'simplex-noise'

const OUT = new URL('../public/terrain/', import.meta.url)
mkdirSync(OUT, { recursive: true })

const THEMES = {
  light: {
    ink: '#3a3a36',
    contour: '#b98a5c',
    index: '#9a6a3a',
    thicket: '#dfe6c2',
    thicketDense: '#c9d59a',
    open: '#ffe28a',
    water: '#cfe4f2',
    waterLine: '#7fb6dc',
  },
  // Night map: the same inks read under a head torch. Vegetation and open land
  // are printed as screens (dots) so the map reads as surveyed, not camouflage.
  dark: {
    contour: '#6f5236',
    index: '#94704a',
    thicket: 'url(#veg)',
    thicketDense: 'url(#vegd)',
    open: 'url(#opn)',
    water: '#16303f',
    waterLine: '#3a7aa3',
    ink: '#8c8f86',
    screens: { veg: '#56663a', open: '#8a7428' },
  },
}

function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function field(w, h, seed, scale, octaves = 4) {
  const noise = createNoise2D(mulberry32(seed))
  const values = new Float64Array(w * h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0
      let amp = 1
      let freq = 1 / scale
      for (let o = 0; o < octaves; o++) {
        v += amp * noise(x * freq, y * freq)
        amp *= 0.5
        freq *= 2
      }
      values[y * w + x] = v
    }
  }
  return values
}

function pathFor(multiPolygon, k) {
  let d = ''
  for (const polygon of multiPolygon.coordinates) {
    for (const ring of polygon) {
      if (ring.length < 10) continue
      d += 'M' + ring.map(([x, y]) => `${(x * k).toFixed(1)} ${(y * k).toFixed(1)}`).join('L') + 'Z'
    }
  }
  return d
}

function terrain({ name, width, height, seed, relief = 1, water = true }) {
  // Sample on a coarse grid, scale up: smoother lines and much smaller files.
  const k = 10
  const gw = Math.ceil(width / k) + 1
  const gh = Math.ceil(height / k) + 1
  const elevation = field(gw, gh, seed, 58 / relief, 3)
  const vegetation = field(gw, gh, seed + 101, 34, 2)
  const openness = field(gw, gh, seed + 202, 40, 2)

  const levels = []
  for (let t = -1.4; t <= 1.4; t += 0.16) levels.push(+t.toFixed(2))
  const lines = contours().size([gw, gh]).thresholds(levels)(elevation)

  for (const [theme, c] of Object.entries(THEMES)) {
    const parts = []
    parts.push(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice">`,
    )
    parts.push(
      '<defs>' +
        `<pattern id="m" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 3H6" stroke="${c.waterLine}" stroke-width="1"/></pattern>` +
        (c.screens
          ? `<pattern id="veg" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.1" fill="${c.screens.veg}"/></pattern>` +
            `<pattern id="vegd" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.3" fill="${c.screens.veg}"/></pattern>` +
            `<pattern id="opn" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1" fill="${c.screens.open}"/></pattern>`
          : '') +
        '</defs>',
    )
    // Vegetation: thicket (olive) and dense thicket.
    const [thin, dense] = contours().size([gw, gh]).thresholds([0.42, 0.72])(vegetation)
    parts.push(`<path fill="${c.thicket}" d="${pathFor(thin, k)}"/>`)
    parts.push(`<path fill="${c.thicketDense}" d="${pathFor(dense, k)}"/>`)
    // Open land (yellow), kept sparse so the ground stays mostly white.
    const [open] = contours().size([gw, gh]).thresholds([0.72])(openness)
    parts.push(`<path fill="${c.open}" d="${pathFor(open, k)}"/>`)
    // Marsh / water in the lowest ground.
    if (water) {
      const inverted = elevation.map((v) => -v)
      const [marsh, lake] = contours().size([gw, gh]).thresholds([0.75, 1.05])(inverted)
      parts.push(`<path fill="url(#m)" d="${pathFor(marsh, k)}"/>`)
      parts.push(`<path fill="${c.water}" d="${pathFor(lake, k)}"/>`)
    }
    // Contours: every fifth is an index contour, drawn heavier.
    lines.forEach((line, i) => {
      const index = i % 5 === 0
      parts.push(
        `<path fill="none" stroke="${index ? c.index : c.contour}" stroke-width="${index ? 1.6 : 0.9}" stroke-linejoin="round" d="${pathFor(line, k)}"/>`,
      )
    })
    // Point features (boulders) and tracks, drawn in the map's black ink.
    const rand = mulberry32(seed + 7)
    const dots = []
    for (let i = 0; i < (width * height) / 9000; i++) {
      dots.push(`M${(rand() * width).toFixed(1)} ${(rand() * height).toFixed(1)}h0`)
    }
    parts.push(
      `<path stroke="${c.ink}" stroke-width="3.2" stroke-linecap="round" fill="none" d="${dots.join('')}"/>`,
    )
    for (let t = 0; t < 2; t++) {
      let x = rand() * width
      let y = t === 0 ? 0 : height
      let a = t === 0 ? Math.PI / 2 : -Math.PI / 2
      let d = `M${x.toFixed(1)} ${y.toFixed(1)}`
      for (let i = 0; i < 80; i++) {
        a += (rand() - 0.5) * 0.5
        x += Math.cos(a) * 18
        y += Math.sin(a) * 18
        d += `L${x.toFixed(1)} ${y.toFixed(1)}`
      }
      parts.push(
        `<path d="${d}" fill="none" stroke="${c.ink}" stroke-width="1.6" stroke-dasharray="7 5"/>`,
      )
    }
    parts.push('</svg>')
    const file = new URL(`${name}-${theme}.svg`, OUT)
    writeFileSync(file, parts.join(''))
    console.log(`wrote public/terrain/${name}-${theme}.svg`)
  }
}

terrain({ name: 'hero', width: 1600, height: 1100, seed: 1961 })
terrain({ name: 'band', width: 1600, height: 560, seed: 232, relief: 0.8 })
terrain({ name: 'tile', width: 900, height: 900, seed: 76, water: false })
