import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { getDestinationBySlug, destinations } from '../data/destinations';
import { getAttractionsByDestination } from '../data/attractions';
import { foodItems } from '../data/food';
import MapView from '../components/MapView';
import { 
  Calendar, Clock, Star, MapPin, Share2, Bookmark, ArrowLeft, 
  Utensils, Bus, Compass, Navigation, Check, Sparkles, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DestinationDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useApp();

  const [destination, setDestination] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [localFood, setLocalFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    const dest = getDestinationBySlug(slug) || destinations.find(d => d.id === slug || d.slug === slug);
    if (dest) {
      setDestination(dest);
      const attrs = getAttractionsByDestination(dest.id);
      setAttractions(attrs);
      const foods = foodItems.filter(f => !f.destinations || f.destinations.includes(dest.id) || f.destinations.length === 0);
      setLocalFood(foods.slice(0, 4));
    }
    setLoading(false);
  }, [slug]);

  const isFav = destination ? isFavorite('destinations', destination.id) : false;

  const handleToggleFav = () => {
    if (!destination) return;
    toggleFavorite('destinations', destination.id);
  };

  const handleShare = () => {
    if (!destination) return;
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} - SAHA Travel Companion`,
        text: `Explore ${destination.name}, ${destination.state} with SAHA smart travel itineraries!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0077B6]/20 border-t-[#0077B6]" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 pt-20">
        <h2 className="text-3xl font-black text-[#1B2A4A] mb-3">Destination Not Found</h2>
        <p className="text-slate-500 text-sm mb-6 max-w-md">
          We couldn't locate this destination in the current verified Andhra Pradesh dataset.
        </p>
        <button 
          onClick={() => navigate('/explore')}
          className="bg-[#0077B6] hover:bg-[#00695C] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors flex items-center shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explore
        </button>
      </div>
    );
  }

  const mapStops = attractions.map((attr, idx) => ({
    id: attr.id,
    name: attr.name,
    coordinates: attr.coordinates,
    duration: `${attr.suggestedDuration || 60}m`,
    entryFee: attr.approximateEntryFee ? `₹${attr.approximateEntryFee}` : 'Free'
  }));

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      
      {/* Hero Section */}
      <div className="relative h-[55vh] md:h-[65vh] w-full">
        <img 
          src={destination.heroImage || destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        
        <div className="absolute top-24 left-4 sm:left-8 z-10">
          <button
            onClick={() => navigate(-1)}
            className="px-3.5 py-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {(destination.categories || destination.tags || ['Heritage', 'Culture']).map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black mb-2 tracking-tight">{destination.name}</h1>
              <div className="flex items-center text-sm sm:text-base text-slate-200">
                <MapPin className="w-4 h-4 mr-1.5 text-[#4FC3F7]" />
                {destination.district || destination.region}, {destination.state}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <button 
                onClick={handleToggleFav}
                className={`p-3 rounded-2xl backdrop-blur-md transition-colors border ${
                  isFav 
                    ? 'bg-amber-500 text-white border-amber-400' 
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/20'
                }`}
                title="Save to favorites"
              >
                <Bookmark className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
              
              <button 
                onClick={handleShare}
                className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl transition-colors border border-white/20 text-white"
                title="Share destination"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={() => navigate('/planner', { state: { destination } })}
                className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white px-7 py-3.5 rounded-2xl font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Plan Trip Here
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Key Info Bar */}
        <div className="bg-white rounded-3xl shadow-sm p-6 grid grid-cols-2 md:grid-cols-4 gap-4 -mt-16 relative z-10 border border-slate-200/80">
          <div className="flex items-center gap-3 p-2">
            <div className="bg-sky-50 p-3 rounded-2xl text-[#0077B6]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Best Season</p>
              <p className="font-extrabold text-sm text-[#1B2A4A]">{destination.bestTime || destination.bestTimeToVisit || 'Oct - Mar'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2">
            <div className="bg-teal-50 p-3 rounded-2xl text-[#00838F]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
              <p className="font-extrabold text-sm text-[#1B2A4A]">{destination.recommendedDuration || destination.idealDuration || '1-2 Days'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2">
            <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rating</p>
              <p className="font-extrabold text-sm text-[#1B2A4A]">{destination.rating || 4.7} / 5.0</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="bg-purple-50 p-3 rounded-2xl text-purple-600">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sightseeing</p>
              <p className="font-extrabold text-sm text-[#1B2A4A]">{attractions.length} Verified Spots</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          
          {/* Main Content (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Description */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-black text-[#1B2A4A] mb-4">About {destination.name}</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                {destination.description}
              </p>
              {destination.travelTips && (
                <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100 mt-4 text-xs text-[#0077B6] font-medium">
                  <strong>Local Insight:</strong> {destination.travelTips}
                </div>
              )}
            </section>

            {/* Attractions */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-black text-[#1B2A4A]">Key Attractions & Heritage Sites</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Top sights included in SAHA's smart itinerary calculation</p>
                </div>
              </div>
              
              {attractions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {attractions.map(attr => (
                    <div 
                      key={attr.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-[#0077B6]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-2 py-0.5 bg-[#0077B6]/10 text-[#0077B6] text-[10px] uppercase font-bold tracking-wider rounded-md">
                            {attr.category || 'Sight'}
                          </span>
                          <span className="text-xs font-extrabold text-[#00695C]">
                            {attr.approximateEntryFee ? `₹${attr.approximateEntryFee}` : 'Free Entry'}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-base text-[#1B2A4A] mb-1.5">{attr.name}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">{attr.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#00838F]" /> {attr.suggestedDuration || 45} mins visit
                        </span>
                        <span className="text-[#0077B6] font-bold">
                          {attr.approximateDistanceFromCenter ? `${attr.approximateDistanceFromCenter}km from center` : 'Center'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic text-sm">Attractions data for this region will be enriched soon.</p>
              )}
            </section>

            {/* Interactive Map View */}
            {mapStops.length > 0 && (
              <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-black text-[#1B2A4A]">Attraction Locations & Layout</h2>
                  <span className="text-xs text-slate-400">OpenStreetMap</span>
                </div>
                <MapView 
                  stops={mapStops} 
                  center={destination.coordinates}
                  height="340px" 
                />
              </section>
            )}

          </div>

          {/* Sidebar (Right col) */}
          <div className="space-y-6">
            
            {/* Regional Food Specialties */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-[#1B2A4A]">Must-Try Food Specialties</h3>
                  <p className="text-[11px] text-slate-400">Authentic regional flavors</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {localFood.map((food, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{food.name}</p>
                      <p className="text-[10px] text-slate-400">{food.category || 'Specialty'} &bull; {food.vegetarian ? 'Veg' : 'Non-Veg'}</p>
                    </div>
                    <span className="font-extrabold text-orange-700">~₹{food.approximatePrice}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Reach / Transport Tips */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                <div className="p-2 bg-teal-50 text-[#00838F] rounded-xl">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-[#1B2A4A]">How to Reach</h3>
                  <p className="text-[11px] text-slate-400">Transit & connectivity</p>
                </div>
              </div>
              
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <strong className="text-slate-800 block mb-0.5">By Air</strong>
                  <span>Connected via {destination.district || destination.name} regional or Vijayawada/Vizag airport.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <strong className="text-slate-800 block mb-0.5">By Rail & Road</strong>
                  <span>Mainline railway hub with frequent APSRTC express buses and state highway connectivity.</span>
                </div>
              </div>
            </div>

            {/* Action Card CTA */}
            <div className="bg-gradient-to-br from-[#1B2A4A] to-[#0077B6] rounded-3xl p-6 text-white shadow-lg">
              <h3 className="font-black text-lg mb-1.5">Ready to Explore?</h3>
              <p className="text-xs text-sky-100 mb-5 leading-relaxed">
                Let SAHA assemble your custom itinerary with optimal routes, auto/cab transport estimates, and budget checks.
              </p>
              <button 
                onClick={() => navigate('/planner', { state: { destination } })}
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-3.5 rounded-xl font-bold text-xs shadow transition-colors flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" /> Launch Trip Planner
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
