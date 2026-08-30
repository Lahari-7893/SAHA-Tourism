import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Wallet, Heart, Route, Calendar, Car, Compass, MessageCircle, BarChart3, Search, Sparkles, Shield, ArrowRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PlaceCard from '../components/PlaceCard';
import { getFeaturedDestinations } from '../data/destinations';

export default function Home() {
  const featuredDestinations = getFeaturedDestinations();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC]">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/kanaka_durga.jpg" 
            alt="South Indian Temple Landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#031926]/90 via-[#0B2545]/75 to-[#0077B6]/85"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
          >
            {/* Peacock Feather Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-teal-200 text-xs font-extrabold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              Smart Local Travel Companion • Andhra Pradesh
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg tracking-tight">
              Explore the World <span className="text-[#F59E0B]">Your Way</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-base sm:text-xl text-slate-200 mb-10 drop-shadow font-medium leading-relaxed">
              Tell SAHA where you're going, how much time and budget you have, and what you love — and get a personalized journey built around you.
            </motion.p>

            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto bg-white/15 backdrop-blur-xl p-3 sm:p-4 rounded-3xl mb-8 border border-white/20 shadow-2xl">
              <SearchBar placeholder="Search destinations (e.g. Vijayawada, Tirupati, Araku...)" />
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/planner" 
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#E76F51] hover:from-[#D97706] hover:to-[#D46045] text-white rounded-2xl font-black text-base shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5" /> Plan My Trip
              </Link>
              <Link 
                to="/explore" 
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/25 border-2 border-white/80 text-white rounded-2xl font-black text-base shadow-lg backdrop-blur-sm transition-all flex items-center justify-center gap-2"
              >
                Explore Destinations <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#00838F] font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} className="text-[#F59E0B]" /> Handcrafted Journeys
            </div>
            <h2 className="text-3xl font-black text-[#0B2545]">Popular Destinations</h2>
            <p className="text-slate-500 text-sm mt-1">Discover cultural landmarks, beaches, and hill stations travelers love most.</p>
          </div>
          <Link to="/explore" className="text-[#0077B6] font-bold hover:text-[#00A896] hidden sm:flex items-center gap-1 text-sm">
            View All Destinations →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.slice(0, 4).map(dest => (
            <div key={dest.id}>
              <PlaceCard place={dest} />
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/explore" className="text-[#0077B6] font-bold text-sm">View All Destinations →</Link>
        </div>
      </section>

      {/* How SAHA Works */}
      <section className="py-24 bg-white border-y border-teal-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#00838F] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              Effortless Travel Planning
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] mt-3 mb-3">
              How SAHA Works
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Your personalized, time-optimized itinerary in four simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { icon: MapPin, step: "01", title: "Tell us where", desc: "Select your destination or use current location.", color: "from-[#0A3D62] to-[#0077B6]" },
              { icon: Clock, step: "02", title: "Set time & budget", desc: "Define your group size, budget, and time window.", color: "from-[#0077B6] to-[#00838F]" },
              { icon: Heart, step: "03", title: "Choose what you love", desc: "Temples, heritage, nature, food, or hills.", color: "from-[#00838F] to-[#00A896]" },
              { icon: Route, step: "04", title: "Get your journey", desc: "Nearest-neighbor optimized route with live costs.", color: "from-[#F59E0B] to-[#E76F51]" }
            ].map((stepItem, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: idx * 0.15 } }
                }}
                className="relative bg-[#F4FAF9] rounded-3xl p-6 border border-teal-900/10 hover:shadow-lg transition-all text-center flex flex-col items-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${stepItem.color} text-white flex items-center justify-center shadow-lg shadow-teal-900/15 mb-5`}>
                  <stepItem.icon size={28} />
                </div>
                <span className="text-[11px] font-black text-[#00838F] uppercase tracking-widest mb-1">Step {stepItem.step}</span>
                <h3 className="text-base font-black text-[#0B2545] mb-2">{stepItem.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{stepItem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAHA Capabilities Pillars */}
      <section className="py-24 bg-[#F0F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] mb-3">
              The 5 Pillars of SAHA
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Everything you need before, during, and after your journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { icon: Calendar, title: "PLAN", desc: "Dynamic route optimization minimizing backtracking.", color: "text-[#0077B6] bg-blue-50" },
              { icon: Car, title: "TRAVEL", desc: "Local transport guidance with fare estimators.", color: "text-[#00838F] bg-teal-50" },
              { icon: Compass, title: "EXPLORE", desc: "Verified cultural, spiritual, and scenic gems.", color: "text-[#00A896] bg-emerald-50" },
              { icon: MessageCircle, title: "ASSIST", desc: "Telugu/Hindi phrasebook & grounded Ask SAHA AI.", color: "text-[#E76F51] bg-orange-50" },
              { icon: BarChart3, title: "TRACK", desc: "Live expense tracking & budget replanning.", color: "text-[#F59E0B] bg-amber-50" }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all border border-teal-900/10 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-4 font-black`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-base font-black text-[#0B2545] mb-2">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ask SAHA AI Section with Official Logo */}
      <section className="py-24 bg-gradient-to-br from-[#031926] via-[#0B2545] to-[#0077B6] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-[#F59E0B] text-xs font-black uppercase tracking-wider mb-4 border border-amber-500/30">
              <Sparkles size={14} /> AI Powered Local Travel Assistant
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">
              Meet Ask SAHA
            </h2>
            <p className="text-base text-slate-200 mb-8 max-w-lg leading-relaxed">
              Got a specific question on local Andhra travel, transport fares, temple timings, or budget options? Ask SAHA gives you verified, grounded answers instantly.
            </p>
            <Link 
              to="/ask-saha" 
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#00A896] to-[#0077B6] hover:from-[#00838F] hover:to-[#0A3D62] text-white rounded-2xl font-black text-base shadow-xl shadow-teal-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle size={20} />
              Try Ask SAHA Now
            </Link>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 shadow-2xl text-left border border-teal-500/30"
            >
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-white border border-teal-500/30 shadow-xs">
                  <img src="/logo.png" alt="SAHA Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0B2545]">SAHA Assistant</h4>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online • Local AP Guide
                  </p>
                </div>
              </div>

              <div className="flex items-end gap-3 mb-4">
                <div className="bg-slate-100 rounded-2xl rounded-bl-none p-3.5 max-w-[85%] text-xs font-semibold text-slate-800">
                  <p>What can I do near Kanaka Durga Temple in Vijayawada with ₹500 in 3 hours?</p>
                </div>
              </div>
              
              <div className="flex items-end gap-3 justify-end">
                <div className="bg-gradient-to-br from-[#0077B6] to-[#00838F] text-white rounded-2xl rounded-br-none p-3.5 max-w-[90%] text-xs shadow-md">
                  <p className="font-bold mb-1.5">Here is your tailored 3-hour plan:</p>
                  <ul className="space-y-1 text-[11px] text-teal-50">
                    <li>• <strong>Prakasam Barrage</strong> — Walk & scenic photos (₹0)</li>
                    <li>• <strong>Bhavani Island Boat</strong> — 1.5 hr cruise (~₹150)</li>
                    <li>• <strong>Local Mirchi Bajji / Coffee</strong> — River bank (~₹100)</li>
                  </ul>
                  <p className="mt-2 text-[10px] text-amber-200 font-bold">Total Est: ~₹250 • Fits easily in ₹500 budget!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
