// SAHA - Centralized Multilingual Translation & Dual-Engine Speech Audio Service
// Supports dynamic Text -> Text, Voice -> Text, Text -> Voice, and Voice -> Voice for all Indian and Global languages.

import { languages, phrases } from '../data/languages';

let currentAudio = null;
let cachedVoices = [];

// Pre-load synthesis voices asynchronously if available
if (typeof window !== 'undefined' && window.speechSynthesis) {
  cachedVoices = window.speechSynthesis.getVoices() || [];
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    };
  }
}

/**
 * Get language configuration by ISO code
 */
export function getLanguageByCode(code) {
  return languages.find(l => l.code === code) || {
    code,
    name: code,
    speechCode: `${code}-IN`,
    synthCode: `${code}-IN`,
    flag: '🌐'
  };
}

/**
 * Get Speech Recognition BCP-47 language tag (e.g., 'te-IN', 'en-US', 'hi-IN')
 */
export function getSpeechRecognitionLanguage(langCode) {
  const lang = getLanguageByCode(langCode);
  return lang.speechCode || `${langCode}-IN`;
}

/**
 * Get Speech Synthesis BCP-47 language tag
 */
export function getSpeechSynthesisLanguage(langCode) {
  const lang = getLanguageByCode(langCode);
  return lang.synthCode || lang.speechCode || `${langCode}-IN`;
}

/**
 * Find the best available SpeechSynthesis voice for the target language
 */
export function findBestVoice(langCode) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const targetSpeechCode = getSpeechSynthesisLanguage(langCode).toLowerCase();
  const baseCode = langCode.toLowerCase();

  // 1. Exact match (e.g., 'te-IN' === 'te-in')
  let match = voices.find(v => v.lang.toLowerCase() === targetSpeechCode);
  if (match) return match;

  // 2. Exact match with replacement of hyphen/underscore
  match = voices.find(v => v.lang.toLowerCase().replace('_', '-') === targetSpeechCode);
  if (match) return match;

  // 3. Prefix match (e.g., 'te-IN' starts with 'te')
  match = voices.find(v => v.lang.toLowerCase().startsWith(baseCode));
  if (match) return match;

  // 4. Name includes language name or code
  const langObj = getLanguageByCode(langCode);
  const langNameLower = (langObj.name || '').toLowerCase();
  match = voices.find(v => v.name.toLowerCase().includes(baseCode) || (langNameLower && v.name.toLowerCase().includes(langNameLower)));
  if (match) return match;

  return null;
}

/**
 * Perform live, full-context Text -> Text translation
 * Primary Engine: Google Translate GTX (High precision, full sentence structure & grammar)
 * Fallback Engine: MyMemory Neural Translation API
 */
export async function translateText(text, sourceLang = 'en', targetLang = 'te') {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return '';
  }

  const cleanText = text.trim();
  if (sourceLang === targetLang) {
    return cleanText;
  }

  // 1. Primary Engine: Google Translate GTX Endpoint
  try {
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sourceLang)}&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(cleanText)}`;
    const response = await fetch(gtxUrl);
    if (response.ok) {
      const data = await response.json();
      if (data && data[0] && Array.isArray(data[0])) {
        const translatedSentence = data[0]
          .map(segment => (segment && segment[0]) || '')
          .filter(Boolean)
          .join('');
        if (translatedSentence && translatedSentence.trim()) {
          return translatedSentence.trim();
        }
      }
    }
  } catch (err) {
    console.warn('Google Translate GTX failed, attempting fallback...', err);
  }

  // 2. Secondary Engine: MyMemory Translation API
  try {
    const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=${encodeURIComponent(sourceLang)}|${encodeURIComponent(targetLang)}`;
    const res = await fetch(myMemoryUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText) {
        const trans = data.responseData.translatedText.trim();
        if (trans && !trans.includes('MYMEMORY WARNING') && trans.toLowerCase() !== cleanText.toLowerCase()) {
          return trans;
        }
      }
    }
  } catch (err) {
    console.warn('MyMemory fallback failed:', err);
  }

  // 3. Tertiary fallback: phrasebook check if simple greeting or keyword
  const lower = cleanText.toLowerCase();
  const phraseMatch = phrases.find(p => 
    (p.english && p.english.toLowerCase() === lower) ||
    (p.telugu && p.telugu.toLowerCase().includes(lower)) ||
    (p.hindi && p.hindi.toLowerCase().includes(lower)) ||
    (p.tamil && p.tamil.toLowerCase().includes(lower))
  );

  if (phraseMatch) {
    const matched = phraseMatch[targetLang] || phraseMatch.telugu;
    if (matched) return matched.replace(/\(.*?\)/g, '').trim();
  }

  return cleanText;
}

/**
 * Speak translated output text in the target language pronunciation
 * Dual Engine: Google Neural TTS Stream (Engine 1) + Web Speech Synthesis (Engine 2)
 */
export function speakTranslatedText(text, targetLangCode = 'te') {
  return new Promise((resolve) => {
    if (!text || typeof text !== 'string' || !text.trim()) {
      resolve(false);
      return;
    }

    // Stop any active audio / speech before starting new speech
    stopSpeechAudio();

    // Strip parenthetical Roman transliterations e.g., "నమస్కారం (Namaskaram)" -> "నమస్కారం"
    const textToSpeak = text.replace(/\(.*?\)/g, '').trim();
    if (!textToSpeak) {
      resolve(false);
      return;
    }

    // Engine 1: Google Neural TTS audio stream (accurate native accent for Telugu, Hindi, Tamil, Kannada, etc.)
    const ttsUrl = `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(textToSpeak)}&tl=${encodeURIComponent(targetLangCode)}&client=tw-ob`;
    const audio = new Audio(ttsUrl);
    currentAudio = audio;

    let hasResolved = false;
    const finish = (success) => {
      if (!hasResolved) {
        hasResolved = true;
        currentAudio = null;
        resolve(success);
      }
    };

    audio.onended = () => finish(true);
    audio.onerror = () => {
      fallbackToWebSpeech(textToSpeak, targetLangCode, finish);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Streaming native audio
        })
        .catch((playErr) => {
          console.warn('Audio stream playback failed, falling back to Web Speech Synthesis:', playErr);
          fallbackToWebSpeech(textToSpeak, targetLangCode, finish);
        });
    }
  });
}

// Backward-compatible alias
export const playSpeechAudio = speakTranslatedText;

/**
 * Fallback Web Speech Synthesis with targeted native voice
 */
function fallbackToWebSpeech(textToSpeak, langCode, onComplete) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onComplete) onComplete(false);
    return;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const synthLang = getSpeechSynthesisLanguage(langCode);
    utterance.lang = synthLang;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    const bestVoice = findBestVoice(langCode);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onend = () => {
      if (onComplete) onComplete(true);
    };
    utterance.onerror = () => {
      if (onComplete) onComplete(false);
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Web Speech Synthesis error:', err);
    if (onComplete) onComplete(false);
  }
}

/**
 * Stop any running speech audio or speech synthesis immediately
 */
export function stopSpeechAudio() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {}
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

/**
 * Check if Web Speech Recognition is supported in the current browser
 */
export function isSpeechRecognitionSupported() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * Speech Recognition Factory
 */
export function createSpeechRecognizer({ langCode, onStart, onResult, onError, onEnd }) {
  if (!isSpeechRecognitionSupported()) {
    if (onError) onError('Voice input is not supported in this browser. Please use a supported browser or type your text.');
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = getSpeechRecognitionLanguage(langCode);
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  recognition.onstart = () => {
    if (onStart) onStart();
  };

  recognition.onresult = (event) => {
    try {
      if (event.results && event.results[0] && event.results[0][0]) {
        const transcript = event.results[0][0].transcript;
        if (onResult && transcript) {
          onResult(transcript);
        }
      }
    } catch (err) {
      if (onError) onError('Could not process speech recognition result.');
    }
  };

  recognition.onerror = (event) => {
    let message = 'Could not recognize your speech. Please try again.';
    if (event.error === 'not-allowed') {
      message = 'Please allow microphone access to use voice input.';
    } else if (event.error === 'no-speech') {
      message = 'No speech was detected. Please speak clearly into your microphone.';
    } else if (event.error === 'network') {
      message = 'Network error during speech recognition. Please check your connection.';
    } else if (event.error === 'audio-capture') {
      message = 'No microphone was found or microphone is busy.';
    }
    if (onError) onError(message);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
}

export function getAvailableLanguages() {
  return languages;
}

export function getPhrasesByCategory(category, targetLang = 'te') {
  return phrases
    .filter(p => !category || category === 'All' || p.category.toLowerCase() === category.toLowerCase())
    .map(p => ({
      id: p.id,
      category: p.category,
      english: p.english,
      telugu: p.telugu,
      tamil: p.tamil,
      hindi: p.hindi,
      kannada: p.kannada,
      malayalam: p.malayalam,
      odia: p.odia,
      pronunciation: p.pronunciation,
      targetText: p[targetLang] || p.telugu
    }));
}

export function translatePhrase(phraseId, targetLang) {
  const phrase = phrases.find(p => p.id === phraseId);
  if (!phrase) return null;
  return phrase[targetLang] || phrase.telugu;
}
