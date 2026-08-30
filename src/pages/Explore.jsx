import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, MapPin, Compass, Sparkles, X } from 'lucide-react';
import PlaceCard from '../components/PlaceCard';
import { destinations } from '../data/destinations';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || 'All States');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular');

  const categories = ['All', 'Heritage', 'Temples', 'Nature', 'Beaches', 'Food', 'Adventure', 'Hills'];
  const states = ['All States', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Kerala'];

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedState !== 'All States') params.set('state', selectedState);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (sortBy !== 'popular') params.set('sort', sortBy);
    
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedState, selectedCategory, sortBy, setSearchParams]);

  // Filter and sort logic
  const filteredDestinations = destinations.filter(dest => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term || 
      dest.name.toLowerCase().includes(term) || 
      (dest.description || '').toLowerCase().includes(term) ||
      (dest.district || '').toLowerCase().includes(term) ||
      (dest.state || '').toLowerCase().includes(term);

    const matchesState = selectedState === 'All States' || dest.state === selectedState;
    
    const cats = dest.categories || dest.tags || [];
    const matchesCategory = selectedCategory === 'All' || 
      cats.some(c => c.toLowerCase() === selectedCategory.toLowerCase());
    
    return matchesSearch && matchesState && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (b.rating || 0) - (a.rating || 0);
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <div className="bg-[#1B2A4A] pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A] via-[#0077B6]/30 to-[#00695C]/20 opacity-50" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 text-[#4FC3F7] rounded-full text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-sky-500/30">
            <Compass className="w-3.5 h-3.5" /> Destination Explorer
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight">
            Explore Andhra Pradesh & Beyond
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Verified cultural landmarks, coastal gems, scenic hill stations, and heritage centers with real-time budget & transit readiness.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations (e.g. Vijayawada, Tirupati, Araku, Caves, Forts...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-white text-slate-900 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-[#0077B6]/30 text-sm font-medium"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-[#1B2A4A] text-base">
                <Filter size={18} className="text-[#0077B6]" />
                Filters
              </div>
              {(searchTerm || selectedState !== 'All States' || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedState('All States');
                    setSelectedCategory('All');
                    setSortBy('popular');
                  }}
                  className="text-xs text-[#0077B6] font-bold hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">State Scope</label>
              <select 
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-[#0077B6] text-white border-[#0077B6] shadow-xs' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
            
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-black text-[#1B2A4A]">
              {filteredDestinations.length > 0 ? `Showing ${filteredDestinations.length} Destinations` : 'No matching destinations'}
            </h2>
            <span className="text-xs font-semibold text-slate-400">
              Andhra Pradesh Dataset
            </span>
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDestinations.map((dest) => (
                <div key={dest.id}>
                  <PlaceCard place={dest} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-200">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#0077B6]">
                <Search size={28} />
              </div>
              <h3 className="text-lg font-black text-[#1B2A4A] mb-1.5">No destinations found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                Try searching for 'Vijayawada', 'Tirupati', 'Visakhapatnam', or clear selected category filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedState('All States');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2.5 bg-[#0077B6] text-white rounded-xl text-xs font-bold hover:bg-[#00695C] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
