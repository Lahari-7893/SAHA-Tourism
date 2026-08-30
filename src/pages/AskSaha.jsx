import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { processQuery } from '../services/aiService';
import { 
  Send, User, Sparkles, MapPin, Clock, IndianRupee, 
  Utensils, Car, Shield, ArrowRight, Compass, Phone, Hotel, ExternalLink, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AskSaha() {
  const { currentTrip, user } = useApp();
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      sender: 'saha',
      text: `Namaskaram${user?.name ? `, ${user.name}` : ''}! I am SAHA, your context-aware travel companion for Andhra Pradesh. ${
        currentTrip?.destination?.name 
          ? `I see you are exploring **${currentTrip.destination.name}**. How can I assist you with food, next sights, hotels, or route adjustments right now?` 
          : 'Ask me anything about Andhra destinations, authentic food, hotels, or real-time travel advice!'
      }`,
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query, type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const context = {
      currentTrip,
      destination: currentTrip?.destination,
      travelers: currentTrip?.travelers || 2,
      itinerary: currentTrip?.stops || []
    };

    setTimeout(() => {
      const response = processQuery(query, context);
      const sahaMsg = { 
        id: Date.now() + 1, 
        sender: 'saha', 
        ...response
      };
      setMessages(prev => [...prev, sahaMsg]);
      setIsTyping(false);
    }, 500);
  };

  const quickChips = [
    'Where can I eat now?',
    'What should I visit next?',
    'I missed my 2 PM attraction. What to do?',
    'I only have ₹1,000 left',
    'Find hotels near this destination',
    'Show emergency contacts'
  ];

  const renderMessageContent = (msg) => {
    return (
      <div className="space-y-3">
        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-800">
          {msg.message || msg.text}
        </p>

        {/* 1. Food Recommendation Cards */}
        {msg.type === 'food_recommendation' && msg.restaurants && (
          <div className="space-y-2 mt-2">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="text-[10px] font-black uppercase text-amber-800">Famous Regional Specialties:</span>
              <p className="text-xs font-bold text-amber-950 mt-0.5">{msg.recommendedDish}</p>
            </div>
            {msg.restaurants.map((r, i) => (
              <div key={i} className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center text-xs">
                <div>
                  <h5 className="font-black text-[#0B2545]">{r.name}</h5>
                  <p className="text-[11px] text-slate-500">{r.address} • {r.cuisine}</p>
                  <span className="text-[10px] font-bold text-[#00838F]">Specialty: {r.famousFor}</span>
                </div>
                <a href={`tel:${r.phone}`} className="px-3 py-1.5 bg-[#0077B6] text-white rounded-xl text-[11px] font-bold flex items-center gap-1">
                  <Phone size={11} /> Call
                </a>
              </div>
            ))}
          </div>
        )}

        {/* 2. Attractions Recommendation Cards */}
        {msg.type === 'attractions_recommendation' && msg.attractions && (
          <div className="space-y-2 mt-2">
            {msg.attractions.map((a, i) => (
              <div key={i} className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] font-bold text-[#00838F] uppercase">{a.category}</span>
                  <h5 className="font-black text-[#0B2545]">{a.name}</h5>
                  <p className="text-[11px] text-slate-500">⏱️ {a.suggestedDuration} mins • Entry: ₹{a.approximateEntryFee}</p>
                </div>
                <Link to={`/destination/${a.destinationId}`} className="px-3 py-1.5 bg-teal-50 text-[#0077B6] font-bold rounded-xl text-[11px]">
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* 3. Replanning Suggestions */}
        {msg.type === 'replanning_advice' && msg.suggestions && (
          <div className="p-3.5 bg-teal-50 rounded-2xl border border-teal-200 space-y-1.5 text-xs text-[#0B2545]">
            {msg.suggestions.map((s, i) => (
              <p key={i} className="font-semibold">{s}</p>
            ))}
            <div className="pt-2">
              <Link to="/my-trip" className="inline-flex items-center gap-1 font-black text-[#0077B6] hover:underline">
                <RefreshCw size={12} /> Open Dashboard to Auto-Replan →
              </Link>
            </div>
          </div>
        )}

        {/* 4. Hotel Recommendation Cards */}
        {msg.type === 'hotel_recommendation' && msg.hotels && (
          <div className="space-y-2 mt-2">
            {msg.hotels.map((h, i) => (
              <div key={i} className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center text-xs">
                <div>
                  <h5 className="font-black text-[#0B2545]">{h.name}</h5>
                  <p className="text-[11px] text-slate-500">{h.location} • ₹{h.pricePerNight}/night</p>
                </div>
                <a href={h.bookingLink} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-[#F59E0B] text-white rounded-xl text-[11px] font-bold flex items-center gap-1">
                  Book <ExternalLink size={11} />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* 5. Emergency Contacts Card */}
        {msg.type === 'emergency_assistance' && (
          <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 space-y-2 text-xs">
            <div className="flex gap-2">
              <a href="tel:112" className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-center font-black">
                Call 112 (National)
              </a>
              <a href="tel:108" className="flex-1 py-2 bg-amber-600 text-white rounded-xl text-center font-black">
                Call 108 (Medical)
              </a>
            </div>
            {msg.nearestHospital && (
              <p className="text-slate-700 font-medium">
                🏥 <strong>Nearest Hospital:</strong> {msg.nearestHospital.name} ({msg.nearestHospital.phone})
              </p>
            )}
          </div>
        )}

        {/* 6. Destination Info Highlights */}
        {msg.keyHighlights && (
          <div className="space-y-1 mt-2 text-xs">
            {msg.keyHighlights.map((h, i) => (
              <p key={i} className="text-slate-700">{h}</p>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] pt-20 pb-12 flex flex-col">
      <div className="max-w-4xl mx-auto px-4 w-full flex-1 flex flex-col">
        
        {/* Chat Header */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-teal-900/10 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden p-0.5 bg-white border border-teal-500/40 shadow-xs">
              <img src="/logo.png" alt="SAHA" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#0B2545] flex items-center gap-1.5">
                Ask SAHA AI Companion
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </h2>
              <p className="text-[10px] text-slate-500 font-bold">
                {currentTrip ? `Active in ${currentTrip.destination?.name || 'AP'}` : 'Grounded in Andhra Pradesh Tourism Dataset'}
              </p>
            </div>
          </div>

          <Link to="/planner" className="text-xs font-bold text-[#0077B6] hover:underline">
            Plan New Trip →
          </Link>
        </div>

        {/* Chat Messages Log */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-teal-900/10 flex-1 overflow-y-auto min-h-[420px] max-h-[550px] space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'saha' && (
                <div className="w-8 h-8 rounded-xl overflow-hidden p-0.5 bg-teal-50 border border-teal-300 flex-shrink-0">
                  <img src="/logo.png" alt="SAHA" className="w-full h-full object-contain" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-3xl p-4 sm:p-5 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#0077B6] to-[#00838F] text-white rounded-br-none shadow-sm'
                    : 'bg-slate-50 border border-slate-200/80 rounded-bl-none text-[#0B2545]'
                }`}
              >
                {msg.sender === 'user' ? (
                  <p className="text-xs sm:text-sm font-semibold">{msg.text}</p>
                ) : (
                  renderMessageContent(msg)
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#0077B6] animate-pulse" />
              <span>SAHA is retrieving real local data...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="py-3 flex overflow-x-auto gap-2 hide-scrollbar">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="whitespace-nowrap px-3 py-1.5 bg-white hover:bg-teal-50 border border-slate-200 text-[#0077B6] text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Input Box */}
        <div className="bg-white rounded-2xl p-2 shadow-md border border-teal-900/10 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about places, food, hotels, transport, or budget in AP..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 bg-transparent border-0 text-xs sm:text-sm font-medium text-[#0B2545] focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={() => handleSend()}
            className="p-3 bg-gradient-to-r from-[#0077B6] to-[#00A896] hover:from-[#0A3D62] hover:to-[#00838F] text-white rounded-xl shadow-sm transition-all"
          >
            <Send size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
