import type { SeedSector } from './types'

// Slugs from the first seed are kept where the meaning holds, so photos and old redirects still work
export const sectors: SeedSector[] = [
  {
    name: 'Energy & Vehicle Care',
    slug: 'energy',
    description: 'Fuel and vehicle care at our Lunsar business destination.',
    order: 1,
  },
  {
    name: 'Retail',
    slug: 'retail',
    description:
      'Everyday shopping in Lunsar, with electrical and plumbing supplies in development.',
    order: 2,
  },
  {
    name: 'Food & Beverage',
    slug: 'food-beverage-production',
    description: 'Packaged water, natural juices, our restaurant and food trade.',
    order: 3,
  },
  {
    name: 'Agriculture',
    slug: 'agriculture-food',
    description: 'Crop farming, food processing and cattle across Kamranka, Lungi and Sanda.',
    order: 4,
  },
  {
    name: 'Hospitality & Venues',
    slug: 'hospitality',
    description:
      'A conference center in Lunsar, and hotel and resort projects at Mahera Beach, Tagrin and John Obey.',
    order: 5,
  },
  {
    name: 'Construction',
    slug: 'construction',
    description: 'Building materials and practical work for facilities and infrastructure.',
    order: 6,
  },
  {
    name: 'Beauty & Health',
    slug: 'health-beauty',
    description: 'Salon services and beauty retail, with a pharmacy in development.',
    order: 7,
  },
  {
    name: 'Financial Services',
    slug: 'financial-services',
    description: 'Currency services, lending and microfinance initiatives in development.',
    order: 8,
  },
  {
    name: 'Security',
    slug: 'security',
    description: 'Security services for people, property and business facilities, in development.',
    order: 9,
  },
]
