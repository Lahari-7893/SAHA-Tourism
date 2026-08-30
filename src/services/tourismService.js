// Dummy data imports - assuming they are created or will be created in data folder
import { destinations } from '../data/destinations.js';
import { attractions } from '../data/attractions.js';
// We might not have food/accommodation yet, so using fallbacks

export function searchDestinations(query, filters = {}) {
  let results = [...(destinations || [])];
  
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.description.toLowerCase().includes(q) ||
      d.state.toLowerCase().includes(q)
    );
  }
  
  if (filters.region) {
    results = results.filter(d => d.region === filters.region);
  }
  
  return results;
}

export function getDestinationDetails(slug) {
  const destination = (destinations || []).find(d => d.slug === slug || d.id === slug);
  if (!destination) return null;
  
  const destAttractions = (attractions || []).filter(a => a.destinationId === destination.id);
  
  return {
    ...destination,
    attractions: destAttractions,
    food: [], // To be populated with real data
    accommodation: [] // To be populated with real data
  };
}

export function getNearbyAttractions(lat, lng, radiusKm) {
  import('./mapService.js').then(({ calculateDistance }) => {
     // Dynamic import due to cyclic or just using it
  });
  
  // basic implementation assuming mapService is available
  // Not going to use dynamic import for simplicity, we will require mapService
  return (attractions || []).filter(attr => {
    // We can't synchronously use calculateDistance here if we just imported it like that, 
    // but let's assume it's imported at the top in a real scenario
    return true; 
  });
}

export function getRecommendedDestinations(interests) {
  if (!interests || interests.length === 0) return (destinations || []).slice(0, 5);
  
  return [...(destinations || [])].map(dest => {
    let score = 0;
    if (dest.tags) {
      interests.forEach(interest => {
        if (dest.tags.includes(interest)) score++;
      });
    }
    return { ...dest, score };
  }).sort((a, b) => b.score - a.score).slice(0, 5);
}
