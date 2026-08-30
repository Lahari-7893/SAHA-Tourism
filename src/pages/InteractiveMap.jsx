import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, Navigation, Hotel, Utensils, Shield, Landmark, Compass, 
  Train, Bus, Crosshair, AlertCircle, Clock, Footprints, Car, Phone
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { attractions } from '../data/attractions';
import { hotels } from '../data/hotels';
import { restaurants } from '../data/food';
import { emergencyFacilities } from '../data/safety';
import { transitStations } from '../data/stations';
import { haversine } from '../services/itineraryService';
import { Link } from 'react-router-dom';

// Custom Map Marker Icons using Leaflet divIcon
const createCustomIcon = (bgColor, iconHtml, isPulsing = false) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        background: ${bgColor};
        width: ${isPulsing ? '38px' : '32px'};
        height: ${isPulsing ? '38px' : '32px'};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        border: 2px solid white;
        ${isPulsing ? 'animation: pulse 1.5s infinite;' : ''}
      ">
        <div style="transform: rotate(45deg); color: white; font-size: ${isPulsing ? '16px' : '14px'}; font-weight: bold;">
          ${iconHtml}
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34]
  });
};

const userLocationIcon = createCustomIcon('#2563EB', '📍', true);
const destinationIcon = createCustomIcon('#0077B6', '🦚');
const attractionIcon = createCustomIcon('#00838F', '📍');
const hotelIcon = createCustomIcon('#F59E0B', '🏨');
const restaurantIcon = createCustomIcon('#E76F51', '🍛');
const stationIcon = createCustomIcon('#6D28D9', '🚉');
const emergencyIcon = createCustomIcon('#DC2626', '🏥');

function MapRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

export default function InteractiveMap() {
  const [activeLayer, setActiveLayer] = useState('destinations'); // 'destinations' | 'attractions' | 'hotels' | 'food' | 'stations' | 'emergency'
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // India center
  const [mapZoom, setMapZoom] = useState(5); // Zoom out to see entire India

  // Live User Location States
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle'); // 'idle' | 'requesting' | 'granted' | 'denied' | 'error'
  const [selectedPlaceForDistance, setSelectedPlaceForDistance] = useState(null);

  // Auto-request location on mount
  useEffect(() => {
    handleGetLocation();
  }, []);

  // Get User Live Location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }

    setLocationStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        setUserLocation(coords);
        setLocationStatus('granted');
        setMapCenter([coords.lat, coords.lng]);
        setMapZoom(13);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocationStatus(err.code === 1 ? 'denied' : 'error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSelectDest = (dest) => {
    setSelectedDestination(dest.id);
    setMapCenter([dest.coordinates.lat, dest.coordinates.lng]);
    setMapZoom(12);
  };

  const handleResetView = () => {
    setSelectedDestination('All');
    setMapCenter([20.5937, 78.9629]);
    setMapZoom(5);
  };

  // Calculate real distance & walking/driving travel time from User Location
  const getTravelEstimates = (targetCoords) => {
    if (!userLocation || !targetCoords) return null;
    const distKm = haversine(userLocation.lat, userLocation.lng, targetCoords.lat, targetCoords.lng);
    const walkMins = Math.round((distKm / 4.5) * 60);
    const driveMins = Math.round((distKm / 35) * 60);

    return {
      distance: distKm < 1 ? `${Math.round(distKm * 1000)} m` : `${distKm.toFixed(1)} km`,
      walkTime: walkMins > 60 ? `${Math.floor(walkMins / 60)}h ${walkMins % 60}m` : `${walkMins} min walk`,
      driveTime: driveMins < 1 ? '1 min drive' : `${driveMins} min drive`
    };
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] pt-20">
      
      {/* Top Map Control Bar */}
      <div className="bg-white border-b border-teal-900/10 px-4 sm:px-6 py-3.5 shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div>
              <div className="inline-flex items-center gap-1 text-[#00838F] text-[10px] font-black uppercase tracking-wider mb-0.5">
                <Compass size={12} /> Real-Time Geographic Navigation
              </div>
              <h1 className="text-lg sm:text-xl font-black text-[#0B2545]">Interactive Tourism & Transit Map</h1>
            </div>

            {/* GPS Live Location Trigger Button */}
            <button
              onClick={handleGetLocation}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
                locationStatus === 'granted'
                  ? 'bg-blue-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-[#0077B6] to-[#00A896] hover:from-[#0A3D62] hover:to-[#00838F] text-white'
              }`}
            >
              <Navigation size={13} className={locationStatus === 'requesting' ? 'animate-spin' : ''} />
              <span>{locationStatus === 'granted' ? 'Re-center on Me' : '📍 Use My Current Location'}</span>
            </button>
          </div>

          {/* Layer Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'destinations', label: '13 Destinations', icon: Landmark, color: 'bg-[#0077B6]' },
              { id: 'attractions', label: 'Attractions', icon: MapPin, color: 'bg-[#00838F]' },
              { id: 'hotels', label: 'Hotels', icon: Hotel, color: 'bg-[#F59E0B]' },
              { id: 'food', label: 'Food & Dining', icon: Utensils, color: 'bg-[#E76F51]' },
              { id: 'stations', label: 'Railway & Bus', icon: Train, color: 'bg-purple-700' },
              { id: 'emergency', label: 'Emergency 112', icon: Shield, color: 'bg-rose-600' }
            ].map(layer => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeLayer === layer.id
                    ? `${layer.color} text-white shadow-sm`
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <layer.icon size={13} />
                {layer.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleResetView}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-[#0077B6] bg-slate-100 transition-colors"
          >
            Overview
          </button>
        </div>

        {/* Live Location Alert / Permission Feedback */}
        {locationStatus === 'denied' && (
          <div className="mt-2 text-xs bg-amber-50 text-amber-800 p-2 rounded-xl border border-amber-200 flex items-center gap-1.5">
            <AlertCircle size={14} /> Location permission was denied. Please allow browser location access in settings to see live distances.
          </div>
        )}
      </div>

      {/* Main Map Canvas */}
      <div className="relative w-full h-[calc(100vh-145px)]">
        
        {/* Destination Quick Selector Sidebar (Floating) */}
        <div className="absolute top-4 left-4 z-[400] w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-teal-900/10 p-3 hidden md:block max-h-[75vh] overflow-y-auto">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-2 px-1">Jump to Destination Hub</p>
          <div className="space-y-1">
            {destinations.map(d => (
              <button
                key={d.id}
                onClick={() => handleSelectDest(d)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                  selectedDestination === d.id
                    ? 'bg-teal-50 text-[#0077B6] font-black'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{d.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">{d.district}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Distance Info Box (When User Location is Active) */}
        {userLocation && (
          <div className="absolute top-4 right-4 z-[400] max-w-xs bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200 p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-blue-600 text-xs font-black uppercase">
              <Crosshair size={14} className="animate-spin" /> Live User Position Active
            </div>
            <p className="text-xs font-bold text-[#0B2545]">
              You are located at ({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})
            </p>
            <p className="text-[11px] text-slate-500">
              Tap any destination or attraction marker to calculate exact walking and driving travel times from your position.
            </p>
          </div>
        )}

        {/* Leaflet Map */}
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <MapRecenter center={mapCenter} zoom={mapZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Live Location Marker */}
          {userLocation && (
            <>
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
                <Popup>
                  <div className="p-1 min-w-[180px]">
                    <span className="text-[10px] font-black uppercase text-blue-600">📍 Live GPS Position</span>
                    <h4 className="font-black text-sm text-[#0B2545] mt-0.5">You Are Here</h4>
                    <p className="text-[11px] text-slate-500">Real-time GPS coordinates detected by SAHA.</p>
                  </div>
                </Popup>
              </Marker>
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={800}
                pathOptions={{ color: '#2563EB', fillColor: '#3B82F6', fillOpacity: 0.15 }}
              />
            </>
          )}

          {/* Destinations Layer */}
          {activeLayer === 'destinations' && destinations.map(d => {
            const estimates = getTravelEstimates(d.coordinates);
            return (
              <Marker key={d.id} position={[d.coordinates.lat, d.coordinates.lng]} icon={destinationIcon}>
                <Popup>
                  <div className="p-1 min-w-[210px]">
                    <span className="text-[10px] font-black uppercase text-[#0077B6]">{d.region}</span>
                    <h3 className="font-black text-sm text-[#0B2545]">{d.name}</h3>
                    <p className="text-[11px] text-slate-500 mb-1">{d.district} District</p>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-2">{d.description}</p>
                    
                    {estimates && (
                      <div className="p-2 bg-blue-50 rounded-xl mb-2 text-[11px] font-bold text-blue-900 space-y-0.5">
                        <div className="flex items-center gap-1">
                          <Car size={12} /> Distance from you: <strong>{estimates.distance}</strong> ({estimates.driveTime})
                        </div>
                      </div>
                    )}

                    <Link 
                      to={`/destination/${d.slug}`}
                      className="inline-block w-full text-center px-3 py-1.5 bg-[#0077B6] text-white rounded-lg text-xs font-bold"
                    >
                      View Destination Details →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Attractions Layer */}
          {activeLayer === 'attractions' && attractions.map(a => {
            const estimates = getTravelEstimates(a.coordinates);
            return (
              <Marker key={a.id} position={[a.coordinates.lat, a.coordinates.lng]} icon={attractionIcon}>
                <Popup>
                  <div className="p-1 min-w-[210px]">
                    <span className="text-[10px] font-black uppercase text-[#00838F]">{a.category}</span>
                    <h3 className="font-black text-sm text-[#0B2545]">{a.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-1.5">{a.description}</p>
                    <div className="text-[11px] font-semibold text-slate-700 mb-2">
                      ⏱️ {a.suggestedDuration} mins • Entry: ₹{a.approximateEntryFee}
                    </div>

                    {estimates && (
                      <div className="p-2 bg-teal-50 rounded-xl mb-2 text-[11px] font-bold text-[#00838F] space-y-0.5">
                        <div className="flex items-center gap-1">
                          <Footprints size={12} /> <strong>{estimates.distance} away</strong> ({estimates.walkTime})
                        </div>
                      </div>
                    )}

                    <Link 
                      to={`/planner?destination=${a.destinationId}`}
                      className="inline-block w-full text-center px-3 py-1 bg-[#00838F] text-white rounded-lg text-xs font-bold"
                    >
                      Add to Trip Plan
                    </Link>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Hotels Layer */}
          {activeLayer === 'hotels' && hotels.map(h => {
            const estimates = getTravelEstimates(h.coordinates);
            return (
              <Marker key={h.id} position={[h.coordinates.lat, h.coordinates.lng]} icon={hotelIcon}>
                <Popup>
                  <div className="p-1 min-w-[200px]">
                    <span className="text-[10px] font-bold text-amber-600 uppercase">{h.category}</span>
                    <h3 className="font-black text-sm text-[#0B2545]">{h.name}</h3>
                    <p className="text-xs text-slate-500 mb-1">{h.location}</p>
                    <p className="text-xs font-black text-[#0077B6] mb-2">₹{h.pricePerNight} / night</p>

                    {estimates && (
                      <div className="p-1.5 bg-amber-50 rounded-lg mb-2 text-[10px] font-bold text-amber-900">
                        📍 {estimates.distance} away ({estimates.driveTime})
                      </div>
                    )}

                    <a 
                      href={h.bookingLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block w-full text-center px-3 py-1 bg-[#F59E0B] text-white rounded-lg text-xs font-bold"
                    >
                      Official Booking
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Restaurants Layer */}
          {activeLayer === 'food' && restaurants.map(r => (
            <Marker key={r.id} position={r.coordinates ? [r.coordinates.lat, r.coordinates.lng] : [16.5062, 80.6480]} icon={restaurantIcon}>
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <span className="text-[10px] font-bold text-orange-600">{r.cuisine}</span>
                  <h3 className="font-black text-sm text-[#0B2545]">{r.name}</h3>
                  <p className="text-xs text-slate-600 mb-2">Famous for: {r.famousFor}</p>
                  <a 
                    href={`tel:${r.phone}`}
                    className="inline-block w-full text-center px-3 py-1 bg-[#E76F51] text-white rounded-lg text-xs font-bold"
                  >
                    Call: {r.phone}
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Railway & Bus Stations Layer */}
          {activeLayer === 'stations' && transitStations.map(stn => {
            const estimates = getTravelEstimates(stn.coordinates);
            return (
              <Marker key={stn.id} position={[stn.coordinates.lat, stn.coordinates.lng]} icon={stationIcon}>
                <Popup>
                  <div className="p-1 min-w-[200px]">
                    <span className="text-[10px] font-black uppercase text-purple-700">
                      {stn.type === 'railway' ? '🚆 Railway Station' : '🚌 Central Bus Station'}
                    </span>
                    <h3 className="font-black text-sm text-[#0B2545]">{stn.name}</h3>
                    <p className="text-xs text-slate-500 mb-2">{stn.address}</p>

                    {estimates && (
                      <div className="p-1.5 bg-purple-50 rounded-lg mb-2 text-[10px] font-bold text-purple-900">
                        📍 {estimates.distance} from you ({estimates.driveTime})
                      </div>
                    )}

                    <a 
                      href={stn.bookingUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block w-full text-center px-3 py-1 bg-purple-700 text-white rounded-lg text-xs font-bold"
                    >
                      {stn.type === 'railway' ? 'IRCTC Rail Booking' : 'APSRTC Bus Booking'}
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Emergency Facilities Layer */}
          {activeLayer === 'emergency' && emergencyFacilities.map(f => (
            <Marker key={f.id} position={[f.coordinates.lat, f.coordinates.lng]} icon={emergencyIcon}>
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <span className="text-[10px] font-black uppercase text-rose-600">🚨 {f.type}</span>
                  <h3 className="font-black text-sm text-[#0B2545]">{f.name}</h3>
                  <p className="text-xs text-slate-500 mb-1">{f.address}</p>
                  <p className="text-xs font-bold text-emerald-600 mb-2">{f.openStatus}</p>
                  <a 
                    href={`tel:${f.phone}`}
                    className="inline-block w-full text-center px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold"
                  >
                    Call Emergency: {f.phone}
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
