import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, MapPin, AlertTriangle, CheckCircle, Navigation, Hospital, Building, Pill, CreditCard, ExternalLink, Share2, Sparkles } from 'lucide-react';
import { emergencyNumbers, emergencyFacilities, travelSafetyTips } from '../data/safety';
import { destinations } from '../data/destinations';

export default function Safety() {
  const [selectedDestination, setSelectedDestination] = useState('dest_vjw');
  const [facilityType, setFacilityType] = useState('all'); // 'all' | 'hospital' | 'police' | 'pharmacy' | 'atm'
  const [safeStatusLogged, setSafeStatusLogged] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  const filteredFacilities = emergencyFacilities.filter(f => {
    const matchesDest = !selectedDestination || selectedDestination === 'all' || f.destinationId === selectedDestination;
    const matchesType = facilityType === 'all' || f.type === facilityType;
    return matchesDest && matchesType;
  });

  const handleShareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Current Travel Location (SAHA Andhra Pradesh)',
        text: 'I am traveling in Andhra Pradesh. Here is my current safety check-in status from SAHA Smart Travel Companion.',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`I am traveling in Andhra Pradesh. Safety check-in: ${new Date().toLocaleTimeString()}`);
      setLocationShared(true);
      setTimeout(() => setLocationShared(false), 3000);
    }
  };

  const handleImSafe = () => {
    setSafeStatusLogged(true);
    setTimeout(() => setSafeStatusLogged(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] pt-24 pb-16">
      
      {/* Red Alert Header Banner */}
      <div className="bg-gradient-to-r from-[#031926] via-[#0B2545] to-[#780000] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-rose-900/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-black uppercase tracking-wider mb-3 border border-rose-500/30">
            <Shield size={14} className="text-rose-400" /> 24/7 Tourist Emergency Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Safety Center & Emergency Services
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Instant one-touch access to National Emergency Helplines, nearby 24/7 hospitals, police control stations, medical pharmacies, and cash ATMs across Andhra Pradesh.
          </p>

          {/* Quick Action Emergency Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a 
              href="tel:112"
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <Phone size={15} /> Dial National 112
            </a>
            <a 
              href="tel:108"
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-black flex items-center gap-2 shadow-md transition-all"
            >
              <Hospital size={15} /> Medical Ambulance 108
            </a>
            <button 
              onClick={handleShareLocation}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-black border border-white/30 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <Share2 size={14} /> {locationShared ? 'Location Copied!' : 'Share Live Location'}
            </button>
            <button 
              onClick={handleImSafe}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 shadow-md"
            >
              <CheckCircle size={14} /> {safeStatusLogged ? 'Check-in Logged!' : "I'm Safe Check-in"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Section 1: Quick Access Emergency Numbers */}
        <div>
          <h2 className="text-xl font-black text-[#0B2545] mb-4">Official Emergency Helplines (All-India & AP)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyNumbers.map(num => (
              <div key={num.id} className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 hover:border-rose-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-sm text-[#0B2545]">{num.name}</h3>
                    <span className="text-lg font-black text-rose-600 px-2 py-0.5 bg-rose-50 rounded-lg">
                      {num.number}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{num.description}</p>
                </div>
                <a
                  href={`tel:${num.number}`}
                  className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone size={13} /> Call {num.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Nearby Verified Emergency Facilities */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-[#00838F] text-[10px] font-black uppercase tracking-wider mb-0.5">
                <MapPin size={12} /> Local Andhra Services
              </div>
              <h2 className="text-2xl font-black text-[#0B2545]">Nearby Emergency Healthcare & Police</h2>
            </div>

            {/* Destination Selector */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Select Tourism Hub</label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.district})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Facility Type Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {[
              { id: 'all', label: 'All Services', icon: Shield },
              { id: 'hospital', label: '🏥 Nearest Hospital', icon: Hospital },
              { id: 'police', label: '👮 Nearest Police Station', icon: Building },
              { id: 'pharmacy', label: '💊 24/7 Medical Shop', icon: Pill },
              { id: 'atm', label: '🏧 Nearest ATM', icon: CreditCard }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFacilityType(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  facilityType === tab.id
                    ? 'bg-[#0077B6] text-white border-[#0077B6] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Facilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFacilities.map(fac => (
              <div key={fac.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#00838F] bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {fac.type}
                      </span>
                      <h3 className="font-black text-sm text-[#0B2545] mt-1.5">{fac.name}</h3>
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {fac.openStatus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                    <MapPin size={12} className="text-[#00838F] flex-shrink-0" /> {fac.address}
                  </p>
                  <p className="text-[11px] font-bold text-[#0077B6] mb-4">
                    📍 {fac.distance}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                  <a
                    href={`tel:${fac.phone}`}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Phone size={12} /> Call: {fac.phone}
                  </a>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fac.name + ' ' + fac.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#0077B6] hover:underline flex items-center gap-1"
                  >
                    Directions <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Safety Guidelines */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 space-y-4">
          <h2 className="text-xl font-black text-[#0B2545]">Tourist Safety Advisories for Andhra Pradesh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {travelSafetyTips.map(tip => (
              <div key={tip.id} className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100">
                <h4 className="font-black text-xs text-[#0B2545] mb-1">✓ {tip.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
