export type SeedSector = { name: string; slug: string; description: string; order: number }
export type SeedBusiness = {
  name: string
  slug: string
  sector: string // sector slug
  stage: 'operating' | 'in-development'
  tagline: string // the client's website headline
  summary: string // the client's directory card, also the search description
  overview: string[] // paragraphs
  enquiryLabel: string
  services?: { title: string; description: string }[]
  stats?: { value: string; label: string }[]
  /** Only the place and district; addresses, phones and hours wait for verification */
  locations?: { name: string; district?: string }[]
  featured: boolean
  order: number // position within the course, in sector order
}
export type SeedPlace = {
  place: string
  kind: 'office' | 'operating' | 'agriculture' | 'in-development'
  description: string
}
export type SeedGroupCopy = {
  hero: { headline: string; subline: string }
  intro: { heading: string; text: string; brandLine: string }
  about: {
    heading: string
    intro: string[]
    mission: string
    vision: string
    values: { title: string; description: string }[]
    connects: { heading: string; text: string }
  }
  ceo: { name: string; title: string; bio: string[]; message: string }
  community: {
    heading: string
    text: string
    commitments: { title: string; description: string }[]
  }
  careers: { heading: string; text: string[]; vacancies: string }
  partnerships: { heading: string; text: string }
  projects: {
    heading: string
    intro: string
    places: SeedPlace[]
    lunsar: { heading: string; text: string }
  }
  contact: {
    heading: string
    intro: string
    address: string
    email: string
    phones: string[] // international format
    faq: { question: string; answer: string }[]
  }
  directoryIntro: string
  news: { title: string; excerpt: string; body: string[] }
  seo: Record<
    'home' | 'about' | 'businesses' | 'projects' | 'community' | 'careers' | 'contact' | 'news',
    { title: string; description: string }
  >
  footerTagline: string
  pressBoilerplate: string
}
