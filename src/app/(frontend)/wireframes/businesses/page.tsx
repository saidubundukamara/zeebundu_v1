import { sectors } from '../_components/data'
import { Box, Lines, Section, WireFooter, WireHeader } from '../_components/wire'

export default function BusinessesWireframe() {
  return (
    <>
      <WireHeader />
      <main>
        <Section tone="paper">
          <p className="text-xs tracking-wide text-gold-700 uppercase">Home / Our businesses</p>
          <h1 className="mt-3 text-h1 text-forest-800">Our businesses</h1>
          <Lines count={2} className="mt-4 max-w-xl" />
        </Section>

        <Section note="Filter chips + search update the grid client-side">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {['All', ...sectors.map((s) => s.name)].map((chip, i) => (
                <span
                  key={chip}
                  className={
                    i === 0
                      ? 'rounded-full bg-forest-800 px-3 py-1 text-sm text-stone-50'
                      : 'rounded-full border px-3 py-1 text-sm'
                  }
                >
                  {chip}
                </span>
              ))}
            </div>
            <Box label="Search businesses" className="min-h-10 md:w-64" />
          </div>

          <div className="space-y-12">
            {sectors.map((sector) => (
              <div key={sector.name}>
                <div className="mb-4 flex items-baseline justify-between border-b pb-2">
                  <h2 className="text-h3">{sector.name}</h2>
                  <span className="text-sm text-stone-600">View sector →</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sector.businesses.map((b) => (
                    <div key={b} className="rounded-md border bg-white p-4">
                      <Box label="Photo" className="mb-4 aspect-video" />
                      <div className="flex items-center gap-3">
                        <Box label="Logo" className="size-10 min-h-0 p-0 text-[8px]" />
                        <p className="font-medium">{b}</p>
                      </div>
                      <Lines count={2} className="mt-3" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <WireFooter />
    </>
  )
}
