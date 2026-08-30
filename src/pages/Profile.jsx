import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { storageService } from '../services/storageService';
import { destinations } from '../data/destinations';
import { 
  User, Settings, Bookmark, Map, LogOut, ChevronRight, 
  Globe, Shield, Clock, Compass, ArrowRight, Trash2
} from 'lucide-react';

export default function Profile() {
  const { user, currentTrip, logout, favorites, settings, updateSettings } = useApp();
  const navigate = useNavigate();

  const [savedTrips, setSavedTrips] = useState(() => storageService.getSavedTrips());

  const favDestinations = destinations.filter(d => (favorites?.destinations || []).includes(d.id));

  const handleRemoveTrip = (tripId) => {
    storageService.removeSavedTrip(tripId);
    setSavedTrips(storageService.getSavedTrips());
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#0077B6] to-[#00838F]" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white rounded-2xl mx-auto border-4 border-white shadow-md flex items-center justify-center mb-3 text-slate-400">
              <User className="w-10 h-10 text-[#0077B6]" />
            </div>
            
            <h1 className="text-2xl font-black text-[#1B2A4A]">{user?.name || 'Guest Traveler'}</h1>
            <p className="text-xs text-slate-500 mb-4">{user?.email || 'Local Traveler Mode (Offline/Guest)'}</p>
            
            {user?.isGuest && (
              <span className="px-3 py-1 bg-sky-50 border border-sky-200 text-[#0077B6] text-xs font-bold rounded-full inline-block">
                Guest Mode &bull; All data saved locally
              </span>
            )}
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="space-y-6">
          
          {/* Active Trip Banner if running */}
          {currentTrip && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-black text-[#1B2A4A] flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#0077B6]" />
                  Active Trip in Progress
                </h2>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>
              <div 
                onClick={() => navigate('/my-trip')}
                className="flex items-center justify-between p-4 bg-sky-50/50 hover:bg-sky-50 rounded-2xl border border-sky-100 cursor-pointer transition-all"
              >
                <div>
                  <h3 className="font-bold text-sm text-[#1B2A4A]">{currentTrip.destination?.name || 'Your Trip'}</h3>
                  <p className="text-xs text-slate-500">
                    {currentTrip.summary?.travelers || 1} Travelers &bull; Planned: {currentTrip.summary?.totalTime || '5 Hours'} &bull; ₹{currentTrip.planningParams?.totalBudget || 1000} Budget
                  </p>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-xs text-[#0077B6]">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Saved / Completed Trips */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-base font-black text-[#1B2A4A] mb-4 flex items-center gap-2">
              <Map className="w-5 h-5 text-[#00838F]" />
              Completed Journey History ({savedTrips.length})
            </h2>

            {savedTrips.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl text-xs text-slate-400">
                No past trips completed yet.
              </div>
            ) : (
              <div className="space-y-3">
                {savedTrips.map(st => (
                  <div key={st.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{st.destination?.name || 'Andhra Pradesh'}</h4>
                      <p className="text-slate-500">
                        {st.summary?.travelers || 1} Travelers &bull; {st.stops?.length || 0} Stops Visited
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveTrip(st.id)}
                      className="text-slate-400 hover:text-rose-500 p-1.5"
                      title="Remove from history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Favorite Destinations */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-base font-black text-[#1B2A4A] mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" />
              Saved Destinations ({favDestinations.length})
            </h2>

            {favDestinations.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl text-xs text-slate-400">
                Bookmark destinations from Explore or Itinerary to access them here.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favDestinations.map(d => (
                  <Link 
                    key={d.id}
                    to={`/destination/${d.slug}`}
                    className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 flex items-center gap-3 transition-colors text-xs"
                  >
                    <img src={d.heroImage || d.image} alt={d.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 truncate">{d.name}</h4>
                      <p className="text-slate-400">{d.district}, {d.state}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Settings & App Preferences */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-base font-black text-[#1B2A4A] mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-500" />
              App Preferences
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div>
                  <span className="font-bold text-slate-700 block">Default Regional Currency</span>
                  <span className="text-slate-400">Indian Rupee (₹ INR)</span>
                </div>
                <span className="px-3 py-1 bg-slate-100 font-extrabold text-slate-700 rounded-lg">₹ INR</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-700 block">Active Tourism Dataset</span>
                  <span className="text-slate-400">Andhra Pradesh (Destination-agnostic architecture)</span>
                </div>
                <span className="px-3 py-1 bg-teal-50 text-[#00695C] font-bold rounded-lg border border-teal-100">
                  AP Dataset
                </span>
              </div>
            </div>
          </div>

          {/* Logout button */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
            <button 
              onClick={logout}
              className="w-full flex items-center justify-center p-3 text-rose-600 font-bold text-xs hover:bg-rose-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Sign Out / Reset Session
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
