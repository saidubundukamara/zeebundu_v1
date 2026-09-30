import { sectors } from '../_components/data'
import { Box, Lines, Section, WireFooter, WireHeader } from '../_components/wire'

export default function HomeWireframe() {
  return (
    <>
      <WireHeader />
      <main>
        {/* 1. Hero */}
        <section className="bg-forest-800 text-stone-50">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
            <div className="space-y-6">
              <p className="text-xs tracking-wide text-gold-300 uppercase">Zeebundu Group</p>
              <h1 className="text-display">Group purpose statement, one or two lines</h1>
              <Lines count={2} className="max-w-md opacity-40" />
              <div className="flex flex-wrap gap-3">
                <span className="rounded-md bg-highlight px-4 py-2 text-sm font-medium text-highlight-foreground">
                  Explore our businesses
                </span>
                <span className="rounded-md border border-white/30 px-4 py-2 text-sm">
                  About Zeebundu
                </span>
              </div>
            </div>
            <Box
              label="Hero image / short muted video loop"
              className="aspect-4/3 bg-white/10 text-stone-300"
            />
          </div>
        </section>

        {/* 2. Stats band */}
        <Section tone="paper" note="CMS-editable numbers">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: '16', label: 'Businesses' },
              { value: '8', label: 'Sectors' },
              { value: '000', label: 'Employees' },
              { value: '00', label: 'Districts served' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-h2 text-forest-800">{stat.value}</p>
                <p className="text-sm text-stone-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 3. Sector grid */}
        <Section title="Our businesses" note="Sector cards → sector pages">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <div key={sector.name} className="rounded-md border bg-white p-4">
                <Box label="Sector image" className="mb-4 aspect-video" />
                <p className="font-heading text-h3">{sector.name}</p>
                <p className="mt-1 text-sm text-stone-600">
                  {sector.businesses.length} business{sector.businesses.length > 1 ? 'es' : ''}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 4. Featured businesses carousel */}
        <Section title="Featured businesses" note="Carousel · swipe on mobile" tone="paper">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['Hotels & Resorts', 'Water Production', 'Zeemart Shopping', 'Foreign Exchange'].map(
              (b) => (
                <div key={b} className="w-72 shrink-0 rounded-md border bg-white p-4">
                  <Box label="Business photo + logo" className="mb-4 aspect-4/3" />
                  <p className="font-medium">{b}</p>
                  <Lines count={2} className="mt-3" />
                </div>
              ),
            )}
          </div>
        </Section>

        {/* 5. Impact teaser */}
        <Section title="Impact" note="Foundation pillars + featured story">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-3">
              {['Education', 'Health', 'Environment', 'Enterprise'].map((p) => (
                <Box key={p} label={`Pillar: ${p}`} className="aspect-square" />
              ))}
            </div>
            <div className="rounded-md border bg-white p-4">
              <Box label="Featured impact story image" className="mb-4 aspect-video" />
              <Lines count={3} />
            </div>
          </div>
        </Section>

        {/* 6. Chairman / CEO message */}
        <Section tone="dark">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_2fr]">
            <Box label="Portrait" className="aspect-3/4 bg-white/10 text-stone-300" />
            <div className="space-y-4">
              <p className="font-heading text-h2">“Chairman’s message pull quote.”</p>
              <Lines count={3} className="opacity-40" />
              <p className="text-sm text-gold-300">Name · Chairman, Zeebundu Group</p>
            </div>
          </div>
        </Section>

        {/* 7. Latest news */}
        <Section title="Latest news" note="3 most recent">
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-md border bg-white p-4">
                <Box label="Article image" className="mb-4 aspect-video" />
                <p className="text-xs text-gold-700 uppercase">Category · Business · Date</p>
                <Lines count={2} className="mt-3" />
              </div>
            ))}
          </div>
        </Section>

        {/* 8. Enquiry CTA + newsletter */}
        <Section tone="paper">
          <div className="grid gap-6 md:grid-cols-2">
            <Box label="Partner / enquire with us — CTA band" className="min-h-40" />
            <Box label="Newsletter signup" className="min-h-40" />
          </div>
        </Section>
      </main>
      <WireFooter />
    </>
  )
}
