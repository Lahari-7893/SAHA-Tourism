export const accommodationCategories = ['budget', 'mid_range', 'premium'];

export const accommodations = [
  // Vijayawada
  {
    id: 'acc_vjw_1',
    destinationId: 'dest_vjw',
    area: 'MG Road Area',
    category: 'premium',
    approximatePriceRange: { min: 4000, max: 10000 },
    amenities: ['AC', 'WiFi', 'Pool', 'Restaurant', 'Gym', 'Parking'],
    description: 'Upscale hotels located in the commercial heart of the city, close to shopping malls and top dining options.',
    isApproximate: true
  },
  {
    id: 'acc_vjw_2',
    destinationId: 'dest_vjw',
    area: 'Governor Peta',
    category: 'mid_range',
    approximatePriceRange: { min: 1500, max: 3500 },
    amenities: ['AC', 'WiFi', 'Restaurant', 'Room Service'],
    description: 'Comfortable stay options convenient for business travelers and families, close to the railway station.',
    isApproximate: true
  },
  {
    id: 'acc_vjw_3',
    destinationId: 'dest_vjw',
    area: 'Railway Station / Bus Stand Area',
    category: 'budget',
    approximatePriceRange: { min: 500, max: 1500 },
    amenities: ['Non-AC/AC Options', 'Basic WiFi', 'Travel Desk'],
    description: 'Ideal for backpackers and transit travelers seeking economical stays.',
    isApproximate: true
  },
  
  // Visakhapatnam
  {
    id: 'acc_vzg_1',
    destinationId: 'dest_vzg',
    area: 'Beach Road (RK Beach)',
    category: 'premium',
    approximatePriceRange: { min: 5000, max: 15000 },
    amenities: ['AC', 'WiFi', 'Sea View', 'Pool', 'Spa', 'Fine Dining'],
    description: 'Luxury resorts and 5-star hotels offering spectacular views of the Bay of Bengal and easy beach access.',
    isApproximate: true
  },
  {
    id: 'acc_vzg_2',
    destinationId: 'dest_vzg',
    area: 'Siripuram / MVP Colony',
    category: 'mid_range',
    approximatePriceRange: { min: 2000, max: 4500 },
    amenities: ['AC', 'WiFi', 'Complimentary Breakfast', 'Parking'],
    description: 'Quiet, residential areas with good connectivity, ideal for families seeking peace away from tourist hustle.',
    isApproximate: true
  },
  {
    id: 'acc_vzg_3',
    destinationId: 'dest_vzg',
    area: 'Daba Gardens',
    category: 'budget',
    approximatePriceRange: { min: 800, max: 1800 },
    amenities: ['Basic Amenities', 'Central Location'],
    description: 'Central commercial hub offering budget lodges and proximity to local transport.',
    isApproximate: true
  },

  // Tirupati
  {
    id: 'acc_tpt_1',
    destinationId: 'dest_tpt',
    area: 'Tirumala Hill (APSDC/TTD)',
    category: 'budget',
    approximatePriceRange: { min: 100, max: 2000 },
    amenities: ['Basic', 'Close to Temple'],
    description: 'Trust-run guesthouses and free dorms on the hill. Must be booked well in advance online.',
    isApproximate: true
  },
  {
    id: 'acc_tpt_2',
    destinationId: 'dest_tpt',
    area: 'Alipiri Road / Renigunta Road',
    category: 'premium',
    approximatePriceRange: { min: 3500, max: 8000 },
    amenities: ['AC', 'WiFi', 'Veg Restaurant', 'Travel Desk'],
    description: 'Modern luxury hotels in Tirupati town with excellent pure vegetarian dining options.',
    isApproximate: true
  },

  // Araku
  {
    id: 'acc_araku_1',
    destinationId: 'dest_araku',
    area: 'APTDC Haritha Resorts',
    category: 'mid_range',
    approximatePriceRange: { min: 1500, max: 3500 },
    amenities: ['Scenic Views', 'Restaurant', 'Guided Tours Setup'],
    description: 'State-run resorts offering the most authentic and secure stays surrounded by nature.',
    isApproximate: true
  },
  
  // Gandikota
  {
    id: 'acc_gandikota_1',
    destinationId: 'dest_gandikota',
    area: 'Gorge View Camping',
    category: 'budget',
    approximatePriceRange: { min: 1000, max: 2000 },
    amenities: ['Tents', 'Campfire', 'Dinner/Breakfast included'],
    description: 'Adventure camping right on the edge of the gorge. Basic toilet facilities are provided by organizers.',
    isApproximate: true
  }
];

export const getAccommodationsByDestination = (destId) => {
  return accommodations.filter(acc => acc.destinationId === destId);
};

export const getAccommodationsByDestAndCategory = (destId, category) => {
  return accommodations.filter(acc => acc.destinationId === destId && acc.category === category);
};
