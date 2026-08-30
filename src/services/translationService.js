// Assuming phrases are imported or defined here
const defaultPhrases = [
  { id: '1', category: 'greetings', en: 'Hello', hi: 'Namaste', te: 'Namaskaram', ta: 'Vanakkam' },
  { id: '2', category: 'greetings', en: 'Thank you', hi: 'Dhanyavad', te: 'Dhanyavadalu', ta: 'Nandri' },
  { id: '3', category: 'emergency', en: 'Help me', hi: 'Meri madad karo', te: 'Nannu kapadandi', ta: 'Enakku udhavi seiyungal' },
  { id: '4', category: 'food', en: 'Water', hi: 'Pani', te: 'Neellu', ta: 'Thanneer' }
];

export function getAvailableLanguages() {
  return [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' }
  ];
}

export function getPhrasesByCategory(category, sourceLang = 'en', targetLang = 'hi') {
  return defaultPhrases
    .filter(p => !category || category === 'all' || p.category === category)
    .map(p => ({
      id: p.id,
      category: p.category,
      source: p[sourceLang] || p.en,
      target: p[targetLang] || p.en,
      sourceLang,
      targetLang
    }));
}

export function translatePhrase(phraseId, targetLang) {
  const phrase = defaultPhrases.find(p => p.id === phraseId);
  if (!phrase) return null;
  return phrase[targetLang] || phrase.en;
}

export function speakPhrase(text, langCode) {
  if (!window.speechSynthesis) return false;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Try to find appropriate voice
  let voiceCode = 'en-US';
  if (langCode === 'hi') voiceCode = 'hi-IN';
  if (langCode === 'te') voiceCode = 'te-IN';
  if (langCode === 'ta') voiceCode = 'ta-IN';
  
  utterance.lang = voiceCode;
  
  window.speechSynthesis.speak(utterance);
  return true;
}
