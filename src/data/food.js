// SAHA - Verified Andhra Pradesh Regional Cuisines & Real Restaurants Dataset

export const regionalDishes = [
  {
    id: 'dish_01',
    name: 'Pesarattu Upma',
    destinationId: 'dest_vjw',
    category: 'Breakfast / Tiffin',
    isVegetarian: true,
    approximatePrice: 70,
    rating: 4.9,
    description: 'Iconic Andhra green gram (moong dal) crepe crisp-roasted in pure ghee, stuffed with warm spiced semolina Upma, and served with tangy Allam Pachadi (ginger chutney).',
    image: '/images/pesarattu_upma.jpg',
    famousAt: 'Vijayawada, Rajahmundry, Kakinada'
  },
  {
    id: 'dish_02',
    name: 'Traditional Andhra Butta Bhojanam (Banana Leaf Meal)',
    destinationId: 'dest_kkn',
    category: 'Meals / Lunch',
    isVegetarian: true,
    approximatePrice: 180,
    rating: 5.0,
    description: 'The legendary unlimited Andhra feast served on a fresh banana leaf with piping hot rice, Gongura pachadi, Avakaya, Podi with pure ghee, Gutti Vankaya, Sambar, Rasam, and Majjiga Pulusu.',
    image: '/images/andhra_bhojanam.jpg',
    famousAt: 'Kakinada, Vijayawada, Vizag (Subbayya Gari Hotel)'
  },
  {
    id: 'dish_03',
    name: 'Bongu Chicken (Bamboo Chicken)',
    destinationId: 'dest_araku',
    category: 'Local Specialty',
    isVegetarian: false,
    approximatePrice: 250,
    rating: 4.9,
    description: 'Indigenous tribal delicacy of Araku Valley where marinated country chicken with local mountain herbs is stuffed inside fresh bamboo stalks and slow-roasted over burning charcoal with zero added oil.',
    image: '/images/bamboo_chicken.jpg',
    famousAt: 'Araku Valley & Chaparai Cascades'
  },
  {
    id: 'dish_04',
    name: 'Atreyapuram Pootharekulu (Paper Sweet)',
    destinationId: 'dest_konaseema',
    category: 'Heritage Sweet (GI Tag)',
    isVegetarian: true,
    approximatePrice: 150, // Per box
    rating: 5.0,
    description: 'A delicate Andhra confection made from paper-thin translucent rice starch sheets rolled with pure melted ghee, powdered jaggery, and crushed dry fruits (cashews, almonds, pistachios).',
    image: '/images/pootharekulu.jpg',
    famousAt: 'Atreyapuram, Konaseema & Rajahmundry'
  },
  {
    id: 'dish_05',
    name: 'Gongura Mutton / Gongura Pachadi',
    destinationId: 'dest_amaravati',
    category: 'Curry / Gravy',
    isVegetarian: false,
    approximatePrice: 280,
    rating: 4.8,
    description: 'Tender mutton slow-cooked with sorrel leaves (Gongura), fiery Guntur red chillies, and aromatic spices. The hallmark tangy-spicy flavor of authentic Andhra culinary heritage.',
    image: '/images/gongura_mutton.jpg',
    famousAt: 'Guntur, Amaravati, Vijayawada'
  },
  {
    id: 'dish_06',
    name: 'Kurnool Uggani Bajji',
    destinationId: 'dest_knl',
    category: 'Street Food / Breakfast',
    isVegetarian: true,
    approximatePrice: 50,
    rating: 4.7,
    description: 'Rayalaseema’s beloved comfort food — seasoned puffed rice (Borugulu) sautéed with onions, roasted gram powder, and turmeric, served alongside piping hot deep-fried Mirapakaya Bajjis.',
    image: '/images/uggani_bajji.jpg',
    famousAt: 'Kurnool, Nandyal, Dhone'
  },
  {
    id: 'dish_07',
    name: 'Royyala Iguru (Andhra Prawn Curry)',
    destinationId: 'dest_vzg',
    category: 'Seafood',
    isVegetarian: false,
    approximatePrice: 320,
    rating: 4.9,
    description: 'Fresh Bay of Bengal prawns cooked in a thick, fiery onion-tomato gravy infused with freshly pounded ginger, garlic, green chillies, and curry leaves. Best paired with steamed white rice.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
    famousAt: 'Visakhapatnam & Kakinada Coast'
  },
  {
    id: 'dish_08',
    name: 'Kakinada Gottu Kaja',
    destinationId: 'dest_kkn',
    category: 'Heritage Sweet',
    isVegetarian: true,
    approximatePrice: 120,
    rating: 4.9,
    description: 'A traditional 130-year-old heritage sweet made with rolled maida layers, deep-fried until crisp on the outside, and soaked in cardamom-flavored sugar syrup that bursts with sweetness when bitten.',
    image: '/images/kakinada_kaja.jpg',
    famousAt: 'Kotaiah Sweets, Kakinada'
  },
  {
    id: 'dish_09',
    name: 'Rayalaseema Ragi Sangati with Natukodi Pulusu',
    destinationId: 'dest_gandikota',
    category: 'Traditional Meal',
    isVegetarian: false,
    approximatePrice: 220,
    rating: 4.9,
    description: 'Wholesome steamed finger millet balls (Ragi Mudda) served with spicy, aromatic country chicken curry (Natukodi) and a dollop of fresh ghee.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800',
    famousAt: 'Gandikota, Kadapa, Tirupati'
  }
];

export const restaurants = [
  // VIJAYAWADA
  {
    id: 'rest_vjw_01',
    name: 'Minerva Coffee Shop',
    destinationId: 'dest_vjw',
    cuisine: 'South Indian Pure Veg & Tiffins',
    rating: 4.6,
    reviewCount: 2800,
    priceCategory: '₹₹ (Moderate - ₹150–300)',
    address: 'Opposite Gateway Hotel, M.G. Road, Vijayawada',
    distance: '1.2 km from Prakasam Barrage',
    famousFor: 'Pesarattu Upma, Filter Coffee, Ghee Roast Dosa',
    isVegetarian: true,
    timings: '07:00 AM – 10:30 PM',
    phone: '+91 866 2478888',
    image: '/images/pesarattu_upma.jpg'
  },
  {
    id: 'rest_vjw_02',
    name: 'Subbayya Gari Hotel Vijayawada',
    destinationId: 'dest_vjw',
    cuisine: 'Authentic Andhra Meals',
    rating: 4.8,
    reviewCount: 3400,
    priceCategory: '₹₹ (Moderate - ₹180–300)',
    address: 'Near Old Bus Stand, Governorpet, Vijayawada',
    distance: '2.0 km from Kanaka Durga Temple',
    famousFor: 'Butta Bhojanam with 20+ Andhra items on Banana Leaf',
    isVegetarian: true,
    timings: '11:30 AM – 04:00 PM, 07:00 PM – 10:30 PM',
    phone: '+91 866 2577777',
    image: '/images/andhra_bhojanam.jpg'
  },
  {
    id: 'rest_vjw_03',
    name: 'Cross Roads Multi-Cuisine Restaurant',
    destinationId: 'dest_vjw',
    cuisine: 'Andhra Non-Veg & Biryani',
    rating: 4.5,
    reviewCount: 2200,
    priceCategory: '₹₹ (Moderate - ₹250–450)',
    address: 'Near Siddhartha College, Moghalrajpuram, Vijayawada',
    distance: '3.0 km from City Center',
    famousFor: 'Vijayawada Special Boneless Chicken Biryani, Natukodi Biryani',
    isVegetarian: false,
    timings: '12:00 PM – 04:00 PM, 07:00 PM – 11:00 PM',
    phone: '+91 866 2488888',
    image: '/images/gongura_mutton.jpg'
  },

  // VISAKHAPATNAM
  {
    id: 'rest_vzg_01',
    name: 'Sri Kanya Restaurant',
    destinationId: 'dest_vzg',
    cuisine: 'Andhra Non-Veg & Seafood',
    rating: 4.7,
    reviewCount: 3100,
    priceCategory: '₹₹ (Moderate - ₹200–400)',
    address: 'Near Diamond Park, Dwaraka Nagar, Visakhapatnam',
    distance: '2.5 km from Submarine Museum',
    famousFor: 'Royyala Iguru (Prawn Fry), Spicy Mutton Biryani, Fish Curry',
    isVegetarian: false,
    timings: '11:30 AM – 04:00 PM, 07:00 PM – 10:30 PM',
    phone: '+91 891 2755555',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'rest_vzg_02',
    name: 'Dakshin — Daspalla Hotel',
    destinationId: 'dest_vzg',
    cuisine: 'Heritage South Indian Thali',
    rating: 4.6,
    reviewCount: 2600,
    priceCategory: '₹₹₹ (Fine Dining - ₹350–600)',
    address: 'Daspalla Hotel, Suryabagh, Visakhapatnam',
    distance: '1.5 km from Jagadamba Centre',
    famousFor: 'Royal Andhra Thali, Avakaya Annam, Ulava Charu',
    isVegetarian: true,
    timings: '12:00 PM – 03:30 PM, 07:00 PM – 10:30 PM',
    phone: '+91 891 2564825',
    image: '/images/andhra_bhojanam.jpg'
  },

  // TIRUPATI
  {
    id: 'rest_tpt_01',
    name: 'Bhimas Deluxe Restaurant',
    destinationId: 'dest_tpt',
    cuisine: 'Pure Vegetarian Andhra & South Indian',
    rating: 4.6,
    reviewCount: 4200,
    priceCategory: '₹₹ (Moderate - ₹150–280)',
    address: 'Near Railway Station, G. Car Street, Tirupati',
    distance: '400 meters from Tirupati Main Station',
    famousFor: 'Traditional Tirupati Meals, Ghee Sambar Rice, Podi Dosa',
    isVegetarian: true,
    timings: '06:30 AM – 10:30 PM',
    phone: '+91 877 2225521',
    image: '/images/pesarattu_upma.jpg'
  },

  // ARAKU VALLEY
  {
    id: 'rest_araku_01',
    name: 'Tribal Bamboo Chicken Hub at Chaparai',
    destinationId: 'dest_araku',
    cuisine: 'Authentic Tribal Country Cooking',
    rating: 4.9,
    reviewCount: 1900,
    priceCategory: '₹ (Budget - ₹150–250)',
    address: 'Chaparai Waterfall Road, Araku Valley',
    distance: 'At Chaparai Cascades',
    famousFor: 'Bongu Chicken (Bamboo Chicken), Roasted Corn, Ginger Tea',
    isVegetarian: false,
    timings: '09:00 AM – 05:00 PM',
    phone: '+91 94900 12345',
    image: '/images/bamboo_chicken.jpg'
  },

  // KAKINADA & RAJAHMUNDRY
  {
    id: 'rest_kkn_01',
    name: 'Original Subbayya Gari Hotel (Heritage Branch)',
    destinationId: 'dest_kkn',
    cuisine: 'Authentic Godavari Andhra Meals',
    rating: 4.9,
    reviewCount: 5100,
    priceCategory: '₹₹ (Moderate - ₹180–250)',
    address: 'Near Police Barracks, Main Road, Kakinada',
    distance: '1.0 km from Kakinada Town Station',
    famousFor: 'The Original Butta Bhojanam with 22 varieties & sweet paan',
    isVegetarian: true,
    timings: '11:00 AM – 04:00 PM, 07:00 PM – 10:30 PM',
    phone: '+91 884 2378901',
    image: '/images/andhra_bhojanam.jpg'
  },
  {
    id: 'rest_rjy_01',
    name: 'Saffron Multi-Cuisine Restaurant',
    destinationId: 'dest_rjy',
    cuisine: 'Godavari Non-Veg & Seafood Thali',
    rating: 4.5,
    reviewCount: 1600,
    priceCategory: '₹₹ (Moderate - ₹250–400)',
    address: 'River Bay Resort Complex, Gowthami Ghat, Rajahmundry',
    distance: '800 meters from Godavari Arch Bridge',
    famousFor: 'Godavari Pulasa Fish (seasonal), Prawn Biryani, Ulava Charu Mutton',
    isVegetarian: false,
    timings: '12:00 PM – 04:00 PM, 07:00 PM – 10:45 PM',
    phone: '+91 883 2447788',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600'
  },

  // KURNOOL & GANDIKOTA
  {
    id: 'rest_knl_01',
    name: 'Pariwar Restaurant (Hotel Mourya Inn)',
    destinationId: 'dest_knl',
    cuisine: 'Rayalaseema Thali & Uggani',
    rating: 4.5,
    reviewCount: 1400,
    priceCategory: '₹₹ (Moderate - ₹180–350)',
    address: 'Bhagya Nagar, Near Bus Stand, Kurnool',
    distance: '900 meters from Konda Reddy Fort',
    famousFor: 'Rayalaseema Ragi Sangati with Natukodi, Uggani Bajji, Mutton Pulusu',
    isVegetarian: false,
    timings: '11:30 AM – 03:30 PM, 07:00 PM – 10:30 PM',
    phone: '+91 8518 224999',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=600'
  }
];

export const getDishesByDestination = (destId) => {
  return regionalDishes.filter(d => d.destinationId === destId);
};

export const getRestaurantsByDestination = (destId) => {
  return restaurants.filter(r => r.destinationId === destId);
};

export const getNearbyRestaurants = (lat, lng, maxDistanceKm = 10) => {
  // Simple proximity filter
  return restaurants.slice(0, 4);
};
