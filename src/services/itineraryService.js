import { getAttractionsByDestination } from '../data/attractions';
import { destinations } from '../data/destinations';
import { transportModes } from '../data/transport';
import { foodItems } from '../data/food';

// Haversine distance in km
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Score an attraction based on user interests
function scoreAttraction(attraction, interests) {
  if (!interests || interests.length === 0) return 1;
  const categoryMap = {
    historical: ['historical', 'heritage', 'fort', 'monument', 'ruins'],
    temples: ['temple', 'spiritual', 'religious', 'pilgrimage'],
    nature: ['nature', 'park', 'garden', 'hill', 'waterfall', 'forest', 'scenic'],
    beaches: ['beach', 'island', 'coastal', 'waterfront'],
    culture: ['culture', 'museum', 'art', 'cultural', 'traditional'],
    food: ['food', 'cuisine', 'restaurant', 'market', 'street food'],
    shopping: ['shopping', 'market', 'bazaar', 'handicraft'],
    adventure: ['adventure', 'trekking', 'hiking', 'sports', 'outdoor'],
    photography: ['photography', 'scenic', 'viewpoint', 'panoramic'],
    family: ['family', 'park', 'amusement', 'zoo', 'garden'],
    spiritual: ['spiritual', 'temple', 'meditation', 'pilgrimage', 'religious'],
    wildlife: ['wildlife', 'sanctuary', 'zoo', 'bird', 'national park'],
  };

  let score = 0;
  const attrCats = (attraction.categories || [attraction.category || '']).map(c =>
    c.toLowerCase()
  );

  for (const interest of interests) {
    const keywords = categoryMap[interest.toLowerCase()] || [interest.toLowerCase()];
    for (const keyword of keywords) {
      for (const cat of attrCats) {
        if (cat.includes(keyword) || keyword.includes(cat)) {
          score += 2;
        }
      }
      if (
        attraction.name.toLowerCase().includes(keyword) ||
        (attraction.description || '').toLowerCase().includes(keyword)
      ) {
        score += 1;
      }
    }
  }
  return Math.max(score, 0.5); // minimum score so all attractions have a chance
}

// Recommend transport based on distance and travelers
function recommendTransport(distanceKm, travelers) {
  if (distanceKm < 1) return { mode: 'Walking', speed: 4, costPerKm: 0, baseFare: 0 };
  if (distanceKm < 3) {
    if (travelers <= 2)
      return { mode: 'Auto', speed: 20, costPerKm: 13, baseFare: 30 };
    return { mode: 'Cab', speed: 25, costPerKm: 14, baseFare: 50 };
  }
  if (travelers <= 3) return { mode: 'Auto', speed: 20, costPerKm: 13, baseFare: 30 };
  if (travelers <= 5) return { mode: 'Cab', speed: 25, costPerKm: 14, baseFare: 50 };
  return { mode: 'Tempo Traveller', speed: 30, costPerKm: 18, baseFare: 200 };
}

// Calculate transport fare
function calculateTransportCost(distanceKm, transport) {
  const fare = transport.baseFare + distanceKm * transport.costPerKm;
  const min = Math.round(fare * 0.85);
  const max = Math.round(fare * 1.15);
  return { min, max, average: Math.round((min + max) / 2) };
}

// Format time from minutes since midnight
function formatTime(minutesSinceMidnight) {
  const hours = Math.floor(minutesSinceMidnight / 60);
  const minutes = minutesSinceMidnight % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Nearest neighbor route optimization
function optimizeRoute(startCoords, attractions) {
  if (attractions.length <= 1) return [...attractions];

  const ordered = [];
  const remaining = [...attractions];
  let currentCoords = startCoords;

  while (remaining.length > 0) {
    let nearestIdx = 0;
    let nearestDist = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const dist = haversine(
        currentCoords.lat,
        currentCoords.lng,
        remaining[i].coordinates?.lat || remaining[i].coordinates?.latitude || 0,
        remaining[i].coordinates?.lng || remaining[i].coordinates?.longitude || 0
      );
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIdx = i;
      }
    }

    ordered.push(remaining[nearestIdx]);
    currentCoords = {
      lat: remaining[nearestIdx].coordinates?.lat || remaining[nearestIdx].coordinates?.latitude || 0,
      lng: remaining[nearestIdx].coordinates?.lng || remaining[nearestIdx].coordinates?.longitude || 0,
    };
    remaining.splice(nearestIdx, 1);
  }

  return ordered;
}

/**
 * Generate a personalized itinerary based on user inputs.
 * Different inputs produce meaningfully different results.
 */
export function generateItinerary({
  destinationId,
  destinationSlug,
  startLocation,
  availableTimeMinutes,
  availableTimeHours,
  duration,
  timeType,
  totalBudget,
  budget,
  travelers = 1,
  interests = [],
  travelStyle = 'balanced',
  pace = 'balanced',
}) {
  // Normalize inputs
  const destId = destinationId || destinationSlug;
  const totalMinutes = availableTimeMinutes || (availableTimeHours || duration || 4) * 60;
  const totalBudgetAmount = totalBudget || budget || 2000;
  const travelerCount = travelers || 1;

  // Get destination
  const destination = destinations.find(
    d => d.id === destId || d.slug === destId || d.name === destId
  );
  if (!destination) {
    return {
      error: true,
      message: 'Destination not found',
      stops: [],
      summary: { totalTime: 0, totalCost: 0, placesCount: 0 },
    };
  }

  // Get attractions for this destination
  let attractions = getAttractionsByDestination(destination.id);
  if (!attractions || attractions.length === 0) {
    return {
      destination,
      stops: [],
      summary: {
        totalTime: `${Math.round(totalMinutes / 60)} hours`,
        totalCost: 0,
        placesCount: 0,
        totalDistance: '0 km',
        travelers: travelerCount,
        costPerPerson: 0,
        budgetRemaining: totalBudgetAmount,
        isWithinBudget: true,
      },
      costBreakdown: { transport: 0, entryFees: 0, food: 0, total: 0, budgetRemaining: totalBudgetAmount },
      message: 'No attractions data available for this destination yet.',
    };
  }

  // Score and sort by interest relevance
  const scoredAttractions = attractions.map(a => ({
    ...a,
    relevanceScore: scoreAttraction(a, interests),
  }));
  scoredAttractions.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Pace factor: relaxed = fewer stops, packed = more stops
  const paceFactor = pace === 'relaxed' ? 1.3 : pace === 'packed' ? 0.75 : 1.0;

  // Budget style factor
  const budgetStyleFactor =
    travelStyle === 'budget-friendly' ? 0.7 : travelStyle === 'premium' ? 1.5 : travelStyle === 'comfort' ? 1.2 : 1.0;

  // Start coordinates
  const startCoords = startLocation?.lat
    ? startLocation
    : { lat: destination.coordinates?.lat || 0, lng: destination.coordinates?.lng || 0 };

  // Pre-filter: select top candidates based on interest score
  const maxCandidates = Math.min(scoredAttractions.length, Math.ceil(totalMinutes / 30));
  const candidates = scoredAttractions.slice(0, maxCandidates);

  // Optimize route order
  const orderedAttractions = optimizeRoute(startCoords, candidates);

  // Build timeline
  const stops = [];
  let currentTime = 9 * 60; // Default 9:00 AM start
  let currentCoords = { ...startCoords };
  let totalTransportCost = 0;
  let totalEntryFees = 0;
  let totalDistance = 0;
  let remainingBudget = totalBudgetAmount;
  const foodBudgetEstimate = Math.round(travelerCount * 150 * budgetStyleFactor * (totalMinutes / 480));
  let availableBudgetForStops = totalBudgetAmount - foodBudgetEstimate;

  for (const attraction of orderedAttractions) {
    const attrLat = attraction.coordinates?.lat || attraction.coordinates?.latitude || 0;
    const attrLng = attraction.coordinates?.lng || attraction.coordinates?.longitude || 0;

    // Calculate distance from current position
    const distance = haversine(currentCoords.lat, currentCoords.lng, attrLat, attrLng);

    // Get transport recommendation
    const transport = recommendTransport(distance, travelerCount);

    // Travel time in minutes
    const travelTimeMin = Math.round((distance / transport.speed) * 60) || 5;

    // Visit duration
    const visitDuration = Math.round(
      (attraction.suggestedDuration || attraction.visitDuration || 60) * paceFactor
    );

    // Check if we have enough time
    const timeNeeded = travelTimeMin + visitDuration;
    if (currentTime + timeNeeded > 9 * 60 + totalMinutes) break;

    // Calculate costs
    const transportCost = calculateTransportCost(distance, transport);
    const entryFee = (attraction.approximateEntryFee || attraction.entryFee || 0) * travelerCount;
    const stopCost = transportCost.average + entryFee;

    // Check budget
    if (totalTransportCost + totalEntryFees + stopCost > availableBudgetForStops) {
      // Try to fit if close
      if (totalTransportCost + totalEntryFees + transportCost.average + entryFee > totalBudgetAmount * 0.9) {
        continue; // skip this attraction
      }
    }

    // Add stop
    const arrivalTime = currentTime + travelTimeMin;
    stops.push({
      id: `stop-${stops.length + 1}`,
      attraction,
      attractionId: attraction.id,
      name: attraction.name,
      slug: attraction.slug,
      description: attraction.description,
      categories: attraction.categories || [attraction.category],
      coordinates: { lat: attrLat, lng: attrLng },
      arrivalTime: formatTime(arrivalTime),
      departureTime: formatTime(arrivalTime + visitDuration),
      arrivalMinutes: arrivalTime,
      departureMinutes: arrivalTime + visitDuration,
      duration: `${visitDuration} min`,
      durationMinutes: visitDuration,
      distanceFromPrev: stops.length === 0 ? null : `${distance.toFixed(1)} km`,
      distanceKm: distance,
      transport:
        stops.length === 0 && distance < 0.5
          ? null
          : {
              mode: transport.mode,
              estimatedCost: `₹${transportCost.min}–₹${transportCost.max}`,
              costMin: transportCost.min,
              costMax: transportCost.max,
              costAverage: transportCost.average,
              travelTime: `${travelTimeMin} min`,
              travelTimeMinutes: travelTimeMin,
              isApproximate: true,
            },
      entryFee: entryFee > 0 ? `₹${entryFee}` : 'Free',
      entryFeeAmount: entryFee,
      subtotal: stopCost,
      relevanceScore: attraction.relevanceScore,
    });

    totalTransportCost += transportCost.average;
    totalEntryFees += entryFee;
    totalDistance += distance;
    currentTime = arrivalTime + visitDuration;
    currentCoords = { lat: attrLat, lng: attrLng };
  }

  // Build summary
  const totalCostMin = totalTransportCost * 0.85 + totalEntryFees + foodBudgetEstimate * 0.8;
  const totalCostMax = totalTransportCost * 1.15 + totalEntryFees + foodBudgetEstimate * 1.2;
  const totalCostAvg = Math.round((totalCostMin + totalCostMax) / 2);
  const elapsedMinutes = stops.length > 0 ? stops[stops.length - 1].departureMinutes - 9 * 60 : 0;

  const summary = {
    totalTime: `${Math.round(elapsedMinutes / 60 * 10) / 10} Hours`,
    totalTimeMinutes: elapsedMinutes,
    estimatedCost: `₹${Math.round(totalCostMin)}–₹${Math.round(totalCostMax)}`,
    estimatedCostMin: Math.round(totalCostMin),
    estimatedCostMax: Math.round(totalCostMax),
    estimatedCostAvg: totalCostAvg,
    placesCount: stops.length,
    totalDistance: `${totalDistance.toFixed(1)} km`,
    totalDistanceKm: totalDistance,
    travelers: travelerCount,
    costPerPerson: `₹${Math.round(totalCostMin / travelerCount)}–₹${Math.round(totalCostMax / travelerCount)}`,
    costPerPersonAvg: Math.round(totalCostAvg / travelerCount),
    budgetRemaining: totalBudgetAmount - totalCostAvg,
    isWithinBudget: totalCostAvg <= totalBudgetAmount,
  };

  const costBreakdown = {
    transport: Math.round(totalTransportCost),
    entryFees: Math.round(totalEntryFees),
    food: Math.round(foodBudgetEstimate),
    total: totalCostAvg,
    budgetRemaining: totalBudgetAmount - totalCostAvg,
    isApproximate: true,
  };

  return {
    destination,
    stops,
    summary,
    costBreakdown,
    planningParams: {
      destinationId: destination.id,
      totalMinutes,
      totalBudget: totalBudgetAmount,
      travelers: travelerCount,
      interests,
      travelStyle,
      pace,
    },
  };
}

/**
 * Replan itinerary with modified parameters
 */
export function replanItinerary(currentItinerary, changes) {
  const params = {
    ...currentItinerary.planningParams,
    ...changes,
  };
  return generateItinerary(params);
}

/**
 * Add a stop to existing itinerary
 */
export function addStopToItinerary(itinerary, attraction) {
  const stops = [...itinerary.stops];
  const newStop = {
    id: `stop-${stops.length + 1}`,
    attraction,
    attractionId: attraction.id,
    name: attraction.name,
    slug: attraction.slug,
    description: attraction.description,
    categories: attraction.categories || [attraction.category],
    coordinates: attraction.coordinates,
    duration: `${attraction.suggestedDuration || 60} min`,
    durationMinutes: attraction.suggestedDuration || 60,
    entryFee: attraction.approximateEntryFee ? `₹${attraction.approximateEntryFee}` : 'Free',
    entryFeeAmount: attraction.approximateEntryFee || 0,
  };
  stops.push(newStop);
  return recalculateItinerary(itinerary, stops);
}

/**
 * Remove a stop from itinerary
 */
export function removeStopFromItinerary(itinerary, stopIndex) {
  const stops = itinerary.stops.filter((_, i) => i !== stopIndex);
  return recalculateItinerary(itinerary, stops);
}

/**
 * Reorder stops
 */
export function reorderStops(itinerary, fromIndex, toIndex) {
  const stops = [...itinerary.stops];
  const [moved] = stops.splice(fromIndex, 1);
  stops.splice(toIndex, 0, moved);
  return recalculateItinerary(itinerary, stops);
}

/**
 * Recalculate timings and costs after modification
 */
function recalculateItinerary(itinerary, stops) {
  const travelers = itinerary.planningParams?.travelers || 1;
  const budget = itinerary.planningParams?.totalBudget || 2000;
  let currentTime = 9 * 60;
  let totalTransport = 0;
  let totalEntry = 0;
  let totalDist = 0;
  const startCoords = itinerary.destination?.coordinates || { lat: 0, lng: 0 };
  let prevCoords = startCoords;

  const updatedStops = stops.map((stop, i) => {
    const attrLat = stop.coordinates?.lat || 0;
    const attrLng = stop.coordinates?.lng || 0;
    const dist = haversine(prevCoords.lat, prevCoords.lng, attrLat, attrLng);
    const transport = recommendTransport(dist, travelers);
    const travelTime = Math.round((dist / transport.speed) * 60) || 5;
    const transportCost = calculateTransportCost(dist, transport);
    const visitDuration = stop.durationMinutes || 60;
    const entryFee = stop.entryFeeAmount || 0;
    const arrival = currentTime + (i === 0 && dist < 0.5 ? 0 : travelTime);

    totalTransport += transportCost.average;
    totalEntry += entryFee;
    totalDist += dist;
    currentTime = arrival + visitDuration;
    prevCoords = { lat: attrLat, lng: attrLng };

    return {
      ...stop,
      id: `stop-${i + 1}`,
      arrivalTime: formatTime(arrival),
      departureTime: formatTime(arrival + visitDuration),
      arrivalMinutes: arrival,
      departureMinutes: arrival + visitDuration,
      distanceFromPrev: i === 0 ? null : `${dist.toFixed(1)} km`,
      distanceKm: dist,
      transport:
        i === 0 && dist < 0.5
          ? null
          : {
              mode: transport.mode,
              estimatedCost: `₹${transportCost.min}–₹${transportCost.max}`,
              costAverage: transportCost.average,
              travelTime: `${travelTime} min`,
              isApproximate: true,
            },
      subtotal: transportCost.average + entryFee,
    };
  });

  const foodEst = Math.round(travelers * 150 * ((currentTime - 9 * 60) / 480));
  const totalCost = totalTransport + totalEntry + foodEst;

  return {
    ...itinerary,
    stops: updatedStops,
    summary: {
      ...itinerary.summary,
      totalTime: `${Math.round((currentTime - 9 * 60) / 60 * 10) / 10} Hours`,
      totalTimeMinutes: currentTime - 9 * 60,
      estimatedCostAvg: totalCost,
      estimatedCost: `₹${Math.round(totalCost * 0.85)}–₹${Math.round(totalCost * 1.15)}`,
      placesCount: updatedStops.length,
      totalDistance: `${totalDist.toFixed(1)} km`,
      costPerPersonAvg: Math.round(totalCost / travelers),
      costPerPerson: `₹${Math.round((totalCost * 0.85) / travelers)}–₹${Math.round((totalCost * 1.15) / travelers)}`,
      budgetRemaining: budget - totalCost,
      isWithinBudget: totalCost <= budget,
    },
    costBreakdown: {
      transport: Math.round(totalTransport),
      entryFees: Math.round(totalEntry),
      food: Math.round(foodEst),
      total: totalCost,
      budgetRemaining: budget - totalCost,
      isApproximate: true,
    },
  };
}
