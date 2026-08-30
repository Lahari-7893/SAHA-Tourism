import React, { useState } from 'react';
import { phrases, getPhrasesByCategory, getPhraseCategories } from '../data/languages';
import { Volume2, Search, AlertCircle, Globe, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Language() {
  const [targetLang, setTargetLang] = useState('telugu'); // telugu, hindi, tamil
  
  const categories = getPhraseCategories();
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'Greetings');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [playingText, setPlayingText] = useState(null);

  const currentPhrases = getPhrasesByCategory(activeCategory);

  const filteredPhrases = (searchQuery.trim() ? phrases : currentPhrases).filter(p => 
    p.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p[targetLang] && p[targetLang].toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.pronunciation && p.pronunciation[targetLang] && p.pronunciation[targetLang].toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const playAudio = (text, langCode) => {
    if (!('speechSynthesis' in window)) {
      setStatusMsg('Text-to-speech is not supported in this browser environment.');
      return;
    }
    
    try {
      window.speechSynthesis.cancel();
      const langMap = {
        'telugu': 'te-IN',
        'hindi': 'hi-IN',
        'tamil': 'ta-IN',
        'english': 'en-IN'
      };

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langMap[langCode] || 'te-IN';
      utterance.rate = 0.85;

      utterance.onend = () => setPlayingText(null);
      utterance.onerror = () => {
        setPlayingText(null);
        setStatusMsg('System played audio with default Indian voice.');
      };

      setPlayingText(text);
      window.speechSynthesis.speak(utterance);
      setStatusMsg('');
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
      setStatusMsg('Voice playback unavailable on this device.');
      setPlayingText(null);
    }
  };

  const getLanguageLabel = (key) => {
    switch(key) {
      case 'telugu': return 'Telugu (తెలుగు)';
      case 'hindi': return 'Hindi (हिन्दी)';
      case 'tamil': return 'Tamil (தமிழ்)';
      default: return 'Telugu';
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-[#0077B6] rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-sky-100">
            <Globe className="w-3.5 h-3.5" /> Multilingual Travel Voice
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mb-2">
            Language Assistant
          </h1>
          <p className="text-slate-500 text-sm">
            Practical tourist phrases with local scripts, phonetic pronunciation, and real text-to-speech audio for Andhra Pradesh & South India.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Translate to:</span>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {['telugu', 'hindi', 'tamil'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setTargetLang(lang)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      targetLang === lang ? 'bg-[#0077B6] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search phrase (e.g. how much, restroom...)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />
            </div>
            
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
              <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider p-4 border-b border-slate-100 bg-slate-50">
                Phrase Categories
              </h3>
              <div className="p-2 space-y-1">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors font-bold text-xs capitalize ${
                      activeCategory === cat && !searchQuery ? 'bg-[#0077B6] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Phrases Grid */}
          <div className="lg:col-span-3">
            {statusMsg && (
              <div className="mb-4 bg-sky-50 border border-sky-200 text-[#0077B6] px-4 py-2.5 rounded-xl flex items-center text-xs font-semibold">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredPhrases.length > 0 ? (
                filteredPhrases.map((phrase, index) => {
                  const isPlaying = playingText === phrase[targetLang];
                  return (
                    <motion.div 
                      key={phrase.id || index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:border-[#0077B6]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            {phrase.category || activeCategory}
                          </span>
                          <button 
                            onClick={() => playAudio(phrase[targetLang], targetLang)}
                            className={`p-2 rounded-xl transition-all flex items-center gap-1 text-xs font-bold ${
                              isPlaying 
                                ? 'bg-emerald-500 text-white animate-pulse' 
                                : 'bg-sky-50 text-[#0077B6] hover:bg-[#0077B6] hover:text-white'
                            }`}
                            title="Play audio pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>{isPlaying ? 'Speaking...' : 'Play Audio'}</span>
                          </button>
                        </div>

                        <h4 className="font-extrabold text-sm text-[#1B2A4A] mb-2">{phrase.english}</h4>
                        
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <p className="text-lg font-black text-[#0077B6]">{phrase[targetLang]}</p>
                          {phrase.pronunciation && phrase.pronunciation[targetLang] && (
                            <p className="text-xs text-slate-500 italic mt-0.5">
                              Pronounce: "{phrase.pronunciation[targetLang]}"
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
                  <p className="text-sm">No phrases found matching "{searchQuery}"</p>
                </div>
              )}
            </div>

            <div className="mt-8 bg-slate-100 rounded-2xl p-4 text-center">
              <p className="text-[11px] text-slate-500">
                Note: Local audio synthesis runs directly on your device via standard browser speech engines. Frequencies and voice accents may depend on system settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
