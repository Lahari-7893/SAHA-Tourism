import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, MapPin, Award, ArrowRight, Palette, Music, Utensils, Heart } from 'lucide-react';
import { hiddenGems, localExperiences } from '../data/hiddenGems';
import { Link } from 'react-router-dom';

export default function HiddenGems() {
  return (
    <div className="min-h-screen bg-[#F7FBFC] pt-24 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#031926] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-teal-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-peacock-mesh opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-[#00A896] text-xs font-black uppercase tracking-wider mb-4 border border-teal-500/30">
            <Compass size={14} /> Beyond the Tourist Trail
          </div>
          <h1 className="text-3xl sm:text-6xl font-black tracking-tight mb-4">
            Discover Hidden Andhra
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto">
            Experience the Andhra Pradesh that most tourists never see: subterranean cave labyrinths, red canyon gorges, winter mist villages, and 4th-generation artisanal handloom crafts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Section 1: Geological & Scenic Hidden Gems */}
        <div>
          <div className="flex items-center gap-2 text-[#00838F] text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles size={14} className="text-[#F59E0B]" /> Unexplored Wonders
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] mb-8">
            Lesser-Known Natural & Heritage Marvels
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hiddenGems.map(gem => (
              <motion.div
                key={gem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-teal-900/10 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img src={gem.image} alt={gem.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#031926]/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                      {gem.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] font-bold text-[#00838F]">{gem.subtitle}</span>
                    <h3 className="text-lg font-black text-[#0B2545] mt-0.5 mb-2">{gem.title}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                      <MapPin size={13} className="text-[#00838F]" /> {gem.location}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {gem.description}
                    </p>
                    
                    <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-100/80 mb-2">
                      <span className="text-[10px] font-black uppercase text-[#00838F]">Insider Secret:</span>
                      <p className="text-[11px] font-semibold text-slate-700 mt-0.5">{gem.insiderTip}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">Best: {gem.bestTimeToVisit}</span>
                  <Link
                    to={`/planner?destination=${gem.destinationId}`}
                    className="px-3 py-1.5 bg-[#0077B6] hover:bg-[#00695C] text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Plan Visit
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Authentic Local Experiences */}
        <div className="bg-gradient-to-br from-[#031926] via-[#0B2545] to-[#0077B6] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#00A896] bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/30">
              Immersive Cultural Encounters
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-3 mb-2">
              Hands-On Local Andhra Experiences
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Don't just look at monuments. Connect directly with local master artisans, wood carvers, tribal dancers, and sweet confectioners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localExperiences.map(exp => (
              <div key={exp.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-black text-white">{exp.title}</h3>
                  <span className="text-[10px] font-black uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-400/30">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-xs text-teal-200 font-bold mb-2 flex items-center gap-1">
                  <MapPin size={12} /> {exp.location}
                </p>
                <p className="text-xs text-slate-200 leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">{exp.cost}</span>
                  <Link 
                    to="/planner" 
                    className="text-amber-300 font-bold hover:underline flex items-center gap-1"
                  >
                    Add to Itinerary <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
