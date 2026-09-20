import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Volume2, VolumeX, Mic, MicOff, ArrowLeftRight, Copy, Check, Sparkles, Search, AlertCircle, RefreshCw, X } from 'lucide-react';
import { languages, getPhrasesByCategory, getPhraseCategories } from '../data/languages';
import { 
  translateText, 
  speakTranslatedText, 
  stopSpeechAudio, 
  createSpeechRecognizer, 
  isSpeechRecognitionSupported,
  getLanguageByCode 
} from '../services/translationService';

export default function Language() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('te');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const recognitionRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const activeTranslationIdRef = useRef(0);

  const categories = getPhraseCategories();

  // Clean up any ongoing audio and speech recognition on component unmount
  useEffect(() => {
    return () => {
      stopSpeechAudio();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Perform translation safely with sequence tracking to avoid race conditions
  const executeTranslation = async (text, src, tgt) => {
    if (!text || !text.trim()) {
      setTranslatedText('');
      setIsTranslating(false);
      return;
    }

    const currentId = ++activeTranslationIdRef.current;
    setIsTranslating(true);
    setErrorMessage('');

    try {
      const result = await translateText(text, src, tgt);
      if (currentId === activeTranslationIdRef.current) {
        setTranslatedText(result);
        setIsTranslating(false);
      }
    } catch (err) {
      if (currentId === activeTranslationIdRef.current) {
        console.error('Translation error:', err);
        setErrorMessage('Translation failed. Please check your connection and try again.');
        setIsTranslating(false);
      }
    }
  };

  // Handle typing with live debounce
  const handleInputChange = (val) => {
    setInputText(val);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!val.trim()) {
      setTranslatedText('');
      setIsTranslating(false);
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      executeTranslation(val, sourceLang, targetLang);
    }, 350);
  };

  // Handle source language change
  const handleSourceLangChange = (newSrc) => {
    setSourceLang(newSrc);
    if (inputText.trim()) {
      executeTranslation(inputText, newSrc, targetLang);
    }
  };

  // Handle target language change
  const handleTargetLangChange = (newTgt) => {
    setTargetLang(newTgt);
    if (inputText.trim()) {
      executeTranslation(inputText, sourceLang, newTgt);
    }
  };

  // Swap source and target languages
  const handleSwap = () => {
    const prevSrc = sourceLang;
    const prevTgt = targetLang;
    const prevInput = inputText;
    const prevOutput = translatedText;

    setSourceLang(prevTgt);
    setTargetLang(prevSrc);

    if (prevOutput && prevOutput.trim()) {
      setInputText(prevOutput);
      executeTranslation(prevOutput, prevTgt, prevSrc);
    } else if (prevInput && prevInput.trim()) {
      executeTranslation(prevInput, prevTgt, prevSrc);
    }
  };

  // Voice Input via Speech Recognition API
  const handleVoiceInputToggle = () => {
    setErrorMessage('');

    if (!isSpeechRecognitionSupported()) {
      setErrorMessage('Voice input is not supported in this browser. Please use Google Chrome, Edge, or type your text.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    // Stop any ongoing audio before listening
    stopSpeechAudio();
    setIsSpeaking(false);

    const recognizer = createSpeechRecognizer({
      langCode: sourceLang,
      onStart: () => {
        setIsListening(true);
      },
      onResult: (transcript) => {
        setIsListening(false);
        if (transcript && transcript.trim()) {
          setInputText(transcript);
          executeTranslation(transcript, sourceLang, targetLang);
        }
      },
      onError: (msg) => {
        setIsListening(false);
        setErrorMessage(msg);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    if (recognizer) {
      recognitionRef.current = recognizer;
      try {
        recognizer.start();
      } catch (err) {
        console.warn('Speech recognition start error:', err);
        setIsListening(false);
      }
    }
  };

  // Play audio pronunciation in target language
  const handleSpeak = async (textToSpeak, langCode) => {
    if (!textToSpeak || !textToSpeak.trim()) return;

    if (isSpeaking) {
      stopSpeechAudio();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    setErrorMessage('');

    try {
      await speakTranslatedText(textToSpeak, langCode || targetLang || 'te');
    } catch (err) {
      console.warn('Audio playback error:', err);
    } finally {
      setIsSpeaking(false);
    }
  };

  // Copy translated text
  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filtered Phrasebook list
  const filteredPhrases = getPhrasesByCategory(selectedCategory, targetLang).filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (p.english && p.english.toLowerCase().includes(q)) ||
           (p.telugu && p.telugu.toLowerCase().includes(q)) ||
           (p.tamil && p.tamil.toLowerCase().includes(q)) ||
           (p.hindi && p.hindi.toLowerCase().includes(q)) ||
           (p.kannada && p.kannada.toLowerCase().includes(q));
  });

  const sourceLangObj = getLanguageByCode(sourceLang);
  const targetLangObj = getLanguageByCode(targetLang);

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
            Break language barriers across India. Select any language pair (e.g. <strong>English ↔ Telugu</strong>, <strong>Telugu ↔ English</strong>, <strong>Hindi ↔ Telugu</strong>), speak or type, and play native audio out loud.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Error Notification Banner */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button onClick={() => setErrorMessage('')} className="p-1 text-rose-500 hover:text-rose-700">
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Google Translate Style Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 space-y-6">
          
          {/* Language Selector Bar */}
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                From Language ({sourceLangObj.name})
              </label>
              <select
                value={sourceLang}
                onChange={(e) => handleSourceLangChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0077B6] cursor-pointer"
              >
                {languages.map(l => (
                  <option key={`src-${l.code}`} value={l.code}>{l.flag} {l.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="p-3 mt-4 rounded-2xl bg-teal-50 hover:bg-teal-100 text-[#0077B6] transition-colors border border-teal-100 shadow-xs cursor-pointer active:scale-95"
              title="Swap Languages"
            >
              <ArrowLeftRight size={16} />
            </button>

            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                To Language ({targetLangObj.name})
              </label>
              <select
                value={targetLang}
                onChange={(e) => handleTargetLangChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0077B6] cursor-pointer"
              >
                {languages.map(l => (
                  <option key={`tgt-${l.code}`} value={l.code}>{l.flag} {l.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Translation Dual Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Input Box */}
            <div className={`bg-slate-50 rounded-2xl p-4 border transition-all flex flex-col justify-between min-h-[190px] ${
              isListening ? 'ring-2 ring-rose-500 border-rose-300 bg-rose-50/20' : 'border-slate-200'
            }`}>
              <textarea
                value={inputText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={`Type in ${sourceLangObj.name} (e.g. 'Where is the nearest hotel?')...`}
                className="w-full bg-transparent border-0 resize-none text-sm font-semibold text-[#0B2545] focus:outline-none placeholder:text-slate-400 h-28"
              />

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <button
                  onClick={handleVoiceInputToggle}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-white text-slate-700 hover:bg-teal-50 hover:text-[#0077B6] border border-slate-200'
                  }`}
                  title={`Speak in ${sourceLangObj.name}`}
                >
                  {isListening ? (
                    <>
                      <MicOff size={14} />
                      <span>Listening ({sourceLangObj.code.toUpperCase()})...</span>
                    </>
                  ) : (
                    <>
                      <Mic size={14} className="text-[#0077B6]" />
                      <span>Voice Input ({sourceLangObj.code.toUpperCase()})</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  {inputText && (
                    <button
                      onClick={() => { setInputText(''); setTranslatedText(''); }}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1"
                    >
                      Clear
                    </button>
                  )}
                  {inputText && (
                    <button
                      onClick={() => executeTranslation(inputText, sourceLang, targetLang)}
                      className="px-3 py-1.5 rounded-lg bg-[#0077B6] hover:bg-[#0A3D62] text-white text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Translate
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Output Box */}
            <div className="bg-teal-50/40 rounded-2xl p-4 border border-teal-100 flex flex-col justify-between min-h-[190px]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-[#00838F] flex items-center gap-1">
                    <Sparkles size={11} /> Translated into {targetLangObj.name}:
                  </span>
                  {isTranslating && (
                    <span className="text-[10px] text-[#0077B6] font-bold flex items-center gap-1 animate-pulse">
                      <RefreshCw size={10} className="animate-spin" /> Translating...
                    </span>
                  )}
                </div>

                <div className="mt-2">
                  {isTranslating ? (
                    <p className="text-sm font-semibold text-slate-400 animate-pulse">
                      Translating sentence...
                    </p>
                  ) : translatedText ? (
                    <p className="text-base font-black text-[#0B2545] leading-relaxed select-text">
                      {translatedText}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400 font-normal">
                      Translation appears instantly here...
                    </p>
                  )}
                </div>
              </div>

              {translatedText && !isTranslating && (
                <div className="flex items-center justify-between pt-2 border-t border-teal-100 mt-3">
                  <button
                    onClick={() => handleSpeak(translatedText, targetLang)}
                    className={`px-4 py-2 rounded-xl text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                      isSpeaking 
                        ? 'bg-amber-600 animate-pulse' 
                        : 'bg-gradient-to-r from-[#0077B6] to-[#00A896] hover:from-[#0A3D62] hover:to-[#00838F]'
                    }`}
                    title={`Speak ${targetLangObj.name} Audio`}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX size={15} />
                        <span>Stop Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={15} />
                        <span>Play {targetLangObj.code.toUpperCase()} Audio</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCopy}
                    className="text-xs font-bold text-slate-500 hover:text-[#0077B6] flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-teal-50 transition-colors"
                    title="Copy Translated Text"
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
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all border cursor-pointer ${
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
                    <button
                      onClick={() => handleSpeak(ph.telugu, 'te')}
                      className="p-2 rounded-xl bg-white hover:bg-teal-100 text-[#0077B6] border border-slate-200 shadow-xs transition-colors cursor-pointer"
                      title="Play Telugu Audio"
                    >
                      <Volume2 size={15} />
                    </button>
                  </div>
                  <h4 className="text-sm font-black text-[#0B2545]">{ph.english}</h4>
                  <p className="text-sm font-extrabold text-[#0077B6] mt-1">{ph.telugu}</p>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-200/50 flex justify-between items-center text-[11px] text-slate-500 font-semibold">
                  <span>Pronunciation: {ph.pronunciation}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
