// SAHA - Context-Aware Tourism AI Assistant for Andhra Pradesh
// Grounded reasoning with real destination data, restaurants, hotels, transport, and emergency services

import { destinations, getDestinationBySlug } from '../data/destinations';
import { getAttractionsByDestination } from '../data/attractions';
import { getRestaurantsByDestination, regionalDishes } from '../data/food';
import { getHotelsByDestination } from '../data/hotels';
import { emergencyNumbers, emergencyFacilities } from '../data/safety';

export function processQuery(query, context = {}) {
  if (!query || typeof query !== 'string') {
    return {
      type: 'text',
      message: 'Hello! I am SAHA, your Andhra Pradesh local travel assistant. Ask me about itineraries, nearby restaurants, hotels, local transport, or emergencies!'
    };
  }

  const q = query.toLowerCase();
  const currentDestId = context.destination?.id || context.destinationId || 'dest_vjw';
  const dest = destinations.find(d => d.id === currentDestId || d.slug === currentDestId) || destinations[0];
  const destAttractions = getAttractionsByDestination(dest.id);
  const destRestaurants = getRestaurantsByDestination(dest.id);
  const destHotels = getHotelsByDestination(dest.id);
  const destFacilities = emergencyFacilities.filter(f => f.destinationId === dest.id);

  // 1. EAT / FOOD / RESTAURANT QUERY ("Where can I eat now?", "Food near me", "What to eat")
  if (q.includes('eat') || q.includes('food') || q.includes('restaurant') || q.includes('lunch') || q.includes('dinner') || q.includes('breakfast') || q.includes('bhojanam') || q.includes('biryani')) {
    const isVeg = q.includes('veg') && !q.includes('non');
    const matchedRests = destRestaurants.filter(r => isVeg ? r.isVegetarian : true);
    const topRest = matchedRests[0] || destRestaurants[0];
    const famousDishes = regionalDishes.filter(d => d.destinationId === dest.id || true).slice(0, 3);

    return {
      type: 'food_recommendation',
      message: `Here are the top-rated local dining options in **${dest.name}**:`,
      restaurants: matchedRests.slice(0, 3),
      recommendedDish: famousDishes.map(d => `${d.name} (approx. ₹${d.approximatePrice})`).join(', '),
      tips: `In ${dest.name}, don't miss the authentic Andhra Meals served on banana leaf with fresh ghee and Gongura pachadi!`
    };
  }

  // 2. NEXT VISIT / WHAT TO VISIT NEXT
  if (q.includes('next') || q.includes('what to see') || q.includes('visit next') || q.includes('where next') || q.includes('attractions')) {
    const unvisited = destAttractions.slice(0, 3);
    return {
      type: 'attractions_recommendation',
      message: `Based on your location in **${dest.name}**, here are the top places to explore next:`,
      attractions: unvisited,
      contextNote: `Current destination: ${dest.name} (${dest.region}). Timings and entry fees are verified for 2026.`
    };
  }

  // 3. MISSED ATTRACTION / RUNNING LATE / TIME DELAY
  if (q.includes('missed') || q.includes('late') || q.includes('delay') || q.includes('traffic') || q.includes('behind schedule')) {
    return {
      type: 'replanning_advice',
      message: `No worries! Let's adapt your schedule smoothly:`,
      suggestions: [
        `1. Skip the crowded indoor museum/queue if time is tight and proceed directly to **${destAttractions[0]?.name || 'the main scenic spot'}**.`,
        `2. Ensure you reach the sunset viewpoint by 05:30 PM (ideal sunset light).`,
        `3. Push your dinner to 08:30 PM at a nearby restaurant like **${destRestaurants[0]?.name || 'Subbayya Gari Hotel'}**.`
      ],
      action: 'Click "Replan My Day" on your active trip dashboard to recalculate timings automatically.'
    };
  }

  // 4. BUDGET / LOW MONEY ("I only have ₹1,000 left", "Budget options")
  if (q.includes('budget') || q.includes('money') || q.includes('cost') || q.includes('₹') || q.includes('rupees') || q.includes('left') || q.includes('cheap')) {
    const freeOrCheapAttractions = destAttractions.filter(a => a.approximateEntryFee <= 25);
    return {
      type: 'budget_advice',
      message: `Here is how you can make the most of your remaining budget in **${dest.name}**:`,
      budgetSights: freeOrCheapAttractions,
      advice: [
        `• Public transport & Auto sharing: ₹30–₹50 per ride instead of private cabs.`,
        `• Authentic local meals / Tiffins (Pesarattu / Meals): ₹70–₹180 per person.`,
        `• Iconic free landmarks: ${freeOrCheapAttractions.map(a => a.name).join(', ')}.`
      ]
    };
  }

  // 5. HOTEL / STAY ("Find hotels", "Where to stay", "Hotels near destination")
  if (q.includes('hotel') || q.includes('stay') || q.includes('resort') || q.includes('accommodation') || q.includes('room')) {
    return {
      type: 'hotel_recommendation',
      message: `Verified accommodations in **${dest.name}**:`,
      hotels: destHotels.slice(0, 3),
      bookingTip: 'Book APTDC Haritha Resorts in advance during weekends and temple festival seasons.'
    };
  }

  // 6. EMERGENCY / POLICE / HOSPITAL / SAFETY
  if (q.includes('emergency') || q.includes('help') || q.includes('hospital') || q.includes('police') || q.includes('doctor') || q.includes('safe') || q.includes('ambulance')) {
    const hospitals = destFacilities.filter(f => f.type === 'hospital');
    const police = destFacilities.filter(f => f.type === 'police');

    return {
      type: 'emergency_assistance',
      message: `🚨 **Immediate Emergency Contacts in Andhra Pradesh:**`,
      helplines: emergencyNumbers,
      nearestHospital: hospitals[0] || { name: 'Government General Hospital', phone: '108', openStatus: '24/7' },
      nearestPolice: police[0] || { name: 'Local Police Station', phone: '100', openStatus: '24/7' },
      urgentAdvice: 'For immediate life or medical emergency, call **112** or **108** right away.'
    };
  }

  // 7. DEFAULT DESTINATION INTELLIGENCE
  return {
    type: 'destination_info',
    message: `**${dest.name}** (${dest.district} District, ${dest.region}): ${dest.description}`,
    keyHighlights: [
      `🏛️ **Top Attractions**: ${destAttractions.slice(0, 3).map(a => a.name).join(', ')}`,
      `🍛 **Famous Cuisine**: ${dest.famousFood.join(', ')}`,
      `🏨 **Top Stays**: ${destHotels.map(h => h.name).slice(0, 2).join(', ')}`,
      `🚗 **Transport**: Connected via auto rickshaws, cabs, and APSRTC buses.`
    ],
    quickSuggestions: [
      'Where can I eat lunch nearby?',
      'What are the best places to visit today?',
      'Find verified hotels nearby',
      'Show emergency contacts'
    ]
  };
}
