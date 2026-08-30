import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { 
  MapPin, Users, Heart, UserPlus, User, Clock, Calendar, 
  Landmark, Building, TreePine, Waves, Theater, UtensilsCrossed, 
  ShoppingBag, Mountain, Camera, Baby, Sun, Bird,
  ChevronRight, ChevronLeft, Check, Info, Coins, Banknote, CreditCard,
  Briefcase, Search, Sparkles, Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations, getDestinationBySlug } from '../data/destinations';
import { locationService } from '../services/locationService';

const interestsData = [
  { id: 'historical', label: 'Historical', icon: Landmark, color: 'from-amber-500 to-orange-600' },
  { id: 'temples', label: 'Temples & Spiritual', icon: Building, color: 'from-yellow-500 to-amber-600' },
  { id: 'nature', label: 'Nature & Hills', icon: TreePine, color: 'from-emerald-500 to-teal-600' },
  { id: 'beaches', label: 'Beaches & Coastal', icon: Waves, color: 'from-cyan-500 to-blue-600' },
  { id: 'culture', label: 'Culture & Heritage', icon: Theater, color: 'from-purple-500 to-indigo-600' },
  { id: 'food', label: 'Local Food & Cuisine', icon: UtensilsCrossed, color: 'from-red-500 to-rose-600' },
  { id: 'shopping', label: 'Handicrafts & Shopping', icon: ShoppingBag, color: 'from-pink-500 to-rose-500' },
  { id: 'adventure', label: 'Adventure & Treks', icon: Mountain, color: 'from-teal-500 to-cyan-600' },
  { id: 'photography', label: 'Photography & Views', icon: Camera, color: 'from-blue-500 to-indigo-600' },
  { id: 'family', label: 'Family Friendly', icon: Baby, color: 'from-lime-500 to-green-600' },
  { id: 'spiritual', label: 'Peace & Meditation', icon: Sun, color: 'from-amber-400 to-yellow-500' },
  { id: 'wildlife', label: 'Wildlife & Sanctuaries', icon: Bird, color: 'from-green-600 to-emerald-700' }
];

const STEPS = [
  { id: 'where', label: 'Destination', subtitle: 'Where to?' },
  { id: 'who', label: 'Travelers', subtitle: 'Who\'s going?' },
  { id: 'budget', label: 'Budget', subtitle: 'How much?' },
  { id: 'time', label: 'Time', subtitle: 'How long?' },
  { id: 'interests', label: 'Interests', subtitle: 'What you love' },
  { id: 'style', label: 'Pace & Style', subtitle: 'How you travel' }
];

export default function Planner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [destSearch, setDestSearch] = useState('');
  const [locatingUser, setLocatingUser] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    destination: null,
    startLocation: '',
    startCoords: null,
    travelers: 3,
    travelType: 'friends', // solo, couple, family, friends
    enableGroupPreferences: true,
    groupPreferences: [
      { name: 'Person A', interest: 'temples' },
      { name: 'Person B', interest: 'food' },
      { name: 'Person C', interest: 'nature' }
    ],
    budget: 800,
    timeType: 'hours', // hours, days
    duration: 5,
    interests: ['historical', 'culture'],
    travelStyle: 'balanced', // budget-friendly, balanced, comfort, premium
    pace: 'balanced' // relaxed, balanced, packed
  });

  // Pre-populate if query parameter or route state provided
  useEffect(() => {
    const destSlug = searchParams.get('destination') || location.state?.destinationSlug;
    const preselectedDest = location.state?.destination;
    
    if (preselectedDest) {
      setFormData(prev => ({ ...prev, destination: preselectedDest }));
    } else if (destSlug) {
      const match = getDestinationBySlug(destSlug) || destinations.find(d => d.id === destSlug || d.slug === destSlug);
      if (match) {
        setFormData(prev => ({ ...prev, destination: match }));
      }
    } else if (!formData.destination) {
      // Default to Vijayawada as rich demo destination
      const vja = destinations.find(d => d.slug === 'vijayawada') || destinations[0];
      if (vja) {
        setFormData(prev => ({ ...prev, destination: vja }));
      }
    }
  }, [searchParams, location.state]);

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (id) => {
    setFormData(prev => {
      const interests = prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id];
      return { ...prev, interests };
    });
  };

  const handleGetCurrentLocation = async () => {
    setLocatingUser(true);
    setLocationStatus('Getting your location...');
    try {
      const pos = await locationService.getCurrentPosition();
      updateForm('startCoords', { lat: pos.coords.latitude, lng: pos.coords.longitude });
      updateForm('startLocation', `Current GPS (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`);
      setLocationStatus('Location captured!');
    } catch (err) {
      console.warn('Geolocation failed:', err);
      setLocationStatus('Permission denied. You can enter location manually.');
    } finally {
      setLocatingUser(false);
    }
  };

  const isStepValid = () => {
    switch(currentStep) {
      case 0: return formData.destination !== null;
      case 1: return formData.travelers > 0;
      case 2: return formData.budget > 0;
      case 3: return formData.duration > 0;
      case 4: return formData.interests.length > 0;
      case 5: return true;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Build final planning package
      const planningData = {
        destination: formData.destination,
        destinationId: formData.destination?.id,
        destinationSlug: formData.destination?.slug,
        startLocation: formData.startCoords || formData.startLocation,
        travelers: formData.travelers,
        travelType: formData.travelType,
        budget: formData.budget,
        totalBudget: formData.budget,
        timeType: formData.timeType,
        duration: formData.duration,
        availableTimeHours: formData.timeType === 'hours' ? formData.duration : formData.duration * 8,
        availableTimeMinutes: formData.timeType === 'hours' ? formData.duration * 60 : formData.duration * 480,
        interests: formData.interests,
        groupPreferences: formData.enableGroupPreferences ? formData.groupPreferences : null,
        travelStyle: formData.travelStyle,
        pace: formData.pace
      };
      navigate('/itinerary', { state: { planningData } });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(destSearch.toLowerCase()) ||
    d.district?.toLowerCase().includes(destSearch.toLowerCase()) ||
    d.state.toLowerCase().includes(destSearch.toLowerCase())
  );

  // Renders for steps
  const renderWhere = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A]">Where are you going?</h2>
        <p className="text-slate-500 text-sm mt-1">Select your travel destination in Andhra Pradesh to begin</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text"
          placeholder="Search destinations (Vijayawada, Tirupati, Araku, Visakhapatnam...)"
          value={destSearch}
          onChange={(e) => setDestSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent text-sm"
        />
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-4 max-h-[380px] overflow-y-auto pr-1">
          {filteredDestinations.map(dest => {
            const isSelected = formData.destination?.id === dest.id;
            return (
              <div 
                key={dest.id}
                onClick={() => updateForm('destination', dest)}
                className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all group relative ${
                  isSelected 
                    ? 'border-[#0077B6] ring-2 ring-[#0077B6]/30 shadow-md scale-[1.02]' 
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="h-28 relative">
                  <img 
                    src={dest.heroImage || dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#0077B6] text-white rounded-full p-1 shadow">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="font-bold text-sm leading-tight">{dest.name}</p>
                    <p className="text-[11px] text-white/80">{dest.district || dest.state}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Starting Location / Landmark (Optional)
          </label>
          {locationStatus && <span className="text-xs text-[#00838F] font-medium">{locationStatus}</span>}
        </div>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="e.g. Near Kanaka Durga Temple, Railway Station..." 
              value={formData.startLocation}
              onChange={(e) => updateForm('startLocation', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
            />
          </div>
          <button 
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={locatingUser}
            className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors whitespace-nowrap text-xs font-semibold flex items-center gap-1.5"
          >
            <Navigation className={`w-3.5 h-3.5 ${locatingUser ? 'animate-spin' : 'text-[#0077B6]'}`} />
            {locatingUser ? 'Locating...' : 'Use GPS'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderWho = () => {
    const types = [
      { id: 'solo', label: 'Solo Traveler', desc: '1 person exploring freely', icon: User },
      { id: 'couple', label: 'Couple', desc: '2 people traveling together', icon: Heart },
      { id: 'family', label: 'Family', desc: 'Relaxed, kid & elder friendly', icon: Users },
      { id: 'friends', label: 'Friends Group', desc: 'Fun, active & flexible', icon: UserPlus },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A]">Who is traveling?</h2>
          <p className="text-slate-500 text-sm mt-1">SAHA adjusts transport, pace, and activities based on your group</p>
        </div>
        
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Traveler Composition</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {types.map(type => {
              const Icon = type.icon;
              const isSelected = formData.travelType === type.id;
              return (
                <div 
                  key={type.id}
                  onClick={() => updateForm('travelType', type.id)}
                  className={`cursor-pointer p-4 rounded-xl border-2 flex items-center space-x-3.5 transition-all ${
                    isSelected 
                      ? 'border-[#0077B6] bg-[#F0F9FF] text-[#0077B6] shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-[#0077B6]/10 text-[#0077B6]' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm block text-[#1B2A4A]">{type.label}</span>
                    <span className="text-xs text-slate-500">{type.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm font-bold text-[#1B2A4A]">Number of Travelers</label>
              <p className="text-xs text-slate-500">Affects transport choice (Auto vs Cab vs Tempo Traveller)</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                type="button"
                onClick={() => updateForm('travelers', Math.max(1, formData.travelers - 1))}
                className="w-10 h-10 rounded-full border border-slate-300 bg-slate-50 hover:bg-slate-100 flex items-center justify-center font-bold text-lg text-slate-700"
              >
                -
              </button>
              <span className="text-2xl font-black text-[#0077B6] w-8 text-center">{formData.travelers}</span>
              <button 
                type="button"
                onClick={() => updateForm('travelers', Math.min(10, formData.travelers + 1))}
                className="w-10 h-10 rounded-full border border-slate-300 bg-slate-50 hover:bg-slate-100 flex items-center justify-center font-bold text-lg text-slate-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Group Preference Compromise Feature */}
          {formData.travelers > 1 && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-[#00838F] uppercase tracking-wider">🧑‍🤝‍🧑 Group Trip Preference Compromise</h4>
                  <p className="text-[11px] text-slate-500">Allow SAHA to balance individual group member preferences</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableGroupPreferences}
                  onChange={(e) => updateForm('enableGroupPreferences', e.target.checked)}
                  className="w-4 h-4 accent-[#0077B6] rounded cursor-pointer"
                />
              </div>

              {formData.enableGroupPreferences && (
                <div className="space-y-2 bg-teal-50/50 p-3 rounded-xl border border-teal-100">
                  {formData.groupPreferences.map((pref, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <input
                        type="text"
                        value={pref.name}
                        onChange={(e) => {
                          const updated = [...formData.groupPreferences];
                          updated[idx].name = e.target.value;
                          updateForm('groupPreferences', updated);
                        }}
                        className="w-24 p-1.5 rounded-lg border border-slate-200 font-bold bg-white text-[11px]"
                      />
                      <span className="text-slate-400 font-semibold">prefers</span>
                      <select
                        value={pref.interest}
                        onChange={(e) => {
                          const updated = [...formData.groupPreferences];
                          updated[idx].interest = e.target.value;
                          updateForm('groupPreferences', updated);
                        }}
                        className="flex-1 p-1.5 rounded-lg border border-slate-200 font-bold bg-white text-[11px] text-[#0077B6]"
                      >
                        <option value="temples">Temples & Spiritual</option>
                        <option value="food">Local Food & Cuisine</option>
                        <option value="nature">Nature & Hills</option>
                        <option value="heritage">Heritage & History</option>
                        <option value="beaches">Beaches & Coastal</option>
                        <option value="shopping">Shopping & Crafts</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBudget = () => {
    const presets = [
      { label: 'Budget-Friendly', perPerson: 250, icon: Coins, desc: 'Auto/bus + low entry spots' },
      { label: 'Comfortable', perPerson: 500, icon: Banknote, desc: 'Cab/auto + popular sites + lunch' },
      { label: 'Premium Experience', perPerson: 1500, icon: CreditCard, desc: 'Private cab + all attractions' },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A]">What is your budget?</h2>
          <p className="text-slate-500 text-sm mt-1">SAHA will design an itinerary where transport + entry fees + food fit your limit</p>
        </div>
        
        <div className="space-y-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">₹</span>
            <input 
              type="number"
              value={formData.budget}
              min="100"
              step="50"
              onChange={(e) => updateForm('budget', parseInt(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-4 text-3xl font-extrabold text-[#1B2A4A] rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#0077B6] focus:ring-4 focus:ring-[#0077B6]/10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Budget (INR)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {presets.map(preset => {
              const Icon = preset.icon;
              const calculatedTotal = preset.perPerson * formData.travelers;
              const isSelected = formData.budget === calculatedTotal;
              return (
                <div 
                  key={preset.label}
                  onClick={() => updateForm('budget', calculatedTotal)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                    isSelected ? 'border-[#0077B6] bg-[#F0F9FF] shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#0077B6]' : 'text-slate-400'}`} />
                    <span className="font-bold text-xs text-slate-800">{preset.label}</span>
                  </div>
                  <div className="text-lg font-black text-[#0077B6]">₹{calculatedTotal}</div>
                  <div className="text-[11px] text-slate-500 mt-1">₹{preset.perPerson}/person &bull; {preset.desc}</div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-sky-50 to-teal-50 p-5 rounded-2xl border border-sky-100 flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Per Person Estimate</p>
              <p className="text-2xl font-extrabold text-[#0077B6]">
                ₹{Math.round(formData.budget / Math.max(1, formData.travelers))}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">For {formData.travelers} Traveler{formData.travelers > 1 ? 's' : ''}</p>
              <p className="text-2xl font-extrabold text-[#00695C]">₹{formData.budget}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTime = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A]">How much time do you have?</h2>
        <p className="text-slate-500 text-sm mt-1">SAHA plans realistic visits and factors in transit time between spots</p>
      </div>
      
      <div className="flex p-1.5 bg-slate-100 rounded-xl w-full max-w-xs">
        <button
          type="button"
          onClick={() => {
            updateForm('timeType', 'hours');
            updateForm('duration', 5);
          }}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
            formData.timeType === 'hours' ? 'bg-white shadow text-[#0077B6]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5 inline mr-1.5" /> Hours (Day Trip)
        </button>
        <button
          type="button"
          onClick={() => {
            updateForm('timeType', 'days');
            updateForm('duration', 2);
          }}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
            formData.timeType === 'days' ? 'bg-white shadow text-[#0077B6]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 inline mr-1.5" /> Multiple Days
        </button>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-700">Available Duration</label>
          <span className="text-3xl font-black text-[#0077B6]">
            {formData.duration} {formData.timeType}
          </span>
        </div>
        
        <input 
          type="range"
          min="1"
          max={formData.timeType === 'hours' ? "12" : "7"}
          value={formData.duration}
          onChange={(e) => updateForm('duration', parseInt(e.target.value))}
          className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0077B6]"
        />
        <div className="flex justify-between text-xs text-slate-400 font-medium">
          <span>1 {formData.timeType === 'hours' ? 'hour (Quick stop)' : 'day'}</span>
          <span>{formData.timeType === 'hours' ? '12 hours (Full day exploration)' : '7 days (Complete tour)'}</span>
        </div>
      </div>
    </div>
  );

  const renderInterests = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A]">What do you love?</h2>
          <p className="text-slate-500 text-sm mt-1">Select your interests to get custom ranked attractions</p>
        </div>
        <span className="text-xs font-semibold text-[#0077B6] bg-sky-50 px-2.5 py-1 rounded-full">
          {formData.interests.length} selected
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {interestsData.map(interest => {
          const Icon = interest.icon;
          const isSelected = formData.interests.includes(interest.id);
          return (
            <div 
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`cursor-pointer rounded-2xl p-3.5 flex flex-col items-center justify-center text-center border-2 transition-all ${
                isSelected 
                  ? 'border-[#0077B6] bg-[#F0F9FF] shadow-sm scale-[1.02]' 
                  : 'border-slate-100 bg-white hover:border-slate-200 text-slate-600'
              }`}
            >
              <div className={`p-2.5 rounded-xl mb-2 ${isSelected ? 'bg-[#0077B6] text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#1B2A4A]">{interest.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStyle = () => {
    const styles = [
      { id: 'budget-friendly', label: 'Budget-Friendly', desc: 'Auto/bus transit, iconic street food, affordable entry spots' },
      { id: 'balanced', label: 'Balanced Explorer', desc: 'Comfortable mix of cabs/autos, top attractions, regional dining' },
      { id: 'comfort', label: 'Comfort & Ease', desc: 'Cab transport, priority comfort, popular heritage sites' },
      { id: 'premium', label: 'Premium Experience', desc: 'Dedicated private vehicle, full experience without rushing' }
    ];

    const paces = [
      { id: 'relaxed', label: 'Relaxed Pace', desc: 'Fewer stops (2-3), extended exploration time at each location' },
      { id: 'balanced', label: 'Balanced Pace', desc: 'Optimal flow (3-5 spots), balanced time for sights & food' },
      { id: 'packed', label: 'Packed & Intensive', desc: 'Maximum sights seen, quick transitions, active explorer' }
    ];

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A]">How do you want to travel?</h2>
          <p className="text-slate-500 text-sm mt-1">Fine-tune your travel comfort and sightseeing tempo</p>
        </div>
        
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Travel Comfort Style</label>
          <div className="grid gap-2.5">
            {styles.map(style => (
              <div 
                key={style.id}
                onClick={() => updateForm('travelStyle', style.id)}
                className={`cursor-pointer p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                  formData.travelStyle === style.id 
                    ? 'border-[#0077B6] bg-[#F0F9FF] shadow-sm' 
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div>
                  <h4 className={`font-bold text-sm ${formData.travelStyle === style.id ? 'text-[#0077B6]' : 'text-[#1B2A4A]'}`}>
                    {style.label}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{style.desc}</p>
                </div>
                {formData.travelStyle === style.id && <Check className="w-5 h-5 text-[#0077B6]" />}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Sightseeing Tempo / Pace</label>
          <div className="grid gap-2.5">
            {paces.map(pace => (
              <div 
                key={pace.id}
                onClick={() => updateForm('pace', pace.id)}
                className={`cursor-pointer p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                  formData.pace === pace.id 
                    ? 'border-[#00838F] bg-teal-50/50 shadow-sm' 
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div>
                  <h4 className={`font-bold text-sm ${formData.pace === pace.id ? 'text-[#00838F]' : 'text-[#1B2A4A]'}`}>
                    {pace.label}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{pace.desc}</p>
                </div>
                {formData.pace === pace.id && <Check className="w-5 h-5 text-[#00838F]" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Step Indicator Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0077B6]">Step {currentStep + 1} of {STEPS.length}</span>
            <span className="text-xs font-bold text-slate-500">{STEPS[currentStep].label}</span>
          </div>

          <div className="grid grid-cols-6 gap-1.5">
            {STEPS.map((step, idx) => (
              <div 
                key={step.id}
                onClick={() => idx <= currentStep && setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx < currentStep ? 'bg-[#00695C]' : idx === currentStep ? 'bg-[#0077B6]' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 0 && renderWhere()}
              {currentStep === 1 && renderWho()}
              {currentStep === 2 && renderBudget()}
              {currentStep === 3 && renderTime()}
              {currentStep === 4 && renderInterests()}
              {currentStep === 5 && renderStyle()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all ${
                currentStep === 0 
                  ? 'opacity-0 pointer-events-none' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-8 py-3.5 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all shadow-md ${
                !isStepValid()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : currentStep === STEPS.length - 1
                    ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white shadow-amber-500/25 scale-105'
                    : 'bg-[#0077B6] hover:bg-[#00695C] text-white shadow-[#0077B6]/25'
              }`}
            >
              {currentStep === STEPS.length - 1 ? (
                <>
                  <Sparkles className="w-4 h-4" /> Create My SAHA Journey
                </>
              ) : (
                <>
                  Continue <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Trip Summary Pill */}
        {formData.destination && (
          <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-sm text-sky-300">{formData.destination.name}</span>
              <span className="text-slate-400">&bull; {formData.travelers} Traveler{formData.travelers > 1 ? 's' : ''}</span>
              <span className="text-slate-400">&bull; {formData.duration} {formData.timeType}</span>
              <span className="text-slate-400">&bull; ₹{formData.budget}</span>
            </div>
            <div className="text-slate-400">
              {formData.interests.length} Interests chosen
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
