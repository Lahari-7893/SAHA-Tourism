import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Clock } from 'lucide-react';

// Fix for default Leaflet icon urls in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom numbered marker icon
function createNumberedIcon(number, color = '#0077B6') {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${color};
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 12px;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        ${number}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

function MapUpdater({ center, bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    } else if (center) {
      map.setView(center, 13);
    }
  }, [center, bounds, map]);
  return null;
}

export default function MapView({ stops = [], center, height = '350px', zoom = 12 }) {
  // Default to Vijayawada coords if none provided
  const defaultCenter = center || { lat: 16.5062, lng: 80.6480 };

  const validStops = stops.filter(s => s.coordinates && s.coordinates.lat && s.coordinates.lng);
  
  const polylineCoords = validStops.map(s => [s.coordinates.lat, s.coordinates.lng]);
  
  const bounds = validStops.length > 1 
    ? validStops.map(s => [s.coordinates.lat, s.coordinates.lng])
    : null;

  const mapCenter = validStops.length > 0 
    ? [validStops[0].coordinates.lat, validStops[0].coordinates.lng]
    : [defaultCenter.lat, defaultCenter.lng];

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative" style={{ height }}>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={mapCenter} bounds={bounds} />

        {validStops.map((stop, idx) => (
          <Marker
            key={stop.id || idx}
            position={[stop.coordinates.lat, stop.coordinates.lng]}
            icon={createNumberedIcon(idx + 1, idx === 0 ? '#00695C' : '#0077B6')}
          >
            <Popup>
              <div className="p-1">
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#0077B6] uppercase">
                  <span>Stop #{idx + 1}</span>
                  {stop.arrivalTime && <span>&bull; {stop.arrivalTime}</span>}
                </div>
                <h4 className="font-bold text-sm text-slate-800 my-0.5">{stop.name}</h4>
                {stop.duration && (
                  <p className="text-xs text-slate-500 m-0">
                    Visit: {stop.duration} &bull; Entry: {stop.entryFee || 'Free'}
                  </p>
                )}
                {stop.transport && (
                  <p className="text-[11px] text-teal-700 font-medium m-0 mt-1">
                    Transport: {stop.transport.mode} ({stop.transport.estimatedCost})
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {polylineCoords.length > 1 && (
          <Polyline
            positions={polylineCoords}
            color="#0077B6"
            weight={4}
            opacity={0.8}
            dashArray="6, 8"
          />
        )}
      </MapContainer>

      <div className="absolute bottom-2 left-2 z-[1000] bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] text-slate-600 font-medium shadow-sm">
        Approximate route view &bull; OpenStreetMap
      </div>
    </div>
  );
}
