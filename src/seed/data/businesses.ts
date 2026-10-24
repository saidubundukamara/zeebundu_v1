import type { SeedBusiness } from './types'

// Copy from the client's content pack (review.md, October 2026). Slugs follow its page paths.
const lunsar = { name: 'Lunsar', district: 'port-loko' }

export const businesses: SeedBusiness[] = [
  // Energy & Vehicle Care
  {
    name: 'Zeebundu Gas Station',
    slug: 'gas-station',
    sector: 'energy',
    stage: 'operating',
    tagline: 'Fuel for everyday journeys',
    summary:
      'Our Lunsar fuel business connects motorists and transport operators with the wider Zeebundu service destination.',
    overview: [
      'Zeebundu Gas Station forms part of our Lunsar business destination, alongside retail, food and vehicle care activities. Our focus is a straightforward customer experience, attentive service and responsible day-to-day fuel operations.',
      'Contact the station team for current fuel availability, opening hours and business inquiries.',
    ],
    enquiryLabel: 'Ask About Fuel Availability',
    locations: [lunsar],
    featured: true,
    order: 1,
  },
  {
    name: 'Zee AutoCare',
    slug: 'zee-autocare',
    sector: 'energy',
    stage: 'operating',
    tagline: 'Practical care for your vehicle',
    summary:
      'Zee AutoCare is the group’s vehicle service business associated with the Lunsar service bay.',
    overview: [
      'Zee AutoCare adds vehicle care to the Zeebundu service destination. Our aim is to support vehicle owners through clearly explained work and an organized service experience.',
      'Contact the service bay to discuss your vehicle, the work required and current service availability.',
    ],
    enquiryLabel: 'Enquire About Vehicle Services',
    locations: [lunsar],
    featured: false,
    order: 2,
  },

  // Retail
  {
    name: 'ZeeMart 360',
    slug: 'zeemart-360',
    sector: 'retail',
    stage: 'operating',
    tagline: 'Everyday shopping in one place',
    summary: 'ZeeMart 360 brings the group’s everyday retail offering to customers in Lunsar.',
    overview: [
      'ZeeMart 360 is designed around convenient everyday shopping. As part of the Zeebundu Lunsar destination, the store complements nearby group services and gives customers a place to shop for their regular needs.',
      'Speak with the store team for the current product range, prices and availability, or contact us about supplying products.',
    ],
    enquiryLabel: 'Contact ZeeMart 360',
    locations: [lunsar],
    featured: true,
    order: 3,
  },
  {
    name: 'Electrical and Plumbing Shop',
    slug: 'electrical-plumbing',
    sector: 'retail',
    stage: 'in-development',
    tagline: 'Practical supplies for building needs',
    summary:
      'The group’s plans include an electrical and plumbing retail activity alongside its wider construction interests.',
    overview: [
      'Our electrical and plumbing shop initiative is intended to complement the group’s building supplies offering. Contact the group about the development of this business and potential supply relationships.',
      'Product information will be added as the shop offering is confirmed.',
    ],
    enquiryLabel: 'Discuss a Supply Opportunity',
    featured: false,
    order: 4,
  },

  // Food & Beverage
  {
    name: 'Heart2Heart Water Factory',
    slug: 'heart2heart-water',
    sector: 'food-beverage-production',
    stage: 'operating',
    tagline: 'Water production and distribution',
    summary:
      'Heart2Heart brings together the group’s packaged water production, sales and distribution activities.',
    overview: [
      'Heart2Heart Water Factory, also referred to in group materials as Heart2Heart Pure Water or H2H Pure Water, is our water production business. Activities include water treatment, packaging, storage, sales and distribution. Our operating standards emphasize hygiene, equipment care and product handling.',
      'Shops, offices, hospitality businesses and distributors can contact our team to discuss supply requirements.',
    ],
    enquiryLabel: 'Enquire About Water Supply',
    services: [
      {
        title: 'Bundles of 24 large packets',
        description: 'Available for delivery or for purchase at our factories.',
      },
    ],
    locations: [
      { name: 'Freetown (Goderich)', district: 'western-area-urban' },
      { name: 'Lungi', district: 'port-loko' },
      lunsar,
    ],
    featured: true,
    order: 5,
  },
  {
    name: 'Heart2Heart Natural Juices',
    slug: 'natural-juices',
    sector: 'food-beverage-production',
    stage: 'in-development',
    tagline: 'A growing beverage vision',
    summary: 'Heart2Heart Natural Juices is a beverage initiative within the Zeebundu portfolio.',
    overview: [
      'Heart2Heart Natural Juices reflects the group’s ambition to broaden its food and beverage offering. The initiative connects with our interests in agriculture, production and consumer retail.',
      'Product details and availability will be shared as the range is developed.',
    ],
    enquiryLabel: 'Contact the Group',
    featured: false,
    order: 6,
  },
  {
    name: 'Zee Flavors Restaurant',
    slug: 'zee-flavors',
    sector: 'food-beverage-production',
    stage: 'operating',
    tagline: 'Food and hospitality from Zeebundu',
    summary:
      'Zee Flavors is the group’s restaurant brand, connected with the Lunsar business destination.',
    overview: [
      'Zee Flavors Restaurant brings food service into the Zeebundu customer experience. Our aim is to provide a welcoming place to enjoy a meal as part of a visit to our Lunsar businesses.',
      'Contact the restaurant team for the current menu, service times and dining inquiries.',
    ],
    enquiryLabel: 'Enquire About Dining',
    locations: [lunsar],
    featured: true,
    order: 7,
  },
  {
    name: 'Zeebundu Food Import and Export',
    slug: 'food-trade',
    sector: 'food-beverage-production',
    stage: 'operating',
    tagline: 'Connecting food supply opportunities',
    summary:
      'Our food trade portfolio focuses on relationships between producers, suppliers and markets.',
    overview: [
      'Zeebundu Food Import and Export represents the group’s food trading interests. It connects with our broader ambitions in retail, agriculture and processing.',
      'Businesses interested in supplying products or discussing food trade opportunities are invited to contact the group with their product details and proposed terms.',
    ],
    enquiryLabel: 'Discuss a Food Trade Opportunity',
    featured: false,
    order: 8,
  },

  // Agriculture
  {
    name: 'Zeebundu Food Production and Processing',
    slug: 'food-production',
    sector: 'agriculture-food',
    stage: 'operating',
    tagline: 'Growing the foundations of food production',
    summary:
      'Our agribusiness activities connect crop cultivation with ambitions for food processing and market supply.',
    overview: [
      'Our farming activities span Kamranka, Lungi and Sanda. In 2026, we cultivated over 120 acres of rice and over 30 acres of corn, groundnuts and sweet potatoes combined across our farms.',
      'We process our produce into finished products through our own rice milling factory and other food processing facilities, connecting cultivation, processing and market supply. This integrated approach adds value to what we grow and supports food production in Sierra Leone.',
      'We welcome conversations with agricultural specialists, equipment suppliers and potential buyers.',
    ],
    enquiryLabel: 'Discuss an Agriculture Opportunity',
    stats: [
      { value: '120+', label: 'Acres of rice cultivated in 2026' },
      { value: '30+', label: 'Acres of corn, groundnuts and sweet potatoes in 2026' },
    ],
    locations: [{ name: 'Kamranka' }, { name: 'Lungi', district: 'port-loko' }, { name: 'Sanda' }],
    featured: false,
    order: 9,
  },
  {
    name: 'Zeebundu Cattle Farms and Meat Production',
    slug: 'cattle-farms',
    sector: 'agriculture-food',
    stage: 'operating',
    tagline: 'Developing the livestock value chain',
    summary: 'Our cattle farming interests form part of the group’s wider agriculture portfolio.',
    overview: [
      'Zeebundu Cattle Farms and Meat Production brings together our livestock interests and ambitions for the meat value chain. The focus is the responsible development of cattle farming alongside the group’s crop activities.',
      'Contact the group to discuss livestock operations, technical partnerships or future supply opportunities.',
    ],
    enquiryLabel: 'Enquire About Livestock Activities',
    locations: [{ name: 'Sanda' }],
    featured: false,
    order: 10,
  },

  // Hospitality & Venues
  {
    name: 'Zeebundu Conference Center',
    slug: 'conference-center',
    sector: 'hospitality',
    stage: 'operating',
    tagline: 'An ultra-modern setting for meetings and events',
    summary:
      'Our conference center at the Zeebundu gas station in Lunsar hosts conferences, meetings, workshops and training.',
    overview: [
      'Located at the Zeebundu gas station in Lunsar, our ultra-modern conference center provides a dedicated venue for conferences, business meetings, workshops, training sessions and professional gatherings.',
      'The center brings organizations, businesses and community groups together within the wider Zeebundu destination, alongside our fuel, retail, restaurant and other businesses.',
      'Contact our team to discuss your event, preferred date, expected attendance and venue requirements.',
    ],
    enquiryLabel: 'Enquire About the Conference Center',
    locations: [{ name: 'Lunsar, at the Zeebundu gas station', district: 'port-loko' }],
    featured: false,
    order: 11,
  },
  {
    name: 'Zeebundu Hotels and Resorts',
    slug: 'hotels-resorts',
    sector: 'hospitality',
    stage: 'in-development',
    tagline: 'Hospitality destinations in development',
    summary:
      'Our hospitality portfolio includes projects associated with Mahera Beach, Tagrin and John Obey.',
    overview: [
      'Zeebundu Hotels and Resorts brings together the group’s hospitality development ambitions in Sierra Leone. Our aim is to create welcoming destinations for relaxation, dining and time with family and friends.',
      'Our projects are Mahera Beach Hotel, Tagrin Hotel and John Obey Resort. All are coming soon.',
      'Contact the group for project information and partnership inquiries. Operating properties and guest services will be listed individually when available.',
    ],
    enquiryLabel: 'Enquire About Hospitality Projects',
    featured: false,
    order: 12,
  },

  // Construction
  {
    name: 'Zeebundu Construction and Building Supplies',
    slug: 'construction',
    sector: 'construction',
    stage: 'operating',
    tagline: 'Supporting projects from the ground up',
    summary:
      'Our construction and building supplies business supports the group’s investment in facilities and infrastructure.',
    overview: [
      'Zeebundu Construction and Building Supplies connects project development with the materials and practical work needed to deliver it. The group’s portfolio includes commercial facilities, production sites and hospitality development.',
      'Contact our team to discuss a building materials inquiry, a project requirement or a potential supply relationship.',
    ],
    enquiryLabel: 'Discuss a Project or Supply Need',
    featured: false,
    order: 13,
  },

  // Beauty & Health
  {
    name: 'ZeeLux Beauty Salon',
    slug: 'zeelux',
    sector: 'health-beauty',
    stage: 'operating',
    tagline: 'Time for personal care',
    summary: 'ZeeLux is the group’s salon brand for beauty and personal care services.',
    overview: [
      'ZeeLux Beauty Salon is being developed around welcoming service and attention to individual customer needs. Our beauty offering complements the group’s retail activities and provides a setting for personal care.',
      'Contact ZeeLux for the current service menu, appointment availability and prices.',
    ],
    enquiryLabel: 'Ask About Salon Services',
    featured: false,
    order: 14,
  },
  {
    name: 'Lux Zee',
    slug: 'lux-zee',
    sector: 'health-beauty',
    stage: 'operating',
    tagline: 'Beauty products and personal style',
    summary: 'Lux Zee is the group’s beauty retail business, complementing ZeeLux salon services.',
    overview: [
      'Lux Zee connects customers with beauty and personal care retail products. The business supports the group’s wider beauty offering through product sales, customer assistance and retail service.',
      'Contact the shop for the current range and availability or speak with our team about supplier opportunities.',
    ],
    enquiryLabel: 'Enquire About Products',
    featured: false,
    order: 15,
  },
  {
    name: 'Zeebundu Pharmacy',
    slug: 'pharmacy',
    sector: 'health-beauty',
    stage: 'in-development',
    tagline: 'Pharmacy development within the group',
    summary: 'A pharmacy has been identified as part of the group’s Lunsar business plans.',
    overview: [
      'Zeebundu’s pharmacy initiative forms part of the broader vision for convenient local services. Further information about its location, opening and services will be shared when finalized.',
    ],
    enquiryLabel: 'Contact the Group',
    featured: false,
    order: 16,
  },

  // Financial Services
  {
    name: 'Zeebundu Foreign Exchange and Microfinance',
    slug: 'financial-services',
    sector: 'financial-services',
    stage: 'in-development',
    tagline: 'Financial services in development',
    summary:
      'This portfolio area reflects the group’s interest in currency services and access to finance.',
    overview: [
      'Zeebundu Foreign Exchange and Microfinance is a financial services initiative within the group’s development portfolio. Further information about its business scope, service availability and customer requirements will be shared when these details are finalized.',
    ],
    enquiryLabel: 'Contact the Group',
    featured: false,
    order: 17,
  },
  {
    name: 'Zee Empowered Lending and Microfinance',
    slug: 'zee-empowered',
    sector: 'financial-services',
    stage: 'in-development',
    tagline: 'An ambition to widen economic opportunity',
    summary: 'Zee Empowered is the group’s lending and microfinance development initiative.',
    overview: [
      'Zee Empowered Lending and Microfinance represents our ambition to support economic participation through the development of appropriate financial services. Further information about the initiative, intended customer groups and product availability will be published when finalized.',
    ],
    enquiryLabel: 'Contact the Group',
    featured: false,
    order: 18,
  },

  // Security
  {
    name: 'Elite Lion Zuma Security Agency',
    slug: 'security',
    sector: 'security',
    stage: 'in-development',
    tagline: 'Security services development',
    summary:
      'Elite Lion Zuma Security Agency is the security business named within the Zeebundu portfolio.',
    overview: [
      'Elite Lion Zuma Security Agency forms part of the group’s portfolio in security services. Its intended focus is the protection needs of people, property and business facilities.',
      'Further information about its service scope and availability will be published as the business develops.',
    ],
    enquiryLabel: 'Contact the Group',
    featured: false,
    order: 19,
  },
]
