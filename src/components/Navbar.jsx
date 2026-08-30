import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, User, LogOut, ChevronDown, Globe, Shield, Sparkles, 
  Compass, MapPin, Hotel, Utensils, Map as MapIcon, Calculator, MessageCircle
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Navbar() {
  const { user, isAuthenticated, logout, currentTrip } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Trip Planner', path: '/planner' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Food', path: '/food' },
    { name: 'AP Map', path: '/map' },
    { name: 'Passport 🏆', path: '/passport' },
    { name: 'Journal 📸', path: '/journal' },
    { name: 'My Trip', path: '/my-trip', badge: currentTrip ? 'LIVE' : null },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-teal-900/10' 
        : 'bg-white/90 backdrop-blur-md py-3 border-b border-teal-800/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Logo with User Uploaded Image */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md shadow-[#0077B6]/20 group-hover:scale-105 transition-transform border border-teal-600/30 bg-white flex items-center justify-center p-0.5">
              <img 
                src="/logo.png" 
                alt="SAHA Andhra Pradesh Tourism" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#0B2545] leading-none flex items-center gap-1">
                SAHA
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]"></span>
              </span>
              <span className="text-[9px] font-bold text-[#00838F] tracking-wide mt-0.5 hidden sm:block">
                Smart Assistance for Tourists in AP
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs font-extrabold transition-all relative py-1 flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-[#0077B6]' 
                      : 'text-slate-600 hover:text-[#00A896]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 text-[8px] font-black uppercase rounded-full bg-emerald-500 text-white animate-pulse">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0077B6] to-[#00A896] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Action Menu */}
          <div className="hidden sm:flex items-center gap-2">
            <Link 
              to="/ask-saha"
              className="text-[#0077B6] bg-teal-50 hover:bg-teal-100 transition-colors px-3 py-1.5 rounded-xl flex items-center gap-1 text-xs font-black border border-teal-200"
              title="Ask SAHA AI"
            >
              <MessageCircle size={14} />
              <span>Ask AI</span>
            </Link>

            <Link 
              to="/language"
              className="text-slate-600 hover:text-[#0077B6] transition-colors p-2 rounded-xl hover:bg-slate-100 flex items-center gap-1 text-xs font-bold"
              title="Voice Translator"
            >
              <Globe size={15} className="text-[#00838F]" />
              <span className="hidden lg:inline">Translator</span>
            </Link>

            <Link 
              to="/safety"
              className="text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors px-2.5 py-1.5 rounded-xl flex items-center gap-1 text-xs font-black border border-rose-200"
              title="Emergency Helplines"
            >
              <Shield size={14} />
              <span>112 Safety</span>
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#0077B6] transition-colors bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl ml-1"
                >
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-[#0A3D62] to-[#00A896] text-white flex items-center justify-center text-[10px] font-black">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User size={10} />}
                  </div>
                  <ChevronDown size={12} className="text-slate-400" />
                </button>
                
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl py-1.5 border border-slate-200 z-50 text-xs">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-teal-50 flex items-center gap-2 font-bold"
                    >
                      <User size={14} className="text-[#00838F]" /> My Profile & Trips
                    </Link>
                    <Link
                      to="/budget-calculator"
                      onClick={() => setProfileOpen(false)}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-teal-50 flex items-center gap-2 font-bold"
                    >
                      <Calculator size={14} className="text-[#0077B6]" /> Budget Calculator
                    </Link>
                    <div className="h-px bg-slate-100 my-1" />
                    <button 
                      onClick={() => { logout(); setProfileOpen(false); navigate('/login'); }}
                      className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-bold"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-[#0077B6] to-[#00838F] text-white px-4 py-1.5 rounded-xl text-xs font-extrabold shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0B2545] hover:text-[#0077B6] focus:outline-none p-1.5 rounded-xl"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`xl:hidden bg-white border-b border-teal-900/10 transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-screen py-4 shadow-xl' : 'max-h-0'
      }`}>
        <div className="px-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive 
                    ? 'text-[#0077B6] bg-teal-50' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/budget-calculator"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Budget Calculator
          </Link>
          
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 mt-2">
            <Link 
              to="/ask-saha"
              onClick={() => setIsOpen(false)}
              className="p-2 bg-teal-50 rounded-xl text-[11px] font-bold text-[#0077B6] flex items-center justify-center gap-1"
            >
              <MessageCircle size={13} /> Ask AI
            </Link>
            <Link 
              to="/language"
              onClick={() => setIsOpen(false)}
              className="p-2 bg-slate-50 rounded-xl text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1"
            >
              <Globe size={13} /> Translator
            </Link>
            <Link 
              to="/safety"
              onClick={() => setIsOpen(false)}
              className="p-2 bg-rose-50 rounded-xl text-[11px] font-bold text-rose-700 flex items-center justify-center gap-1"
            >
              <Shield size={13} /> Safety 112
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
