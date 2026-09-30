import { Box, Lines, Section, WireFooter, WireHeader } from '../_components/wire'

export default function BusinessWireframe() {
  return (
    <>
      <WireHeader />
      <main>
        {/* Hero */}
        <section className="bg-forest-800 text-stone-50">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-6 md:py-20">
            <div className="space-y-5">
              <p className="text-xs tracking-wide text-gold-300 uppercase">
                Our businesses / Food & Beverage Production
              </p>
              <Box label="Business logo" className="size-16 min-h-0 bg-white/10 text-stone-300" />
              <h1 className="text-h1">Water Production</h1>
              <p className="text-lead text-stone-300">One-line purpose / tagline</p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-md bg-highlight px-4 py-2 text-sm font-medium text-highlight-foreground">
                  Send an enquiry
                </span>
                <span className="rounded-md border border-white/30 px-4 py-2 text-sm">
                  WhatsApp us
                </span>
              </div>
            </div>
            <Box label="Hero image" className="aspect-4/3 bg-white/10 text-stone-300" />
          </div>
        </section>

        <Section title="Overview">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <Lines count={6} />
            <div className="space-y-3 rounded-md border bg-white p-4 text-sm">
              <p className="font-medium">At a glance</p>
              <Box label="Sector · Founded · Districts · Website" className="min-h-24" />
            </div>
          </div>
        </Section>

        <Section title="Products & services" tone="paper">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-md border bg-white p-4">
                <Box label="Icon" className="mb-3 size-10 min-h-0 p-0 text-[8px]" />
                <p className="font-medium">Service {n}</p>
                <Lines count={2} className="mt-3" />
              </div>
            ))}
          </div>
        </Section>

        <Section tone="dark">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n}>
                <p className="font-heading text-h2 text-gold-400">00</p>
                <p className="text-sm text-stone-300">Key stat {n}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Business-specific block"
          note="Optional CMS blocks: FX rates · loan products · product sizes · rooms"
        >
          <Box
            label="e.g. Product sizes table / Indicative FX rates / Loan products"
            className="min-h-40"
          />
        </Section>

        <Section title="Gallery" tone="paper">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <Box key={n} label={`Photo ${n}`} className="aspect-square" />
            ))}
          </div>
        </Section>

        <Section title="Locations & opening hours">
          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <div className="space-y-3">
              {['Freetown', 'Bo', 'Makeni'].map((l) => (
                <div key={l} className="rounded-md border bg-white p-4 text-sm">
                  <p className="font-medium">{l} branch</p>
                  <Lines count={2} className="mt-2" />
                </div>
              ))}
            </div>
            <Box label="Map embed" className="min-h-72" />
          </div>
        </Section>

        <Section title="Get in touch" tone="paper" note="Enquiry routed to this business">
          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <div className="space-y-3">
              <Box label="Phone" className="min-h-12" />
              <Box label="WhatsApp click-to-chat" className="min-h-12" />
              <Box label="Email" className="min-h-12" />
            </div>
            <div className="space-y-3 rounded-md border bg-white p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Box label="Name" className="min-h-10" />
                <Box label="Phone" className="min-h-10" />
                <Box label="Email" className="min-h-10" />
                <Box label="Enquiry type" className="min-h-10" />
              </div>
              <Box label="Message" className="min-h-28" />
              <div className="flex items-center justify-between gap-3">
                <Box label="Turnstile" className="min-h-10 w-40" />
                <span className="rounded-md bg-highlight px-4 py-2 text-sm font-medium text-highlight-foreground">
                  Send enquiry
                </span>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Related news">
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-md border bg-white p-4">
                <Box label="Article image" className="mb-3 aspect-video" />
                <Lines count={2} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Other businesses in this sector" tone="paper">
          <div className="grid gap-4 sm:grid-cols-2">
            {['Natural Juices', 'Beverages'].map((b) => (
              <div key={b} className="flex items-center gap-4 rounded-md border bg-white p-4">
                <Box label="Logo" className="size-12 min-h-0 p-0 text-[8px]" />
                <p className="font-medium">{b}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <WireFooter />
    </>
  )
}
