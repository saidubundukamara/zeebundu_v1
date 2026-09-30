import type { SeedBusiness } from './types'

export const businesses: SeedBusiness[] = [
  {
    name: 'Gas Stations',
    slug: 'gas-stations',
    sector: 'energy',
    tagline: 'Quality fuel and friendly service, every time you fill up.',
    summary:
      'Fuel stations supplying petrol, diesel and everyday essentials, with honest measures and friendly service.',
    overview: [
      'Our fuel stations supply quality petrol and diesel to motorists, commercial drivers and businesses. We focus on the basics that matter: accurate pumps, clean and safe forecourts, and staff who serve you quickly and courteously.',
      'Alongside fuel, selected stations offer lubricants and a small shop for drinks, snacks and travel essentials.',
    ],
    services: [
      { title: 'Petrol (PMS)', description: 'Quality petrol for cars, motorbikes and generators.' },
      { title: 'Diesel (AGO)', description: 'Diesel for trucks, buses, machinery and generators.' },
      {
        title: 'Engine oils & lubricants',
        description: 'Oils and lubricants for cars, motorbikes and generators.',
      },
      { title: 'Convenience shop', description: 'Drinks, snacks and everyday travel essentials.' },
      { title: 'Car wash', description: 'Exterior and interior cleaning while you wait.' },
      {
        title: 'Easy payment',
        description: 'Cash and mobile money (Orange Money, Africell Money) accepted.',
      },
    ],
    featured: false,
    order: 1,
  },
  {
    name: 'Petroleum Services',
    slug: 'petroleum-services',
    sector: 'energy',
    tagline: 'Dependable fuel supply for businesses and projects.',
    summary:
      'Bulk fuel supply and petroleum services for businesses, institutions and project sites.',
    overview: [
      'Our Petroleum Services business supplies fuel and related services to businesses and organisations that need a reliable, planned supply. We work with customers to understand their consumption and deliver on schedule, with careful attention to safe handling and accurate measurement.',
      'Whether you run a fleet, a generator-powered site or a construction project, our team can advise on the right supply arrangement for you.',
    ],
    services: [
      {
        title: 'Bulk fuel supply',
        description: 'Diesel and petrol supplied in bulk for commercial customers.',
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
    tagline: 'Comfortable stays and warm Sierra Leonean hospitality.',
    summary: 'Comfortable rooms, good food and attentive service for business and leisure guests.',
    overview: [
      'Our hotels offer comfortable, well-kept rooms and attentive service for business travellers, families and visitors. Guests can relax, eat well and work in comfort, with staff on hand to help with everything from airport transfers to local advice.',
      'We also host meetings, conferences and private events.',
    ],
    services: [
      {
        title: 'Accommodation',
        description: 'Clean, comfortable rooms and suites with the essentials you need.',
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
    tagline: 'Fresh local produce, grown with care for the land.',
    summary:
      'Crops grown in Sierra Leone using sustainable practices, supplying fresh produce to homes, markets and businesses.',
    overview: [
      'Our farming business grows fresh produce for Sierra Leonean households, traders and businesses. We work with the land rather than against it, using practices that protect the soil and conserve water so the farm stays productive season after season.',
      'We harvest through the rainy and dry seasons and supply produce direct from the farm. Our aim is to help more of the food eaten in Sierra Leone be grown in Sierra Leone.',
    ],
    services: [
      { title: 'Fresh vegetables', description: 'Seasonal vegetables harvested and sold fresh.' },
      { title: 'Staple crops', description: '' },
      { title: 'Fruit', description: 'Seasonal fruit harvested at the right time.' },
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
    tagline: 'Fresh, locally farmed fish for Sierra Leone.',
    summary:
      'Fish raised in carefully managed ponds or tanks, supplying fresh fish to homes, traders and businesses.',
    overview: [
      'Our fish farm raises fish in carefully managed conditions, giving customers a steady supply of fresh, locally produced fish. Farming fish reduces pressure on wild stocks and helps keep good-quality protein available all year.',
      'We pay close attention to water quality, feeding and hygiene, from the pond to the point of sale.',
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
    tagline: 'Healthy animals, quality meat, supporting local food supply.',
    summary:
      'Livestock raised with good animal care to supply quality meat and animals to local markets.',
    overview: [
      "We supply quality meat and animals to local markets, butchers and businesses, helping to strengthen Sierra Leone's own food supply.",
      'By producing locally, we reduce reliance on imported meat, create rural jobs and support the traders and processors who depend on a steady supply.',
    ],
    services: [
      {
        title: 'Meat supply',
        description: 'Quality meat for butchers, traders, hotels and restaurants.',
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
    tagline: 'Fresh eggs and quality chicken, produced locally.',
    summary: 'Locally produced eggs and chicken for households, traders, hotels and restaurants.',
    overview: [
      'Our poultry business produces fresh eggs and chicken for Sierra Leonean homes and businesses. Our birds are kept in clean, well-ventilated housing with good feed, clean water and regular health checks.',
      'We supply eggs and birds both retail and wholesale, giving customers a reliable local alternative to imported products.',
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
    tagline: 'Safe, clean drinking water for homes and businesses.',
    summary:
      'Purified drinking water in sachets, bottles and dispensers, delivered to homes, shops, offices and events.',
    overview: [
      'We produce safe, clean drinking water using a multi-stage purification process and careful quality checks at every step. Our water is packed in hygienic conditions and sealed to stay fresh until it reaches you.',
      'We supply households, shops, offices and events, from single bottles to bulk orders, with delivery available.',
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
      { title: 'Quality testing', description: 'Regular testing of every production batch.' },
    ],
    featured: true,
    order: 8,
  },
  {
    name: 'Natural Juices',
    slug: 'natural-juices',
    sector: 'food-beverage-production',
    tagline: 'Refreshing juices made from real fruit.',
    summary: 'Fruit juices made from local fruit, bottled for homes, shops and events.',
    overview: [
      'Our Natural Juices business turns fruit into refreshing, ready-to-drink juices. We source fruit locally where we can, supporting Sierra Leonean farmers, and prepare our juices under hygienic conditions.',
      'Our juices are available for individual customers, shops, restaurants and events.',
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
    tagline: 'A wide range of drinks for shops, businesses and events.',
    summary:
      'Production and distribution of soft drinks and other beverages for retailers, businesses and events.',
    overview: [
      'Our Beverages business supplies a range of drinks to retailers, hotels, restaurants and event organisers.',
      'We offer wholesale supply with dependable stock and delivery, so our customers can keep their shelves and fridges full.',
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
      { title: 'Delivery', description: 'Delivery to your business.' },
    ],
    featured: false,
    order: 10,
  },
  {
    name: 'Construction Materials',
    slug: 'construction-materials',
    sector: 'construction',
    tagline: 'Quality building materials, supplied when you need them.',
    summary:
      'Cement, steel, timber, plumbing and electrical materials for builders, contractors and homeowners.',
    overview: [
      'We supply quality construction materials for homes, commercial buildings and larger projects, including cement, steel, timber, plumbing and electrical materials. Contractors, developers and individual homeowners come to us for reliable stock, fair prices and practical advice.',
      'Our team helps you get the right materials in the right quantities, with delivery to site available.',
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
    tagline: 'Your trusted local pharmacy.',
    summary:
      'Genuine medicines, professional advice from qualified pharmacists, and everyday health and personal care products.',
    overview: [
      'Our pharmacy provides genuine, properly stored medicines and professional advice from qualified pharmacists. We dispense prescriptions, help customers choose the right over-the-counter treatment, and stock a range of health, baby and personal care products.',
    ],
    services: [
      {
        title: 'Prescriptions',
        description:
          'Prescriptions dispensed accurately, with clear advice on how to take your medicine.',
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
    tagline: 'Enhancing your beauty to let you shine.',
    summary: 'Professional hair, beauty and nail care in a relaxed, welcoming salon.',
    overview: [
      'Our salon offers professional hair, beauty and nail care from a skilled, friendly team. Every client gets individual attention, with treatments tailored to their hair, skin and style.',
      'We use quality products and keep up with the latest styles and techniques, in a clean, comfortable space where you can relax. From everyday grooming to bridal and special-occasion looks, we are here to help you look and feel your best.',
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
        description: 'Complete hair and makeup for brides and bridal parties.',
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
    tagline: 'Fair rates and trusted currency exchange in Sierra Leone.',
    summary:
      'Licensed foreign exchange bureau buying and selling major currencies, with money transfer services.',
    overview: [
      'Our foreign exchange bureau buys and sells major international and regional currencies at competitive rates, with clear pricing and courteous service. We serve travellers, traders, businesses and families receiving money from abroad.',
      "Visit any of our bureaus or call us for today's rates.",
    ],
    services: [
      {
        title: 'Currency exchange',
        description: 'Buy and sell major currencies at competitive rates.',
      },
      {
        title: 'Money transfer',
        description: 'Send and receive money internationally through trusted partners.',
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
    tagline: 'Flexible loans to help your business and family grow.',
    summary:
      'Small business and personal loans with clear terms, simple applications and personal service.',
    overview: [
      'We help small businesses, traders and individuals access the finance they need to grow. Our loans come with clear terms, a straightforward application process and staff who take time to understand your needs.',
      'We lend responsibly: we only approve loans we believe you can afford to repay, and we explain every cost before you sign.',
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
    tagline: 'Everyday shopping, all under one roof.',
    summary:
      'A convenient store for groceries, household goods and everyday essentials at fair prices.',
    overview: [
      'Zeemart makes everyday shopping simple. We stock a wide range of groceries, household goods and personal care products, so customers can find what they need in one place at fair prices.',
      'Our friendly staff keep the shelves stocked and the store clean, and we are always looking for ways to make shopping easier for our customers.',
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
