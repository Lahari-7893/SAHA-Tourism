export function calculateDistance(coord1, coord2) {
  if (!coord1 || !coord2) return 0;
  const { lat: lat1, lng: lon1 } = coord1;
  const { lat: lat2, lng: lon2 } = coord2;
  
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

export function estimateTravelTime(distance, mode) {
  // Returns time in minutes
  let speedKmH = 40; // Default car/taxi in city
  if (mode === 'walking') speedKmH = 5;
  if (mode === 'bicycle') speedKmH = 15;
  if (mode === 'transit') speedKmH = 25;
  
  return Math.ceil((distance / speedKmH) * 60);
}

export function getRouteWaypoints(stops) {
  return stops.map(stop => stop.attraction?.coordinates).filter(Boolean);
}

export function getMapCenter(coordinates) {
  if (!coordinates || coordinates.length === 0) return { lat: 0, lng: 0 };
  const sum = coordinates.reduce((acc, curr) => ({
    lat: acc.lat + curr.lat,
    lng: acc.lng + curr.lng
  }), { lat: 0, lng: 0 });
  
  return {
    lat: sum.lat / coordinates.length,
    lng: sum.lng / coordinates.length
  };
}

export function getMapBounds(coordinates) {
  if (!coordinates || coordinates.length === 0) return null;
  let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
  coordinates.forEach(c => {
    if (c.lat < minLat) minLat = c.lat;
    if (c.lat > maxLat) maxLat = c.lat;
    if (c.lng < minLng) minLng = c.lng;
    if (c.lng > maxLng) maxLng = c.lng;
  });
  return [
    [minLat, minLng],
    [maxLat, maxLng]
  ];
}
