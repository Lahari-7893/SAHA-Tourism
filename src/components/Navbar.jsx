import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Globe, Shield, Sparkles, Compass, MapPin } from 'lucide-react';
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
    { name: 'Plan Trip', path: '/planner' },
    { name: 'My Trip', path: '/my-trip', badge: currentTrip ? 'LIVE' : null },
    { name: 'Ask SAHA', path: '/ask-saha' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-teal-900/10' 
        : 'bg-white/90 backdrop-blur-md py-3.5 border-b border-teal-800/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Logo with User Uploaded Image */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-md shadow-[#0077B6]/20 group-hover:scale-105 transition-transform border border-teal-600/30 bg-white flex items-center justify-center p-0.5">
              <img 
                src="/logo.png" 
                alt="SAHA Peacock Travel Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B2545] leading-none flex items-center gap-1">
                SAHA
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]"></span>
              </span>
              <span className="text-[10px] font-bold text-[#00838F] tracking-wide mt-0.5 hidden sm:block">
                Your Smart Local Travel Companion
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
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
                      <span className="px-1.5 py-0.2 text-[9px] font-black uppercase rounded-full bg-emerald-500 text-white animate-pulse">
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
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/language"
              className="text-slate-600 hover:text-[#0077B6] transition-colors p-2 rounded-xl hover:bg-teal-50 flex items-center gap-1 text-xs font-bold"
              title="Language Assistant"
            >
              <Globe size={16} className="text-[#00838F]" />
              <span>Languages</span>
            </Link>

            <Link 
              to="/safety"
              className="text-slate-600 hover:text-rose-600 transition-colors p-2 rounded-xl hover:bg-rose-50 flex items-center gap-1 text-xs font-bold"
              title="Emergency & Safety"
            >
              <Shield size={16} className="text-[#E76F51]" />
              <span>Safety</span>
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#0077B6] transition-colors bg-teal-50/70 border border-teal-200/80 px-3 py-1.5 rounded-xl"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#0A3D62] to-[#00A896] text-white flex items-center justify-center text-xs font-black shadow-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User size={12} />}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name || 'Guest Traveler'}</span>
                  <ChevronDown size={14} className="text-slate-400" />
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
                className="bg-gradient-to-r from-[#0077B6] to-[#00838F] hover:from-[#0A3D62] hover:to-[#00695C] text-white px-5 py-2 rounded-xl text-xs font-extrabold transition-all shadow-md shadow-[#0077B6]/25"
              >
                Sign In / Guest
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0B2545] hover:text-[#0077B6] focus:outline-none p-2 rounded-xl"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden bg-white border-b border-teal-900/10 transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-screen py-4 shadow-xl' : 'max-h-0'
      }`}>
        <div className="px-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'text-[#0077B6] bg-teal-50' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 mt-2">
            <Link 
              to="/language"
              onClick={() => setIsOpen(false)}
              className="p-2.5 bg-teal-50/60 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2"
            >
              <Globe size={16} className="text-[#00838F]" /> Languages
            </Link>
            <Link 
              to="/safety"
              onClick={() => setIsOpen(false)}
              className="p-2.5 bg-rose-50 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2"
            >
              <Shield size={16} className="text-[#E76F51]" /> Safety 112
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-2">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0077B6] to-[#00A896] text-white flex items-center justify-center font-bold text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#0B2545]">{user?.name || 'Guest Traveler'}</p>
                    <p className="text-[10px] text-slate-400">View Profile & Trips</p>
                  </div>
                </Link>
                <button 
                  onClick={() => { logout(); setIsOpen(false); navigate('/login'); }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-gradient-to-r from-[#0077B6] to-[#00838F] text-white px-4 py-3 rounded-xl font-bold text-xs shadow-md"
              >
                Sign In / Continue as Guest
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
