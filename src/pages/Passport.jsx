import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, MapPin, CheckCircle, Lock, ShieldCheck, Sparkles, Trophy, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { destinations } from '../data/destinations';
import { Link } from 'react-router-dom';

export default function Passport() {
  const { visitedDestinations = [], markVisited } = useApp();

  const totalDestinations = destinations.length;
  const visitedCount = visitedDestinations.length;
  const progressPercent = Math.round((visitedCount / totalDestinations) * 100);

  // Badge definitions
  const badges = [
    {
      id: 'badge_heritage',
      name: '🏛️ Heritage Explorer',
      description: 'Visit historical landmarks like Amaravati, Konda Reddy Buruju, or Undavalli Caves.',
      condition: (visited) => visited.some(id => ['dest_amr', 'dest_knl', 'dest_vjw'].includes(id)),
      category: 'Heritage'
    },
    {
      id: 'badge_coastal',
      name: '🌊 Coastal Explorer',
      description: 'Discover coastal beauty across Vizag, Kakinada, or Nellore.',
      condition: (visited) => visited.some(id => ['dest_vzg', 'dest_kkn', 'dest_nel'].includes(id)),
      category: 'Coastal'
    },
    {
      id: 'badge_temple',
      name: '🛕 Temple Explorer',
      description: 'Experience spiritual sanctity in Tirupati, Srisailam, or Vijayawada.',
      condition: (visited) => visited.some(id => ['dest_tpt', 'dest_srl', 'dest_vjw'].includes(id)),
      category: 'Spiritual'
    },
    {
      id: 'badge_foodie',
      name: '🍛 Andhra Foodie',
      description: 'Explore regional culinary capitals like Konaseema, Rajahmundry, or Kurnool.',
      condition: (visited) => visited.some(id => ['dest_konaseema', 'dest_rjy', 'dest_knl'].includes(id)),
      category: 'Culinary'
    },
    {
      id: 'badge_nature',
      name: '🌿 Nature Explorer',
      description: 'Journey into nature at Araku Valley, Horsley Hills, or Gandikota Canyon.',
      condition: (visited) => visited.some(id => ['dest_araku', 'dest_horsley', 'dest_gandikota'].includes(id)),
      category: 'Nature'
    },
    {
      id: 'badge_master',
      name: '👑 SAHA Master Explorer',
      description: 'Explore at least 5 destinations in Andhra Pradesh.',
      condition: (visited) => visited.length >= 5,
      category: 'Special'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Header Banner */}
      <div className="bg-[#1B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077B6]/30 text-[#4FC3F7] text-xs font-bold uppercase tracking-wider mb-3 border border-[#0077B6]/40">
            <Trophy size={14} /> SAHA Digital Passport
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Your Traveler Passport & Badges
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Collect digital badges as you discover destinations. Check off where you've been and unlock your travel legacy!
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Progress Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black uppercase text-[#0077B6] tracking-wider">Overall Progress</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B2A4A]">
              You've explored {visitedCount} / {totalDestinations} Destinations!
            </h2>
            <p className="text-xs text-slate-500 max-w-md">
              Keep exploring places across Andhra Pradesh to earn all 6 tourist achievement badges.
            </p>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Passport Level</span>
              <span className="text-[#0077B6]">{progressPercent}% Unlocked</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-[#0077B6] to-[#00838F] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Achievement Badges Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-[#1B2A4A] flex items-center gap-2">
            <Award className="text-[#F59E0B]" size={22} /> Traveler Badges
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {badges.map(badge => {
              const isUnlocked = badge.condition(visitedDestinations);
              return (
                <motion.div
                  key={badge.id}
                  whileHover={{ y: -3 }}
                  className={`p-6 rounded-3xl border transition-all ${
                    isUnlocked
                      ? 'bg-white border-[#0077B6]/30 shadow-md ring-2 ring-[#0077B6]/10'
                      : 'bg-slate-50/70 border-slate-200 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{badge.name.split(' ')[0]}</span>
                    {isUnlocked ? (
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle size={12} /> UNLOCKED
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-slate-200 text-slate-600 text-[10px] font-black rounded-full flex items-center gap-1">
                        <Lock size={12} /> LOCKED
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-[#1B2A4A] mb-1">
                    {badge.name.replace(/^[^\s]+\s*/, '')}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {badge.description}
                  </p>

                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Category: <span className="text-[#00838F]">{badge.category}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Destination Checklist */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-xl font-black text-[#1B2A4A]">Destination Checklist</h2>
              <p className="text-xs text-slate-500">Tap to mark places you have visited to unlock your badges!</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-teal-50 text-[#00838F] rounded-full border border-teal-100">
              {visitedCount} Visited
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {destinations.map(dest => {
              const isVisited = visitedDestinations.includes(dest.id);
              return (
                <div
                  key={dest.id}
                  onClick={() => markVisited(dest.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isVisited
                      ? 'bg-teal-50/70 border-teal-200 text-[#1B2A4A]'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-extrabold text-[#1B2A4A]">{dest.name}</h4>
                      <span className="text-[10px] text-slate-400">{dest.district}</span>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isVisited ? 'bg-[#0077B6] border-[#0077B6] text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isVisited && <CheckCircle size={14} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
