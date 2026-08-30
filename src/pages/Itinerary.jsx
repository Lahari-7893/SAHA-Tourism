import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { 
  generateItinerary, 
  removeStopFromItinerary, 
  addStopToItinerary,
  replanItinerary 
} from '../services/itineraryService';
import { getAttractionsByDestination } from '../data/attractions';
import MapView from '../components/MapView';
import Modal from '../components/Modal';
import { 
  Clock, MapPin, Navigation, IndianRupee, Users, Compass, 
  ChevronDown, ChevronUp, Share2, Bookmark, Play, Plus, Trash2, 
  AlertTriangle, Sparkles, Map as MapIcon, List, Check, ArrowRight,
  Info, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Itinerary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { startTrip, toggleFavorite, isFavorite } = useApp();

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('timeline'); // timeline | map
  const [showCostBreakdown, setShowCostBreakdown] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const planningData = location.state?.planningData;

  useEffect(() => {
    if (!planningData) {
      navigate('/planner');
      return;
    }

    setLoading(true);
    try {
      const generated = generateItinerary(planningData);
      setItinerary(generated);
      if (generated?.destination?.id) {
        setBookmarked(isFavorite('destinations', generated.destination.id));
      }
    } catch (error) {
      console.error('Failed to generate itinerary:', error);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  }, [location.state, navigate, isFavorite]);

  const handleStartTrip = () => {
    if (!itinerary) return;
    startTrip(itinerary);
    navigate('/my-trip');
  };

  const handleRemoveStop = (idx) => {
    if (!itinerary) return;
    const updated = removeStopFromItinerary(itinerary, idx);
    setItinerary(updated);
  };

  const handleAddAttraction = (attraction) => {
    if (!itinerary) return;
    const updated = addStopToItinerary(itinerary, attraction);
    setItinerary(updated);
    setShowAddModal(false);
  };

  const handleShare = () => {
    if (!itinerary) return;
    const shareText = `SAHA Journey to ${itinerary.destination?.name || 'Destination'}: ${itinerary.stops?.length || 0} stops, ${itinerary.summary?.totalTime || ''}, Est. Cost: ${itinerary.summary?.estimatedCost || ''}. Planned with SAHA - Your Smart Local Travel Companion.`;
    
    if (navigator.share) {
      navigator.share({
        title: `SAHA Journey - ${itinerary.destination?.name}`,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleToggleBookmark = () => {
    if (!itinerary?.destination?.id) return;
    toggleFavorite('destinations', itinerary.destination.id);
    setBookmarked(!bookmarked);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 pt-20">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-[#0077B6]/20 border-t-[#0077B6] rounded-full animate-spin" />
          <Compass className="w-6 h-6 text-[#0077B6] absolute inset-0 m-auto" />
        </div>
        <h2 className="text-2xl font-bold text-[#1B2A4A] mb-2 text-center">SAHA is crafting your journey...</h2>
        <p className="text-slate-500 text-sm max-w-md text-center">
          Matching your budget, group size, transit distances, and interests for optimal route flow.
        </p>
      </div>
    );
  }

  if (!itinerary) return null;

  const availableToAdd = itinerary.destination?.id
    ? getAttractionsByDestination(itinerary.destination.id).filter(
        a => !itinerary.stops.some(s => s.attractionId === a.id || s.name === a.name)
      )
    : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#0077B6]/10 text-[#0077B6] font-bold text-xs uppercase tracking-wider rounded-md">
                  Personalized Itinerary
                </span>
                <span className="text-xs text-slate-500">
                  {itinerary.planningParams?.pace} pace &bull; {itinerary.planningParams?.travelStyle}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mt-1">
                {itinerary.destination?.name || 'Your Trip'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {itinerary.destination?.district}, {itinerary.destination?.state}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={handleShare}
                className="px-3.5 py-2 text-slate-600 bg-white border border-slate-200 hover:text-[#0077B6] hover:border-[#0077B6] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Share'}
              </button>
              <button 
                onClick={handleToggleBookmark}
                className={`p-2 rounded-xl border text-xs font-bold transition-colors shadow-sm ${
                  bookmarked 
                    ? 'bg-amber-50 border-amber-300 text-amber-600' 
                    : 'bg-white border-slate-200 text-slate-600 hover:text-amber-500'
                }`}
                title="Save to favorites"
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-1 text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#00838F]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Duration</span>
              </div>
              <span className="font-extrabold text-sm text-[#1B2A4A]">{itinerary.summary.totalTime}</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-1 text-slate-400 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-[#00838F]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Est. Cost</span>
              </div>
              <span className="font-extrabold text-sm text-[#1B2A4A]">{itinerary.summary.estimatedCost}</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-1 text-slate-400 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#00838F]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Sightseeing</span>
              </div>
              <span className="font-extrabold text-sm text-[#1B2A4A]">{itinerary.summary.placesCount} Stops</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-1 text-slate-400 mb-1">
                <Navigation className="w-3.5 h-3.5 text-[#00838F]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Distance</span>
              </div>
              <span className="font-extrabold text-sm text-[#1B2A4A]">{itinerary.summary.totalDistance}</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-1 text-slate-400 mb-1">
                <Users className="w-3.5 h-3.5 text-[#00838F]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Travelers</span>
              </div>
              <span className="font-extrabold text-sm text-[#1B2A4A]">{itinerary.summary.travelers}</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-1 text-slate-400 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-[#00838F]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Per Person</span>
              </div>
              <span className="font-extrabold text-xs text-[#00695C]">{itinerary.summary.costPerPerson}</span>
            </div>
          </div>

          {/* Budget Health Banner */}
          <div className={`p-3.5 rounded-2xl flex items-center justify-between text-xs font-bold ${
            itinerary.summary.isWithinBudget 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}>
            <div className="flex items-center gap-2">
              {itinerary.summary.isWithinBudget ? (
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              )}
              <span>
                {itinerary.summary.isWithinBudget 
                  ? `Plan fits within your ₹${itinerary.planningParams?.totalBudget} budget with ~₹${itinerary.summary.budgetRemaining} remaining margin.` 
                  : `Plan slightly exceeds your ₹${itinerary.planningParams?.totalBudget} budget by ₹${Math.abs(itinerary.summary.budgetRemaining)}.`}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
              Approximate estimate
            </span>
          </div>
        </div>

        {/* View Tabs: Timeline vs Interactive Map */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'timeline' ? 'bg-white shadow text-[#0077B6]' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" /> Timeline View
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'map' ? 'bg-white shadow text-[#0077B6]' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" /> Interactive Map ({itinerary.stops.length} Stops)
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 text-xs font-bold text-[#0077B6] bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Stop
          </button>
        </div>

        {/* Map Tab Content */}
        {activeTab === 'map' && (
          <div className="mb-8 space-y-4">
            <MapView 
              stops={itinerary.stops} 
              center={itinerary.destination?.coordinates}
              height="450px" 
            />
          </div>
        )}

        {/* Timeline Tab Content */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-8 relative">
            <div className="absolute left-[36px] sm:left-[44px] top-12 bottom-12 w-0.5 bg-slate-200" />
            
            <div className="space-y-8">
              {itinerary.stops.map((stop, index) => (
                <div key={stop.id || index} className="relative z-10 flex">
                  
                  {/* Timeline Node & Time */}
                  <div className="flex flex-col items-center mr-4 sm:mr-6 w-14 flex-shrink-0">
                    <div className="w-7 h-7 rounded-full bg-[#0077B6] text-white font-black text-xs flex items-center justify-center ring-4 ring-white shadow mb-1.5">
                      {index + 1}
                    </div>
                    <span className="text-[11px] font-black text-slate-600 text-center leading-tight">
                      {stop.arrivalTime}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1">
                    {/* Transit connector badge if not first */}
                    {stop.distanceFromPrev && (
                      <div className="flex items-center text-xs text-slate-500 mb-3 -ml-4 sm:-ml-6 px-3 py-1 bg-sky-50 rounded-full w-max border border-sky-100 font-medium">
                        <Navigation className="w-3 h-3 mr-1 text-[#0077B6]" />
                        <span>{stop.distanceFromPrev} &bull; <strong>{stop.transport?.mode}</strong> (~{stop.transport?.travelTime}) &bull; {stop.transport?.estimatedCost}</span>
                      </div>
                    )}
                    
                    <div className="bg-slate-50 hover:bg-slate-100/80 transition-all rounded-2xl p-4 sm:p-5 border border-slate-200 group relative">
                      <div className="absolute top-4 right-4 flex items-center space-x-1">
                        <button 
                          onClick={() => handleRemoveStop(index)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove stop"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="pr-10">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <Link 
                            to={`/destination/${itinerary.destination?.slug}`} 
                            className="text-base sm:text-lg font-bold text-[#1B2A4A] hover:text-[#0077B6] transition-colors"
                          >
                            {stop.name}
                          </Link>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                          <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-[10px] uppercase font-bold tracking-wider rounded-md">
                            Visit: {stop.duration}
                          </span>
                          {(stop.categories || []).map(cat => (
                            <span key={cat} className="px-2 py-0.5 bg-[#0077B6]/10 text-[#0077B6] text-[10px] uppercase font-bold tracking-wider rounded-md">
                              {cat}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                          {stop.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-200/80 gap-2 text-xs">
                          <div className="text-slate-500 font-medium">
                            Entry: <strong className="text-slate-800">{stop.entryFee}</strong> &bull; Est. Stop Subtotal: <strong className="text-[#00695C]">₹{stop.subtotal}</strong>
                          </div>
                          <Link 
                            to={`/destination/${itinerary.destination?.slug}`}
                            className="text-xs font-bold text-[#0077B6] hover:underline flex items-center gap-1"
                          >
                            Place Details <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cost Breakdown Collapsible */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <button 
            onClick={() => setShowCostBreakdown(!showCostBreakdown)}
            className="w-full flex justify-between items-center p-5 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-2 bg-[#00838F]/10 rounded-xl mr-3">
                <IndianRupee className="w-5 h-5 text-[#00838F]" />
              </div>
              <div className="text-left">
                <span className="font-bold text-sm text-[#1B2A4A] block">Transparent Cost Breakdown</span>
                <span className="text-xs text-slate-500">All local fares & fees calculated for {itinerary.summary.travelers} traveler{itinerary.summary.travelers > 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-base text-[#1B2A4A]">₹{itinerary.costBreakdown.total}</span>
              {showCostBreakdown ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </button>
          
          {showCostBreakdown && (
            <div className="p-5 border-t border-slate-200 space-y-3 bg-white">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-600">Transport Estimate (Auto/Cab/Transit)</span>
                <span className="font-bold text-slate-800">₹{itinerary.costBreakdown.transport}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-600">Entry Fees & Tickets ({itinerary.summary.travelers} pax)</span>
                <span className="font-bold text-slate-800">₹{itinerary.costBreakdown.entryFees}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-600">Food & Refreshments Estimate</span>
                <span className="font-bold text-slate-800">₹{itinerary.costBreakdown.food}</span>
              </div>
              
              <div className="h-px bg-slate-200 my-2" />
              
              <div className="flex justify-between text-sm font-extrabold text-[#1B2A4A]">
                <span>Total Estimated Journey Cost</span>
                <span className="text-[#0077B6]">₹{itinerary.costBreakdown.total}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Per Person Share</span>
                <span className="font-semibold">{itinerary.summary.costPerPerson}</span>
              </div>
              <div className={`flex justify-between text-xs font-bold pt-1 ${
                itinerary.costBreakdown.budgetRemaining >= 0 ? 'text-emerald-700' : 'text-rose-600'
              }`}>
                <span>Budget Remaining from ₹{itinerary.planningParams?.totalBudget}</span>
                <span>₹{itinerary.costBreakdown.budgetRemaining}</span>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
                Note: Fares and meal costs are approximate realistic estimates. Actual expenses may vary based on local conditions.
              </p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => navigate('/planner', { state: { destination: itinerary.destination } })}
            className="flex-1 py-3.5 px-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors flex justify-center items-center gap-2 text-sm shadow-sm"
          >
            <Compass className="w-4 h-4 text-slate-500" />
            Modify in Planner
          </button>
          
          <button 
            onClick={handleStartTrip}
            className="flex-[2] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-extrabold hover:shadow-lg hover:shadow-amber-500/25 transition-all flex justify-center items-center gap-2 text-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            Start This Trip Now
          </button>
        </div>

      </div>

      {/* Add Attraction Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add a Stop to Your Itinerary"
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {availableToAdd.length === 0 ? (
            <p className="text-sm text-slate-500 py-4 text-center">
              All known attractions for this destination are already in your itinerary.
            </p>
          ) : (
            availableToAdd.map(attr => (
              <div 
                key={attr.id}
                onClick={() => handleAddAttraction(attr)}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-[#0077B6] hover:bg-sky-50/50 cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-sm text-[#1B2A4A]">{attr.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{attr.description}</p>
                  <div className="flex gap-2 mt-1 text-[11px] text-slate-400">
                    <span>Visit: {attr.suggestedDuration || 60}m</span>
                    <span>&bull;</span>
                    <span>Entry: ₹{attr.approximateEntryFee || 0}</span>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-[#0077B6] text-white font-bold text-xs rounded-lg shadow-sm whitespace-nowrap">
                  Add +
                </button>
              </div>
            ))
          )}
        </div>
      </Modal>

    </div>
  );
}
