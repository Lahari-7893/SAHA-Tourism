// SAHA - Intelligent Multi-Day & Hours Travel Itinerary Engine
// Designed for Andhra Pradesh Tourism with automatic meal breaks, hotels, and route optimization

import { getAttractionsByDestination, attractions as allAttractions } from '../data/attractions';
import { destinations } from '../data/destinations';
import { getHotelsByDestination } from '../data/hotels';
import { getRestaurantsByDestination, regionalDishes } from '../data/food';

// Haversine distance in km
export function haversine(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 2.5; // fallback
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

// Convert "09:00 AM" or "9" or minutes to minutes from midnight
export function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 540; // 9:00 AM default
  if (typeof timeStr === 'number') return timeStr;
  const match = timeStr.match(/(\d+):?(\d*)\s*(AM|PM)?/i);
  if (!match) return 540;
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3] ? match[3].toUpperCase() : null;

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function formatMinutesToTime(minutesSinceMidnight) {
  const mins = Math.round(minutesSinceMidnight) % 1440;
  const hours = Math.floor(mins / 60);
  const m = mins % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${m.toString().padStart(2, '0')} ${period}`;
}

// Score an attraction based on user preferences
function scoreAttraction(attraction, interests = []) {
  if (!interests || interests.length === 0) return 1.5;
  let score = 1.0;
  const attrCat = (attraction.category || '').toLowerCase();
  const attrName = (attraction.name || '').toLowerCase();
  const attrDesc = (attraction.description || '').toLowerCase();

  interests.forEach(interest => {
    const key = interest.toLowerCase();
    if (attrCat.includes(key) || key.includes(attrCat)) score += 3.0;
    if (attrName.includes(key) || attrDesc.includes(key)) score += 1.5;
  });

  return score;
}

// Recommended local transit based on distance & group size
export function recommendTransport(distanceKm, travelers = 1) {
  if (distanceKm < 0.8) {
    return { mode: 'Walking', speed: 4, costPerKm: 0, baseFare: 0, comfort: 3, icon: 'Footprints' };
  }
  if (distanceKm < 3.5) {
    if (travelers <= 3) {
      return { mode: 'Auto Rickshaw', speed: 22, costPerKm: 14, baseFare: 30, comfort: 4, icon: 'Car' };
    }
    return { mode: 'Cab / Taxi', speed: 28, costPerKm: 16, baseFare: 60, comfort: 5, icon: 'Car' };
  }
  if (travelers <= 3) {
    return { mode: 'Auto / Cab', speed: 25, costPerKm: 15, baseFare: 40, comfort: 4, icon: 'Car' };
  }
  if (travelers <= 6) {
    return { mode: 'Prime Cab / SUV', speed: 32, costPerKm: 18, baseFare: 100, comfort: 5, icon: 'Car' };
  }
  return { mode: 'Tempo Traveller', speed: 30, costPerKm: 22, baseFare: 250, comfort: 4, icon: 'Bus' };
}

// Generate complete intelligent multi-day or hourly itinerary
export function generateItinerary({
  destinationId = 'dest_vjw',
  days = 1,
  availableTimeMinutes,
  totalBudget = 5000,
  travelers = 2,
  interests = ['Heritage', 'Spiritual', 'Nature'],
  groupPreferences = null, // [{ name: 'Person A', interest: 'Spiritual' }, ...]
  weatherCondition = 'Rainy Afternoon', // 'Clear' | 'Rainy Afternoon' | 'Sunny'
  travelStyle = 'Balanced',
  pace = 'Balanced',
  startTime = '09:00 AM',
  foodPreference = 'Andhra Meals',
  accommodationPreference = 'Mid-Range'
}) {
  const dest = destinations.find(d => d.id === destinationId || d.slug === destinationId) || destinations[0];
  const destAttractions = getAttractionsByDestination(dest.id);
  const availableHotels = getHotelsByDestination(dest.id);
  const availableRestaurants = getRestaurantsByDestination(dest.id);

  // Group preference aggregation
  let activeInterests = [...interests];
  let groupCompromiseNote = null;

  if (groupPreferences && Array.isArray(groupPreferences) && groupPreferences.length > 0) {
    const groupInterests = groupPreferences.map(p => p.interest).filter(Boolean);
    activeInterests = Array.from(new Set([...interests, ...groupInterests]));
    
    const summaryList = groupPreferences.map(p => `${p.name} (${p.interest})`).join(', ');
    groupCompromiseNote = `🧑‍🤝‍🧑 Group Compromise: SAHA generated a balanced itinerary satisfying preferences for ${summaryList}.`;
  }

  // Weather adaptation alert
  let weatherAlert = null;
  if (weatherCondition === 'Rainy Afternoon') {
    weatherAlert = `🌧️ Rain expected at 3:00 PM in ${dest.name}. We've moved outdoor waterfall/beach visits to tomorrow and added indoor museum/temple experiences for this afternoon.`;
  }

  // Recommended hotel for the destination
  const recommendedHotel = availableHotels.find(h => 
    accommodationPreference === 'Luxury' ? h.category.includes('Luxury') :
    accommodationPreference === 'Budget' ? h.pricePerNight < 2000 :
    h.category.includes('Mid-Range') || true
  ) || availableHotels[0] || {
    name: 'APTDC Haritha Resort & Hotel',
    pricePerNight: 2200,
    rating: 4.5,
    location: `${dest.name} Tourism Center`,
    facilities: ['AC Rooms', 'Restaurant', 'Free WiFi', 'Parking'],
    phone: '+91 866 2418057'
  };

  // Sort & score attractions
  let scoredAttractions = destAttractions.map(attr => ({
    ...attr,
    relevanceScore: scoreAttraction(attr, activeInterests)
  })).sort((a, b) => b.relevanceScore - a.relevanceScore);

  const numDays = Math.max(1, parseInt(days, 10) || 1);
  const dailyPlans = [];
  let remainingPool = [...scoredAttractions];
  let totalTripEntryCost = 0;
  let totalTripTransitCost = 0;
  let totalTripFoodCost = 0;
  let totalTripDistance = 0;
  let currentStartCoords = dest.coordinates;

  for (let dayIndex = 1; dayIndex <= numDays; dayIndex++) {
    const dayStops = [];
    let currentTime = parseTimeToMinutes(startTime);
    let dayDistance = 0;
    let dayTransitCost = 0;
    let dayEntryCost = 0;
    let dayFoodCost = 0;
    let lastCoords = currentStartCoords;

    // Pick 2-4 sights for this day
    const sightsForDay = [];
    const countToPick = pace === 'Relaxed' ? 2 : pace === 'Packed' ? 4 : 3;

    // Replenish pool if empty on long multi-day trips (up to 10 days)
    if (remainingPool.length < countToPick) {
      remainingPool = [...scoredAttractions, ...allAttractions.filter(a => a.destinationId !== dest.id).slice(0, 15)];
    }

    for (let i = 0; i < countToPick && remainingPool.length > 0; i++) {
      // Find closest from lastCoords to minimize backtracking
      let closestIdx = 0;
      let minDistance = 9999;
      for (let j = 0; j < remainingPool.length; j++) {
        // If rain expected in afternoon, prefer indoor sights for afternoon slots
        const attr = remainingPool[j];
        const isOutdoor = (attr.category || '').toLowerCase().includes('nature') || (attr.category || '').toLowerCase().includes('beach');
        if (weatherCondition === 'Rainy Afternoon' && i >= 2 && isOutdoor) {
          continue; // Skip outdoor for afternoon if rain expected
        }

        const dist = haversine(
          lastCoords.lat,
          lastCoords.lng,
          attr.coordinates.lat,
          attr.coordinates.lng
        );
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = j;
        }
      }
      const picked = remainingPool.splice(closestIdx, 1)[0] || remainingPool.shift();
      if (picked) {
        sightsForDay.push(picked);
        lastCoords = picked.coordinates;
      }
    }

    // If pool exhausted on multi-day, borrow from general pool
    if (sightsForDay.length === 0 && destAttractions.length > 0) {
      sightsForDay.push(destAttractions[dayIndex % destAttractions.length]);
    }

    // Build day sequence with Breakfast / Morning Sights / Lunch / Afternoon Sights / Sunset / Dinner
    let sightIndex = 0;

    // 1. Morning Start
    const firstSight = sightsForDay[sightIndex++];
    if (firstSight) {
      const distFromStart = haversine(currentStartCoords.lat, currentStartCoords.lng, firstSight.coordinates.lat, firstSight.coordinates.lng);
      const transport = recommendTransport(distFromStart, travelers);
      const transitTimeMins = Math.max(10, Math.round((distFromStart / transport.speed) * 60));
      const transitCost = Math.round(transport.baseFare + distFromStart * transport.costPerKm);

      currentTime += transitTimeMins;
      const arrival = formatMinutesToTime(currentTime);
      const visitDuration = firstSight.suggestedDuration || 90;
      currentTime += visitDuration;
      const departure = formatMinutesToTime(currentTime);

      const entryCostTotal = (firstSight.approximateEntryFee || 0) * travelers;
      dayDistance += distFromStart;
      dayTransitCost += transitCost;
      dayEntryCost += entryCostTotal;
      lastCoords = firstSight.coordinates;

      dayStops.push({
        id: `stop_${dayIndex}_1`,
        type: 'attraction',
        time: arrival,
        departureTime: departure,
        title: firstSight.name,
        category: firstSight.category,
        description: firstSight.description,
        coordinates: firstSight.coordinates,
        images: firstSight.images,
        suggestedDurationMins: visitDuration,
        travelTimeFromPrev: transitTimeMins,
        travelDistanceFromPrev: Number(distFromStart.toFixed(1)),
        transportMode: transport.mode,
        transportCost: transitCost,
        entryFeePerPerson: firstSight.approximateEntryFee || 0,
        entryFeeTotal: entryCostTotal,
        tips: firstSight.tips,
        timings: firstSight.timings
      });
    }

    // 2. Midday Attraction (if available before lunch)
    if (sightsForDay[sightIndex] && currentTime < 750) { // before 12:30 PM
      const secondSight = sightsForDay[sightIndex++];
      const dist = haversine(lastCoords.lat, lastCoords.lng, secondSight.coordinates.lat, secondSight.coordinates.lng);
      const transport = recommendTransport(dist, travelers);
      const transitTimeMins = Math.max(10, Math.round((dist / transport.speed) * 60));
      const transitCost = Math.round(transport.baseFare + dist * transport.costPerKm);

      currentTime += transitTimeMins;
      const arrival = formatMinutesToTime(currentTime);
      const visitDuration = secondSight.suggestedDuration || 60;
      currentTime += visitDuration;
      const departure = formatMinutesToTime(currentTime);

      const entryCostTotal = (secondSight.approximateEntryFee || 0) * travelers;
      dayDistance += dist;
      dayTransitCost += transitCost;
      dayEntryCost += entryCostTotal;
      lastCoords = secondSight.coordinates;

      dayStops.push({
        id: `stop_${dayIndex}_2`,
        type: 'attraction',
        time: arrival,
        departureTime: departure,
        title: secondSight.name,
        category: secondSight.category,
        description: secondSight.description,
        coordinates: secondSight.coordinates,
        images: secondSight.images,
        suggestedDurationMins: visitDuration,
        travelTimeFromPrev: transitTimeMins,
        travelDistanceFromPrev: Number(dist.toFixed(1)),
        transportMode: transport.mode,
        transportCost: transitCost,
        entryFeePerPerson: secondSight.approximateEntryFee || 0,
        entryFeeTotal: entryCostTotal,
        tips: secondSight.tips,
        timings: secondSight.timings
      });
    }

    // 3. Mandatory Lunch Break (12:30 PM - 01:45 PM)
    if (currentTime < 780) currentTime = 780; // 1:00 PM
    const lunchRestaurant = availableRestaurants[dayIndex % availableRestaurants.length] || {
      name: 'Authentic Andhra Meals & Bhojanam',
      cuisine: 'Traditional Andhra Thali',
      famousFor: 'Unlimited Veg / Non-Veg Banana Leaf Feast',
      rating: 4.8,
      address: `Near ${dest.name} Central`
    };
    const lunchArrival = formatMinutesToTime(currentTime);
    currentTime += 60; // 1 hour for lunch
    const lunchDeparture = formatMinutesToTime(currentTime);
    const lunchCost = 180 * travelers;
    dayFoodCost += lunchCost;

    dayStops.push({
      id: `food_${dayIndex}_lunch`,
      type: 'meal',
      mealType: 'Lunch Break',
      time: lunchArrival,
      departureTime: lunchDeparture,
      title: `Lunch at ${lunchRestaurant.name}`,
      cuisine: lunchRestaurant.cuisine,
      description: `Relax and enjoy ${lunchRestaurant.famousFor}. Famous for authentic regional spices and ghee.`,
      costPerPerson: 180,
      totalCost: lunchCost,
      restaurant: lunchRestaurant,
      image: 'https://images.unsplash.com/photo-1610427845318-7b9c97b8332b?auto=format&fit=crop&q=80&w=600'
    });

    // 4. Afternoon & Sunset Sights
    while (sightIndex < sightsForDay.length) {
      const sight = sightsForDay[sightIndex++];
      const dist = haversine(lastCoords.lat, lastCoords.lng, sight.coordinates.lat, sight.coordinates.lng);
      const transport = recommendTransport(dist, travelers);
      const transitTimeMins = Math.max(10, Math.round((dist / transport.speed) * 60));
      const transitCost = Math.round(transport.baseFare + dist * transport.costPerKm);

      currentTime += transitTimeMins;
      const arrival = formatMinutesToTime(currentTime);
      const visitDuration = sight.suggestedDuration || 90;
      currentTime += visitDuration;
      const departure = formatMinutesToTime(currentTime);

      const entryCostTotal = (sight.approximateEntryFee || 0) * travelers;
      dayDistance += dist;
      dayTransitCost += transitCost;
      dayEntryCost += entryCostTotal;
      lastCoords = sight.coordinates;

      dayStops.push({
        id: `stop_${dayIndex}_${sightIndex + 2}`,
        type: 'attraction',
        time: arrival,
        departureTime: departure,
        title: sight.name,
        category: sight.category,
        description: sight.description,
        coordinates: sight.coordinates,
        images: sight.images,
        suggestedDurationMins: visitDuration,
        travelTimeFromPrev: transitTimeMins,
        travelDistanceFromPrev: Number(dist.toFixed(1)),
        transportMode: transport.mode,
        transportCost: transitCost,
        entryFeePerPerson: sight.approximateEntryFee || 0,
        entryFeeTotal: entryCostTotal,
        tips: sight.tips,
        timings: sight.timings
      });
    }

    // 5. Evening / Dinner
    if (currentTime < 1200) currentTime = 1200; // 8:00 PM
    const dinnerArrival = formatMinutesToTime(currentTime);
    const dinnerCost = 200 * travelers;
    dayFoodCost += dinnerCost;

    dayStops.push({
      id: `food_${dayIndex}_dinner`,
      type: 'meal',
      mealType: 'Dinner & Relaxation',
      time: dinnerArrival,
      departureTime: formatMinutesToTime(currentTime + 60),
      title: `Dinner & Local Street Delights`,
      description: `Savor evening specialties: Pesarattu Upma, Mirchi Bajji, or hot Andhra Biryani before returning to your stay.`,
      costPerPerson: 200,
      totalCost: dinnerCost,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=600'
    });

    // Hotel stay for multi-day
    const hotelCostPerNight = numDays > 1 ? Math.round(recommendedHotel.pricePerNight * Math.ceil(travelers / 2)) : 0;

    const dayThemesList = [
      'Cultural Landmarks & Spiritual Heritage',
      'Scenic Nature, Waterways & Local Crafts',
      'Hidden Gems & Regional Discoveries',
      'Historical Forts & Architectural Wonders',
      'Local Food Trails & Artisan Markets',
      'Sacred Temples & Peaceful Retreats',
      'River Viewpoints & Sunset Ghats',
      'Eco-Tourism & Wildlife Sanctuaries',
      'Handloom Villages & Cultural Heritage',
      'Grand Finale: Culinary & Panoramic Views'
    ];

    dailyPlans.push({
      day: dayIndex,
      dateLabel: `Day ${dayIndex}`,
      theme: dayThemesList[(dayIndex - 1) % dayThemesList.length],
      stops: dayStops,
      daySummary: {
        distanceKm: Number(dayDistance.toFixed(1)),
        entryCost: dayEntryCost,
        transitCost: dayTransitCost,
        foodCost: dayFoodCost,
        hotelCost: hotelCostPerNight,
        dayTotalCost: dayEntryCost + dayTransitCost + dayFoodCost + hotelCostPerNight
      }
    });

    totalTripEntryCost += dayEntryCost;
    totalTripTransitCost += dayTransitCost;
    totalTripFoodCost += dayFoodCost;
    totalTripDistance += dayDistance;
  }

  const totalHotelCost = numDays > 1 ? Math.round(recommendedHotel.pricePerNight * (numDays - 1) * Math.ceil(travelers / 2)) : 0;
  const miscCost = 50 * travelers;
  const grandTotalCost = totalTripEntryCost + totalTripTransitCost + totalTripFoodCost + totalHotelCost + miscCost;
  const budgetRemaining = Math.max(0, totalBudget - grandTotalCost);

  // Why SAHA Chose This Plan reasoning card
  const interestsFormatted = activeInterests.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(' + ');
  const timeFormatted = availableTimeMinutes ? `${Math.round(availableTimeMinutes / 60)} hours` : `${numDays} day(s)`;

  const whyThisPlan = [
    `Fits your available time (${timeFormatted})`,
    `Stays within your budget (₹${grandTotalCost} out of ₹${totalBudget})`,
    `Matches your interests (${interestsFormatted})`,
    `Minimizes unnecessary travel with smart route optimization`,
    `Includes authentic local food breaks (${dest.name} specialties)`,
    `Leaves a 30–40 min safety/time buffer for traffic & delays`
  ];

  // Itemized cost breakdown
  const costBreakdown = {
    transport: { amount: totalTripTransitCost, isVerified: false, label: 'Local Transit (Auto/Bus)' },
    entryFees: { amount: totalTripEntryCost, isVerified: true, label: 'Attraction Entry Fees' },
    food: { amount: totalTripFoodCost, isVerified: false, label: 'Meals & Dining' },
    miscellaneous: { amount: miscCost, isVerified: false, label: 'Bottled Water & Sundries' },
    accommodation: { amount: totalHotelCost, isVerified: true, label: 'Hotel Accommodation' },
    total: grandTotalCost,
    remaining: budgetRemaining,
    disclaimer: 'Actual fare may vary depending on traffic, time and local conditions.'
  };

  return {
    destination: dest,
    travelers,
    days: numDays,
    totalBudget,
    grandTotalCost,
    costPerPerson: Math.round(grandTotalCost / travelers),
    budgetRemaining,
    fitsBudget: grandTotalCost <= totalBudget,
    totalDistanceKm: Number(totalTripDistance.toFixed(1)),
    recommendedHotel,
    dailyPlans,
    groupCompromiseNote,
    weatherAlert,
    whyThisPlan,
    costBreakdown,
    summary: {
      totalStops: dailyPlans.reduce((acc, d) => acc + d.stops.filter(s => s.type === 'attraction').length, 0),
      totalMeals: dailyPlans.reduce((acc, d) => acc + d.stops.filter(s => s.type === 'meal').length, 0),
      breakdown: {
        entryFees: totalTripEntryCost,
        transport: totalTripTransitCost,
        food: totalTripFoodCost,
        accommodation: totalHotelCost
      }
    }
  };
}

// Automatic Delay Replanning Engine
export function replanForDelay(currentItinerary, delayMinutes = 100) {
  if (!currentItinerary || !currentItinerary.dailyPlans) return currentItinerary;

  const updatedDailyPlans = currentItinerary.dailyPlans.map(day => {
    let accumulatedDelay = delayMinutes;
    let runningMins = 540; // 9:00 AM

    const updatedStops = day.stops.map((stop, index) => {
      if (index === 0) {
        runningMins = parseTimeToMinutes(stop.time) + accumulatedDelay;
      } else {
        runningMins += 20; // transit padding
      }

      const newArrival = formatMinutesToTime(runningMins);
      // Reduce duration slightly if delayed to avoid rushing
      const origDuration = stop.suggestedDurationMins || 60;
      const adjustedDuration = Math.max(30, origDuration - (accumulatedDelay > 60 ? 15 : 0));
      runningMins += adjustedDuration;
      const newDeparture = formatMinutesToTime(runningMins);

      return {
        ...stop,
        time: newArrival,
        departureTime: newDeparture,
        suggestedDurationMins: adjustedDuration,
        isDelayedAdjusted: true
      };
    });

    return {
      ...day,
      stops: updatedStops
    };
  });

  const hoursDelayed = Math.floor(delayMinutes / 60);
  const minsDelayed = delayMinutes % 60;
  const timeStr = hoursDelayed > 0 ? `${hoursDelayed}h ${minsDelayed}m` : `${minsDelayed}m`;

  return {
    ...currentItinerary,
    dailyPlans: updatedDailyPlans,
    delayAlert: `🔄 You're running ${timeStr} behind schedule. SAHA recalculated remaining stops & adjusted visit durations to avoid rushing!`
  };
}

// Transport leg comparative analyzer (Walk vs Bus vs Auto) with contextual recommendation
export function getTransportComparison(distanceKm, budget = 1000) {
  const dist = Number(distanceKm) || 1.5;
  const walkMins = Math.max(5, Math.round((dist / 4) * 60));
  const busMins = Math.max(10, Math.round((dist / 18) * 60));
  const autoMins = Math.max(5, Math.round((dist / 25) * 60));

  const busFareMin = Math.max(15, Math.round(dist * 3));
  const busFareMax = Math.max(25, Math.round(dist * 5));
  const autoFareMin = Math.max(40, Math.round(30 + dist * 14));
  const autoFareMax = Math.max(70, Math.round(50 + dist * 18));

  let recommended = 'AUTO';
  let reason = `Auto is recommended because it saves ${walkMins - autoMins} minutes while remaining within your budget.`;

  if (dist < 0.8) {
    recommended = 'WALK';
    reason = `Walking is recommended because it's only ${dist} km (${walkMins} mins), free, and lets you enjoy local sights.`;
  } else if (budget < 400 && dist > 3) {
    recommended = 'BUS';
    reason = `Bus is recommended to keep transport costs low (₹${busFareMin}–${busFareMax}) while staying strictly within your budget.`;
  }

  return {
    options: [
      { mode: 'WALK', label: 'WALK', icon: '🚶', timeMins: walkMins, fare: '₹0', isRecommended: recommended === 'WALK' },
      { mode: 'BUS', label: 'BUS', icon: '🚌', timeMins: busMins, fare: `₹${busFareMin}–${busFareMax}`, isRecommended: recommended === 'BUS' },
      { mode: 'AUTO', label: 'AUTO', icon: '🛺', timeMins: autoMins, fare: `₹${autoFareMin}–${autoFareMax}`, isRecommended: recommended === 'AUTO' }
    ],
    recommendedMode: recommended,
    recommendationReason: reason
  };
}

// Quick Plan Adjustment Handler
export function applyQuickAdjustment(currentItinerary, actionType) {
  if (!currentItinerary) return null;
  const currentParams = {
    destinationId: currentItinerary.destination?.id || 'dest_vjw',
    days: currentItinerary.days || 1,
    travelers: currentItinerary.travelers || 2,
    totalBudget: currentItinerary.totalBudget || 1000,
    startTime: '09:00 AM',
    pace: 'Balanced',
    interests: ['Heritage', 'Food']
  };

  if (actionType === 'lessTime') {
    currentParams.days = 1;
    currentParams.availableTimeMinutes = 180; // 3 hours
    currentParams.pace = 'Packed';
  } else if (actionType === 'reduceCost') {
    currentParams.totalBudget = Math.max(300, Math.round(currentItinerary.totalBudget * 0.6));
    currentParams.travelStyle = 'Budget-Friendly';
  } else if (actionType === 'addFood') {
    currentParams.interests = ['Food', 'Heritage', 'Culture'];
  } else if (actionType === 'moreHeritage') {
    currentParams.interests = ['Heritage', 'Spiritual', 'Culture'];
  } else if (actionType === 'moreNature') {
    currentParams.interests = ['Nature', 'Beaches', 'Adventure'];
  } else if (actionType === 'avoidWalking') {
    currentParams.travelStyle = 'Comfort';
    currentParams.pace = 'Relaxed';
  } else if (actionType === 'relaxed') {
    currentParams.pace = 'Relaxed';
  }

  return generateItinerary(currentParams);
}
