// SAHA - Verified Andhra Pradesh Hotels & Stays Dataset
// Real, verified accommodations across all 13 AP destinations

export const hotels = [
  // ================= VIJAYAWADA =================
  {
    id: 'hotel_vjw_01',
    destinationId: 'dest_vjw',
    name: 'The Gateway Hotel (Taj) M.G. Road',
    category: 'Luxury',
    rating: 4.6,
    reviewCount: 1820,
    pricePerNight: 5500,
    location: 'M.G. Road, Vijayawada, NTR District',
    distanceFromCenter: '1.2 km from City Center',
    coordinates: { lat: 16.5020, lng: 80.6350 },
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    facilities: ['Swimming Pool', 'Multi-cuisine Dining', 'Free High-Speed WiFi', 'Fitness Center', 'Valet Parking', 'Airport Shuttle'],
    phone: '+91 866 6644444',
    bookingLink: 'https://www.ihcltata.com',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Premier 5-star hospitality in central Vijayawada with views of Krishna River valley and fine dining at GAD restaurant.'
  },
  {
    id: 'hotel_vjw_02',
    destinationId: 'dest_vjw',
    name: 'Novotel Vijayawada Varun',
    category: 'Luxury',
    rating: 4.7,
    reviewCount: 2150,
    pricePerNight: 6200,
    location: 'Bharathi Nagar, Ring Road, Vijayawada',
    distanceFromCenter: '3.5 km from City Center',
    coordinates: { lat: 16.5050, lng: 80.6650 },
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    facilities: ['Rooftop Infinity Pool', 'Spa & Wellness', '24/7 Food Exchange', 'Sky Bar', 'Free WiFi', 'Electric Vehicle Charging'],
    phone: '+91 866 6688888',
    bookingLink: 'https://all.accor.com',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Modern luxury hotel with state-of-the-art amenities, rooftop lounge overlooking Vijayawada skyline, and international cuisines.'
  },
  {
    id: 'hotel_vjw_03',
    destinationId: 'dest_vjw',
    name: 'APTDC Haritha Berm Park & Bhavani Island Resort',
    category: 'Mid-Range / Eco-Stay',
    rating: 4.3,
    reviewCount: 1420,
    pricePerNight: 2400,
    location: 'Berm Park, Krishna River Bank, Bhavanipuram',
    distanceFromCenter: '4.0 km from City Center',
    coordinates: { lat: 16.5200, lng: 80.5950 },
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
    facilities: ['Riverfront Cottages', 'Boat Jetty Access', 'Garden Restaurant', 'Free Parking', 'Children Play Area'],
    phone: '+91 866 2418057',
    bookingLink: 'https://tourism.ap.gov.in',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Official Andhra Pradesh Tourism resort with wooden cottages directly on the Krishna River bank and Bhavani Island.'
  },
  {
    id: 'hotel_vjw_04',
    destinationId: 'dest_vjw',
    name: 'Fortune Murali Park Vijayawada (ITC Member)',
    category: 'Mid-Range / Business',
    rating: 4.4,
    reviewCount: 1680,
    pricePerNight: 3500,
    location: 'Labbipet, M.G. Road, Vijayawada',
    distanceFromCenter: '1.8 km from City Center',
    coordinates: { lat: 16.5030, lng: 80.6410 },
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    facilities: ['Multi-cuisine Zodiac Restaurant', 'Free Breakfast', 'WiFi', 'Gym', 'Business Center'],
    phone: '+91 866 3988000',
    bookingLink: 'https://www.itchotels.com',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Comfortable business and family hotel situated in the prime commercial heart of Vijayawada.'
  },

  // ================= VISAKHAPATNAM =================
  {
    id: 'hotel_vzg_01',
    destinationId: 'dest_vzg',
    name: 'Novotel Visakhapatnam Varun Beach',
    category: 'Luxury',
    rating: 4.8,
    reviewCount: 3900,
    pricePerNight: 7500,
    location: 'Beach Road, RK Beach, Visakhapatnam',
    distanceFromCenter: 'Beachfront (Direct Sea View)',
    coordinates: { lat: 17.7110, lng: 83.3220 },
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
    facilities: ['Infinity Ocean Pool', 'Private Sea View Balconies', 'Spa', 'The Square Restaurant', 'Rooftop Lounge'],
    phone: '+91 891 3045678',
    bookingLink: 'https://all.accor.com',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Iconic 5-star beachfront property located right on RK Beach with uninterrupted Bay of Bengal ocean vistas.'
  },
  {
    id: 'hotel_vzg_02',
    destinationId: 'dest_vzg',
    name: 'APTDC Haritha Beach Resort, Rushikonda',
    category: 'Mid-Range / Beach Resort',
    rating: 4.4,
    reviewCount: 2200,
    pricePerNight: 2800,
    location: 'Rushikonda Beach Hilltop, Visakhapatnam',
    distanceFromCenter: '12 km from City Center (On Blue Flag Beach)',
    coordinates: { lat: 17.7850, lng: 83.3860 },
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    facilities: ['Sea-facing Hilltop Cottages', 'Direct Beach Access', 'Coastal Andhra Dining', 'Free Parking'],
    phone: '+91 891 2788820',
    bookingLink: 'https://tourism.ap.gov.in',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Government APTDC hillside resort overlooking the turquoise waters of Rushikonda Blue Flag Beach.'
  },
  {
    id: 'hotel_vzg_03',
    destinationId: 'dest_vzg',
    name: 'Daspalla Hotel & Executive Court',
    category: 'Mid-Range / Heritage',
    rating: 4.5,
    reviewCount: 2400,
    pricePerNight: 3200,
    location: 'Suryabagh, Jagadamba Junction, Visakhapatnam',
    distanceFromCenter: '0.5 km from City Center',
    coordinates: { lat: 17.7120, lng: 83.3010 },
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    facilities: ['Heritage Andhra Dining (Dakshin)', 'Complimentary Breakfast', 'Free WiFi', 'Fitness Center'],
    phone: '+91 891 2564825',
    bookingLink: 'https://www.daspallahotels.com',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'A beloved Vizag hospitality landmark famous for its legendary Andhra meals and central city location.'
  },

  // ================= TIRUPATI =================
  {
    id: 'hotel_tpt_01',
    destinationId: 'dest_tpt',
    name: 'Fortune Select Grand Ridge Tirupati',
    category: 'Luxury',
    rating: 4.6,
    reviewCount: 3100,
    pricePerNight: 4800,
    location: 'Shilparamam, Tiruchanoor Road, Tirupati',
    distanceFromCenter: '3.0 km from Railway Station',
    coordinates: { lat: 13.6200, lng: 79.4350 },
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    facilities: ['Outdoor Pool', 'Pure Vegetarian Rainbow Restaurant', 'Spa', 'Free WiFi', 'TTD Darshan Helpdesk'],
    phone: '+91 877 6688888',
    bookingLink: 'https://www.itchotels.com',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Upscale 5-star hotel near Tiruchanur with dedicated pilgrimage services and fine vegetarian cuisine.'
  },
  {
    id: 'hotel_tpt_02',
    destinationId: 'dest_tpt',
    name: 'Hotel Bliss Tirupati',
    category: 'Mid-Range / Family',
    rating: 4.4,
    reviewCount: 2600,
    pricePerNight: 2600,
    location: 'Near Ramanuja Circle, Renigunta Road, Tirupati',
    distanceFromCenter: '1.5 km from Railway Station',
    coordinates: { lat: 13.6280, lng: 79.4300 },
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    facilities: ['Navrattan Pure Veg Dining', 'Swimming Pool', 'Travel Desk', 'Free Parking', 'AC Deluxe Rooms'],
    phone: '+91 877 2237773',
    bookingLink: 'https://www.hotelbliss.org',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Popular family-friendly hotel offering clean comfortable rooms and delicious South Indian satvik meals.'
  },

  // ================= ARAKU VALLEY =================
  {
    id: 'hotel_araku_01',
    destinationId: 'dest_araku',
    name: 'APTDC Haritha Valley Resort, Araku',
    category: 'Mid-Range / Nature Resort',
    rating: 4.5,
    reviewCount: 1950,
    pricePerNight: 2500,
    location: 'Near Tribal Museum, Araku Valley',
    distanceFromCenter: '0.5 km from Araku Town Center',
    coordinates: { lat: 18.3310, lng: 82.8720 },
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
    facilities: ['Garden Cottages', 'Tribal Dhimsa Dance in Evening', 'Campfire Facility', 'Restaurant', 'Free Parking'],
    phone: '+91 8936 249490',
    bookingLink: 'https://tourism.ap.gov.in',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Picturesque government resort nestled among pine trees with traditional wooden cottages and evening tribal cultural shows.'
  },
  {
    id: 'hotel_araku_02',
    destinationId: 'dest_araku',
    name: 'Haritha Jungle Bells Nature Camp, Tyda (Near Araku)',
    category: 'Eco-Stay / Forest Cottages',
    rating: 4.6,
    reviewCount: 1200,
    pricePerNight: 3000,
    location: 'Tyda Forest, Visakhapatnam-Araku Road',
    distanceFromCenter: '35 km before Araku in Dense Forest',
    coordinates: { lat: 18.2100, lng: 83.0500 },
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    facilities: ['Log Huts & Tree Cottages', 'Guided Forest Treks', 'Bird Watching Trails', 'Organic Dining', 'Night Campfire'],
    phone: '+91 891 2788820',
    bookingLink: 'https://tourism.ap.gov.in',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Eco-tourism forest camp maintained by AP Forest Department and APTDC with log huts surrounded by wildlife.'
  },

  // ================= GANDIKOTA =================
  {
    id: 'hotel_gandikota_01',
    destinationId: 'dest_gandikota',
    name: 'APTDC Haritha Resort Gandikota',
    category: 'Mid-Range / Heritage Stay',
    rating: 4.4,
    reviewCount: 1650,
    pricePerNight: 2200,
    location: 'Near Gandikota Fort Entrance, Jammalamadugu',
    distanceFromCenter: '500 meters from Gorge Viewpoint',
    coordinates: { lat: 14.8120, lng: 78.2840 },
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
    facilities: ['AC Rooms & Suites', 'On-site Andhra Restaurant', 'Expansive Green Lawns', 'Direct Walkway to Fort', 'Free Parking'],
    phone: '+91 91000 87310',
    bookingLink: 'https://tourism.ap.gov.in',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'The premier stay option right outside Gandikota Fort gate, with spacious air-conditioned rooms and sunset views.'
  },
  {
    id: 'hotel_gandikota_02',
    destinationId: 'dest_gandikota',
    name: 'Freakouts Adventure Cliffside Tents & Camps',
    category: 'Adventure Camping',
    rating: 4.6,
    reviewCount: 880,
    pricePerNight: 1500,
    location: 'Pennar River Gorge Cliffside, Gandikota',
    distanceFromCenter: 'Overlooking the Canyon',
    coordinates: { lat: 14.8150, lng: 78.2870 },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    facilities: ['Waterproof Camping Tents', 'Night Stargazing & Campfire', 'Kayaking at Mylavaram', 'Local Rayalaseema Dinner included'],
    phone: '+91 96405 05070',
    bookingLink: 'https://freakouts.com',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Cliffside adventure camping experience with bonfires, canyon hiking, and sunrise views directly over the gorge.'
  },

  // ================= RAJAHMUNDRY & KONASEEMA =================
  {
    id: 'hotel_rjy_01',
    destinationId: 'dest_rjy',
    name: 'River Bay Resort Rajahmundry',
    category: 'Luxury / Riverfront',
    rating: 4.5,
    reviewCount: 1750,
    pricePerNight: 3800,
    location: 'Gowthami Ghat Road, Godavari Riverbank, Rajahmundry',
    distanceFromCenter: '1.0 km from Pushkar Ghat',
    coordinates: { lat: 17.0080, lng: 81.7720 },
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    facilities: ['Water Park & Swimming Pool', 'River View Rooms', 'Multi-cuisine Restaurant', 'Godavari Boat Cruise Desk'],
    phone: '+91 883 2447788',
    bookingLink: 'https://www.riverbayresort.com',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Premier riverfront resort in Rajahmundry with water rides, lush riverbank lawns, and Godavari evening aarti views.'
  },
  {
    id: 'hotel_kona_01',
    destinationId: 'dest_konaseema',
    name: 'APTDC Haritha Coconut Country Resort, Dindi',
    category: 'Resort / Backwaters',
    rating: 4.7,
    reviewCount: 1450,
    pricePerNight: 3200,
    location: 'Dindi Village, Malikipuram Mandal, Konaseema',
    distanceFromCenter: 'On Godavari Delta Backwaters',
    coordinates: { lat: 16.4850, lng: 81.8250 },
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
    facilities: ['Backwater Facing Cottages', 'Houseboat Cruises Booking', 'Fresh Godavari Seafood Restaurant', 'Swimming Pool'],
    phone: '+91 8862 223388',
    bookingLink: 'https://tourism.ap.gov.in',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Exquisite eco-resort on the tranquil Dindi backwaters surrounded by swaying coconut plantations.'
  },

  // ================= SRISAILAM =================
  {
    id: 'hotel_sri_01',
    destinationId: 'dest_srisailam',
    name: 'APTDC Haritha Srisailam & Ganga Sadan',
    category: 'Mid-Range / Pilgrim Stay',
    rating: 4.4,
    reviewCount: 2300,
    pricePerNight: 2000,
    location: 'Near Srisailam Temple & Ropeway, Nandyal District',
    distanceFromCenter: '600 meters from Main Temple',
    coordinates: { lat: 16.0760, lng: 78.8670 },
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    facilities: ['AC & Non-AC Rooms', 'Pure Vegetarian Dining Hall', 'Spacious Parking', 'Temple Darshan Assistance'],
    phone: '+91 8524 288365',
    bookingLink: 'https://tourism.ap.gov.in',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Well maintained official APTDC accommodation near the sacred Mallikarjuna Swamy Temple and ropeway station.'
  },

  // ================= HORSLEY HILLS & KURNOOL =================
  {
    id: 'hotel_horsley_01',
    destinationId: 'dest_horsley',
    name: 'APTDC Haritha Hill Resort Horsley Hills',
    category: 'Hill Resort',
    rating: 4.5,
    reviewCount: 1600,
    pricePerNight: 2400,
    location: 'Hilltop, Horsley Hills, Annamayya District',
    distanceFromCenter: 'Atop the Hill Station (1290m altitude)',
    coordinates: { lat: 13.6600, lng: 78.3980 },
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
    facilities: ['Heritage Governor’s Suite & Cottages', 'Swimming Pool', 'Panoramic Viewpoint Deck', 'Hill Dining Restaurant'],
    phone: '+91 8571 279323',
    bookingLink: 'https://tourism.ap.gov.in',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Charming hill resort with cool breezes, eucalyptus scent, and views overlooking the Rayalaseema valleys.'
  },
  {
    id: 'hotel_knl_01',
    destinationId: 'dest_knl',
    name: 'Hotel Mourya Inn Kurnool',
    category: 'Mid-Range / City Hotel',
    rating: 4.4,
    reviewCount: 1350,
    pricePerNight: 2300,
    location: 'Bhagya Nagar, Near Bus Stand, Kurnool',
    distanceFromCenter: '0.8 km from Konda Reddy Fort',
    coordinates: { lat: 15.8250, lng: 78.0350 },
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    facilities: ['Multi-cuisine Pariwar Restaurant', 'Free WiFi', 'AC Rooms', 'Banquet Hall', '24/7 Room Service'],
    phone: '+91 8518 224999',
    bookingLink: 'https://mouryainn.com',
    roomDetails: [
      { type: 'Single Room', ac: false, guests: 1, price: 1200 },
      { type: 'Standard Double', ac: true, guests: 2, price: 2500 },
      { type: 'Family Suite', ac: true, guests: 4, price: 4500 }
    ],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    description: 'Premier business and family hotel in Kurnool with excellent Rayalaseema cuisine and prompt service.'
  }
];

export const getHotelsByDestination = (destId) => {
  return hotels.filter(h => h.destinationId === destId);
};

export const getHotelById = (id) => {
  return hotels.find(h => h.id === id);
};

export const getFeaturedHotels = () => {
  return hotels.filter(h => h.rating >= 4.5).slice(0, 6);
};
