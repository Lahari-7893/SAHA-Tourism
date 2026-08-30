import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hotel, MapPin, Star, Phone, ExternalLink, Filter, Search, Check, Sparkles, Navigation } from 'lucide-react';
import { hotels } from '../data/hotels';
import { destinations } from '../data/destinations';

export default function Hotels() {
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(8000);
  const [userLocationNearby, setUserLocationNearby] = useState(false);

  const categories = ['All', 'Luxury', 'Mid-Range', 'Eco-Stay', 'Resort', 'Adventure Camping'];

  const filteredHotels = hotels.filter(h => {
    const matchesDest = selectedDestination === 'All' || h.destinationId === selectedDestination;
    const matchesCat = selectedCategory === 'All' || h.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesPrice = h.pricePerNight <= maxPrice;
    const matchesSearch = !searchQuery || 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDest && matchesCat && matchesPrice && matchesSearch;
  });

  const handleNearMe = () => {
    setUserLocationNearby(true);
    setSelectedDestination('dest_vjw'); // default nearby
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] pt-24 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#031926] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-teal-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-peacock-mesh opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-[#00A896] text-xs font-black uppercase tracking-wider mb-3 border border-teal-500/30">
            <Hotel size={14} /> Verified Andhra Pradesh Stays
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Hotels & Resorts in Andhra Pradesh
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            From official APTDC Haritha riverfront cottages to luxury beachside resorts, find verified accommodations across all 13 AP tourism districts.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button 
              onClick={handleNearMe}
              className="px-5 py-2.5 bg-gradient-to-r from-[#0077B6] to-[#00A896] hover:from-[#0A3D62] hover:to-[#00838F] text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 transition-all"
            >
              <Navigation size={14} /> Find Hotels Near Me
            </button>
            <button 
              onClick={() => { setSelectedDestination('dest_vjw'); }}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black border border-white/30 backdrop-blur-sm transition-all"
            >
              Hotels in Vijayawada
            </button>
            <button 
              onClick={() => { setSelectedDestination('dest_vzg'); }}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black border border-white/30 backdrop-blur-sm transition-all"
            >
              Hotels in Vizag (Beach View)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Filters and Search Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-teal-900/10 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          <div className="relative">
            <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">Search Hotel / City</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Hotel name or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">Destination District</label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
            >
              <option value="All">All 13 AP Destinations</option>
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.district})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">Stay Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-black uppercase text-slate-500">Max Budget / Night</label>
              <span className="text-xs font-black text-[#0077B6]">₹{maxPrice}</span>
            </div>
            <input 
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#0077B6] cursor-pointer"
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <motion.div 
              key={hotel.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-teal-900/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 rounded-xl shadow-xs text-xs font-black text-[#0B2545] flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {hotel.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-[#031926]/80 backdrop-blur-md rounded-md text-[10px] font-bold text-teal-200">
                    {hotel.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-black text-[#0B2545] mb-1.5 line-clamp-1">{hotel.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                    <MapPin size={13} className="text-[#00838F] flex-shrink-0" />
                    <span className="line-clamp-1">{hotel.location} • {hotel.distanceFromCenter}</span>
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {hotel.description}
                  </p>

                  {/* Facilities Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {hotel.facilities.slice(0, 3).map((f, i) => (
                      <span key={i} className="px-2 py-0.5 bg-teal-50 text-[#00838F] rounded-md text-[10px] font-bold">
                        ✓ {f}
                      </span>
                    ))}
                  </div>

                  {/* Room Details & Times */}
                  {(hotel.checkIn || hotel.roomDetails) && (
                    <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 pb-2 border-b border-slate-200">
                        <span>IN: {hotel.checkIn || '12:00 PM'}</span>
                        <span>OUT: {hotel.checkOut || '11:00 AM'}</span>
                      </div>
                      <div className="space-y-1.5">
                        {hotel.roomDetails && hotel.roomDetails.map((room, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-slate-700">
                              {room.type} {room.ac ? '(AC)' : '(Non-AC)'}
                            </span>
                            <span className="font-black text-[#0077B6]">
                              ₹{room.price} <span className="text-[9px] font-normal text-slate-400">for {room.guests}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Starting From</span>
                  <p className="text-base font-black text-[#0B2545]">
                    ₹{hotel.pricePerNight} <span className="text-xs font-normal text-slate-500">/ night</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a 
                    href={`tel:${hotel.phone}`}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-teal-50 text-[#00838F] transition-colors"
                    title={`Call: ${hotel.phone}`}
                  >
                    <Phone size={15} />
                  </a>
                  <a 
                    href={hotel.bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-[#0077B6] to-[#00A896] hover:from-[#0A3D62] hover:to-[#00838F] text-white rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-sm transition-all"
                  >
                    Book Stay <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Hotel size={36} className="text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-black text-[#0B2545]">No hotels matched your filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try expanding your price range or selecting another district.</p>
          </div>
        )}
      </div>
    </div>
  );
}
