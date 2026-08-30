import { destinations, getDestinationBySlug } from '../data/destinations';
import { attractions, getAttractionsByDestination } from '../data/attractions';
import { foodItems } from '../data/food';
import { transportModes } from '../data/transport';
import { safetyContacts } from '../data/safety';

/**
 * Process a user question using structured regional tourism data.
 * Context: { destination, currentTrip, itinerary, budget, remainingBudget, travelers, interests, currentLocation }
 */
export function processQuery(query, context = {}) {
  const q = query.toLowerCase().trim();
  const dest = context.currentTrip?.destination || context.destination || destinations.find(d => d.slug === 'vijayawada');
  const destId = dest?.id || 'vijayawada';
  const destAttractions = getAttractionsByDestination(destId);
  const destFood = foodItems.filter(f => !f.destinations || f.destinations.includes(destId) || f.destinations.length === 0);
  const travelers = context.travelers || context.currentTrip?.planningParams?.travelers || 1;
  const remainingBudget = context.remainingBudget !== undefined 
    ? context.remainingBudget 
    : (context.currentTrip ? ((context.currentTrip.planningParams?.totalBudget || 1000) - (context.currentTrip.totalSpent || 0)) : 500);

  // 1. Budget specific questions (e.g. "I have 200 left", "under 500", "what can I afford")
  const budgetMatch = q.match(/(\d+)\s*(?:rs|rupees|inr|left|budget)?/i);
  const askedAmount = budgetMatch ? parseInt(budgetMatch[1]) : null;

  if (askedAmount !== null && (q.includes('left') || q.includes('budget') || q.includes('afford') || q.includes('do with') || q.includes('under') || q.includes('cost'))) {
    const affordableAttractions = destAttractions.filter(a => {
      const fee = (a.approximateEntryFee || 0) * travelers;
      return fee <= askedAmount;
    });

    const affordableFood = destFood.filter(f => (f.approximatePrice || 100) * travelers <= askedAmount);

    let message = `With ₹${askedAmount} for ${travelers} traveler${travelers > 1 ? 's' : ''} in ${dest?.name || 'this area'}, here is what fits your budget:`;
    
    return {
      type: 'budget_recommendation',
      message,
      data: {
        budget: askedAmount,
        attractions: affordableAttractions.slice(0, 3),
        food: affordableFood.slice(0, 2),
        isApproximate: true
      }
    };
  }

  // 2. Time specific questions (e.g. "in two hours", "2 hours", "30 mins", "half day")
  const timeMatch = q.match(/(\d+)\s*(?:hour|hr|minute|min)/i);
  if (timeMatch || q.includes('time') || q.includes('quick') || q.includes('short')) {
    const requestedMinutes = timeMatch ? (q.includes('min') ? parseInt(timeMatch[1]) : parseInt(timeMatch[1]) * 60) : 120;
    
    const fittingStops = destAttractions.filter(a => (a.suggestedDuration || 60) <= requestedMinutes);
    
    return {
      type: 'time_recommendation',
      message: `For ${requestedMinutes >= 60 ? `${Math.round(requestedMinutes/60)} hour(s)` : `${requestedMinutes} minutes`} in ${dest?.name || 'the area'}, here are practical visits with realistic durations:`,
      data: {
        minutes: requestedMinutes,
        attractions: fittingStops.slice(0, 3),
        isApproximate: true
      }
    };
  }

  // 3. Food / Dining questions
  if (q.includes('food') || q.includes('eat') || q.includes('dish') || q.includes('restaurant') || q.includes('lunch') || q.includes('breakfast') || q.includes('dinner') || q.includes('snack') || q.includes('biryani')) {
    const suggestions = destFood.length > 0 ? destFood : foodItems;
    return {
      type: 'food_recommendation',
      message: `Iconic regional culinary specialties in ${dest?.name || 'Andhra Pradesh'} to try:`,
      data: {
        destination: dest?.name,
        dishes: suggestions.slice(0, 4),
        isApproximate: true
      }
    };
  }

  // 4. Transport questions (e.g. "how to travel", "auto vs cab", "with 6 people")
  if (q.includes('transport') || q.includes('travel') || q.includes('auto') || q.includes('cab') || q.includes('taxi') || q.includes('bus') || q.includes('people') || q.includes('group')) {
    const groupMatch = q.match(/(\d+)\s*(?:people|person|travelers|pax)/i);
    const count = groupMatch ? parseInt(groupMatch[1]) : travelers;

    let recommendation = '';
    let suitableModes = [];

    if (count <= 2) {
      recommendation = `For ${count} traveler(s), an Auto-rickshaw (₹30 base + ~₹13/km) or City Bus is the fastest & most economical option.`;
      suitableModes = transportModes.filter(m => ['auto', 'cab', 'walking'].includes(m.id));
    } else if (count <= 4) {
      recommendation = `For a group of ${count}, an App/Local Cab (₹50 base + ~₹14/km) or a 4-seater Auto provides the best balance of comfort and shared cost.`;
      suitableModes = transportModes.filter(m => ['cab', 'auto'].includes(m.id));
    } else {
      recommendation = `For a larger group of ${count} travelers, booking a Tempo Traveller / Maxicab (₹18-22/km) or two separate autos/cabs is most convenient.`;
      suitableModes = transportModes.filter(m => ['tempo_traveller', 'cab'].includes(m.id));
    }

    return {
      type: 'transport_recommendation',
      message: recommendation,
      data: {
        travelers: count,
        modes: suitableModes,
        note: 'Approximate fares — actual price may vary by time and local meter/app.'
      }
    };
  }

  // 5. Emergency / Safety questions
  if (q.includes('emergency') || q.includes('police') || q.includes('hospital') || q.includes('help') || q.includes('safety') || q.includes('accident') || q.includes('lost')) {
    return {
      type: 'emergency_info',
      message: `For any urgent emergency assistance in India, call National Emergency Support immediately:`,
      data: {
        emergencyNumber: '112',
        police: '100',
        ambulance: '108',
        touristHelpline: '1363',
        note: 'SAHA does not replace official emergency services. In real distress, dial 112 without delay.'
      }
    };
  }

  // 6. Nearby / What to see / Places questions
  if (q.includes('nearby') || q.includes('visit') || q.includes('see') || q.includes('attraction') || q.includes('place') || q.includes('where to go') || q.includes('next')) {
    return {
      type: 'places_recommendation',
      message: `Top verified sights and cultural landmarks in ${dest?.name || 'the area'}:`,
      data: {
        destination: dest?.name,
        attractions: destAttractions.slice(0, 4),
        isApproximate: true
      }
    };
  }

  // 7. General fallback with verified guidance
  return {
    type: 'text',
    message: `I can help you navigate ${dest?.name || 'your destination'}. You can ask me:\n• "I have ₹300 left. What can I do?"\n• "What can I see in 2 hours?"\n• "Where should I eat authentic Andhra food?"\n• "How should I travel with ${travelers} people?"\n• "Emergency safety helpline numbers"`,
    data: null
  };
}
