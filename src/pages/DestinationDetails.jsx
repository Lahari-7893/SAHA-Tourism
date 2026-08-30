import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { getDestinationBySlug, destinations } from '../data/destinations';
import { getAttractionsByDestination } from '../data/attractions';
import { getHotelsByDestination } from '../data/hotels';
import { getRestaurantsByDestination, getDishesByDestination } from '../data/food';
import { emergencyFacilities } from '../data/safety';
import MapView from '../components/MapView';
import ReviewsList from '../components/ReviewsList';
import { 
  Calendar, Clock, Star, MapPin, Share2, Bookmark, ArrowLeft, 
  Utensils, Bus, Compass, Navigation, Check, Sparkles, Hotel, Phone,
  ExternalLink, Plane, Train, Car, Shield, Award, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DestinationDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useApp();

  const [destination, setDestination] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [destHotels, setDestHotels] = useState([]);
  const [destRestaurants, setDestRestaurants] = useState([]);
  const [destDishes, setDestDishes] = useState([]);
  const [destEmergencies, setDestEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    const dest = getDestinationBySlug(slug) || destinations.find(d => d.id === slug || d.slug === slug);
    if (dest) {
      setDestination(dest);
      setAttractions(getAttractionsByDestination(dest.id));
      setDestHotels(getHotelsByDestination(dest.id));
      setDestRestaurants(getRestaurantsByDestination(dest.id));
      setDestDishes(getDishesByDestination(dest.id));
      setDestEmergencies(emergencyFacilities.filter(f => f.destinationId === dest.id));
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
        text: `Explore ${destination.name}, ${destination.state} with SAHA smart travel assistant!`,
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
      <div className="flex justify-center items-center h-screen bg-[#F7FBFC]">
        <div className="w-12 h-12 border-4 border-[#0077B6]/20 border-t-[#0077B6] rounded-full animate-spin" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 pt-20">
        <h2 className="text-3xl font-black text-[#0B2545] mb-3">Destination Not Found</h2>
        <p className="text-slate-500 text-xs mb-6 max-w-md">
          We couldn't locate this destination in the current verified Andhra Pradesh dataset.
        </p>
        <button 
          onClick={() => navigate('/explore')}
          className="bg-[#0077B6] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm flex items-center gap-2"
        >
          <ArrowLeft size={14} /> Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F7FBFC] min-h-screen pb-24">
      
      {/* Hero Header */}
      <div className="relative h-[55vh] md:h-[65vh] w-full bg-[#031926]">
        <img 
          src={destination.heroImage} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031926] via-[#031926]/40 to-transparent" />
        
        {/* Floating Top Nav */}
        <div className="absolute top-24 left-4 right-4 max-w-7xl mx-auto flex justify-between items-center z-10">
          <button 
            onClick={() => navigate('/explore')}
            className="p-2.5 bg-black/40 backdrop-blur-md rounded-2xl text-white hover:bg-black/60 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft size={16} /> All Destinations
          </button>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleToggleFav}
              className="p-2.5 bg-black/40 backdrop-blur-md rounded-2xl text-white hover:bg-black/60 transition-colors"
            >
              <Bookmark size={18} className={isFav ? 'fill-amber-400 text-amber-400' : 'text-white'} />
            </button>
            <button 
              onClick={handleShare}
              className="p-2.5 bg-black/40 backdrop-blur-md rounded-2xl text-white hover:bg-black/60 transition-colors"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Hero Title Content */}
        <div className="absolute bottom-8 left-4 right-4 max-w-7xl mx-auto z-10">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {destination.categories.map((cat, i) => (
              <span key={i} className="px-3 py-1 bg-[#0077B6]/80 text-white rounded-lg text-xs font-bold backdrop-blur-sm">
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
            {destination.name}
          </h1>
          <p className="text-teal-200 text-sm sm:text-base font-bold mt-1 max-w-2xl drop-shadow">
            {destination.tagline || `${destination.district} District • ${destination.region}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-12">
        
        {/* Key Info Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-teal-900/10 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#00838F] flex items-center justify-center font-bold">
              <Calendar size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Best Time</span>
              <p className="text-xs font-black text-[#0B2545]">{destination.bestTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#0077B6] flex items-center justify-center font-bold">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Recommended Stay</span>
              <p className="text-xs font-black text-[#0B2545]">{destination.recommendedDuration}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Star size={20} className="fill-amber-400 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Rating & Reviews</span>
              <p className="text-xs font-black text-[#0B2545]">{destination.rating} / 5.0 ({destination.reviewCount}+)</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to={`/planner?destination=${destination.slug}`}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#F59E0B] to-[#E76F51] hover:from-[#D97706] hover:to-[#D46045] text-white rounded-2xl text-xs font-black shadow-md transition-all text-center"
            >
              Plan Trip Here →
            </Link>
          </div>
        </div>

        {/* Destination Description & How to Reach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 space-y-4">
            <h2 className="text-xl font-black text-[#0B2545]">About {destination.name}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {destination.description}
            </p>

            {/* Local Crafts & Foods Badges */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-100">
                <span className="text-[10px] font-black uppercase text-[#00838F] flex items-center gap-1">
                  <Award size={12} /> Famous Local Foods
                </span>
                <p className="text-xs font-bold text-slate-700 mt-1">
                  {destination.famousFood.join(', ')}
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-100">
                <span className="text-[10px] font-black uppercase text-amber-800 flex items-center gap-1">
                  <Sparkles size={12} /> Heritage Crafts & Textiles
                </span>
                <p className="text-xs font-bold text-slate-700 mt-1">
                  {destination.localCrafts.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* How to Reach Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-teal-900/10 space-y-3.5 text-xs">
            <h3 className="text-sm font-black text-[#0B2545] border-b border-slate-100 pb-2">How to Reach {destination.name}</h3>
            <div className="flex items-start gap-2.5 text-slate-600">
              <Plane size={15} className="text-[#0077B6] mt-0.5 flex-shrink-0" />
              <span><strong>Air:</strong> {destination.howToReach.air}</span>
            </div>
            <div className="flex items-start gap-2.5 text-slate-600">
              <Train size={15} className="text-[#00838F] mt-0.5 flex-shrink-0" />
              <span><strong>Rail:</strong> {destination.howToReach.rail}</span>
            </div>
            <div className="flex items-start gap-2.5 text-slate-600">
              <Car size={15} className="text-[#E76F51] mt-0.5 flex-shrink-0" />
              <span><strong>Road:</strong> {destination.howToReach.road}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Verified Attractions */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#00838F]">Sightseeing</span>
              <h2 className="text-2xl font-black text-[#0B2545]">Must-Visit Sights in {destination.name}</h2>
            </div>
            <span className="text-xs font-bold text-slate-400">{attractions.length} Verified Attractions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map(attr => (
              <div key={attr.id} className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-teal-900/10 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img src={attr.images[0]} alt={attr.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase">
                      {attr.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-black text-[#0B2545] mb-1.5">{attr.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">{attr.description}</p>
                    <p className="text-[11px] text-[#00838F] font-bold">⏱️ Suggested: {attr.suggestedDuration} mins</p>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">🕒 {attr.timings}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0B2545]">
                    Entry: {attr.approximateEntryFee > 0 ? `₹${attr.approximateEntryFee}` : 'Free'}
                  </span>
                  <Link
                    to={`/planner?destination=${destination.slug}`}
                    className="px-3 py-1.5 bg-[#0077B6] hover:bg-[#00695C] text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Add to Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Verified Hotels in Destination */}
        {destHotels.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">Where to Stay</span>
                <h2 className="text-2xl font-black text-[#0B2545]">Verified Hotels & Stays in {destination.name}</h2>
              </div>
              <Link to="/hotels" className="text-xs font-bold text-[#0077B6] hover:underline">View All AP Hotels →</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destHotels.map(h => (
                <div key={h.id} className="bg-white rounded-3xl overflow-hidden shadow-xs border border-teal-900/10 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black uppercase bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
                        {h.category}
                      </span>
                      <span className="text-xs font-black text-[#0B2545] flex items-center gap-1">
                        <Star size={12} className="fill-amber-400 text-amber-400" /> {h.rating}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-[#0B2545]">{h.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 mb-3">
                      <MapPin size={12} className="text-[#00838F]" /> {h.location}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">{h.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-black text-[#0B2545]">₹{h.pricePerNight} <span className="text-[10px] font-normal text-slate-500">/ night</span></span>
                    <a
                      href={h.bookingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-[#0077B6] to-[#00A896] text-white rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      Book <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Reviews */}
        {destination && (
          <ReviewsList destinationId={destination.id} />
        )}

      </div>
    </div>
  );
}
