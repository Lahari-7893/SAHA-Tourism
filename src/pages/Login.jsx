import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const { login, loginAsGuest } = useApp();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    login({ email, name: email.split('@')[0], role: 'user' });
    navigate('/');
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-peacock-mesh flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Orbs */}
      <motion.div 
        className="absolute -top-32 -right-32 w-96 h-96 bg-[#00A896]/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#0077B6]/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 border border-teal-500/20"
      >
        <div className="p-8 pb-4 text-center">
          
          {/* Official Logo Display */}
          <div className="inline-block relative mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl overflow-hidden shadow-xl shadow-[#0077B6]/30 border-2 border-teal-500/40 p-1 bg-white">
              <img 
                src="/logo.png" 
                alt="SAHA Smart Local Travel Companion" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0B2545] tracking-tight">
            Welcome to SAHA
          </h1>
          <p className="text-xs font-bold text-[#00838F] mt-1 mb-6">
            Your Smart Local Travel Companion
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-3 focus:ring-[#0077B6]/30 focus:border-[#0077B6] text-sm transition-all"
                placeholder="traveler@saha.in"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-3 focus:ring-[#0077B6]/30 focus:border-[#0077B6] text-sm transition-all pr-12"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {error && <p className="text-rose-500 text-xs font-bold text-center">{error}</p>}
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#0077B6] via-[#00838F] to-[#00A896] hover:from-[#0A3D62] hover:to-[#00695C] text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-[#0077B6]/30 transition-all transform hover:-translate-y-0.5 text-sm"
            >
              Sign In to SAHA
            </button>
          </form>

          <div className="mt-4">
            <button 
              onClick={handleGuestLogin}
              className="text-xs font-bold text-[#F59E0B] hover:text-[#D97706] transition-colors"
            >
              New traveler? Experience first with instant guest mode →
            </button>
          </div>
        </div>

        <div className="px-8 pb-8 pt-2">
          <div className="relative flex items-center py-3">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-3 text-slate-400 text-xs font-bold uppercase">or</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          
          <button 
            onClick={handleGuestLogin}
            className="w-full bg-teal-50/80 border border-teal-200 hover:bg-teal-100/70 text-[#0077B6] font-extrabold py-3 px-4 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Sparkles size={16} className="text-[#F59E0B]" />
            Continue as Guest (Full Instant Access)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
