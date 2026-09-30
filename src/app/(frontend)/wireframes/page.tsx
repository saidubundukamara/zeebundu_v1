import { Button } from '@/components/ui/button'

import { Section } from './_components/wire'

const scales = {
  forest: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  gold: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  stone: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
}

export default function BrandSheet() {
  return (
    <main>
      <Section title="Forest & gold" note="Proposed brand direction">
        <p className="max-w-2xl text-lead text-stone-600">
          Deep forest green carries the brand, muted gold highlights calls to action and key
          numbers, and warm paper backgrounds keep it approachable. Details and contrast rules in
          content/brand/BRAND.md.
        </p>
      </Section>

      <Section title="Colour" tone="paper">
        <div className="space-y-6">
          {Object.entries(scales).map(([name, steps]) => (
            <div key={name}>
              <p className="mb-2 text-sm font-medium capitalize">{name}</p>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-11">
                {steps.map((step) => (
                  <div key={step} className="text-xs">
                    <div
                      className="h-12 rounded-md border border-black/5"
                      style={{ background: `var(--color-${name}-${step})` }}
                    />
                    <span className="text-stone-600">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type">
        <div className="space-y-4">
          <p className="font-heading text-display text-forest-800">Rooted in Sierra Leone</p>
          <p className="font-heading text-h1 text-forest-800">Heading 1 — Our businesses</p>
          <p className="font-heading text-h2">Heading 2 — Agriculture & Food</p>
          <p className="font-heading text-h3">Heading 3 — Products and services</p>
          <p className="max-w-2xl text-lead text-stone-600">
            Lead — Zeebundu brings together sixteen businesses across eight sectors, serving
            communities across Sierra Leone.
          </p>
          <p className="max-w-2xl">
            Body — Geist at 16px. Used for paragraphs, forms, navigation and interface labels. Keep
            lines to around 65–75 characters for comfortable reading on phones and desktops.
          </p>
          <p className="text-xs font-medium tracking-wide text-gold-700 uppercase">
            Eyebrow label (gold-700 on light)
          </p>
        </div>
      </Section>

      <Section title="Buttons & surfaces" tone="dark">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="highlight" size="lg">
            Explore our businesses
          </Button>
          <Button variant="secondary" size="lg">
            Secondary
          </Button>
          <p className="font-heading text-h2 text-gold-400">16 businesses</p>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap gap-3">
          <Button size="lg">Primary</Button>
          <Button variant="highlight" size="lg">
            Enquire
          </Button>
          <Button variant="outline" size="lg">
            Outline
          </Button>
          <Button variant="link">Text link</Button>
        </div>
      </Section>
    </main>
  )
}
