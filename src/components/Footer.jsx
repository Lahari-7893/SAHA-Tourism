import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Compass, Shield, Globe, MessageCircle, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#031926] text-white pt-16 pb-8 border-t border-teal-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* About & Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-white border border-teal-500/40 shadow-md">
                <img src="/logo.png" alt="SAHA Travel Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  SAHA <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]"></span>
                </span>
                <span className="text-[10px] font-bold text-[#00A896] tracking-wide">
                  Smart Local Travel Companion
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-4">
              Plan smarter, travel easier, and explore confidently. Tailored itinerary routing, regional food specialties, local transport guides, and multi-language support.
            </p>
            <div className="flex flex-wrap gap-1 text-[9px] font-extrabold uppercase tracking-wider text-teal-400">
              <span>DISCOVER</span> • <span>PLAN</span> • <span>TRAVEL</span> • <span>EXPLORE</span> • <span>ASSIST</span> • <span>TRACK</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider mb-4 border-b border-teal-800/40 pb-2 text-[#00A896]">
              Explore & Plan
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><Link to="/explore" className="text-slate-300 hover:text-white transition-colors">Explore Destinations</Link></li>
              <li><Link to="/planner" className="text-slate-300 hover:text-white transition-colors">Intelligent Trip Planner</Link></li>
              <li><Link to="/my-trip" className="text-slate-300 hover:text-white transition-colors">Active Trip & Live Expenses</Link></li>
              <li><Link to="/transport" className="text-slate-300 hover:text-white transition-colors">Local Transport Fare Guide</Link></li>
            </ul>
          </div>

          {/* Traveler Tools */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider mb-4 border-b border-teal-800/40 pb-2 text-[#00A896]">
              Traveler Assistance
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><Link to="/ask-saha" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"><MessageCircle size={14} className="text-[#00A896]" /> Ask SAHA AI</Link></li>
              <li><Link to="/language" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"><Globe size={14} className="text-[#0077B6]" /> Telugu, Hindi, Tamil Audio</Link></li>
              <li><Link to="/safety" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"><Shield size={14} className="text-[#E76F51]" /> Safety Center & Helplines</Link></li>
              <li><Link to="/profile" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"><Compass size={14} className="text-[#F59E0B]" /> Saved Places & Profile</Link></li>
            </ul>
          </div>

          {/* Safety & Helplines */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider mb-4 border-b border-teal-800/40 pb-2 text-[#00A896]">
              Emergency Helplines
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Shield size={16} className="text-[#E76F51] mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-xs">National Emergency: <strong className="text-amber-400 font-black">112</strong> (All India)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#0077B6] flex-shrink-0" />
                <span className="text-slate-300 text-xs">Tourist Helpline: <strong className="text-teal-300 font-bold">1363</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#00A896] flex-shrink-0" />
                <span className="text-slate-300 text-xs">support@saha-travel.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-teal-950 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-400 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} SAHA. Your Smart Local Travel Companion. Built with verified regional tourism data for Andhra Pradesh.
          </p>
          <div className="flex gap-4 text-slate-400 text-xs font-medium">
            <span>Fares & times are approximate estimates</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
