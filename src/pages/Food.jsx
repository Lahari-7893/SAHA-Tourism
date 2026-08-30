import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, MapPin, Star, Phone, Sparkles, Filter, Search, Award } from 'lucide-react';
import { regionalDishes, restaurants } from '../data/food';
import { destinations } from '../data/destinations';

export default function Food() {
  const [activeTab, setActiveTab] = useState('dishes'); // 'dishes' | 'restaurants'
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState('All'); // 'All' | 'Veg' | 'NonVeg'

  const filteredDishes = regionalDishes.filter(d => {
    const matchesDest = selectedDestination === 'All' || d.destinationId === selectedDestination;
    const matchesDiet = dietaryFilter === 'All' ? true : dietaryFilter === 'Veg' ? d.isVegetarian : !d.isVegetarian;
    return matchesDest && matchesDiet;
  });

  const filteredRestaurants = restaurants.filter(r => {
    const matchesDest = selectedDestination === 'All' || r.destinationId === selectedDestination;
    const matchesDiet = dietaryFilter === 'All' ? true : dietaryFilter === 'Veg' ? r.isVegetarian : true;
    return matchesDest && matchesDiet;
  });

  return (
    <div className="min-h-screen bg-[#F7FBFC] pt-24 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#031926] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-teal-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-peacock-mesh opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-[#F59E0B] text-xs font-black uppercase tracking-wider mb-3 border border-amber-500/30">
            <Utensils size={14} /> Authentic Culinary Heritage
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Flavors & Dining of Andhra Pradesh
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Experience the world-renowned Andhra Bhojanam, Guntur spices, GI-tagged Atreyapuram Pootharekulu, coastal seafood, and tribal bamboo cooking.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <button
              onClick={() => setActiveTab('dishes')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'dishes'
                  ? 'bg-gradient-to-r from-[#0077B6] to-[#00A896] text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Iconic Regional Dishes
            </button>
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'restaurants'
                  ? 'bg-gradient-to-r from-[#0077B6] to-[#00A896] text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Verified Restaurants
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Filters */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-teal-900/10 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Destination District</label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="p-2 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                <option value="All">All 13 AP Regions</option>
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Dietary Preference</label>
              <div className="flex gap-1.5">
                {['All', 'Veg', 'NonVeg'].map(diet => (
                  <button
                    key={diet}
                    onClick={() => setDietaryFilter(diet)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      dietaryFilter === diet 
                        ? 'bg-[#0077B6] text-white border-[#0077B6]' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {diet === 'All' ? 'All Cuisines' : diet === 'Veg' ? '🥬 Pure Veg' : '🍗 Non-Veg / Seafood'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-500">
            Showing {activeTab === 'dishes' ? filteredDishes.length : filteredRestaurants.length} verified culinary entries
          </div>
        </div>

        {/* Tab 1: Regional Dishes */}
        {activeTab === 'dishes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map(dish => (
              <motion.div 
                key={dish.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-teal-900/10 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-md bg-white/95 text-[#0B2545] flex items-center gap-1 shadow-xs">
                      {dish.isVegetarian ? <span className="w-2 h-2 rounded-full bg-emerald-500"></span> : <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                      {dish.category}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#031926]/80 text-amber-300 rounded-md text-[11px] font-black flex items-center gap-1">
                      <Star size={11} className="fill-amber-400 text-amber-400" /> {dish.rating}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-black text-[#0B2545] mb-2">{dish.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">{dish.description}</p>
                    <p className="text-[11px] font-bold text-[#00838F] flex items-center gap-1">
                      <Award size={13} /> Famous At: {dish.famousAt}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Typical Price</span>
                  <span className="text-sm font-black text-[#0B2545]">₹{dish.approximatePrice}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 2: Verified Restaurants */}
        {activeTab === 'restaurants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(rest => (
              <motion.div 
                key={rest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-teal-900/10 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/95 rounded-md text-xs font-black text-[#0B2545] flex items-center gap-1 shadow-xs">
                      <Star size={11} className="fill-amber-400 text-amber-400" /> {rest.rating}
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#031926]/80 text-teal-200 rounded-md text-[10px] font-bold">
                      {rest.cuisine}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-black text-[#0B2545] mb-1">{rest.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                      <MapPin size={12} className="text-[#00838F]" /> {rest.address}
                    </p>
                    <div className="p-2.5 bg-teal-50/60 rounded-xl mb-3 border border-teal-100">
                      <span className="text-[10px] font-black uppercase text-[#00838F]">Specialty:</span>
                      <p className="text-xs font-bold text-slate-700 mt-0.5">{rest.famousFor}</p>
                    </div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                      <span>Timings: {rest.timings}</span>
                      <span>{rest.priceCategory}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <a 
                    href={`tel:${rest.phone}`}
                    className="px-4 py-2 bg-gradient-to-r from-[#0077B6] to-[#00A896] hover:from-[#0A3D62] hover:to-[#00838F] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Phone size={12} /> Call Restaurant
                  </a>
                  <span className="text-[11px] font-bold text-[#00838F]">{rest.distance}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
