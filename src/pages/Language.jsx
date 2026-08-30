import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Volume2, Mic, MicOff, ArrowLeftRight, Copy, Check, Sparkles, Search, MessageSquare, Award } from 'lucide-react';
import { languages, phrases, getPhrasesByCategory, getPhraseCategories } from '../data/languages';

export default function Language() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('te');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = getPhraseCategories();

  // Robust phrase, dictionary, and live API translation engine
  const performTranslation = async (text, src, tgt) => {
    if (!text || !text.trim()) return '';
    const cleanText = text.trim().toLowerCase();

    // 1. Check exact or partial match in verified phrase library
    const matched = phrases.find(p => 
      p.english.toLowerCase().includes(cleanText) ||
      cleanText.includes(p.english.toLowerCase()) ||
      p.telugu.toLowerCase().includes(cleanText) ||
      p.tamil.toLowerCase().includes(cleanText) ||
      p.hindi.toLowerCase().includes(cleanText)
    );

    if (matched) {
      if (tgt === 'te') return matched.telugu;
      if (tgt === 'ta') return matched.tamil;
      if (tgt === 'hi') return matched.hindi;
      if (tgt === 'kn') return matched.kannada;
      if (tgt === 'ml') return matched.malayalam;
      if (tgt === 'or') return matched.odia;
      return matched.english;
    }

    // 2. High-frequency Indian tourism vocabulary table
    const dictionary = {
      'water': { te: 'మంచి నీళ్లు (Neellu)', ta: 'தண்ணீர் (Thanneer)', hi: 'पानी (Pani)', kn: 'ನೀರು (Neeru)', ml: 'വെള്ളം (Vellam)', en: 'Drinking Water' },
      'food': { te: 'భోజనం (Bhojanam)', ta: 'சாப்பாடு (Saappadu)', hi: 'खाना (Khana)', kn: 'ಊಟ (Oota)', ml: 'ഭക്ഷണം (Bhakshanam)', en: 'Food / Meals' },
      'hotel': { te: 'హోటల్ (Hotel)', ta: 'ஹோட்டல் (Hotel)', hi: 'होटल (Hotel)', kn: 'ಹೋಟೆಲ್ (Hotel)', ml: 'ഹോട്ടൽ (Hotel)', en: 'Hotel / Stay' },
      'bus': { te: 'బస్సు (Bus)', ta: 'பேருந்து (Perundhu)', hi: 'बस (Bus)', kn: 'ಬಸ್ (Bus)', ml: 'ബസ് (Bus)', en: 'Bus' },
      'train': { te: 'రైలు (Railu)', ta: 'ரயில் (Rail)', hi: 'ट्रेन (Train)', kn: 'ರೈಲು (Railu)', ml: 'ട്രെയിൻ (Train)', en: 'Train' },
      'temple': { te: 'గుడి / దేవాలయం (Gudi)', ta: 'கோவில் (Kovil)', hi: 'मंदिर (Mandir)', kn: 'ದೇವಸ್ಥಾನ (Devalaya)', ml: 'ക്ഷേത്രം (Kshethram)', en: 'Temple' },
      'beach': { te: 'సముద్ర తీరం / బీచ్ (Beach)', ta: 'கடற்கரை (Kadarkarai)', hi: 'समुद्र तट (Beach)', kn: 'ಕಡಲತೀರ (Beach)', ml: 'ബീച്ച് (Beach)', en: 'Beach' },
      'help': { te: 'సహాయం చేయండి (Sahaayam)', ta: 'உதவுங்கள் (Udhavunga)', hi: 'मदद कीजिये (Madad)', kn: 'ಸಹಾಯ ಮಾಡಿ (Sahaya)', ml: 'സഹായിക്കൂ (Sahayikoo)', en: 'Please Help' },
      'how much': { te: 'ఎంత అవుతుంది? (Entha avutundi?)', ta: 'எவ்வளவு? (Evvalavu?)', hi: 'कितना हुआ? (Kitna hua?)', kn: 'ಎಷ್ಟು? (Eshtu?)', ml: 'എത്രയായി? (Ethrayayi?)', en: 'How much is it?' },
      'thank you': { te: 'చాలా ధన్యవాదాలు (Dhanyavadalu)', ta: 'மிக்க நன்றி (Mikka Nandri)', hi: 'बहुत धन्यवाद (Dhanyavad)', kn: 'ಧನ್ಯವಾದಗಳು (Dhanyavadagalu)', ml: 'വളരെ നന്ദി (Valare Nandi)', en: 'Thank you very much' }
    };

    for (const [key, translations] of Object.entries(dictionary)) {
      if (cleanText.includes(key)) {
        return translations[tgt] || text;
      }
    }

    // 3. Live Google Translate Fallback
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${src}&tl=${tgt}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        return data[0][0][0];
      }
    } catch (err) {
      console.warn('Live translation failed', err);
    }

    // 4. Default representation if all fails
    const tgtLangObj = languages.find(l => l.code === tgt);
    return `${text} (${tgtLangObj ? tgtLangObj.name.split(' ')[0] : tgt} Translation)`;
  };

  const handleInputChange = async (val) => {
    setInputText(val);
    if (val.trim()) {
      setTranslatedText('Translating...');
      const translated = await performTranslation(val, sourceLang, targetLang);
      setTranslatedText(translated);
    } else {
      setTranslatedText('');
    }
  };

  const handleSwap = async () => {
    const tempSrc = sourceLang;
    const tempTgt = targetLang;
    setSourceLang(tempTgt);
    setTargetLang(tempSrc);

    const prevInput = inputText;
    // We swap text too!
    setInputText(translatedText);
    
    if (translatedText.trim() && translatedText !== 'Translating...') {
      setTranslatedText('Translating...');
      const newTranslation = await performTranslation(translatedText, tempTgt, tempSrc);
      setTranslatedText(newTranslation);
    } else {
      setTranslatedText('');
    }
  };

  // Play audio pronunciation via Web Speech Synthesis
  const handleSpeak = (textToSpeak, langCode) => {
    if (!window.speechSynthesis) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    
    // Attempt to extract the phonetic English pronunciation if available in parentheses
    // e.g. "నమస్కారం (Namaskaram)" -> "Namaskaram"
    const match = textToSpeak.match(/\((.*?)\)/);
    let cleanText = '';
    let speechLang = 'en-IN'; // Default to Indian English for phonetic pronunciation

    if (match && match[1]) {
      cleanText = match[1].trim(); // Use "Namaskaram"
    } else {
      // If no parentheses, just use the text itself
      cleanText = textToSpeak.trim();
      const langObj = languages.find(l => l.code === langCode);
      if (langObj) speechLang = langObj.speechCode;
    }

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Fix for voices not loading on some browsers: Wait and get voices
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.includes(speechLang)) || voices.find(v => v.lang.includes('en'));
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.lang = speechLang;
    utterance.rate = 0.85;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    
    // Safari/iOS fix: sometimes it gets stuck, a small resume trick
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };

  // Microphone Voice Input
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Please type your phrase.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const langObj = languages.find(l => l.code === sourceLang);
      recognition.lang = langObj ? langObj.speechCode : 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setTranslatedText('Translating...');
        const translated = await performTranslation(transcript, sourceLang, targetLang);
        setTranslatedText(translated);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredPhrases = getPhrasesByCategory(selectedCategory).filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return p.english.toLowerCase().includes(q) ||
           p.telugu.toLowerCase().includes(q) ||
           p.tamil.toLowerCase().includes(q) ||
           p.hindi.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#F7FBFC] pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#031926] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-teal-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-peacock-mesh opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-[#00A896] text-xs font-black uppercase tracking-wider mb-3 border border-teal-500/30">
            <Globe size={14} /> Real-Time Tourist Translator
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Multilingual Voice & Audio Translator
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Break language barriers across India. Select any language pair (e.g. <strong>Telugu ↔ Tamil</strong>, <strong>English ↔ Telugu</strong>, <strong>Hindi ↔ Kannada</strong>), speak or type, and play audio out loud.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Google Translate Style Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 space-y-6">
          
          {/* Language Selector Bar */}
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">From Language</label>
              <select
                value={sourceLang}
                onChange={async (e) => {
                  const newSrc = e.target.value;
                  setSourceLang(newSrc);
                  if (inputText) {
                    setTranslatedText('Translating...');
                    setTranslatedText(await performTranslation(inputText, newSrc, targetLang));
                  }
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="p-3 mt-4 rounded-2xl bg-teal-50 hover:bg-teal-100 text-[#0077B6] transition-colors border border-teal-100 shadow-xs"
              title="Swap Languages"
            >
              <ArrowLeftRight size={16} />
            </button>

            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">To Language (Output & Audio)</label>
              <select
                value={targetLang}
                onChange={async (e) => {
                  const newTgt = e.target.value;
                  setTargetLang(newTgt);
                  if (inputText) {
                    setTranslatedText('Translating...');
                    setTranslatedText(await performTranslation(inputText, sourceLang, newTgt));
                  }
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Translation Dual Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Input Side */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between min-h-[170px]">
              <textarea
                value={inputText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type phrase (e.g. 'Where is the temple?', 'How much auto fare?')..."
                className="w-full bg-transparent border-0 resize-none text-sm font-semibold text-[#0B2545] focus:outline-none placeholder:text-slate-400 h-28"
              />

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <button
                  onClick={handleVoiceInput}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-white text-slate-700 hover:bg-teal-50 border border-slate-200 shadow-xs'
                  }`}
                >
                  {isListening ? <MicOff size={14} /> : <Mic size={14} className="text-[#0077B6]" />}
                  <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
                </button>

                {inputText && (
                  <button
                    onClick={() => { setInputText(''); setTranslatedText(''); }}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Output Side */}
            <div className="bg-teal-50/50 rounded-2xl p-4 border border-teal-100 flex flex-col justify-between min-h-[170px]">
              <div>
                <span className="text-[10px] font-black uppercase text-[#00838F]">
                  Translated into {languages.find(l => l.code === targetLang)?.name}:
                </span>
                <p className="text-base font-black text-[#0B2545] mt-2">
                  {translatedText || <span className="text-xs text-slate-400 font-normal">Translation appears instantly here...</span>}
                </p>
              </div>

              {translatedText && (
                <div className="flex items-center justify-between pt-2 border-t border-teal-100">
                  <button
                    onClick={() => handleSpeak(translatedText, targetLang)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0077B6] to-[#00A896] hover:from-[#0A3D62] hover:to-[#00838F] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Volume2 size={15} />
                    <span>Play Audio</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="text-xs font-bold text-slate-500 hover:text-[#0077B6] flex items-center gap-1"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Essential Tourism Phrases by Category */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-[#0B2545]">Essential Tourism Phrasebook</h2>
              <p className="text-xs text-slate-500 mt-0.5">One-touch audio phrases in Telugu, Tamil, Hindi, Kannada & Malayalam</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all border ${
                    selectedCategory === cat 
                      ? 'bg-[#0077B6] text-white border-[#0077B6]' 
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPhrases.map(ph => (
              <div key={ph.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-teal-50/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[10px] font-black uppercase text-[#00838F] bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {ph.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSpeak(ph.telugu, 'te')}
                        className="px-2 py-1 bg-white text-[#0077B6] rounded-lg shadow-xs hover:bg-teal-50 text-[10px] font-black border border-slate-200 flex items-center gap-1"
                        title="Play Telugu"
                      >
                        <Volume2 size={12} /> Telugu
                      </button>
                      <button
                        onClick={() => handleSpeak(ph.tamil, 'ta')}
                        className="px-2 py-1 bg-white text-[#00838F] rounded-lg shadow-xs hover:bg-teal-50 text-[10px] font-black border border-slate-200 flex items-center gap-1"
                        title="Play Tamil"
                      >
                        <Volume2 size={12} /> Tamil
                      </button>
                      <button
                        onClick={() => handleSpeak(ph.hindi, 'hi')}
                        className="px-2 py-1 bg-white text-[#E76F51] rounded-lg shadow-xs hover:bg-teal-50 text-[10px] font-black border border-slate-200 flex items-center gap-1"
                        title="Play Hindi"
                      >
                        <Volume2 size={12} /> Hindi
                      </button>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-slate-500 mb-1">{ph.english}</p>
                  <p className="text-sm font-black text-[#0B2545]">{ph.telugu}</p>
                  <p className="text-[11px] text-amber-700 font-semibold mt-1">
                    🗣️ Telugu: "{ph.pronunciation}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap gap-2 text-[10px] text-slate-500">
                  <span>🇮🇳 Tamil: {ph.tamil}</span> • <span>Hindi: {ph.hindi}</span> • <span>Kannada: {ph.kannada}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
