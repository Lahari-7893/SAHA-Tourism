export const transportModes = [
  {
    id: 'walking',
    name: 'Walking',
    icon: 'Footprints',
    baseFare: 0,
    perKmRate: 0,
    suitableGroupSize: { min: 1, max: 20 },
    comfort: 2,
    speed: 4, // km/h
    description: 'Best for short distances and exploring local markets or heritage sites on foot.',
    tips: 'Wear comfortable shoes and carry water. Avoid walking long distances in summer afternoons.'
  },
  {
    id: 'bus',
    name: 'Local Bus',
    icon: 'Bus',
    baseFare: 10,
    perKmRate: 1.5,
    suitableGroupSize: { min: 1, max: 5 },
    comfort: 2,
    speed: 25, // km/h
    description: 'Economical option provided by APSRTC for city and inter-city travel.',
    tips: 'Can be crowded during peak hours. Great for budget travel. Keep small change handy.'
  },
  {
    id: 'auto',
    name: 'Auto Rickshaw',
    icon: 'Bike', // using Bike as proxy for three-wheeler in some icon sets, or Car
    baseFare: 30, // usually min fare for first 1.5-2km
    perKmRate: 15,
    suitableGroupSize: { min: 1, max: 3 },
    comfort: 3,
    speed: 30, // km/h
    description: 'Convenient for short to medium distances within cities. Easily available.',
    tips: 'Negotiate fare before boarding if meter is not used. Ride-hailing apps like Ola/Uber offer auto bookings.'
  },
  {
    id: 'cab',
    name: 'Cab / Taxi',
    icon: 'Car',
    baseFare: 80,
    perKmRate: 20,
    suitableGroupSize: { min: 1, max: 4 },
    comfort: 5,
    speed: 40, // km/h
    description: 'Comfortable point-to-point travel, ideal for families or longer sightseeing trips.',
    tips: 'Use app-based services (Ola/Uber) in major cities for transparent pricing. Hire for a half/full day for local sightseeing.'
  },
  {
    id: 'tempo_traveller',
    name: 'Tempo Traveller',
    icon: 'BusFront',
    baseFare: 1500, // typically hired per day
    perKmRate: 25,
    suitableGroupSize: { min: 5, max: 14 },
    comfort: 4,
    speed: 45, // km/h
    description: 'Perfect for large groups or families traveling together across destinations.',
    tips: 'Usually hired for a multi-day trip. Ensure AC is working before booking.'
  }
];

export const calculateFare = (modeId, distanceKm, travelers = 1) => {
  const mode = transportModes.find(m => m.id === modeId);
  if (!mode) return 0;
  
  if (mode.id === 'walking') return 0;
  
  let totalCost = mode.baseFare + (Math.max(0, distanceKm - 2) * mode.perKmRate);
  
  // For buses, fare is per person
  if (mode.id === 'bus') {
    totalCost = totalCost * travelers;
  }
  
  return {
    estimatedCost: Math.round(totalCost),
    isApproximate: true
  };
};

export const estimateTravelTime = (modeId, distanceKm) => {
  const mode = transportModes.find(m => m.id === modeId);
  if (!mode) return 0;
  
  const timeInHours = distanceKm / mode.speed;
  return {
    estimatedMinutes: Math.round(timeInHours * 60),
    isApproximate: true
  };
};

export const getRecommendedTransport = (travelers, distanceKm, budget = 'medium') => {
  if (distanceKm < 2) return transportModes.find(m => m.id === 'walking');
  
  if (travelers > 4) return transportModes.find(m => m.id === 'tempo_traveller');
  
  if (budget === 'low') {
    return transportModes.find(m => m.id === 'bus');
  } else if (budget === 'high') {
    return transportModes.find(m => m.id === 'cab');
  } else {
    // medium budget
    return distanceKm > 10 ? transportModes.find(m => m.id === 'cab') : transportModes.find(m => m.id === 'auto');
  }
};
