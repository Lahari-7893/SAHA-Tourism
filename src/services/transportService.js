import { calculateDistance, estimateTravelTime } from './mapService';

export function getTransportOptions(fromCoords, toCoords, travelers) {
  if (!fromCoords || !toCoords) return [];
  
  const distance = calculateDistance(fromCoords, toCoords);
  const options = [];
  
  if (distance < 3) {
    options.push({
      mode: 'walking',
      distance: distance,
      time: estimateTravelTime(distance, 'walking'),
      cost: 0,
      description: 'Walking'
    });
  }
  
  if (distance < 10) {
    options.push({
      mode: 'bicycle',
      distance: distance,
      time: estimateTravelTime(distance, 'bicycle'),
      cost: 50 * travelers, // assumption
      description: 'Bicycle / Rental'
    });
  }
  
  options.push({
    mode: 'transit',
    distance: distance,
    time: estimateTravelTime(distance, 'transit'),
    cost: 30 * travelers,
    description: 'Public Transit'
  });
  
  options.push({
    mode: 'taxi',
    distance: distance,
    time: estimateTravelTime(distance, 'taxi'),
    cost: 100 + (20 * distance),
    description: 'Taxi / Auto'
  });
  
  return options;
}

export function calculateFare(mode, distance, travelers) {
  if (mode === 'walking') return 0;
  if (mode === 'bicycle') return 50 * travelers;
  if (mode === 'transit') return 30 * travelers;
  if (mode === 'taxi') return 100 + (20 * distance);
  return 0;
}

export function getRecommendedTransport(distance, travelers, budget) {
  const options = getTransportOptions({lat:0, lng:0}, {lat: distance, lng: 0}, travelers); // dummy coords to get distance
  
  // Try to find the fastest one within budget
  const withinBudget = options.filter(opt => opt.cost <= budget);
  
  if (withinBudget.length > 0) {
    withinBudget.sort((a, b) => a.time - b.time);
    return withinBudget[0];
  }
  
  // If none within budget, return the cheapest
  options.sort((a, b) => a.cost - b.cost);
  return options[0];
}
