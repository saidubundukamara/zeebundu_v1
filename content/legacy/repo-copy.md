# Legacy repo copy (harvested from `~/Dev/zeebundu_old`)

Copy is quoted verbatim from the old Next.js site. Source references are `path:line`, relative to `~/Dev/zeebundu_old`. Nothing was reworded. Most business copy in the old repo is **template fallback/placeholder text** (generic, often US-centric), not real Zeebundu business facts. Treat everything below as raw material to review, not as approved copy.

Where the old code built one sentence across several JSX lines, the lines are joined here with a single space.

---

## Group copy

### Site metadata

- Title: "ZeeBundu - Multi-Business Platform" (`app/layout.tsx:21`)
- Description: "Discover exceptional businesses across multiple industries - from gas stations to luxury hotels, organic farms to healthcare services." (`app/layout.tsx:22`)

### Home hero (`app/page.tsx`)

- Badge: "Discover Exceptional Businesses" (`app/page.tsx:219`)
- Heading: "Welcome to" + "Zeebundu" (`app/page.tsx:224`, `app/page.tsx:232`)
- Sub-heading: "Your gateway to exceptional businesses across multiple industries. From automotive services to luxury hospitality, sustainable farming to healthcare excellence." (`app/page.tsx:244-245`)
- Stats (the first two are computed from the database; the last two are hard-coded):
  - "{n}+" "Active Businesses" (`app/page.tsx:254`)
  - "{n}+" "Industries" (`app/page.tsx:260`)
  - "24/7" "Service" (`app/page.tsx:263-264`)
  - "4.9★" "Rating" (`app/page.tsx:267-268`)
- CTAs: "Explore Businesses" (`app/page.tsx:279`), "Learn More" (`app/page.tsx:287`)
- Scroll hint: "Scroll to explore" (`app/page.tsx:295`)

### Business portfolio section

- Heading: "Our Business Portfolio" (`app/page.tsx:318`)
- Intro: "Discover our diverse range of exceptional businesses, each committed to excellence and innovation in their respective industries." (`app/page.tsx:321`)
- Card CTA: "Explore Business" (`app/page.tsx:440`)

### About section: "Building Excellence Across Industries"

- Heading: "Building Excellence Across Industries" (`app/page.tsx:493`)
- Body: "ZeeBundu represents a diverse portfolio of exceptional businesses, each committed to excellence and innovation. From automotive services that keep you moving to luxury hospitality that creates unforgettable experiences, we bring together the best in every industry." (`app/page.tsx:497-499`)
- Stat labels: "Business Sectors" (`app/page.tsx:507`), "Businesses" (`app/page.tsx:513`). Both values are computed.
- CTAs: "View All Services" (`app/page.tsx:519`), "Contact Us" (`app/page.tsx:522`)

### Navigation

- "Home", "About", "Services" (the Services dropdown is filled from the DB) (`components/layout/Navigation.tsx:26-28`)

### Footer (`components/layout/Footer.tsx`)

- Brand: "Zeebundu" (`components/layout/Footer.tsx:64`)
- Tagline: "Building tomorrow's success stories through diverse business ventures rooted in quality, sustainability, and community growth." (`components/layout/Footer.tsx:68-70`)
- Column "Our Ventures" (`:97`): "Gas Stations", "Hotels & Resorts", "Farming Operations", "Fish Farming", "Water Production", "Natural Juices" (`components/layout/Footer.tsx:101-106`)
- Column "Services" (`:123`): "Petroleum Services", "Construction Materials", "Cosmetics Salon", "Beverages", "Foreign Exchange", "Zeemart Shopping" (`components/layout/Footer.tsx:127-135`)
  - The footer lists 12 of the 16 businesses. Livestock, Poultry, Pharmacy and Micro-Finance & Lending are missing.
- Column "Stay Connected" (`:152`):
  - Phone: "+1 (555) 123-4567" (`components/layout/Footer.tsx:159`)
  - Email: "hello@zeebundu.com" (`components/layout/Footer.tsx:163`)
  - Location: "Global Operations" (`components/layout/Footer.tsx:167`)
- Newsletter: "Newsletter" / "Get updates on our latest ventures and opportunities." (`components/layout/Footer.tsx:174-177`)
- Copyright: "© {year} Zeebundu. All rights reserved." (`components/layout/Footer.tsx:204`)
- Sign-off: "Crafted with care for communities worldwide." (`components/layout/Footer.tsx:207`)
- Legal links: "Privacy Policy", "Terms of Service" (`components/layout/Footer.tsx:217`, `:223`). The pages behind these links do not exist.
- Social links (Facebook, Twitter, LinkedIn, Instagram) all point to `#` (`components/layout/Footer.tsx:76-79`)

### Generic shared-component copy (reusable microcopy)

- Contact: "Get In Touch" / "We'd love to hear from you. Send us a message and we'll respond as soon as possible." (`components/shared/Contact.tsx:37-38`)
- Contact success: "Your message has been sent successfully. We'll get back to you soon." (`components/shared/Contact.tsx:222`)
- Coming soon: "Coming Soon" / "We're putting the finishing touches on something amazing." / "Stay tuned for updates!" (`components/shared/ComingSoonOverlay.tsx:41-53`)
- Services category pages: "Discover {n} exceptional {category} businesses. Find premium services and top-rated providers in your area." (`app/services/[category]/page.tsx:97`)
- Services category not found: "Sorry, we couldn't find any businesses in this service category. It might not exist yet or all businesses in this category might be inactive." (`app/services/[category]/not-found.tsx:22-23`)

### No About or Contact pages

The old site had no `app/about` or `app/contact` routes. "About" linked to the `#about` anchor on the home page. `lib/content/*` holds only generic CMS scaffolding defaults, such as "Learn more about our company, mission, and values." (`lib/content/content-api.ts:228`), and no real Zeebundu copy.

### Seed data (`scripts/seed-businesses.js`)

This is fictional US sample data. None of it is Zeebundu's own, and two entries are not among the 16 businesses:

- "Metro Auto Services": "Complete automotive care center offering expert repairs, maintenance, diagnostics, and professional service for all vehicle makes and models." (`scripts/seed-businesses.js:165-167`)
- "Taste of Italy Restaurant": "Authentic Italian cuisine featuring traditional recipes, fresh ingredients, and warm hospitality in an elegant dining atmosphere." (`scripts/seed-businesses.js:203-205`)

The other seed entries (BlueFuel, Grand Resort & Spa, Green Valley Organic Farm, HealthCare Plus Pharmacy) are listed under their businesses below.

**Group cleanup flags:**

- US placeholder phone "+1 (555) 123-4567" in the footer (`components/layout/Footer.tsx:159`)
- "Global Operations" and "communities worldwide" don't say Sierra Leone; no real address anywhere
- Brand spelling is inconsistent: "ZeeBundu" (`app/layout.tsx:21`, `app/page.tsx:497`, `app/services/[category]/page.tsx:96,100`, admin UI) vs "Zeebundu" (`app/page.tsx:232`, `components/layout/Footer.tsx:64,204`, `components/layout/Navigation.tsx:85,102`, `components/business-templates/ConstructionMaterialsTemplate.tsx:380`). Emails use a third form, "bundu" (`bundugasstations.com`, `bunduhealthcare.com`, `bundufarm.com`, `bundusalon.com`, `materials@bundu.com`, `water@bundu.com`)
- Hero and about copy lead with "automotive services", which is not one of the 16 businesses
- The "4.9★ Rating" and "24/7 Service" stats are hard-coded and unsourced
- Social links are dead (`#`)
- Seed data is entirely fictional US businesses with CA 9021x addresses and +1 (555) phones (`scripts/seed-businesses.js:11-240`)

---

## Businesses

### Gas Stations

**Tagline / summary**

- Default hero subtitle and badge: "Premium Fuel Station" (`components/business-templates/GasStationTemplate.tsx:163`, `:169`)
- Seed name: "BlueFuel Gas Station". Description: "Premium fuel station with modern amenities, convenience store, and 24/7 service. Your one-stop destination for quality fuel and automotive essentials." (`scripts/seed-businesses.js:13-15`)
- Seed SEO: "BlueFuel Gas Station - Premium Fuel & Automotive Services" / "Experience premium fuel quality and exceptional service at BlueFuel Gas Station. 24/7 convenience store, car wash, and automotive essentials." (`scripts/seed-businesses.js:27-28`)

**Overview**

- About (default): "Experience premium fuel quality, exceptional service, and modern convenience at our state-of-the-art gas stations." (`components/business-templates/GasStationTemplate.tsx:194`)
- Services intro: "Station Services" / "More than just fuel - discover our comprehensive range of services designed for your convenience" (`components/business-templates/GasStationTemplate.tsx:269-270`)
- Locations: "Find Your Nearest Station" / "Conveniently located stations with 24/7 service and modern amenities" (`components/business-templates/GasStationTemplate.tsx:287`, `:290`)
- Contact: "Get in Touch" / "Have questions about our services or need assistance? We're here to help 24/7." (`components/business-templates/GasStationTemplate.tsx:209-210`)

**Fuel types** (`components/business-templates/GasStationTemplate.tsx:66-94`)

- Regular 87: "$3.49", "Standard unleaded gasoline"
- Plus 89: "$3.69", "Mid-grade unleaded gasoline"
- Premium 93: "$3.89", "High-octane premium fuel"
- Diesel: "$3.99", "Ultra-low sulfur diesel"

**Services** (`components/business-templates/GasStationTemplate.tsx:118-139`)

- Convenience Store: "Snacks, drinks, and essentials". Features: 24/7 Access, Fresh Food, Hot Coffee
- Car Wash: "Professional car cleaning services". Features: Touchless Wash, Wax Protection, Interior Cleaning
- Payment Options: "Multiple payment methods accepted". Features: Credit Cards, Mobile Pay, Fleet Cards
- Quick Service: "Fast food and beverages". Features: Fresh Coffee, Hot Food, Cold Drinks

**Stats** (`components/business-templates/GasStationTemplate.tsx:199-202`)

- 15+ Locations · 24/7 Always Open · 100% Certified Staff · 4.8 Customer Rating

**Locations** (`components/business-templates/GasStationTemplate.tsx:297-318`)

- Downtown Station: "123 Main Street, Downtown District", "+1 (555) 123-4567", "24/7 - Always Open". Amenities: Car Wash, Convenience Store, ATM
- Highway Express: "456 Highway 101, Mile Marker 45", "+1 (555) 234-5678", "24/7 - Always Open". Amenities: Fast Food, Truck Parking, Restrooms
- Suburban Center: "789 Oak Avenue, Suburban Plaza", "+1 (555) 345-6789", "5:00 AM - 11:00 PM Daily". Amenities: Coffee Shop, Electric Charging, WiFi

**Contact defaults**

- "+1 (555) 123-FUEL", "support@bundugasstations.com", "Multiple locations nationwide", "Daily" "24/7 - Always Open" (`components/business-templates/GasStationTemplate.tsx:212-216`)
- Seed: "info@bluefuelstation.com", "123 Highway Blvd, Downtown District, CA 90210" (`scripts/seed-businesses.js:34-36`)
- CTAs: "Find Station", "View Services", "Get Directions" (`components/business-templates/GasStationTemplate.tsx:177`, `:183`, `:258`)

**Planned features** (IMPLEMENTATION_PLAN): Fuel pricing display, Station amenities, Location map, Operating hours, Loyalty program info (`IMPLEMENTATION_PLAN.md:1035-1040`)

**Planning-doc example data** (`IMPLEMENTATION_PLAN.md:41-170`): "Shell Gas Station", "Premium Fuel Services" / "Quality you can trust, service you deserve", badges "24/7 Open", "Premium Fuel", "Clean Facilities". About: "We've been serving the community for over 20 years...", mission "To provide the highest quality fuel and services...", vision "To be the leading gas station in the region...", values Quality, Service, Community, Innovation. Stats: 20+ Years of Service, 50K+ Happy Customers, 10M+ Gallons Served. Testimonial from "John Smith": "Best gas station in town! Always clean and friendly service."

**Cleanup flags:**

- USD "$" fuel prices per US octane grades (Regular 87 / Plus 89 / Premium 93); "Gallons Served" (Sierra Leone sells by the litre)
- US phones: +1 (555) 123-FUEL, +1 (555) 123/234/345-xxxx
- US addresses: "123 Highway Blvd, Downtown District, CA 90210", "456 Highway 101", "Oak Avenue, Suburban Plaza"; "Multiple locations nationwide"
- Fictional brand "BlueFuel"; the planning doc uses the real brand "Shell"
- "Electric Charging", "Fleet Cards", "Touchless Wash" are US-market amenities; need verification
- Stats (15+ locations, 4.8 rating) are invented
- Email domain "bundugasstations.com" (brand spelling)

---

### Petroleum Services

**Tagline / summary:** _No copy found in repo_. The only mention is a footer link, "Petroleum Services" (`components/layout/Footer.tsx:127`).

**Planned features** (IMPLEMENTATION_PLAN): Service offerings, Equipment showcase, Safety protocols, Industry certifications, Project portfolio (`IMPLEMENTATION_PLAN.md:1161-1166`)

**Cleanup flags:**

- None (no copy). All copy must be written from scratch.

---

### Hotels & Resorts

**Tagline / summary**

- Default subtitle and badge: "Luxury Hotel & Resort" (`components/business-templates/HotelTemplate.tsx:208`, `:214`)
- Seed: "Grand Resort & Spa". "Luxury resort and spa offering world-class accommodations, fine dining, and rejuvenating wellness experiences in a breathtaking setting." (`scripts/seed-businesses.js:51-53`)
- Seed SEO: "Grand Resort & Spa - Luxury Accommodations & Wellness" / "Experience luxury at Grand Resort & Spa. Premium accommodations, world-class spa services, fine dining, and exceptional hospitality." (`scripts/seed-businesses.js:65-66`)

**Overview**

- About: "About Our Resort" / "Experience unparalleled luxury and comfort at our world-class resort, where exceptional service meets breathtaking destinations." (`components/business-templates/HotelTemplate.tsx:238-239`)
- Rooms: "Luxury Rooms & Suites" / "Discover our collection of luxury accommodations in stunning destinations worldwide" (`components/business-templates/HotelTemplate.tsx:281`, `:284`)
- Amenities: "World-Class Amenities" / "Experience luxury and comfort with our comprehensive range of premium amenities" (`components/business-templates/HotelTemplate.tsx:355`, `:358`)
- Services: "Hotel Services" / "Indulge in our comprehensive range of luxury services designed to exceed your expectations" (`components/business-templates/HotelTemplate.tsx:386-387`)
- Locations: "Our Premium Locations" / "Discover our luxury properties in breathtaking destinations around the world" (`components/business-templates/HotelTemplate.tsx:404`, `:407`)
- Contact: "Ready to Experience Luxury?" / "Contact our reservations team to book your perfect getaway and create unforgettable memories." (`components/business-templates/HotelTemplate.tsx:254-255`)
- CTAs: "Book Your Stay", "Explore Resort", "Book Now", "Book This Location" (`components/business-templates/HotelTemplate.tsx:222`, `:228`, `:338`, `:493`)

**Rooms** (`components/business-templates/HotelTemplate.tsx:72-96`)

- Mountain Retreat Suite: "From $450/night", rating 4.9, max 2 guests. Features: Ski Access, Spa & Wellness, Fine Dining, Mountain Views. Amenities: King Bed, Mountain View, Fireplace, Balcony
- Tropical Paradise Villa: "From $650/night", rating 4.8, max 4 guests. Features: Private Beach, Water Sports, Overwater Villa, Coral Reef. Amenities: Ocean View, Private Pool, Butler Service, Water Access
- Desert Oasis Suite: "From $320/night", rating 4.7, max 3 guests. Features: Camel Trekking, Stargazing, Traditional Cuisine, Desert Safari. Amenities: Desert View, Traditional Decor, Stargazing Deck, Cultural Tours

**Amenities** (`components/business-templates/HotelTemplate.tsx:104-135`)

- High-Speed WiFi: "Complimentary high-speed internet throughout the property"
- Valet Parking: "Secure valet parking service available 24/7"
- Fine Dining: "24-hour room service with gourmet dining options"
- Spa & Wellness: "Full-service spa with massage and wellness treatments"
- Fitness Center: "State-of-the-art fitness facilities and personal training"
- Pool & Recreation: "Multiple pools, fitness center, and recreational facilities"

**Services** (`components/business-templates/HotelTemplate.tsx:156-180`)

- Accommodation: "Luxury rooms and suites with premium amenities". Premium Bedding, Room Service, Climate Control, Safe
- Dining Experience: "World-class restaurants and culinary experiences". Fine Dining, Room Service, Bar & Lounge, Local Cuisine
- Spa & Wellness: "Rejuvenating spa treatments and wellness programs". Massage Therapy, Wellness Programs, Beauty Treatments, Relaxation
- Recreation: "Adventure activities and recreational facilities". Pool Access, Adventure Tours, Sports Facilities, Entertainment

**Stats** (`components/business-templates/HotelTemplate.tsx:244-247`)

- 12+ Luxury Properties · 500+ Guest Rooms · 4.8 Average Rating · 24/7 Concierge Service

**Locations** (`components/business-templates/HotelTemplate.tsx:414-435`)

- Mountain Resort: "Swiss Alps, Switzerland", "+41 (0)27 123 4567", "24/7 Check-in Available"
- Tropical Paradise: "Maldives Islands", "+960 123 4567", "24/7 Butler Service"
- Desert Oasis: "Sahara Desert, Morocco", "+212 123 456 789", "24/7 Desert Experience"

**Contact defaults**

- "+1 (555) 123-STAY", "reservations@luxury-resort.com", "Luxury destinations worldwide", "Daily" / "Reservations" "24/7 - Always Available" (`components/business-templates/HotelTemplate.tsx:257-261`)
- Seed: "+1 (555) 456-LUXURY", "reservations@grandresort.com", "456 Paradise Drive, Scenic Valley, CA 90211" (`scripts/seed-businesses.js:72-74`)

**Planned features** (IMPLEMENTATION_PLAN): Room showcase, Amenities gallery, Booking integration, Location highlights, Guest testimonials (`IMPLEMENTATION_PLAN.md:1044-1049`)

**Cleanup flags:**

- Swiss Alps, Maldives and Sahara/Morocco locations, with Swiss/Maldivian/Moroccan phone numbers; ski access, camel trekking and overwater villas
- USD "$" room rates ($320–$650/night)
- US phones +1 (555) 123-STAY / 456-LUXURY; US address "CA 90211"
- Stats (12+ properties, 500+ rooms) are invented
- Generic "Grand Resort & Spa" name and "luxury-resort.com" email
- Needs real Sierra Leone property names, room types and Leone pricing

---

### Farming Operations

**Tagline / summary**

- Hero: "Fresh from {business.name}" / "Sustainable Farm & Local Agriculture" (`components/business-templates/FarmingTemplate.tsx:217-218`)
- Hero description: "Experience the finest organic produce grown with regenerative farming practices. From our fields to your table, we're cultivating a healthier tomorrow." (`components/business-templates/FarmingTemplate.tsx:219`)
- Badge: "Certified Organic Farm" (`components/business-templates/FarmingTemplate.tsx:224`)
- Seed: "Green Valley Organic Farm". "Sustainable organic farming operation producing fresh, pesticide-free vegetables, fruits, and herbs using environmentally friendly practices." (`scripts/seed-businesses.js:89-91`)
- Seed SEO: "Green Valley Organic Farm - Sustainable Agriculture & Fresh Produce" / "Fresh organic produce from Green Valley Organic Farm. Sustainable farming practices, pesticide-free vegetables, fruits, and herbs." (`scripts/seed-businesses.js:103-104`)

**Overview**

- About: "About Our Farm" / "Our commitment to sustainable farming practices drives everything we do. We believe in working with nature to produce the highest quality organic food while caring for the land that sustains us." (`components/business-templates/FarmingTemplate.tsx:254-255`)
- Values: Sustainability, Quality, Community, Transparency, Environmental Stewardship (`components/business-templates/FarmingTemplate.tsx:258`)
- Products: "Fresh Harvest" / "Discover our premium selection of organic produce, grown with care and harvested at peak freshness." (`components/business-templates/FarmingTemplate.tsx:312-315`)
- Practices: "Sustainable Practices" / "Our commitment to environmental stewardship drives every decision we make on the farm." (`components/business-templates/FarmingTemplate.tsx:383-386`)
- Certifications: "Our Certifications" / "We maintain the highest standards and certifications in organic and sustainable farming." (`components/business-templates/FarmingTemplate.tsx:436-439`)
- Services: "Farm Services" / "Discover our comprehensive range of sustainable farming services and community programs" (`components/business-templates/FarmingTemplate.tsx:469-470`)
- Contact: "Ready to Harvest?" / "Connect with us to learn more about our sustainable farming practices, schedule a farm tour, or order fresh organic produce." (`components/business-templates/FarmingTemplate.tsx:270-271`)
- CTAs: "Shop Fresh Produce", "Schedule Farm Tour", "Add to Cart" (`components/business-templates/FarmingTemplate.tsx:232`, `:238`, `:366`)

**Products** (`components/business-templates/FarmingTemplate.tsx:73-106`)

- Organic Vegetables (Fresh Produce): "Farm-fresh organic vegetables grown with sustainable practices". "From $3/lb", Year-round. 100% Organic, Non-GMO, Locally Grown, Pesticide Free
- Heritage Grains (Grains & Seeds): "Ancient grain varieties preserved through traditional farming". "From $8/lb", Fall Harvest. Heritage Varieties, Stone Ground, Whole Grain, Traditional Methods
- Free-Range Eggs (Dairy & Eggs): "Fresh eggs from pasture-raised, happy chickens". "$6/dozen", Daily Fresh. Free Range, Pasture Raised, No Antibiotics, Farm Fresh
- Seasonal Fruits (Fresh Produce): "Tree-ripened fruits harvested at peak freshness". "From $4/lb", Seasonal. Tree Ripened, Peak Freshness, Natural Sugars, Vine Fresh

**Practices** (`components/business-templates/FarmingTemplate.tsx:114-138`)

- Organic Farming: "Certified organic practices without synthetic pesticides or fertilizers". 100% Chemical-Free. Certified Organic, Soil Health Focus, Natural Pest Control, Biodiversity
- Solar Powered: "Renewable energy systems powering our farm operations". Carbon Neutral. Solar Panels, Clean Energy, Reduced Carbon Footprint, Sustainable Power
- Regenerative Agriculture: "Practices that restore soil health and biodiversity". Soil Restoration. Cover Crops, Composting, Water Conservation, Wildlife Habitat
- Community Supported: "Direct partnerships with local families and restaurants". Local Impact. CSA Programs, Local Partnerships, Farm Tours, Educational Programs

**Certifications** (`components/business-templates/FarmingTemplate.tsx:144-147`)

- USDA Organic, Non-GMO Project, Regenerative Organic, Animal Welfare Approved

**Services** (`components/business-templates/FarmingTemplate.tsx:166-190`)

- Fresh Produce: "Seasonal organic vegetables and fruits grown with care". Organic Certified, Seasonal Varieties, Peak Freshness, Local Delivery
- Sustainable Practices: "Environmentally conscious farming methods that restore the land". Regenerative Agriculture, Water Conservation, Soil Health, Biodiversity
- Farm Education: "Educational tours and workshops about sustainable farming". Farm Tours, Workshops, School Programs, Hands-on Learning
- CSA Program: "Community Supported Agriculture with weekly produce boxes". Weekly Boxes, Seasonal Variety, Member Benefits, Local Pickup

**Stats** (`components/business-templates/FarmingTemplate.tsx:245-248`)

- 500+ Acres Farmed · 50+ Crop Varieties · 15 Years Experience · 1000+ Happy Customers

**Contact defaults** (`components/business-templates/FarmingTemplate.tsx:273-279`)

- "+1 (555) HARVEST", "hello@bundufarm.com", "Sustainable Farm Location"
- Farm Store: Mon-Fri 8:00 AM - 6:00 PM; Saturday 8:00 AM - 4:00 PM; Sunday 10:00 AM - 2:00 PM
- Seed: "+1 (555) 789-FARM", "harvest@greenvalleyfarm.com", "789 Valley Road, Rural County, CA 90212" (`scripts/seed-businesses.js:110-112`)

**Planned features** (IMPLEMENTATION_PLAN): Crop information, Farming practices, Seasonal calendar, Farm tours, Product showcase (`IMPLEMENTATION_PLAN.md:1053-1058`)

**Cleanup flags:**

- USDA Organic / Non-GMO Project / Animal Welfare Approved are US certifications; verify or remove
- USD "$" prices per lb/dozen (imperial units); "Fall Harvest" (Sierra Leone has rainy/dry seasons, not fall)
- US phones +1 (555) HARVEST / 789-FARM; address "CA 90212"
- CSA programs, "Heritage Grains", "Stone Ground" read as US farm-market copy; no mention of local crops (rice, cassava, palm oil, etc.)
- Stats (500+ acres, 15 years) are invented
- "Certified Organic" and "Carbon Neutral" claims need verification

---

### Fish Farming

**Tagline / summary:** _No copy found in repo_. The only mention is a footer link, "Fish Farming" (`components/layout/Footer.tsx:104`).

**Planned features** (IMPLEMENTATION_PLAN): Fish species, Farming methods, Sustainability practices, Fresh fish availability, Processing facilities (`IMPLEMENTATION_PLAN.md:1080-1085`)

**Cleanup flags:**

- None (no copy)

---

### Livestock

Source: `LIVESTOCK_TEMPLATE_POST_EXAMPLE.md` (content POST payload). The template itself has no fallbacks and renders only DB content. The same text is duplicated as admin defaults in `app/admin/businesses/[id]/content/page.tsx:330-365`.

**Tagline / summary**

- Hero: "Cattle" / "Farm" (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:20-21`)
- Hero description: "Three generations of sustainable livestock farming. We raise premium cattle, dairy cows, sheep, and poultry with the highest standards of animal welfare." (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:22`)
- Badge: "Premium Livestock Ranch" (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:23`)
- CTAs: "Schedule Ranch Tour", "View Our Animals" (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:27`, `:32`)

**Hero highlights** (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:40-60`)

- Premium Quality: "Carefully selected livestock for superior products". Grade A
- Animal Care: "Ethical and humane livestock management". Priority
- Fresh Products: "Farm-to-table freshness guaranteed". Daily
- Local Business: "Supporting the community with quality livestock". Trusted

**Operations** (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:68-110`)

- "Sustainable Livestock Excellence" / "Livestock" / "Livestock farming for beef and dairy production, supporting regional food security and contributing to local meat processing industries."
- Farm type: "Premium Beef & Dairy". CTA: "Explore Cattle Products" (`:72-73`)
- Products:
  - Premium Beef Cuts (Beef Products): "High-quality beef from grass-fed cattle supporting regional food security". "$18/lb". Grass-Fed, Local Processing, Premium Cuts (`:76-82`)
  - Fresh Dairy Products (Dairy): "Farm-fresh milk and dairy products from our healthy cattle herd". "$6/gallon". Raw Milk Available, Hormone-Free, Daily Fresh (`:85-91`)
  - Breeding Stock (Livestock): "Quality breeding cattle for expanding livestock operations". "Contact for pricing". Registered Stock, Health Certified, Genetic Testing (`:94-100`)
- Stats: 200+ Head of Cattle · 100% Grass Fed (`:105-110`)

**Livestock categories** (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:118-137`)

- "Heritage Livestock Excellence" / "Premium breeds raised with care in natural environments for optimal health and quality, supporting sustainable agriculture."
- Beef Cattle: "Premium beef cattle raised with sustainable farming practices for exceptional meat quality and taste". Breeds: Angus, Hereford, Charolais, Simmental. Specialty: Grass-Fed Beef. Features: Grass-Fed, Open Pasture, USDA Certified
- Dairy Cattle: "High-quality dairy cattle focused on milk production with superior animal welfare standards". Breeds: Holstein, Jersey, Guernsey, Brown Swiss. Specialty: Fresh Dairy. Features: Hormone-Free, Daily Milking, Quality Tested

**Services** (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:145-168`)

- "Our Services" / "Comprehensive livestock services from breeding to processing, ensuring quality at every step."
- Beef Production: "Premium beef cattle farming supporting regional food security and local meat processing industries"
- Dairy Production: "High-quality dairy farming operations contributing to regional food security and local dairy processing"
- Regional Food Security: "Supporting local communities with reliable livestock production for sustained food supply"
- Meat Processing Support: "Contributing to local meat processing industries with consistent, high-quality livestock supply"

**Regional impact** (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:178-225`)

- "Supporting Regional Food Security" / "Our livestock operations play a vital role in strengthening regional food systems and contributing to local meat processing industries, ensuring sustainable food security for our communities."
- Local Supply Chain: "Reducing dependency on distant suppliers by providing fresh, high-quality meat products directly to regional markets and communities."
- Sustainable Practices: "Implementing environmentally responsible farming methods that ensure long-term food production capabilities."
- Community Resilience: "Building stronger local food systems that can withstand supply chain disruptions and economic challenges."
- Industry Support: "Partnering with local meat processing facilities to create jobs and strengthen the regional agricultural economy."
- Quality Standards: "Maintaining the highest processing standards to ensure safe, premium meat products for consumers."
- Economic Growth: "Contributing to local economic development through direct partnerships and supporting related businesses in the supply chain."
- Badges: Premium Quality Standards · Fresh Daily Products · Local Community Focus · Trusted Service Provider

**Contact** (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:233-244`)

- "Contact Us" / "Ready to experience premium livestock products? Get in touch with our team for orders, inquiries, or ranch visits."
- "+1 (555) 321-6547", "ranch@bundufarms.com"
- Ranch Tours: "Saturdays: 10:00 AM - 3:00 PM". Farm Store: "Daily: 8:00 AM - 6:00 PM"
- Template labels: "Premium Farm Operations", "Premium Livestock Collection", "Premium Breeds", "Food Security Impact", "Local Processing Partnership", "Speak directly with our ranch specialists", "Send us your questions and order requests", "Business Hours" (`components/business-templates/LivestockTemplate.tsx:317`, `:455`, `:538`, `:713`, `:750`, `:837`, `:860`, `:880`)

**Planned features** (IMPLEMENTATION_PLAN): Animal breeds, Care practices, Products (meat, dairy), Farm certifications, Health standards (`IMPLEMENTATION_PLAN.md:1062-1067`)

**Cleanup flags:**

- USDA Certified (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:127`)
- USD "$" prices in imperial units ($18/lb, $6/gallon)
- US phone +1 (555) 321-6547
- European/US breeds (Angus, Hereford, Holstein, etc.) may not reflect local herds (e.g. N'Dama); verify
- "Three generations" claim and 200+ head / 100% grass-fed stats are unverified
- Hero description mentions "poultry", which overlaps with the separate Poultry business
- "Ranch" is US vocabulary
- Email domain "bundufarms.com" (brand spelling)

---

### Poultry

**Tagline / summary:** _No copy found in repo_. There is no footer link either. The only related copy is the Farming "Free-Range Eggs" product (see Farming Operations) and the Livestock hero line "...cattle, dairy cows, sheep, and poultry..." (`LIVESTOCK_TEMPLATE_POST_EXAMPLE.md:22`).

**Planned features** (IMPLEMENTATION_PLAN): Poultry types, Egg production, Feed information, Quality standards, Distribution network (`IMPLEMENTATION_PLAN.md:1071-1076`)

**Cleanup flags:**

- None (no copy)

---

### Water Production

Source: `WATER_PRODUCTION_POST_EXAMPLE.md`. The same text is duplicated as admin defaults in `app/admin/businesses/[id]/content/page.tsx:389-405`.

**Tagline / summary**

- Hero: "CRYSTAL PURE" / "Water Production" (`WATER_PRODUCTION_POST_EXAMPLE.md:25-26`)
- Hero description: "State-of-the-art water purification and bottling facility delivering premium quality water through advanced filtration technology and rigorous quality control." (`WATER_PRODUCTION_POST_EXAMPLE.md:27`)
- Badge: "Premium Water Production Facility" (`WATER_PRODUCTION_POST_EXAMPLE.md:28`)
- CTAs: "Order Water Supply", "Quality Certification" (`WATER_PRODUCTION_POST_EXAMPLE.md:34`, `:40`)

**Stats** (`WATER_PRODUCTION_POST_EXAMPLE.md:48-57`)

- 50K+ Liters/Day · 99.9% Purity Level · 24/7 Production

**Products / sizes** (`WATER_PRODUCTION_POST_EXAMPLE.md:65-125`)

- "PREMIUM WATER SOLUTIONS" / "Production Line Portfolio" / "Advanced purification technology meets diverse market demands through our comprehensive product range"
- Bottled Water: "Pure, refreshing bottled water in various sizes". 500ml Bottles, 1L Bottles, 1.5L Bottles, 5L Containers
- Bulk Water Supply: "Large volume water supply for businesses and events". 20L Dispensers, 200L Drums, Tanker Delivery, Custom Volumes
- Purified Water: "Advanced purification for premium quality water". Reverse Osmosis, UV Treated, Mineral Enhanced, Alkaline Water
- Custom Solutions: "Tailored water solutions for specific industry needs". Private Labeling, Custom Packaging, Special Formulations, Delivery Plans

**Services** (`WATER_PRODUCTION_POST_EXAMPLE.md:135-159`)

- "Premium Services" / "Experience excellence in water production with our comprehensive suite of industrial-grade services and quality assurance"
- Delivery Service: "Reliable water delivery to homes, offices, and businesses"
- Quality Testing: "Regular quality control and purity testing for all products"
- Bulk Orders: "Special pricing and scheduling for large volume orders"
- Subscription Service: "Regular delivery subscriptions for consistent water supply"

**Production process** (`WATER_PRODUCTION_POST_EXAMPLE.md:168-200`)

- "Production Steps" / "Follow our step-by-step process as each stage descends through our precision production line"
- 01 Source Water Collection (First Step): "Premium source water from protected aquifers and natural springs, ensuring the purest foundation for our production process."
- 02 Advanced Purification (Second Step): "Advanced multi-stage filtration and purification technology removes impurities while preserving essential minerals."
- 03 Quality Assurance (Third Step): "Rigorous testing protocols and quality assurance ensure every drop meets our premium standards."
- 04 Final Packaging (Final Step): "Automated bottling and sealing in sterile environment preserves freshness and quality until delivery."

**Certifications (hard-coded in template)**

- "ISO 9001" "Certified", "HACCP" "Compliant" (`components/business-templates/WaterProductionTemplate.tsx:390-397`)

**Contact** (`WATER_PRODUCTION_POST_EXAMPLE.md:209-212`)

- "Pure Water, Delivered Fresh" / "Experience premium water delivery services, bulk orders, or visit our state-of-the-art production facility"
- "+1234567890", "water@bundu.com"
- Template labels: "Water Production Facility", "Available Formats", "Order Now", "Call for Delivery", "Email Inquiries" (`components/business-templates/WaterProductionTemplate.tsx:179`, `:536`, `:581`, `:984`, `:1010`)

**Planned features** (IMPLEMENTATION_PLAN): Purification process, Quality certifications, Product sizes, Distribution network, Environmental impact (`IMPLEMENTATION_PLAN.md:1089-1094`)

**Cleanup flags:**

- Placeholder phone "+1234567890"
- ISO 9001 / HACCP claims are hard-coded; verify, and consider SLSB (Sierra Leone Standards Bureau) certification instead
- "CRYSTAL PURE" may be a placeholder brand name; confirm the actual water brand
- Sachet water ("pure water" bags), the dominant format in Sierra Leone, is not listed; verify the product range
- "protected aquifers and natural springs" is an unverified sourcing claim; 50K+ L/day and 99.9% purity are unverified
- Email domain "bundu.com" (brand spelling)

---

### Natural Juices

**Tagline / summary:** _No copy found in repo_. The only mention is a footer link, "Natural Juices" (`components/layout/Footer.tsx:106`).

**Planned features** (IMPLEMENTATION_PLAN): Fruit sources, Production process, Nutritional information, Flavor varieties, Health benefits (`IMPLEMENTATION_PLAN.md:1098-1103`)

**Cleanup flags:**

- None (no copy)

---

### Beverages

**Tagline / summary:** _No copy found in repo_. The only mention is a footer link, "Beverages" (`components/layout/Footer.tsx:133`).

**Planned features** (IMPLEMENTATION_PLAN): Product catalog, Brand partnerships, Distribution channels, Wholesale information, New arrivals (`IMPLEMENTATION_PLAN.md:1107-1112`)

**Cleanup flags:**

- None (no copy)

---

### Construction Materials

**Tagline / summary**

- Hero: "Construction Materials" / "Supply of high-quality construction materials including cement, steel, timber, and plumbing materials" (`components/business-templates/ConstructionMaterialsTemplate.tsx:182`, `:185`)

**Overview**

- About: "About Us" / "Innovative Solutions for Modern Construction" / "Committed to Redefining Construction Standards with Innovation, Expertise, and Unwavering Dedication to Excellence" (`components/business-templates/ConstructionMaterialsTemplate.tsx:196-211`)
- Stat card default description: "Providing exceptional service and quality" (`components/business-templates/ConstructionMaterialsTemplate.tsx:242`)
- Materials: "Construction Materials" / "Industry-leading materials and equipment delivered directly to your project site. Ready when you are." (`components/business-templates/ConstructionMaterialsTemplate.tsx:263-273`)
- Services: "Professional Services" / "Why Choose Zeebundu Construction?" / "Comprehensive support services designed specifically for contractors, developers, and professional builders. Excellence delivered, every time." (`components/business-templates/ConstructionMaterialsTemplate.tsx:374-388`)
- Contact: "Ready to Start Building" / "Let's Build Your Dream Project" / "Connect with our construction material experts for personalized quotes, professional consultation, and premium building solutions." (`components/business-templates/ConstructionMaterialsTemplate.tsx:453-461`)
- Contact cards: "Call for Quote" / "Speak directly with our experts"; "Email Us" / "Get detailed project information" (`components/business-templates/ConstructionMaterialsTemplate.tsx:478-479`, `:494-495`)
- Trust badges: "24/7 Support", "Expert Guidance", "Quality Guaranteed" (`components/business-templates/ConstructionMaterialsTemplate.tsx:507-515`)
- CTA: "Get Quote" (`components/business-templates/ConstructionMaterialsTemplate.tsx:329`)

**Material categories** (`components/business-templates/ConstructionMaterialsTemplate.tsx:81-118`)

- Steel & Metal: "Premium structural steel, reinforcement bars, and metal components engineered for durability and strength in commercial and residential construction projects." Steel Beams, Rebar, Metal Sheets, Fasteners
- Concrete & Masonry: "High-grade concrete mixes, cement, and masonry materials designed for superior performance in foundations, walls, and structural applications." Ready Mix, Cement, Blocks, Aggregates
- Electrical Systems: "Complete electrical solutions including wiring, panels, conduits, and smart home systems for modern construction and renovation projects." Wiring, Panels, Conduits, Smart Systems
- Tools & Equipment: "Professional-grade construction tools, heavy machinery, and specialized equipment for rent or purchase to keep your project moving efficiently." "$125/day", "650+ projects". Power Tools, Excavators, Cranes, Safety Gear

**Services** (`components/business-templates/ConstructionMaterialsTemplate.tsx:128-144`)

- Same-Day Delivery: "Fast delivery to your construction site within 24 hours for urgent projects"
- Contractor Support: "Dedicated account managers and technical support for professional builders"
- Bulk Pricing: "Competitive wholesale rates and flexible payment terms for large projects"
- Quality Assurance: "All materials tested and certified with comprehensive warranty coverage"

**Stats** (`components/business-templates/ConstructionMaterialsTemplate.tsx:151-154`)

- 5K+ Projects Completed · 250+ Skilled Professionals · 35+ Industry Excellence · 1M+ Tons of Materials

**Contact defaults**

- "+1 (234) 567-890", "materials@bundu.com" (`components/business-templates/ConstructionMaterialsTemplate.tsx:472-496`)

**Planned features** (IMPLEMENTATION_PLAN): Material catalog, Project galleries, Delivery services, Bulk pricing, Technical specifications (`IMPLEMENTATION_PLAN.md:1143-1148`)

**Cleanup flags:**

- US-format placeholder phone "+1 (234) 567-890"
- USD "$125/day" equipment hire price
- The hero mentions "timber, and plumbing materials", but the categories list electrical/smart home instead; reconcile
- Stats (5K+ projects, 1M+ tons, "35+ Industry Excellence", which is an unclear label) are invented
- "Warranty coverage", "Same-Day Delivery" and "24/7 Support" claims need verification
- "Zeebundu Construction" vs "ZeeBundu" spelling; email domain "bundu.com"

---

### Pharmacy

**Tagline / summary**

- Default name: "Bundu Pharmacy" (`components/business-templates/PharmacyTemplate.tsx:254`)
- Subtitle: "Your Trusted Healthcare Partner"; badges "Licensed Pharmacy", "Professional Care" (`components/business-templates/PharmacyTemplate.tsx:174`, `:180`)
- Seed: "HealthCare Plus Pharmacy". "Full-service pharmacy providing prescription medications, health consultations, wellness products, and comprehensive healthcare services." (`scripts/seed-businesses.js:127-129`)
- Seed SEO: "HealthCare Plus Pharmacy - Professional Pharmaceutical Services" / "Professional pharmacy services at HealthCare Plus. Prescription medications, health consultations, wellness products, and healthcare solutions." (`scripts/seed-businesses.js:141-142`)
- CTAs: "Find Medications", "Contact Pharmacist", "Get Directions" (`components/business-templates/PharmacyTemplate.tsx:188`, `:194`, `:598`)

**Overview**

- About: "About Our Pharmacy" / "Providing trusted healthcare services and quality medications to our community with professional pharmaceutical care and personalized attention." (`components/business-templates/PharmacyTemplate.tsx:204-205`)
- Categories: "Medication Categories" / "Comprehensive pharmaceutical services for all your health and wellness needs" (`components/business-templates/PharmacyTemplate.tsx:287`, `:290`)
- Services: "Pharmacy Services" / "Professional pharmaceutical care with personalized attention to your health needs" (`components/business-templates/PharmacyTemplate.tsx:339`, `:342`)
- Additional: "Additional Health Services" / "Beyond medications, we offer comprehensive health services to keep you and your family healthy" (`components/business-templates/PharmacyTemplate.tsx:388`, `:391`)
- Contact: "Contact Your Pharmacist" / "Need pharmaceutical assistance? Contact our licensed pharmacists for professional healthcare guidance." (`components/business-templates/PharmacyTemplate.tsx:220-221`); "Need Pharmaceutical Assistance?" / "Contact our licensed pharmacists for professional healthcare guidance" (`:621-624`)
- Locations: "Find Your Nearest Pharmacy" / "Conveniently located pharmacies with professional service and modern amenities" (`components/business-templates/PharmacyTemplate.tsx:507`, `:510`)

**Medication categories** (`components/business-templates/PharmacyTemplate.tsx:70-107`)

- Prescription Medications: "Licensed prescription drugs with professional consultation". Doctor Prescriptions, Medication Reviews, Drug Interactions, Dosage Guidance
- Over-the-Counter: "Common medications for everyday health needs". Pain Relief, Cold & Flu, Vitamins, First Aid
- Health & Wellness: "Supplements and wellness products for healthy living". Vitamins & Minerals, Herbal Supplements, Protein Powders, Health Monitors
- Personal Care: "Personal hygiene and beauty care products". Skincare, Oral Care, Hair Care, Baby Care

**Services** (`components/business-templates/PharmacyTemplate.tsx:126-147`)

- Prescription Services: "Professional prescription filling and medication management". New Prescriptions, Refills, Transfer Prescriptions, Medication Sync
- Health Consultations: "Free health screenings and medication consultations". Blood Pressure Checks, Diabetes Screening, Cholesterol Testing, Immunizations
- Extended Hours: "Open extended hours including weekends for your convenience". Early Morning Hours, Late Evening Service, Weekend Availability, Holiday Hours
- Insurance Accepted: "We accept most major insurance plans and offer competitive pricing". Major Insurance Plans, Medicare/Medicaid, HSA/FSA Accepted, Discount Programs

**Additional health services** (`components/business-templates/PharmacyTemplate.tsx:399-415`)

- Health Screenings: "Blood pressure, cholesterol, and diabetes screenings"
- Immunizations: "Flu shots, travel vaccines, and routine immunizations"
- Medication Sync: "Synchronize all your medications for convenience"
- Health Monitoring: "Blood glucose testing and health consultations"

**Insurance & payment** (`components/business-templates/PharmacyTemplate.tsx:445-495`)

- "Insurance & Payment Options" / "We accept most major insurance plans and offer various payment options for your convenience"
- Insurance Accepted: Most Major Insurance Plans, Medicare & Medicaid, Workers' Compensation, Military Insurance
- Payment Methods: Cash & Credit Cards, HSA/FSA Accepted, GoodRx & Discount Cards, Payment Plans Available
- No Insurance?: Discount Programs Available, Generic Alternatives, Patient Assistance Programs, Competitive Cash Pricing

**Stats** (`components/business-templates/PharmacyTemplate.tsx:210-213`)

- 10,000+ Medications Available · 8 Pharmacy Locations · 24/7 Emergency Service · 99% Customer Satisfaction

**Locations** (`components/business-templates/PharmacyTemplate.tsx:517-538`)

- Downtown Pharmacy: "123 Main Street, Downtown District", "Mon-Fri: 8AM-9PM, Sat: 9AM-8PM, Sun: 10AM-6PM". Drive-Thru, Prescription Delivery, Health Screenings
- Medical Center Pharmacy: "456 Healthcare Avenue, Medical District", "Mon-Fri: 7AM-10PM, Sat: 8AM-9PM, Sun: 9AM-7PM". Immunizations, Consultation Services, Medicare Accepted
- Community Pharmacy: "789 Oak Avenue, Suburban Plaza", "Mon-Fri: 8AM-8PM, Sat: 9AM-7PM, Sun: 10AM-5PM". Compounding Services, Health Products, Insurance Processing

**Contact defaults** (`components/business-templates/PharmacyTemplate.tsx:223-229`)

- "+1 (555) 123-MEDS", "pharmacy@bunduhealthcare.com", "Multiple pharmacy locations"
- Hours: Mon-Fri 8:00 AM - 9:00 PM; Saturday 9:00 AM - 8:00 PM; Sunday 10:00 AM - 6:00 PM
- Seed: "+1 (555) 321-HEALTH", "care@healthcareplus.com", "321 Medical Center Blvd, Health District, CA 90213" (`scripts/seed-businesses.js:148-150`)

**Planned features** (IMPLEMENTATION_PLAN): Medication categories, Health services, Prescription refills, Health tips blog, Emergency contacts (`IMPLEMENTATION_PLAN.md:1134-1139`)

**Cleanup flags:**

- Medicare/Medicaid, HSA/FSA, GoodRx, Workers' Compensation and Military Insurance are all US-only; remove
- "Drive-Thru" and "Compounding Services" are US-pharmacy features; verify
- US phones +1 (555) 123-MEDS / 321-HEALTH; "CA 90213"; US-style street addresses
- Stats (8 locations, 10,000+ medications, 24/7 emergency) are invented
- The "Free health screenings" and "immunizations" claims have regulatory implications; verify with the Pharmacy Board of Sierra Leone
- "Bundu Pharmacy" / "bunduhealthcare.com" naming vs Zeebundu brand

---

### Cosmetics Salon

**Tagline / summary**

- Hero title (default): "Enhancing your beauty to let you shine" (`components/business-templates/SalonTemplate.tsx:152`)
- "Our Story" label; the story text comes only from the DB and the default is empty (`components/business-templates/SalonTemplate.tsx:219-222`)
- Decorative label: "Beauty" / "Wellness" (`components/business-templates/SalonTemplate.tsx:269-271`)

**Overview**

- "Why Choose Our Salon?" / "Experience the difference with our premium services, expert stylists, and commitment to your beauty journey." (`components/business-templates/SalonTemplate.tsx:307-311`)
- Default feature body: "We provide premium salon services tailored to you." (`components/business-templates/SalonTemplate.tsx:324`)
- "Get Beauty Treatments Here Now" / "Transform your look with our premium beauty treatments. Our expert team uses the latest techniques and high-quality products to ensure you get the best results." (`components/business-templates/SalonTemplate.tsx:662-668`)
- Bullets: "Professional certified beauticians", "Premium quality products", "Personalized treatment plans" (`components/business-templates/SalonTemplate.tsx:677-691`)
- "What Our Clients Say About Us" (`components/business-templates/SalonTemplate.tsx:511-512`)
- "Ready to Transform Your Look?" / "Book your appointment today and experience the difference our expert team can make." (`components/business-templates/SalonTemplate.tsx:714-719`)
- Service card tags: "Professional Stylists", "Personalized Care", "Attention to Detail" (`components/business-templates/SalonTemplate.tsx:482-484`)

**Why-choose features** (`components/business-templates/SalonTemplate.tsx:334-398`)

- Expert Stylists: "Our certified professionals have years of experience and stay updated with the latest trends and techniques."
- Premium Products: "We use only the finest, salon-grade products that nourish your hair while delivering stunning results."
- Personalized Care: "Every client receives individual attention with customized treatments tailored to their unique needs."
- Luxury Experience: "Relax in our modern, comfortable environment designed to make your visit a truly pampering experience."
- Flexible Scheduling: "Book appointments that fit your busy lifestyle with our convenient online booking system."
- Satisfaction Guarantee: "We're committed to your happiness and will work with you until you love your new look."
- Fallback features: Premium Quality ("Top-tier products and services for the best results"), Expert Team ("Skilled and certified beauty professionals"), Personalized Care ("Customized treatments for your unique needs") (`components/business-templates/SalonTemplate.tsx:534-561`)

**Services** (booking-form options only; the services list itself is DB-driven)

- Hair Styling, Facial Treatments, Nail Care, Bridal Package (`components/business-templates/SalonTemplate.tsx:814-817`). This form is commented out.

**Stats**

- Default: 15+ Happy Patients · 10+ Premium Products · 15+ Beauty Experts · 10+ Years Experience (`components/business-templates/SalonTemplate.tsx:88-91`)
- Testimonial stats: 2k+ Happy Clients · 10+ Years Experience · 24+ Premium Products · 15+ Beauty Experts (`components/business-templates/SalonTemplate.tsx:104-107`)

**Staff (placeholder)** (`components/business-templates/SalonTemplate.tsx:112-133`)

- Emma Rodriguez, Color Specialist, 8 years, 4.9
- Sarah Chen, Hair Stylist, 6 years, 4.8
- Maria Santos, Nail Artist, 5 years, 4.9

**Brands** (`components/business-templates/SalonTemplate.tsx:95-100`)

- BeautyBox, Beautify, ULTA, Sephora, Purple, NYKAA

**Contact defaults** (`components/business-templates/SalonTemplate.tsx:729-756`)

- "Call Us" "+1 (555) BEAUTY"; "Email Us" "hello@bundusalon.com"; "Visit Us" "123 Beauty Street, City Center"
- CTAs: "Book Now", "View Gallery", "Book Appointment", "Book Your Appointment", "Book Treatment", "Our Gallery" (several of these are in commented-out blocks: `:406-411`, `:569-604`, `:696-699`, `:762-771`, `:775-835`)

**Planned features** (IMPLEMENTATION_PLAN): Service menu, Stylist profiles, Before/after gallery, Appointment booking, Product sales (`IMPLEMENTATION_PLAN.md:1116-1121`)

**Cleanup flags:**

- US phone "+1 (555) BEAUTY"; placeholder address "123 Beauty Street, City Center"
- Placeholder stylist names (Emma Rodriguez, Sarah Chen, Maria Santos) with stock photos
- Retailer/brand names ULTA, Sephora and NYKAA are real trademarks and not partners; remove
- "Happy Patients" is the wrong word for a salon; the two stat sets contradict each other (15+ vs 2k+ clients)
- "Online booking system" claim; no booking system exists
- Stats are invented

---

### Foreign Exchange

Sources: `FOREIGN_EXCHANGE_INITIAL_DATA_POST.md` (identical content in `FOREIGN_EXCHANGE_POST_EXAMPLE.md:22-158` and admin defaults `app/admin/businesses/[id]/content/page.tsx:193`, `:555`). The template has no fallbacks.

**Tagline / summary**

- Hero: "Professional Currency" / "Exchange Services" (`FOREIGN_EXCHANGE_INITIAL_DATA_POST.md:22-23`)
- Description: "Trusted foreign exchange and international remittance services through our network of 7 licensed FX bureaus and authorized vendor partners across the region." (`FOREIGN_EXCHANGE_INITIAL_DATA_POST.md:24`)
- Badge: "Licensed & Regulated FX Bureau" (`FOREIGN_EXCHANGE_INITIAL_DATA_POST.md:25`)
- CTAs: "Learn More", "View Exchange Rates" (`FOREIGN_EXCHANGE_INITIAL_DATA_POST.md:28`, `:33`)

**Exchange rates** (`FOREIGN_EXCHANGE_INITIAL_DATA_POST.md:56-106`)

- "Today's Rates" / "Competitive foreign exchange rates available at all our bureau locations. Visit us for the most current rates and personalized service."
- Template labels: "Current Exchange Rates", "Updated Daily", "We Buy", "We Sell" (`components/business-templates/ForeignExchangeTemplate.tsx:214`, `:229`, `:266`, `:274`)

| Currency       | Code | Buy   | Sell  | Change |
| -------------- | ---- | ----- | ----- | ------ |
| US Dollar      | USD  | 19.50 | 19.80 | +0.15  |
| Euro           | EUR  | 21.20 | 21.55 | +0.08  |
| British Pound  | GBP  | 24.80 | 25.20 | -0.12  |
| Nigerian Naira | NGN  | 0.025 | 0.028 | +0.001 |
| Ghanaian Cedi  | GHS  | 1.65  | 1.72  | +0.03  |
| CFA Franc      | XOF  | 0.032 | 0.035 | +0.001 |

**Services** (`FOREIGN_EXCHANGE_INITIAL_DATA_POST.md:113-139`)

- "What We Offer" / "Comprehensive foreign exchange and international remittance services through our established network of licensed bureaus and authorized partners."
- Template label: "Professional FX Services" (`components/business-templates/ForeignExchangeTemplate.tsx:299`)
- Currency Exchange: "Buy and sell foreign currencies at competitive rates across our 7 bureau locations"
- Money Remittance: "Send money internationally through our secure remittance network"
- Licensed Operations: "Fully licensed and regulated FX bureau services with complete compliance"
- Vendor Network: "Extended access through our network of licensed subcontracted vendors"

**Stats** (`FOREIGN_EXCHANGE_INITIAL_DATA_POST.md:146-160`)

- "Our Statistics": "Different" Currencies Available · 10K+ Monthly Exchanges · "Licensed" & Regulated

**Contact** (`FOREIGN_EXCHANGE_INITIAL_DATA_POST.md:167-171`, template `components/business-templates/ForeignExchangeTemplate.tsx:360-448`)

- "Contact Our Experts" / "Experience personalized service at any of our licensed FX bureau locations. Contact us for current rates and professional assistance with your currency exchange needs."
- Template heading: "Visit Our Licensed Bureaus" (`:363-367`)
- "Call Our Specialists" / "Speak directly with our licensed FX specialists for immediate assistance and current exchange rates" (`:389-393`)
- "Email Inquiries" / "Get detailed information about rates, services, and bureau locations via email" / "We respond within 24 hours" (`:430-448`)
- "+1 (234) 567-8900", "info@fxbureau.com", "Available Monday - Friday, 9 AM - 6 PM"

**Currency list utility:** `lib/utils/currencies.ts:125` includes `{ code: 'SLE', name: 'Sierra Leonean Leone', flag: '🇸🇱', symbol: 'Le' }`. This is the only Sierra Leone reference in the whole repo.

**Planned features** (IMPLEMENTATION_PLAN): Exchange rates, Currency calculator, Service locations, Transfer options, Market updates (`IMPLEMENTATION_PLAN.md:1152-1157`)

**Cleanup flags:**

- The rates have no stated base currency and don't match SLE (USD at 19.50 is roughly a GHS-era rate); replace with real Leone (SLE) rates or remove static rates
- US-format phone "+1 (234) 567-8900"; generic "fxbureau.com" email
- "7 licensed FX bureaus" and "10K+ Monthly Exchanges" need verification; name the licensing body (Bank of Sierra Leone)
- Stat value "Different" is placeholder text
- "across the region" is vague; say Sierra Leone
- Remittance partners are not named

---

### Micro-Finance & Lending

Sources: `MICRO_FINANCE_POST_REQUEST.json` (full content), `MICRO_FINANCE_POST_EXAMPLE.md` (same content plus business record; admin defaults duplicated at `app/admin/businesses/[id]/content/page.tsx:230-310`). The template has no fallbacks.

**Tagline / summary**

- Hero: "Accessible Micro-Finance" / "Solutions for Your Business" (`MICRO_FINANCE_POST_REQUEST.json:6-7`)
- Description: "Empowering small businesses and entrepreneurs with flexible lending solutions. Fast approvals, competitive rates, and personalized service to help you grow." (`MICRO_FINANCE_POST_REQUEST.json:8`)
- Badge: "Licensed Financial Institution" (`MICRO_FINANCE_POST_REQUEST.json:9`)
- CTAs: "Apply Now", "Learn More" (`MICRO_FINANCE_POST_REQUEST.json:12`, `:17`)
- Business record: "ABC Micro-Finance", "Empowering small businesses and entrepreneurs with flexible lending solutions." SEO: "ABC Micro-Finance - Flexible Lending Solutions" / "Accessible micro-finance solutions for small businesses and entrepreneurs. Fast approvals, competitive rates." (`MICRO_FINANCE_POST_EXAMPLE.md:13-30`)

**Stats** (`MICRO_FINANCE_POST_REQUEST.json:24-33`)

- 24hrs Quick Approval · 5% Interest Rate · 10K+ Happy Clients

**Application process** (`MICRO_FINANCE_POST_REQUEST.json:41-65`)

- "Simple Application Process" / "Get your loan approved in just a few easy steps. Our streamlined process ensures quick decisions and fast funding."
- 1 Submit Application: "Fill out our simple online application form with your basic information and loan requirements."
- 2 Document Review: "Our team reviews your documents and application. We will contact you within 24 hours."
- 3 Approval & Terms: "Receive your loan approval with transparent terms and conditions. No hidden fees."
- 4 Receive Funds: "Get your funds transferred directly to your account within 24-48 hours after approval."

**Requirements** (`MICRO_FINANCE_POST_REQUEST.json:74-136`)

- "Requirements to Meet Before Lending" / "To ensure a smooth application process, please ensure you have the following documents and meet these requirements:"
- Age Requirement (required): "Applicant must be at least 18 years old and not more than 65 years at loan maturity." Valid National ID or Passport; Birth Certificate (if available)
- Proof of Income (required): "Demonstrate your ability to repay the loan with consistent income." Bank statements (last 3-6 months); Pay slips or employment letter; Business registration documents (for business loans); Tax returns (if applicable)
- Business Registration (required): "For business loans, your enterprise must be legally registered." Business registration certificate; Operating license; Business permit; Tax identification number
- Credit History (required): "We review your credit history to assess loan eligibility." Credit report (if available); References from previous lenders; Trade references
- Collateral Documentation (optional): "Depending on loan amount, collateral may be required." Property title deeds; Vehicle registration documents; Asset valuation reports; Guarantor documentation
- Residential Address (required): "Proof of your current residential address." Utility bills (electricity, water, etc.); Rental agreement or property ownership documents; Recent bank statement with address

**Loan durations** (`MICRO_FINANCE_POST_REQUEST.json:145-174`)

- "Flexible Loan Duration Options" / "Choose the repayment period that best fits your financial situation and business needs."

| Duration  | Description                                                                            | Rate           | Min    | Max     |
| --------- | -------------------------------------------------------------------------------------- | -------------- | ------ | ------- |
| 3 Months  | Short-term loans for immediate business needs. Quick repayment with minimal interest.  | 5% per month   | $500   | $5,000  |
| 6 Months  | Medium-term financing for business expansion or working capital needs.                 | 4.5% per month | $1,000 | $10,000 |
| 12 Months | Long-term loans for major investments. Lower monthly payments with extended repayment. | 4% per month   | $2,000 | $25,000 |
| 24 Months | Extended repayment terms for larger business investments and capital projects.         | 3.5% per month | $5,000 | $50,000 |

**Loan products** (`MICRO_FINANCE_POST_REQUEST.json:235-287`)

- "Our Loan Products" / "We offer a variety of loan products designed to meet different business and personal financial needs."
- Business Startup Loan: "Perfect for new businesses looking to get started. Minimal requirements and fast approval." 4.5% per month, $500–$10,000. No collateral required (for small amounts); Quick approval within 24 hours; Flexible repayment terms; Business advisory support
- Working Capital Loan: "Boost your business cash flow with our working capital financing solutions." 4% per month, $1,000–$25,000. Flexible repayment options; No early repayment penalties; Renewable credit line; Competitive interest rates
- Equipment Finance: "Finance your business equipment purchases with our specialized equipment loans." 3.5% per month, $2,000–$50,000. Equipment as collateral; Extended repayment terms; Tax benefits; Flexible down payment
- Personal Loan: "For personal financial needs including education, medical expenses, or home improvements." 5% per month, $500–$15,000. No collateral required; Fast processing; Flexible use; Competitive rates

**Payment methods** (`MICRO_FINANCE_POST_REQUEST.json:182-226`)

- "Convenient Payment Methods" / "We offer multiple flexible payment options to make loan repayment easy and convenient for you."
- Bank Transfer: "Direct bank transfer from your account to ours. Fast and secure." Online banking, Mobile banking, ATM transfer, 24/7 availability
- Mobile Money: "Pay using popular mobile money platforms like M-Pesa, Airtel Money, or MTN Mobile Money." M-Pesa, Airtel Money, MTN Mobile Money, Instant processing
- Cash Payment: "Visit our office to make cash payments. Our staff will assist you with the process." Office payment, Receipt provided, Same-day processing, Personal assistance
- Automatic Debit: "Set up automatic monthly deductions from your bank account. Never miss a payment." Auto-debit setup, Monthly reminders, No late fees, Peace of mind

**Terms and conditions** (`MICRO_FINANCE_POST_REQUEST.json:296-312`)

- "Terms and Conditions" / "Please read and understand our terms and conditions before applying for a loan."

1. "All loan applications are subject to credit assessment and approval. Approval is not guaranteed."
2. "Interest rates are fixed for the duration of the loan and will be clearly stated in your loan agreement."
3. "Late payment fees may apply if payments are not made on time. Please contact us if you anticipate any payment difficulties."
4. "Early repayment is allowed without penalty. Contact us to arrange early settlement."
5. "All loan amounts and terms are subject to our lending policies and regulatory requirements."
6. "We reserve the right to request additional documentation or information during the application process."
7. "Loan disbursement typically occurs within 24-48 hours after approval and signing of loan agreement."
8. "Default on loan payments may result in legal action and reporting to credit bureaus."
9. "All personal and business information provided will be kept confidential and used solely for loan assessment purposes."
10. "We are committed to responsible lending and will only approve loans that we believe you can afford to repay."
11. "Interest is calculated on a reducing balance basis for monthly repayment loans."
12. "For secured loans, assets provided as collateral must be properly valued and insured."
13. "Changes to loan terms after approval may incur administrative fees. All fees will be disclosed upfront."
14. "We offer financial counseling services to help you manage your loan effectively."

**Contact** (`MICRO_FINANCE_POST_REQUEST.json:319-334`)

- "Get in Touch" / "Our loan specialists are ready to help you find the right financing solution for your needs."
- "+1 (234) 567-8900", "loans@microfinance.com"
- Hours: Monday - Friday 8:00 AM - 6:00 PM; Saturday 9:00 AM - 2:00 PM; Sunday Closed
- Business record address: "123 Financial Street, City, State 12345"; email "info@abc-microfinance.com" (`MICRO_FINANCE_POST_EXAMPLE.md:20-22`)
- Template labels: "Microfinance Services", "What You Need", "Flexible Terms", "Payment Options", "Loan Solutions", "Important Information", "Speak directly with our loan specialists", "Send us your questions and application requests" (`components/business-templates/MicroFinanceTemplate.tsx:228`, `:406`, `:466`, `:531`, `:593`, `:667`, `:755`, `:779`)

**Planned features:** Micro-Finance is not in the IMPLEMENTATION_PLAN template list.

**Cleanup flags:**

- All loan amounts are in USD "$" ($500–$50,000); convert to Leones (SLE) and set realistic ranges
- M-Pesa is Kenyan and MTN Mobile Money is not in Sierra Leone; use Orange Money / Africell Money (Airtel is now Africell)
- The hero stat "5% Interest Rate" hides that it is 5% _per month_; this is misleading and a compliance risk
- US address "123 Financial Street, City, State 12345"; US-format phone "+1 (234) 567-8900"; placeholder name "ABC Micro-Finance"
- "Licensed Financial Institution": name the regulator (Bank of Sierra Leone) and license
- The "Tax benefits" and "credit bureaus" references need local verification
- "10K+ Happy Clients" is unverified

---

### Zeemart Shopping

**Tagline / summary:** _No copy found in repo_. The only mention is a footer link, "Zeemart Shopping" (`components/layout/Footer.tsx:135`).

**Planned features** (IMPLEMENTATION_PLAN): Product categories, Daily specials, Store locations, Operating hours, Online shopping (`IMPLEMENTATION_PLAN.md:1125-1130`)

**Cleanup flags:**

- None (no copy)

---

## Gaps

What the old repo does **not** contain for the group:

- **Mission / vision / values:** None for Zeebundu as a group. The only mission/vision text is example gas-station placeholder text in `IMPLEMENTATION_PLAN.md:111-113`. The Farming template has generic values (`components/business-templates/FarmingTemplate.tsx:258`).
- **History / founding story:** None. There is no founding year, founder or origin, and no "Three generations" claim beyond the Livestock placeholder.
- **Leadership / team:** None (only placeholder salon stylists).
- **Group stats:** Only DB-computed counts (businesses, industries) plus hard-coded "24/7 Service" and "4.9★ Rating". There are no employee counts, years in operation, locations or customers served.
- **Contacts:** No real phone, address or office. The group email "hello@zeebundu.com" (`components/layout/Footer.tsx:163`) is the only plausibly real item; it needs confirmation. There are no social media URLs.
- **Sierra Leone identity:** The site never mentions Sierra Leone, Freetown or any local town. The only reference is the SLE currency entry in `lib/utils/currencies.ts:125`.
- **Legal pages:** Privacy Policy and Terms of Service are linked but were never written.
- **Business coverage:** 6 businesses have no copy at all: Petroleum Services, Fish Farming, Poultry, Natural Juices, Beverages and Zeemart Shopping. Micro-Finance has copy but no IMPLEMENTATION_PLAN entry. All other copy is generic template or sample-payload text, not verified Zeebundu facts.
- **Brand name:** No canonical spelling has been agreed (Zeebundu / ZeeBundu / Bundu).
- **Imagery captions / alt text:** Only generic Unsplash stock images; there is no real photography.
