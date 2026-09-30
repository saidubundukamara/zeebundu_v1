export type SeedSector = { name: string; slug: string; description: string; order: number }
export type SeedBusiness = {
  name: string
  slug: string
  sector: string // sector slug
  tagline: string
  summary: string
  overview: string[] // paragraphs
  services: { title: string; description: string }[]
  featured: boolean
  order: number // 1..16 in the plan's order
}
export type SeedGroupCopy = {
  hero: { eyebrow: string; headline: string; subline: string }
  about: string[] // "Who we are" paragraphs
  footerTagline: string
  pressBoilerplate: string
}
