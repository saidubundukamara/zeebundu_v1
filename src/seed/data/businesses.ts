import type { SeedBusiness } from './types'

export const businesses: SeedBusiness[] = [
  {
    name: 'Gas Stations',
    slug: 'gas-stations',
    sector: 'energy',
    tagline: 'Petrol, diesel and a quick, friendly fill-up.',
    summary:
      'Fuel stations selling petrol, diesel and everyday essentials. Honest measures, friendly staff.',
    overview: [
      'Our fuel stations sell petrol and diesel to motorists, commercial drivers and businesses. We keep the pumps accurate and the forecourts clean and safe, and our staff serve you quickly.',
      'Some stations also sell lubricants and have a small shop for drinks, snacks and travel essentials.',
    ],
    services: [
      { title: 'Petrol (PMS)', description: 'Petrol for cars, motorbikes and generators.' },
      { title: 'Diesel (AGO)', description: 'Diesel for trucks, buses, machinery and generators.' },
      {
        title: 'Engine oils & lubricants',
        description: 'Oils and lubricants for cars, motorbikes and generators.',
      },
      { title: 'Convenience shop', description: 'Drinks, snacks and everyday travel essentials.' },
      { title: 'Car wash', description: 'Inside and outside cleaning while you wait.' },
      {
        title: 'Cash & mobile money',
        description: 'Pay cash, Orange Money or Africell Money.',
      },
    ],
    featured: false,
    order: 1,
  },
  {
    name: 'Petroleum Services',
    slug: 'petroleum-services',
    sector: 'energy',
    tagline: 'Planned fuel supply for businesses and project sites.',
    summary: 'Bulk fuel and petroleum services for businesses, institutions and project sites.',
    overview: [
      'We supply fuel and related services to businesses and organisations that need a planned supply. We look at how much you use, agree a schedule and deliver on it. Handling is safe and measurement is accurate.',
      'Running a fleet, a site on generator power or a construction project? Our team will help you set up the right supply.',
    ],
    services: [
      {
        title: 'Bulk fuel supply',
        description: 'Diesel and petrol in bulk for commercial customers.',
      },
      {
        title: 'Fuel delivery',
        description: 'Scheduled delivery to your site, depot or generator.',
      },
      {
        title: 'Fleet & corporate accounts',
        description: 'Supply arrangements for companies with vehicles or machinery.',
      },
      {
        title: 'Storage & handling',
        description: 'Safe storage and handling of petroleum products.',
      },
      {
        title: 'Lubricants',
        description: 'Industrial and automotive lubricants supplied to order.',
      },
    ],
    featured: false,
    order: 2,
  },
  {
    name: 'Hotels & Resorts',
    slug: 'hotels-resorts',
    sector: 'hospitality',
    tagline: 'Comfortable rooms and Sierra Leonean hospitality.',
    summary: 'Comfortable rooms, good food and helpful staff for business and leisure guests.',
    overview: [
      'Our hotels have comfortable, well-kept rooms for business travellers, families and visitors. You can rest, eat well and get work done. Our staff can arrange airport transfers and point you in the right direction around town.',
      'We also host meetings, conferences and private events.',
    ],
    services: [
      {
        title: 'Accommodation',
        description: 'Clean, comfortable rooms and suites.',
      },
      {
        title: 'Restaurant & bar',
        description: 'Local and international dishes, drinks and room service.',
      },
      {
        title: 'Meetings & events',
        description: 'Spaces for conferences, workshops, weddings and celebrations.',
      },
      {
        title: 'Guest services',
        description: 'Help with transport, bookings and local information.',
      },
    ],
    featured: true,
    order: 3,
  },
  {
    name: 'Farming Operations',
    slug: 'farming-operations',
    sector: 'agriculture-food',
    tagline: 'Fresh produce, grown here in Sierra Leone.',
    summary:
      'Crops grown in Sierra Leone with sustainable methods, sold fresh to homes, markets and businesses.',
    overview: [
      'Our farm grows fresh produce for Sierra Leonean households, traders and businesses. We protect the soil and save water, so the land keeps producing year after year.',
      'We harvest in both the rainy and dry seasons and sell straight from the farm. We want more of the food eaten in Sierra Leone to be grown here.',
    ],
    services: [
      { title: 'Fresh vegetables', description: 'Seasonal vegetables harvested and sold fresh.' },
      { title: 'Staple crops', description: '' },
      { title: 'Fruit', description: 'Seasonal fruit, picked ripe.' },
      {
        title: 'Wholesale supply',
        description: 'Regular supply for traders, restaurants, hotels and institutions.',
      },
      {
        title: 'Farm visits',
        description: 'Visits for schools, groups and partners by arrangement.',
      },
    ],
    featured: false,
    order: 4,
  },
  {
    name: 'Fish Farming',
    slug: 'fish-farming',
    sector: 'agriculture-food',
    tagline: 'Fresh fish, farmed here in Sierra Leone.',
    summary:
      'Fish raised in managed ponds or tanks and sold fresh to homes, traders and businesses.',
    overview: [
      'We raise fish in managed conditions, so customers get a steady supply of fresh, local fish. Farmed fish takes pressure off wild stocks and keeps protein on the market all year.',
      'We watch water quality, feeding and hygiene closely, from the pond to the point of sale.',
    ],
    services: [
      { title: 'Fresh fish', description: '' },
      {
        title: 'Wholesale supply',
        description: 'Regular supply for traders, restaurants and hotels.',
      },
      {
        title: 'Fingerlings',
        description: 'Young fish for other farmers starting or restocking ponds.',
      },
      { title: 'Processed fish', description: 'Cleaned, smoked or frozen fish.' },
    ],
    featured: false,
    order: 5,
  },
  {
    name: 'Livestock',
    slug: 'livestock',
    sector: 'agriculture-food',
    tagline: 'Healthy animals and locally raised meat.',
    summary: 'Animals raised with good care, supplying meat and live animals to local markets.',
    overview: [
      'We supply meat and live animals to local markets, butchers and businesses, so Sierra Leone can rely more on its own food.',
      'Producing locally cuts the need for imported meat and creates rural jobs. It also gives traders and processors a steady supply to depend on.',
    ],
    services: [
      {
        title: 'Meat supply',
        description: 'Meat for butchers, traders, hotels and restaurants.',
      },
      {
        title: 'Live animals',
        description: 'Healthy animals for sale, including for festivals and ceremonies.',
      },
      {
        title: 'Breeding stock',
        description: 'Selected animals for farmers building their herds.',
      },
      { title: 'Dairy', description: 'Fresh milk and dairy products.' },
    ],
    featured: false,
    order: 6,
  },
  {
    name: 'Poultry',
    slug: 'poultry',
    sector: 'agriculture-food',
    tagline: 'Fresh eggs and chicken, produced locally.',
    summary: 'Locally produced eggs and chicken for households, traders, hotels and restaurants.',
    overview: [
      'We produce fresh eggs and chicken for Sierra Leonean homes and businesses. Our birds live in clean, well-ventilated housing, with good feed, clean water and regular health checks.',
      'We sell eggs and birds retail and wholesale, so customers can buy local instead of imported.',
    ],
    services: [
      { title: 'Fresh eggs', description: 'Eggs sold by the tray, retail and wholesale.' },
      { title: 'Broilers', description: 'Chicken raised for meat, sold live or dressed.' },
      {
        title: 'Layers / point-of-lay birds',
        description: 'Birds for other farmers starting egg production.',
      },
      { title: 'Day-old chicks', description: 'Chicks for small farmers.' },
      {
        title: 'Wholesale supply',
        description: 'Regular orders for shops, hotels, restaurants and caterers.',
      },
    ],
    featured: false,
    order: 7,
  },
  {
    name: 'Water Production',
    slug: 'water-production',
    sector: 'food-beverage-production',
    tagline: 'Clean drinking water for homes and businesses.',
    summary:
      'Purified drinking water in sachets, bottles and dispensers, delivered to homes, shops, offices and events.',
    overview: [
      'Our water goes through several stages of purification, with checks at each step. It is packed in hygienic conditions and sealed until it reaches you.',
      'We supply households, shops, offices and events. Order one bottle or a bulk load, and we can deliver.',
    ],
    services: [
      { title: 'Sachet water', description: 'Purified water in sealed sachets, sold by the bag.' },
      { title: 'Bottled water', description: 'Purified water in a range of bottle sizes.' },
      {
        title: 'Dispenser bottles',
        description: 'Large refillable bottles for homes and offices.',
      },
      {
        title: 'Bulk & event supply',
        description: 'Large orders for businesses, events and institutions.',
      },
      { title: 'Delivery', description: 'Delivery to homes, shops and offices.' },
      { title: 'Batch testing', description: 'Every production batch is tested.' },
    ],
    featured: true,
    order: 8,
  },
  {
    name: 'Natural Juices',
    slug: 'natural-juices',
    sector: 'food-beverage-production',
    tagline: 'Juice made from real fruit.',
    summary: 'Juice made from local fruit, bottled for homes, shops and events.',
    overview: [
      'We make ready-to-drink juice from fruit. Where we can, we buy that fruit from Sierra Leonean farmers. Every batch is prepared under hygienic conditions.',
      'Buy it for yourself, your shop, your restaurant or your event.',
    ],
    services: [
      {
        title: 'Wholesale & events',
        description: 'Bulk orders for shops, restaurants, hotels and events.',
      },
    ],
    featured: false,
    order: 9,
  },
  {
    name: 'Beverages',
    slug: 'beverages',
    sector: 'food-beverage-production',
    tagline: 'Drinks for shops, businesses and events.',
    summary:
      'We make and distribute soft drinks and other beverages for retailers, businesses and events.',
    overview: [
      'We supply drinks to retailers, hotels, restaurants and event organisers.',
      'Wholesale customers get steady stock and delivery, so their shelves and fridges stay full.',
    ],
    services: [
      { title: 'Soft drinks', description: '' },
      { title: 'Other beverages', description: '' },
      {
        title: 'Wholesale supply',
        description: 'Bulk supply for shops, supermarkets and distributors.',
      },
      {
        title: 'Hotels, restaurants & events',
        description: 'Regular and one-off supply for hospitality and events.',
      },
      { title: 'Delivery', description: 'Delivered to your business.' },
    ],
    featured: false,
    order: 10,
  },
  {
    name: 'Construction Materials',
    slug: 'construction-materials',
    sector: 'construction',
    tagline: 'Building materials, there when you need them.',
    summary:
      'Cement, steel, timber, plumbing and electrical materials for builders, contractors and homeowners.',
    overview: [
      'We supply cement, steel, timber, plumbing and electrical materials for homes, commercial buildings and larger projects. Contractors, developers and homeowners buy from us because we keep stock, price fairly and give practical advice.',
      "Tell us what you're building and we'll help you order the right materials in the right amounts. We can deliver to site.",
    ],
    services: [
      {
        title: 'Cement & blocks',
        description: 'Cement, blocks, sand and aggregates for foundations and walls.',
      },
      {
        title: 'Steel & metal',
        description: 'Reinforcement bars (rebar), roofing sheets, wire and fasteners.',
      },
      { title: 'Timber', description: 'Timber for roofing, formwork and joinery.' },
      { title: 'Plumbing', description: 'Pipes, fittings, tanks and sanitary ware.' },
      { title: 'Electrical', description: 'Cables, conduits, switches and fittings.' },
      {
        title: 'Delivery & bulk orders',
        description: 'Delivery to site and bulk pricing for larger projects.',
      },
    ],
    featured: false,
    order: 11,
  },
  {
    name: 'Pharmacy',
    slug: 'pharmacy',
    sector: 'health-beauty',
    tagline: 'Your local pharmacy, with qualified pharmacists.',
    summary:
      'Genuine medicines, advice from qualified pharmacists, and everyday health and personal care products.',
    overview: [
      'We sell genuine medicines, stored properly, and our qualified pharmacists are there to advise you. We dispense prescriptions and help you pick the right over-the-counter treatment. We also stock health, baby and personal care products.',
    ],
    services: [
      {
        title: 'Prescriptions',
        description:
          'Prescriptions dispensed accurately, with clear instructions on how to take your medicine.',
      },
      {
        title: 'Over-the-counter medicines',
        description: 'Everyday treatments for pain, colds, malaria, stomach upsets and more.',
      },
      {
        title: 'Pharmacist advice',
        description: 'Free, confidential advice on medicines and minor health concerns.',
      },
      {
        title: 'Health & wellness',
        description: 'Vitamins, supplements and health monitoring devices.',
      },
      {
        title: 'Personal & baby care',
        description: 'Skincare, oral care, hair care and baby products.',
      },
      { title: 'Health checks', description: 'Blood pressure and blood sugar checks.' },
    ],
    featured: false,
    order: 12,
  },
  {
    name: 'Cosmetics Salon',
    slug: 'cosmetics-salon',
    sector: 'health-beauty',
    tagline: 'Hair, beauty and nail care by a skilled team.',
    summary: 'Hair, beauty and nail care in a relaxed, friendly salon.',
    overview: [
      'Our salon offers hair, beauty and nail care from a skilled, friendly team. Each client gets individual attention, with treatments matched to their hair, skin and style.',
      'We use good products and keep up with new styles and techniques. The salon is clean and comfortable. Come in for everyday grooming, or for a bridal or special-occasion look.',
    ],
    services: [
      {
        title: 'Hair styling',
        description: 'Cuts, styling, braiding, weaves, relaxing and treatments.',
      },
      {
        title: 'Facials & skincare',
        description: 'Cleansing and facial treatments for healthy skin.',
      },
      { title: 'Nail care', description: 'Manicures, pedicures and nail art.' },
      { title: 'Makeup', description: 'Makeup for everyday, events and photo shoots.' },
      {
        title: 'Bridal packages',
        description: 'Hair and makeup for brides and bridal parties.',
      },
      { title: 'Beauty products', description: 'Hair and beauty products available to buy.' },
    ],
    featured: false,
    order: 13,
  },
  {
    name: 'Foreign Exchange',
    slug: 'foreign-exchange',
    sector: 'financial-services',
    tagline: 'Fair rates and clear pricing on currency exchange.',
    summary: 'A bureau buying and selling major currencies, with money transfer services.',
    overview: [
      'We buy and sell major international and regional currencies at competitive rates, and our prices are clear. Our customers include travellers, traders, businesses and families receiving money from abroad.',
      "Visit one of our bureaus or call us for today's rates.",
    ],
    services: [
      {
        title: 'Currency exchange',
        description: 'Buy and sell major currencies at competitive rates.',
      },
      {
        title: 'Money transfer',
        description: 'Send and receive money internationally through our partners.',
      },
      {
        title: 'Business exchange',
        description: 'Larger currency transactions for traders and companies.',
      },
      {
        title: 'Bureau & agent network',
        description: 'Access through our bureaus and authorised partners.',
      },
    ],
    featured: true,
    order: 14,
  },
  {
    name: 'Micro-Finance & Lending',
    slug: 'micro-finance-lending',
    sector: 'financial-services',
    tagline: 'Loans to help your business and family grow.',
    summary:
      'Small business and personal loans with clear terms, a simple application and staff who listen.',
    overview: [
      'We lend to small businesses, traders and individuals who need finance to grow. Our terms are clear, applying is straightforward, and our staff take time to understand what you need.',
      'We lend responsibly. We only approve loans we believe you can repay, and we explain every cost before you sign.',
    ],
    services: [
      { title: 'Business startup loan', description: 'For new businesses getting started.' },
      { title: 'Working capital loan', description: 'To buy stock and manage cash flow.' },
      { title: 'Equipment finance', description: 'To buy equipment for your business.' },
      {
        title: 'Personal loan',
        description: 'For school fees, medical costs or home improvements.',
      },
    ],
    featured: false,
    order: 15,
  },
  {
    name: 'Zeemart Shopping',
    slug: 'zeemart-shopping',
    sector: 'retail',
    tagline: 'Everyday shopping under one roof.',
    summary: 'Groceries, household goods and everyday essentials in one store, at fair prices.',
    overview: [
      'Zeemart stocks groceries, household goods and personal care products, so you can get what you need in one place at fair prices.',
      'Our staff keep the shelves full and the store clean.',
    ],
    services: [
      { title: 'Groceries', description: 'Food staples, fresh items, snacks and drinks.' },
      {
        title: 'Household goods',
        description: 'Cleaning products, kitchenware and home essentials.',
      },
      { title: 'Personal care', description: 'Toiletries, cosmetics and baby products.' },
      {
        title: 'Group products',
        description: 'Products from other Zeebundu businesses, such as water and juices.',
      },
      { title: 'Delivery / online orders', description: 'Order by phone or WhatsApp.' },
    ],
    featured: true,
    order: 16,
  },
]
