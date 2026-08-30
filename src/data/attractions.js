export const attractions = [
  // Vijayawada Attractions
  {
    id: 'attr_vjw_01',
    destinationId: 'dest_vjw',
    name: 'Kanaka Durga Temple',
    slug: 'kanaka-durga-temple',
    description: 'A famous Hindu temple dedicated to Goddess Kanaka Durga. Located on the Indrakeeladri hill, on the banks of Krishna River, it is one of the most prominent temples in Andhra Pradesh.',
    category: 'spiritual',
    coordinates: { lat: 16.5133, lng: 80.6111 },
    suggestedDuration: 120, // minutes
    approximateEntryFee: 0, // 0 means free or nominal fee, special darshan fees apply
    approximateDistanceFromCenter: 2.5,
    transportOptions: [
      { type: 'auto', estimatedCost: 100, estimatedTime: 15 },
      { type: 'cab', estimatedCost: 200, estimatedTime: 15 }
    ],
    images: ['/images/kanaka_durga.jpg'],
    bestTime: 'Morning or Evening',
    tips: 'Expect heavy crowds during Dussehra. Dress modestly. Paid special darshan tickets can save time.',
    isApproximate: true
  },
  {
    id: 'attr_vjw_02',
    destinationId: 'dest_vjw',
    name: 'Prakasam Barrage',
    slug: 'prakasam-barrage',
    description: 'An iconic structure stretching across the Krishna River. It offers a stunning view of the river and the surrounding hills, especially beautiful at night when illuminated.',
    category: 'landmark',
    coordinates: { lat: 16.5057, lng: 80.6074 },
    suggestedDuration: 60,
    approximateEntryFee: 0,
    approximateDistanceFromCenter: 2.0,
    transportOptions: [
      { type: 'walking', estimatedCost: 0, estimatedTime: 25 },
      { type: 'auto', estimatedCost: 50, estimatedTime: 10 }
    ],
    images: ['/images/prakasam_barrage.jpg'],
    bestTime: 'Evening',
    tips: 'Best visited at sunset. Great spot for photography. Nearby boating options are available.',
    isApproximate: true
  },
  {
    id: 'attr_vjw_03',
    destinationId: 'dest_vjw',
    name: 'Bhavani Island',
    slug: 'bhavani-island',
    description: 'One of the largest river islands in India, located amidst the Krishna River. It offers water sports, boating, resorts, and a peaceful environment away from the city bustles.',
    category: 'nature',
    coordinates: { lat: 16.5250, lng: 80.5900 },
    suggestedDuration: 240,
    approximateEntryFee: 150, // boat ride fee usually
    approximateDistanceFromCenter: 4.5,
    transportOptions: [
      { type: 'auto', estimatedCost: 150, estimatedTime: 25 } // up to the ghat, then boat
    ],
    images: ['/images/bhavani_island.jpg'],
    bestTime: 'Morning to Afternoon',
    tips: 'Must take a boat ride to reach the island. Great for a half-day picnic. APTDC runs the resort here.',
    isApproximate: true
  },
  {
    id: 'attr_vjw_04',
    destinationId: 'dest_vjw',
    name: 'Undavalli Caves',
    slug: 'undavalli-caves',
    description: 'A monolithic example of Indian rock-cut architecture dating back to the 4th-5th centuries. Famous for the huge statue of Lord Vishnu in a reclining posture.',
    category: 'heritage',
    coordinates: { lat: 16.4958, lng: 80.5807 },
    suggestedDuration: 90,
    approximateEntryFee: 25,
    approximateDistanceFromCenter: 6.0,
    transportOptions: [
      { type: 'auto', estimatedCost: 200, estimatedTime: 20 },
      { type: 'bus', estimatedCost: 20, estimatedTime: 30 }
    ],
    images: ['/images/undavalli_caves.jpg'],
    bestTime: 'Morning',
    tips: 'Located across the river in Guntur district. Wear comfortable walking shoes for climbing steps.',
    isApproximate: true
  },
  
  // Visakhapatnam Attractions
  {
    id: 'attr_vzg_01',
    destinationId: 'dest_vzg',
    name: 'Ramakrishna Beach (RK Beach)',
    slug: 'rk-beach',
    description: 'The most popular beach in Visakhapatnam, offering a long stretch of sand, ideal for evening walks. It houses the INS Kursura Submarine Museum.',
    category: 'beach',
    coordinates: { lat: 17.7126, lng: 83.3278 },
    suggestedDuration: 120,
    approximateEntryFee: 0,
    approximateDistanceFromCenter: 4.0,
    transportOptions: [
      { type: 'auto', estimatedCost: 80, estimatedTime: 15 }
    ],
    images: ['https://images.unsplash.com/photo-1625531061730-a9cbfa36f6d6?auto=format&fit=crop&q=80'],
    bestTime: 'Late Afternoon to Evening',
    tips: 'Swimming is generally not advised due to strong currents. Visit the submarine museum nearby.',
    isApproximate: true
  },
  {
    id: 'attr_vzg_02',
    destinationId: 'dest_vzg',
    name: 'INS Kursura Submarine Museum',
    slug: 'ins-kursura',
    description: 'A decommissioned Russian-built submarine set up as a museum on RK Beach. It offers a fascinating glimpse into the life of submariners.',
    category: 'heritage',
    coordinates: { lat: 17.7164, lng: 83.3323 },
    suggestedDuration: 60,
    approximateEntryFee: 50,
    approximateDistanceFromCenter: 4.5,
    transportOptions: [
      { type: 'auto', estimatedCost: 80, estimatedTime: 15 }
    ],
    images: ['https://images.unsplash.com/photo-1610427845318-7b9c97b8332b?auto=format&fit=crop&q=80'],
    bestTime: 'Evening',
    tips: 'Mondays usually closed. Expect queues on weekends. Very educational for children.',
    isApproximate: true
  },
  {
    id: 'attr_vzg_03',
    destinationId: 'dest_vzg',
    name: 'Kailasagiri',
    slug: 'kailasagiri',
    description: 'A hilltop park offering panoramic views of the sea and the city. It features giant statues of Shiva and Parvathi, a ropeway, and a toy train.',
    category: 'nature',
    coordinates: { lat: 17.7490, lng: 83.3429 },
    suggestedDuration: 180,
    approximateEntryFee: 20, // park entry
    approximateDistanceFromCenter: 9.0,
    transportOptions: [
      { type: 'cab', estimatedCost: 250, estimatedTime: 25 },
      { type: 'auto', estimatedCost: 150, estimatedTime: 30 }
    ],
    images: ['https://images.unsplash.com/photo-1617056345601-38384d2b2700?auto=format&fit=crop&q=80'],
    bestTime: 'Late Afternoon',
    tips: 'Take the ropeway for a scenic ride up. Great place for a family picnic.',
    isApproximate: true
  },

  // Tirupati Attractions
  {
    id: 'attr_tpt_01',
    destinationId: 'dest_tpt',
    name: 'Sri Venkateswara Swamy Vaari Temple',
    slug: 'tirumala-temple',
    description: 'The world-famous temple of Lord Venkateswara located in Tirumala hills. Known for its Dravidian architecture and immense spiritual significance.',
    category: 'spiritual',
    coordinates: { lat: 13.6833, lng: 79.3473 },
    suggestedDuration: 300,
    approximateEntryFee: 0, // Sarva darshan free, special is 300
    approximateDistanceFromCenter: 22.0,
    transportOptions: [
      { type: 'bus', estimatedCost: 100, estimatedTime: 60 }, // APSRTC buses
      { type: 'cab', estimatedCost: 1200, estimatedTime: 50 } // To and fro
    ],
    images: ['https://images.unsplash.com/photo-1598974357801-cb8e63cc7337?auto=format&fit=crop&q=80'],
    bestTime: 'Early Morning',
    tips: 'Booking tickets online months in advance is highly recommended. Strict dress code applies.',
    isApproximate: true
  },

  // Araku Attractions
  {
    id: 'attr_araku_01',
    destinationId: 'dest_araku',
    name: 'Borra Caves',
    slug: 'borra-caves',
    description: 'One million year-old limestone caves featuring spectacular stalactite and stalagmite formations, illuminated by colorful lights.',
    category: 'nature',
    coordinates: { lat: 18.2818, lng: 83.0396 },
    suggestedDuration: 120,
    approximateEntryFee: 80,
    approximateDistanceFromCenter: 35.0, // distance from Araku center
    transportOptions: [
      { type: 'cab', estimatedCost: 1000, estimatedTime: 60 }
    ],
    images: ['https://images.unsplash.com/photo-1610427845318-7b9c97b8332b?auto=format&fit=crop&q=80'],
    bestTime: 'Morning',
    tips: 'Involves significant walking up and down stairs inside the cave. Stop here on the way to Araku from Vizag.',
    isApproximate: true
  },

  // Gandikota Attractions
  {
    id: 'attr_gandikota_01',
    destinationId: 'dest_gandikota',
    name: 'Gandikota Fort & Gorge View',
    slug: 'gandikota-fort',
    description: 'Explore the ruins of the Gandikota Fort and walk up to the edge of the magnificent gorge formed by the Penna River.',
    category: 'heritage',
    coordinates: { lat: 14.8143, lng: 78.2862 },
    suggestedDuration: 180,
    approximateEntryFee: 0,
    approximateDistanceFromCenter: 1.0,
    transportOptions: [
      { type: 'walking', estimatedCost: 0, estimatedTime: 15 }
    ],
    images: ['https://images.unsplash.com/photo-1617056345601-38384d2b2700?auto=format&fit=crop&q=80'],
    bestTime: 'Sunrise or Sunset',
    tips: 'Best visited at sunrise for breathtaking views. Carry water as amenities are limited. Camping options are available nearby.',
    isApproximate: true
  }
];

export const getAttractionsByDestination = (destId) => {
  return attractions.filter(attr => attr.destinationId === destId);
};

export const getAttractionById = (id) => {
  return attractions.find(attr => attr.id === id);
};

export const getAttractionsByCategory = (category) => {
  return attractions.filter(attr => attr.category === category);
};
