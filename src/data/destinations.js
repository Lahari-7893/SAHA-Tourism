// SAHA - Verified Andhra Pradesh Destinations Dataset
// Exclusively Andhra Pradesh, India (All 13 Major Tourism Districts & Regions)

export const destinations = [
  {
    id: 'dest_vjw',
    name: 'Vijayawada',
    slug: 'vijayawada',
    state: 'Andhra Pradesh',
    district: 'NTR',
    region: 'Coastal Andhra',
    tagline: 'The Commercial & Cultural Heart on the Krishna River',
    description: 'Vijayawada, nestled between the Indrakeeladri Hills and the Krishna River, is the vibrant heart of Andhra Pradesh. Renowned for the sacred Kanaka Durga Temple, the historic Prakasam Barrage, and proximity to ancient rock-cut caves, it seamlessly unites heritage, commerce, and natural beauty.',
    coordinates: { lat: 16.5062, lng: 80.6480 },
    heroImage: '/images/vijayawada.jpg',
    secondaryImages: [
      '/images/kanaka_durga.jpg',
      '/images/prakasam_barrage.jpg',
      '/images/undavalli_caves.jpg',
      '/images/bhavani_island.jpg'
    ],
    categories: ['Spiritual', 'Heritage', 'Nature', 'City'],
    bestTime: 'October to March',
    recommendedDuration: '2 - 3 Days',
    approximateBudgetPerDay: 1500,
    rating: 4.8,
    reviewCount: 2450,
    famousFood: ['Pesarattu Upma', 'Mirchi Bajji', 'Vijayawada Biryani', 'Bandar Laddu'],
    localCrafts: ['Kondapalli Wooden Toys', 'Mangalagiri Handloom Sarees'],
    howToReach: {
      air: 'Vijayawada International Airport (VGA) at Gannavaram (20 km)',
      rail: 'Vijayawada Junction (BZA) — Major South Central Railway hub',
      road: 'Well connected via NH16 and NH65 (Pandit Nehru Bus Station)'
    }
  },
  {
    id: 'dest_vzg',
    name: 'Visakhapatnam',
    slug: 'visakhapatnam',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    region: 'Coastal Andhra',
    tagline: 'The City of Destiny & Jewel of the East Coast',
    description: 'Visakhapatnam (Vizag) is a picturesque coastal metropolis flanked by the Bay of Bengal and lush Eastern Ghats hills. It features pristine beaches, India’s only submarine museum, scenic hilltop viewpoints at Kailasagiri, and historic Buddhist heritage sites.',
    coordinates: { lat: 17.6868, lng: 83.2185 },
    heroImage: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1200',
    secondaryImages: [
      'https://images.unsplash.com/photo-1625531061730-a9cbfa36f6d6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Beaches', 'Nature', 'Heritage', 'City'],
    bestTime: 'October to March',
    recommendedDuration: '3 - 4 Days',
    approximateBudgetPerDay: 2000,
    rating: 4.9,
    reviewCount: 4200,
    famousFood: ['Vizag Seafood Curry', 'Royyala Iguru', 'Madugula Halwa', 'Punugulu'],
    localCrafts: ['Etikoppaka Lacquer Toys', 'Jute Craft Products'],
    howToReach: {
      air: 'Visakhapatnam International Airport (VTZ)',
      rail: 'Visakhapatnam Railway Station (VSKP)',
      road: 'Connected via Golden Quadrilateral NH16'
    }
  },
  {
    id: 'dest_tpt',
    name: 'Tirupati',
    slug: 'tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    region: 'Rayalaseema',
    tagline: 'Spiritual Capital & Abode of Lord Venkateswara',
    description: 'Tirupati is one of the most revered spiritual destinations in the world, home to the sacred Tirumala Venkateswara Temple situated atop the seven scenic Seshachalam hills. The region is rich with ancient Chola and Vijayanagara temple architecture and holy waterfalls.',
    coordinates: { lat: 13.6288, lng: 79.4192 },
    heroImage: '/images/tirupati.jpg',
    secondaryImages: [
      '/images/tirupati.jpg',
      'https://images.unsplash.com/photo-1598974357801-cb8e63cc7337?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Spiritual', 'Heritage', 'Nature'],
    bestTime: 'September to February',
    recommendedDuration: '2 - 3 Days',
    approximateBudgetPerDay: 1800,
    rating: 4.9,
    reviewCount: 7800,
    famousFood: ['Tirupati Laddu (GI Tag)', 'Andhra Pure Veg Meals', 'Rava Dosa', 'Pulihora'],
    localCrafts: ['Wood Carvings', 'Kalamkari Paintings of Srikalahasti', 'Brass Idols'],
    howToReach: {
      air: 'Tirupati International Airport (TIR) at Renigunta (15 km)',
      rail: 'Tirupati Main (TPTY) & Renigunta Junction (RU)',
      road: 'Direct APSRTC express buses from all major AP cities'
    }
  },
  {
    id: 'dest_araku',
    name: 'Araku Valley',
    slug: 'araku-valley',
    state: 'Andhra Pradesh',
    district: 'Alluri Sitharama Raju',
    region: 'Coastal Andhra (Eastern Ghats)',
    tagline: 'Breathtaking Coffee Hills & Tribal Heritage',
    description: 'Araku Valley is a serene hill station located 115 km from Vizag in the Eastern Ghats. Famous for its organic coffee plantations, misty valleys, million-year-old Borra Caves, Chaparai waterfalls, and rich tribal heritage museums.',
    coordinates: { lat: 18.3333, lng: 82.8667 },
    heroImage: '/images/araku_valley.jpg',
    secondaryImages: [
      '/images/araku_valley.jpg',
      'https://images.unsplash.com/photo-1617056345601-38384d2b2700?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Hills', 'Nature', 'Adventure', 'Heritage'],
    bestTime: 'September to March',
    recommendedDuration: '2 - 3 Days',
    approximateBudgetPerDay: 1600,
    rating: 4.8,
    reviewCount: 3100,
    famousFood: ['Bongu Chicken (Bamboo Chicken)', 'Organic Araku Filter Coffee', 'Fresh Honey'],
    localCrafts: ['Tribal Dhimsa Dance Artifacts', 'Bamboo Crafts', 'Handmade Coffee Powders'],
    howToReach: {
      air: 'Nearest airport is Visakhapatnam (115 km)',
      rail: 'Scenic Vistadome Train from Visakhapatnam to Araku Station (ARK)',
      road: 'Scenic Ghat road drive via Tyda from Vizag'
    }
  },
  {
    id: 'dest_amaravati',
    name: 'Amaravati',
    slug: 'amaravati',
    state: 'Andhra Pradesh',
    district: 'Guntur / Palnadu',
    region: 'Coastal Andhra',
    tagline: 'Ancient Buddhist Seat & Historic Capital',
    description: 'Amaravati is an ancient heritage cradle on the southern bank of the Krishna River. Renowned for the 2,000-year-old Great Buddhist Stupa (Maha Chaitya), the towering Dhyana Buddha statue, and the holy Amareswara Shiva Temple.',
    coordinates: { lat: 16.5745, lng: 80.3557 },
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    secondaryImages: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Heritage', 'Spiritual', 'Culture'],
    bestTime: 'October to March',
    recommendedDuration: '1 - 2 Days',
    approximateBudgetPerDay: 1200,
    rating: 4.6,
    reviewCount: 950,
    famousFood: ['Guntur Gongura Pachadi', 'Guntur Spicy Mirchi Bajji', 'Traditional Andhra Thali'],
    localCrafts: ['Buddhist Stone Carvings', 'Palnadu Cotton Handlooms'],
    howToReach: {
      air: 'Vijayawada Airport (45 km)',
      rail: 'Guntur Junction (32 km) or Vijayawada Junction (35 km)',
      road: 'Connected via Amaravati Seed Access Road and State Highway'
    }
  },
  {
    id: 'dest_rjy',
    name: 'Rajahmundry',
    slug: 'rajahmundry',
    state: 'Andhra Pradesh',
    district: 'East Godavari',
    region: 'Coastal Andhra',
    tagline: 'Cultural Capital on the Sacred Godavari',
    description: 'Rajahmundry (Rajamahendravaram) is the cultural and literary heart of Andhra Pradesh, blessed by the majestic Godavari River. Home to the historic Godavari Arch Bridge, river ghats (Pushkar Ghat), and gateway to scenic Papikondalu boat cruises.',
    coordinates: { lat: 17.0005, lng: 81.8040 },
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
    secondaryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Heritage', 'Nature', 'Spiritual', 'Culture'],
    bestTime: 'October to March',
    recommendedDuration: '2 Days',
    approximateBudgetPerDay: 1400,
    rating: 4.7,
    reviewCount: 1950,
    famousFood: ['Rajahmundry Rose Milk', 'Pootharekulu', 'Kadiyam Fresh Fruits', 'Gongura Mutton'],
    localCrafts: ['Kadiyam Nursery Plants', 'Wood Carvings', 'Godavari Coir Crafts'],
    howToReach: {
      air: 'Rajahmundry Airport (RJA) at Madhurapudi (18 km)',
      rail: 'Rajahmundry Main Railway Station (RJY)',
      road: 'NH16 highway connects to Vijayawada and Visakhapatnam'
    }
  },
  {
    id: 'dest_kkn',
    name: 'Kakinada',
    slug: 'kakinada',
    state: 'Andhra Pradesh',
    district: 'Kakinada',
    region: 'Coastal Andhra',
    tagline: 'The Fertilizer City & Coastal Sweet Haven',
    description: 'Kakinada is a peaceful coastal city featuring the Hope Island natural barrier, pristine Coringa Wildlife Sanctuary (second largest mangrove forest in India), scenic beaches, and the birthplace of the legendary Kakinada Gottu Kaja sweet.',
    coordinates: { lat: 16.9891, lng: 82.2475 },
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    secondaryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Beaches', 'Nature', 'Food', 'Wildlife'],
    bestTime: 'October to March',
    recommendedDuration: '2 Days',
    approximateBudgetPerDay: 1500,
    rating: 4.7,
    reviewCount: 1600,
    famousFood: ['Kakinada Gottu Kaja (GI Heritage)', 'Subbayya Gari Butta Bhojanam', 'Fish Pulusu'],
    localCrafts: ['Uppada Jamdani Silk Sarees (GI Tag)', 'Coir Products'],
    howToReach: {
      air: 'Rajahmundry Airport (65 km)',
      rail: 'Kakinada Town (CCT) & Kakinada Port (COA)',
      road: 'Connected via Coastal Corridor State Highway'
    }
  },
  {
    id: 'dest_nlr',
    name: 'Nellore',
    slug: 'nellore',
    state: 'Andhra Pradesh',
    district: 'SPSR Nellore',
    region: 'Coastal Andhra',
    tagline: 'Land of Agriculture, Beaches & Flamingo Lagoons',
    description: 'Nellore, situated on the banks of the Penna River, is celebrated for its sprawling paddy fields, Ranganatha Swamy Temple, the tranquil Mypadu Beach, Nelapattu Bird Sanctuary, and the massive Pulicat Lake hosting thousands of migratory pink flamingos.',
    coordinates: { lat: 14.4426, lng: 79.9865 },
    heroImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200',
    secondaryImages: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Beaches', 'Nature', 'Spiritual', 'Wildlife'],
    bestTime: 'October to February (Flamingo season)',
    recommendedDuration: '2 Days',
    approximateBudgetPerDay: 1300,
    rating: 4.6,
    reviewCount: 1400,
    famousFood: ['Nellore Chepala Pulusu (Fish Curry)', 'Nellore Ghee Roast Dosa', 'Malai Kaja'],
    localCrafts: ['Venkatagiri Handloom Sarees (GI Tag)', 'Palm Leaf Handicrafts'],
    howToReach: {
      air: 'Chennai International Airport (170 km) or Tirupati Airport (130 km)',
      rail: 'Nellore Main Railway Station (NLR) on Chennai-Vijayawada line',
      road: 'NH16 connects directly from Chennai and Vijayawada'
    }
  },
  {
    id: 'dest_knl',
    name: 'Kurnool',
    slug: 'kurnool',
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    region: 'Rayalaseema',
    tagline: 'The Gateway to Rayalaseema & Historic Forts',
    description: 'Kurnool, the historic first capital of Andhra State, features the formidable 16th-century Konda Reddy Buruju fort, Oravakallu natural rock gardens, subterranean Ketavaram prehistoric rock paintings, and the Tomb of Abdul Wahab.',
    coordinates: { lat: 15.8281, lng: 78.0373 },
    heroImage: '/images/kurnool_fort.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Heritage', 'Nature', 'Spiritual'],
    bestTime: 'October to February',
    recommendedDuration: '2 Days',
    approximateBudgetPerDay: 1300,
    rating: 4.6,
    reviewCount: 1550,
    famousFood: ['Kurnool Uggani Bajji (Puffed Rice & Mirchi)', 'Gongura Mutton', 'Rayalaseema Ragi Mudda with Natukodi Pulusu'],
    localCrafts: ['Kurnool Stone Inlay Work', 'Handmade Woolen Blankets'],
    howToReach: {
      air: 'Kurnool Airport (KJB) at Orvakal (20 km)',
      rail: 'Kurnool City Railway Station (KRNT)',
      road: 'NH44 (Hyderabad-Bengaluru Highway)'
    }
  },
  {
    id: 'dest_gandikota',
    name: 'Gandikota',
    slug: 'gandikota',
    state: 'Andhra Pradesh',
    district: 'YSR Kadapa',
    region: 'Rayalaseema',
    tagline: 'The Grand Canyon of India',
    description: 'Gandikota is an awe-inspiring natural wonder where the Pennar River has carved a 300-foot deep red granite canyon through the Erramala hills. Atop the gorge stands the massive 12th-century Gandikota Fort, Raghunatha Temple, Madhavaraya Temple, and Jamia Masjid.',
    coordinates: { lat: 14.8146, lng: 78.2863 },
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200',
    secondaryImages: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Heritage', 'Nature', 'Adventure'],
    bestTime: 'September to February',
    recommendedDuration: '1 - 2 Days',
    approximateBudgetPerDay: 1400,
    rating: 4.9,
    reviewCount: 3800,
    famousFood: ['Rayalaseema Ragi Sangati', 'Natukodi Pulusu', 'Kadapa Karam Dosa'],
    localCrafts: ['Kadapa Red Stone Carvings', 'Clay Pottery'],
    howToReach: {
      air: 'Kadapa Airport (75 km) or Bengaluru Airport (280 km)',
      rail: 'Jammalamadugu Railway Station (18 km) or Muddanuru (40 km)',
      road: 'State highway connects from Jammalamadugu / Kadapa'
    }
  },
  {
    id: 'dest_horsley',
    name: 'Horsley Hills',
    slug: 'horsley-hills',
    state: 'Andhra Pradesh',
    district: 'Annamayya',
    region: 'Rayalaseema',
    tagline: 'The Ooty of Andhra Pradesh & Quiet Hill Escape',
    description: 'Horsley Hills (Yenugu Mallamma Konda) is a refreshing hill station perched at 1,290 meters altitude. Blessed with dense eucalyptus and jacaranda groves, cool misty weather, Gali Bandalu (wind rocks), and panoramic viewpoints.',
    coordinates: { lat: 13.6596, lng: 78.3976 },
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200',
    secondaryImages: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Hills', 'Nature', 'Adventure'],
    bestTime: 'Throughout the year (Best: October to March)',
    recommendedDuration: '2 Days',
    approximateBudgetPerDay: 1500,
    rating: 4.7,
    reviewCount: 2100,
    famousFood: ['Fresh Herbal Tea', 'Millets Tiffins', 'Country Chicken Curry', 'Organic Honey'],
    localCrafts: ['Eucalyptus Essential Oils', 'Handmade Wooden Curios'],
    howToReach: {
      air: 'Bengaluru International Airport (140 km) or Tirupati Airport (130 km)',
      rail: 'Madanapalle Road Railway Station (MPL - 28 km)',
      road: 'Well paved scenic hill road from Madanapalle'
    }
  },
  {
    id: 'dest_srisailam',
    name: 'Srisailam',
    slug: 'srisailam',
    state: 'Andhra Pradesh',
    district: 'Nandyal',
    region: 'Rayalaseema (Nallamala Forest)',
    tagline: 'Sacred Jyotirlinga in the Dense Nallamala Tiger Sanctuary',
    description: 'Srisailam is a sacred pilgrim and eco-tourism haven situated deep in the Nallamala hills on the Krishna River. It houses the ancient Mallikarjuna Swamy Jyotirlinga and Bhramaramba Devi Shakti Peeth, the massive Srisailam Dam, ropeway, and Tiger Reserve.',
    coordinates: { lat: 16.0748, lng: 78.8681 },
    heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    secondaryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Spiritual', 'Nature', 'Wildlife', 'Heritage'],
    bestTime: 'September to March',
    recommendedDuration: '2 Days',
    approximateBudgetPerDay: 1600,
    rating: 4.9,
    reviewCount: 5200,
    famousFood: ['Nallamala Pure Forest Honey', 'Srisailam Anna Prasadam', 'Andhra Meals'],
    localCrafts: ['Chenchu Tribal Forest Products', 'Rudraksha Mala', 'Handicrafts'],
    howToReach: {
      air: 'Hyderabad International Airport (200 km) or Kurnool Airport (180 km)',
      rail: 'Markapur Road Railway Station (MRK - 85 km)',
      road: 'Scenic forest ghat road through Nagarjunasagar-Srisailam Tiger Reserve'
    }
  },
  {
    id: 'dest_konaseema',
    name: 'Konaseema',
    slug: 'konaseema',
    state: 'Andhra Pradesh',
    district: 'Dr. B.R. Ambedkar Konaseema',
    region: 'Coastal Andhra',
    tagline: 'God’s Own Creation in Andhra Pradesh (Delta Backwaters)',
    description: 'Konaseema is an enchanting delta oasis surrounded by Godavari river tributaries and the Bay of Bengal. Famous for its emerald green paddy fields, thousands of swaying coconut palms, tranquil backwater houseboats at Dindi, and Atreyapuram Pootharekulu sweet-making villages.',
    coordinates: { lat: 16.5786, lng: 81.9965 },
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200',
    secondaryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['Nature', 'Beaches', 'Culture', 'Food'],
    bestTime: 'October to March',
    recommendedDuration: '2 - 3 Days',
    approximateBudgetPerDay: 1700,
    rating: 4.9,
    reviewCount: 2900,
    famousFood: ['Atreyapuram Paper Sweets (Pootharekulu GI Tag)', 'Konaseema Peethala Iguru (Crab Curry)', 'Royyala Biryani', 'Panasa Puttu Biryani'],
    localCrafts: ['Coconut Shell Crafts', 'Coir Mats', 'Atreyapuram Handrolled Sweets'],
    howToReach: {
      air: 'Rajahmundry Airport (70 km)',
      rail: 'Rajahmundry (RJY) or Palakollu / Bhimavaram',
      road: 'Scenic delta roads connecting Amalapuram, Razole, and Dindi'
    }
  }
];

export const getDestinationBySlug = (slug) => destinations.find(d => d.slug === slug || d.id === slug);
export const getDestinationsByCategory = (cat) => destinations.filter(d => d.categories.some(c => c.toLowerCase() === cat.toLowerCase()));
export const getFeaturedDestinations = () => destinations.slice(0, 6);
export const getPopularDestinations = () => destinations.filter(d => d.rating >= 4.7);
export const searchDestinations = (query) => {
  if (!query) return destinations;
  const q = query.toLowerCase();
  return destinations.filter(d => 
    d.name.toLowerCase().includes(q) || 
    d.description.toLowerCase().includes(q) ||
    d.district.toLowerCase().includes(q) ||
    d.region.toLowerCase().includes(q)
  );
};
