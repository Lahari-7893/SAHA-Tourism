import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Wallet, Users, Calendar, Hotel, Utensils, Car, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations } from '../data/destinations';

export default function BudgetCalculator() {
  const [destinationId, setDestinationId] = useState('dest_vjw');
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [hotelType, setHotelType] = useState('mid'); // 'budget' | 'mid' | 'luxury'
  const [foodStyle, setFoodStyle] = useState('andhra'); // 'street' | 'andhra' | 'dining'
  const [travelMode, setTravelMode] = useState('cab'); // 'auto' | 'cab' | 'bus'

  const selectedDest = destinations.find(d => d.id === destinationId) || destinations[0];

  // Rates per day
  const hotelRates = { budget: 1500, mid: 2800, luxury: 5800 };
  const foodRatesPerPerson = { street: 250, andhra: 450, dining: 850 };
  const travelRatesPerDay = { bus: 200, auto: 600, cab: 1500 };
  const activityRatePerPerson = 250;

  // Calculations
  const roomCount = Math.ceil(travelers / 2);
  const totalHotelCost = days > 1 ? (days - 1) * hotelRates[hotelType] * roomCount : 0;
  const totalFoodCost = days * travelers * foodRatesPerPerson[foodStyle];
  const totalTravelCost = days * travelRatesPerDay[travelMode];
  const totalActivityCost = days * travelers * activityRatePerPerson;
  const grandTotal = totalHotelCost + totalFoodCost + totalTravelCost + totalActivityCost;
  const perPersonCost = Math.round(grandTotal / travelers);

  return (
    <div className="min-h-screen bg-[#F7FBFC] pt-24 pb-16">
      
      {/* Header */}
      <div className="bg-[#031926] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-teal-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-peacock-mesh opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-[#00A896] text-xs font-black uppercase tracking-wider mb-3 border border-teal-500/30">
            <Calculator size={14} /> Instant Cost Estimation
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Andhra Pradesh Trip Budget Calculator
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Plan your expenses realistically across verified stays, authentic Andhra dining, local transit, and attraction entry fees.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 space-y-6">
            
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 mb-2">Target Destination</label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-bold text-[#0B2545] bg-white focus:ring-2 focus:ring-[#0077B6] focus:outline-none"
              >
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.district} District)</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Trip Duration: {days} Days</label>
                <input 
                  type="range" min="1" max="7" value={days} 
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-[#0077B6]"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
                  <span>1 Day</span><span>3 Days</span><span>7 Days</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Travelers: {travelers} People</label>
                <input 
                  type="range" min="1" max="10" value={travelers} 
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full accent-[#0077B6]"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
                  <span>1 Solo</span><span>4 Group</span><span>10 Large</span>
                </div>
              </div>
            </div>

            {/* Hotel Type */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 mb-2">Hotel / Stay Category</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'budget', label: 'Budget Stay', price: '₹1.5k/night' },
                  { id: 'mid', label: 'APTDC / 3-Star', price: '₹2.8k/night' },
                  { id: 'luxury', label: 'Luxury 5-Star', price: '₹5.8k/night' }
                ].map(h => (
                  <button
                    key={h.id}
                    onClick={() => setHotelType(h.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      hotelType === h.id 
                        ? 'border-[#0077B6] bg-teal-50/70 text-[#0077B6] font-black' 
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <p className="text-xs font-bold">{h.label}</p>
                    <p className="text-[10px] opacity-75">{h.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Food Style */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 mb-2">Food & Dining Preference</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'street', label: 'Street & Tiffins', price: '₹250/day/person' },
                  { id: 'andhra', label: 'Andhra Bhojanam', price: '₹450/day/person' },
                  { id: 'dining', label: 'Fine Dining & Seafood', price: '₹850/day/person' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFoodStyle(f.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      foodStyle === f.id 
                        ? 'border-[#0077B6] bg-teal-50/70 text-[#0077B6] font-black' 
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <p className="text-xs font-bold">{f.label}</p>
                    <p className="text-[10px] opacity-75">{f.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Local Transit */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 mb-2">Local Transit Mode</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bus', label: 'APSRTC City Bus', price: '₹200/day' },
                  { id: 'auto', label: 'Auto Rickshaw', price: '₹600/day' },
                  { id: 'cab', label: 'Private AC Cab', price: '₹1500/day' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTravelMode(t.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      travelMode === t.id 
                        ? 'border-[#0077B6] bg-teal-50/70 text-[#0077B6] font-black' 
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <p className="text-xs font-bold">{t.label}</p>
                    <p className="text-[10px] opacity-75">{t.price}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#031926] via-[#0B2545] to-[#0077B6] text-white rounded-3xl p-6 sm:p-8 shadow-xl sticky top-28">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#00A896] bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/30">
              Estimated Total Budget
            </span>
            <div className="mt-4 mb-6">
              <h2 className="text-4xl font-black text-white">₹{grandTotal.toLocaleString()}</h2>
              <p className="text-xs text-teal-200 font-bold mt-1">
                ≈ ₹{perPersonCost.toLocaleString()} per traveler for {days} Days ({travelers} Travelers)
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
              <div className="flex justify-between items-center text-slate-200">
                <span className="flex items-center gap-1.5"><Hotel size={14} className="text-amber-400" /> Accommodation ({days > 1 ? days - 1 : 0} Nights):</span>
                <span className="font-bold text-white">₹{totalHotelCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="flex items-center gap-1.5"><Utensils size={14} className="text-orange-400" /> Food & Dining:</span>
                <span className="font-bold text-white">₹{totalFoodCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="flex items-center gap-1.5"><Car size={14} className="text-sky-400" /> Local Transit:</span>
                <span className="font-bold text-white">₹{totalTravelCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-emerald-400" /> Sights & Entry Fees:</span>
                <span className="font-bold text-white">₹{totalActivityCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                to={`/planner?destination=${destinationId}&budget=${grandTotal}&days=${days}&travelers=${travelers}`}
                className="w-full py-3.5 bg-gradient-to-r from-[#F59E0B] to-[#E76F51] hover:from-[#D97706] hover:to-[#D46045] text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Generate Itinerary with This Budget <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
