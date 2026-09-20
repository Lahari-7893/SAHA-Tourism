import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Modal from './Modal';
import { Shield, Phone, MapPin, Share2, AlertTriangle, X, Check } from 'lucide-react';

export default function Layout() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const locText = `Emergency Location: Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}`;
          if (navigator.share) {
            navigator.share({ title: 'SAHA Emergency Location', text: locText, url: `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}` });
          } else {
            navigator.clipboard.writeText(locText);
            setLocationShared(true);
            setTimeout(() => setLocationShared(false), 3000);
          }
        },
        () => alert('Could not get GPS location. Please call 112 immediately.')
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] relative">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <Outlet />
      </main>
      <Footer />

      {/* Persistent Unobtrusive Emergency HELP Floating Button (Point 13) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setShowHelpModal(true)}
          className="px-4 py-3 bg-[#E76F51] hover:bg-rose-600 text-white rounded-full font-black text-xs shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 border-2 border-white/40"
          title="Emergency Help & Helplines"
        >
          <Shield size={16} className="animate-pulse" />
          <span>HELP / 112</span>
        </button>
      </div>

      {/* Emergency Modal */}
      {showHelpModal && (
        <Modal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} title="🚨 Immediate Emergency & Tourist Help">
          <div className="space-y-4">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 font-bold">
              In case of severe emergency or physical danger, call national emergency numbers immediately.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:112"
                className="p-3.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-xs flex items-center justify-between shadow-sm transition-all"
              >
                <div>
                  <span className="block text-[10px] opacity-80">National Emergency</span>
                  <span className="text-sm">Call 112</span>
                </div>
                <Phone size={18} />
              </a>

              <a
                href="tel:108"
                className="p-3.5 bg-[#0077B6] hover:bg-[#0A3D62] text-white rounded-2xl font-black text-xs flex items-center justify-between shadow-sm transition-all"
              >
                <div>
                  <span className="block text-[10px] opacity-80">Ambulance Services</span>
                  <span className="text-sm">Call 108</span>
                </div>
                <Phone size={18} />
              </a>

              <a
                href="tel:100"
                className="p-3.5 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs flex items-center justify-between shadow-sm transition-all"
              >
                <div>
                  <span className="block text-[10px] opacity-80">Police Station</span>
                  <span className="text-sm">Call 100</span>
                </div>
                <Phone size={18} />
              </a>

              <a
                href="tel:1363"
                className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs flex items-center justify-between shadow-sm transition-all"
              >
                <div>
                  <span className="block text-[10px] opacity-80">Tourist Helpline</span>
                  <span className="text-sm">Call 1363</span>
                </div>
                <Phone size={18} />
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={handleShareLocation}
                className="w-full py-2.5 bg-slate-100 hover:bg-teal-50 text-[#0077B6] rounded-xl text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MapPin size={14} />
                <span>{locationShared ? 'GPS Coordinates Copied!' : 'Share My Live GPS Location'}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
