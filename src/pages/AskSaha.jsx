import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { processQuery } from '../services/aiService';
import { 
  Send, User, Bot, Sparkles, MapPin, Clock, IndianRupee, 
  Utensils, Car, Shield, ArrowRight, Compass, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AskSaha() {
  const { currentTrip, user } = useApp();
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      sender: 'saha',
      text: `Namaskaram${user?.name ? `, ${user.name}` : ''}! I am SAHA, your intelligent on-ground travel companion. ${
        currentTrip?.destination?.name 
          ? `I'm aware you are exploring ${currentTrip.destination.name}. How can I assist your journey right now?` 
          : 'I can help you plan, estimate fares, find authentic food, adapt your budget, or give local tips for Andhra Pradesh destinations.'
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

    // Build context
    const context = {
      currentTrip,
      destination: currentTrip?.destination,
      budget: currentTrip?.planningParams?.totalBudget || 1000,
      remainingBudget: currentTrip ? ((currentTrip.planningParams?.totalBudget || 1000) - (currentTrip.totalSpent || 0)) : 500,
      travelers: currentTrip?.planningParams?.travelers || 2,
      itinerary: currentTrip?.stops || []
    };

    // Calculate response via aiService
    setTimeout(() => {
      const response = processQuery(query, context);
      const sahaMsg = { 
        id: Date.now() + 1, 
        sender: 'saha', 
        text: response.message,
        type: response.type,
        data: response.data
      };
      setMessages(prev => [...prev, sahaMsg]);
      setIsTyping(false);
    }, 600);
  };

  const quickChips = [
    'I have ₹200 left. What can I do nearby?',
    'What can I visit in two hours?',
    'Where can I eat authentic regional food?',
    'How should I travel with 3 people?',
    'Emergency safety numbers'
  ];

  const renderResponseData = (msg) => {
    if (!msg.data) return null;

    if (msg.type === 'budget_recommendation' || msg.type === 'places_recommendation' || msg.type === 'time_recommendation') {
      const attractions = msg.data.attractions || [];
      const foods = msg.data.food || [];

      return (
        <div className="mt-3 space-y-2">
          {attractions.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Recommended Spots</span>
              {attractions.map((attr, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs flex justify-between items-center gap-2">
                  <div>
                    <h5 className="font-bold text-slate-800">{attr.name}</h5>
                    <p className="text-[11px] text-slate-500">{attr.suggestedDuration || 45}m visit &bull; Entry: ₹{attr.approximateEntryFee || 0}</p>
                  </div>
                  <Link to={`/destination/${attr.destinationId || 'vijayawada'}`} className="text-[#0077B6] font-bold text-[11px] hover:underline flex items-center">
                    Details <ArrowRight className="w-3 h-3 ml-0.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {foods.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Affordable Dishes</span>
              <div className="grid grid-cols-2 gap-2">
                {foods.map((dish, idx) => (
                  <div key={idx} className="bg-orange-50/60 p-2 rounded-xl border border-orange-100 text-xs">
                    <p className="font-bold text-slate-800">{dish.name}</p>
                    <p className="text-[10px] text-orange-700 font-semibold">~₹{dish.approximatePrice} {dish.vegetarian ? '(Veg)' : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (msg.type === 'food_recommendation') {
      const dishes = msg.data.dishes || [];
      return (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {dishes.map((dish, idx) => (
            <div key={idx} className="bg-orange-50/50 p-2.5 rounded-xl border border-orange-100 text-xs flex items-start gap-2">
              <Utensils className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-800">{dish.name}</p>
                <p className="text-[11px] text-slate-500 line-clamp-1">{dish.description}</p>
                <p className="text-[10px] text-orange-700 font-bold mt-0.5">Approx. ₹{dish.approximatePrice}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (msg.type === 'transport_recommendation') {
      const modes = msg.data.modes || [];
      return (
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {modes.map((mode, idx) => (
              <div key={idx} className="bg-teal-50/60 p-2.5 rounded-xl border border-teal-100 text-xs flex items-start gap-2">
                <Car className="w-4 h-4 text-[#00838F] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">{mode.name}</p>
                  <p className="text-[10px] text-slate-500">Base: ₹{mode.baseFare} &bull; Rate: ~₹{mode.perKmRate}/km</p>
                  <p className="text-[10px] text-teal-800 font-semibold mt-0.5">Fits {mode.suitableGroupSize?.min}-{mode.suitableGroupSize?.max} people</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 italic">{msg.data.note}</p>
        </div>
      );
    }

    if (msg.type === 'emergency_info') {
      return (
        <div className="mt-3 bg-rose-50 p-3 rounded-2xl border border-rose-200 text-xs space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <a href="tel:112" className="p-2.5 bg-white rounded-xl border border-rose-200 flex items-center justify-between text-rose-700 font-bold">
              <span>National Emergency</span>
              <span className="text-sm bg-rose-100 px-2 py-0.5 rounded-md">112</span>
            </a>
            <a href="tel:108" className="p-2.5 bg-white rounded-xl border border-rose-200 flex items-center justify-between text-rose-700 font-bold">
              <span>Ambulance</span>
              <span className="text-sm bg-rose-100 px-2 py-0.5 rounded-md">108</span>
            </a>
          </div>
          <p className="text-[10px] text-rose-600 font-medium">{msg.data.note}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-[calc(100vh-130px)] flex flex-col">
        
        {/* Chat Header */}
        <div className="bg-white rounded-t-3xl shadow-sm border border-slate-200 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-[#0077B6] to-[#00838F] rounded-2xl flex items-center justify-center text-white shadow-sm shadow-[#0077B6]/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base text-[#1B2A4A]">Ask SAHA</h1>
                <span className="px-2 py-0.5 bg-sky-50 text-[#0077B6] font-bold text-[10px] uppercase tracking-wider rounded-md border border-sky-100">
                  Intelligent Companion
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {currentTrip ? `Context: Active Trip in ${currentTrip.destination?.name}` : 'Grounded on verified Andhra Pradesh tourism data'}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-500">Verified Intelligence</span>
          </div>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 bg-white border-x border-slate-200 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[85%] sm:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2.5`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-xs ${
                    isUser ? 'bg-[#1B2A4A]' : 'bg-[#0077B6]'
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isUser 
                      ? 'bg-[#1B2A4A] text-white rounded-tr-xs' 
                      : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
                  }`}>
                    <p className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</p>
                    {renderResponseData(msg)}
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#0077B6] text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0077B6] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#0077B6] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 bg-[#0077B6] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                <span className="ml-1 font-semibold text-slate-600">SAHA is reasoning...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input & Quick Chips */}
        <div className="bg-white rounded-b-3xl shadow-sm border border-slate-200 p-3 sm:p-4">
          <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 hide-scrollbar">
            {quickChips.map((chip, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(chip)}
                className="text-[11px] font-bold bg-sky-50 hover:bg-[#0077B6] text-[#0077B6] hover:text-white border border-sky-100 px-3 py-1.5 rounded-full transition-all whitespace-nowrap flex-shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about budget, time, places, transport in AP..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="bg-[#0077B6] hover:bg-[#00695C] disabled:opacity-40 text-white px-5 rounded-xl transition-all flex items-center justify-center font-bold text-xs shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
