export const languages = ['English', 'Telugu', 'Hindi', 'Tamil'];

export const phrases = [
  // Greetings
  { id: 'ph_1', category: 'greetings', english: 'Hello', telugu: 'Namaskaram', hindi: 'Namaste', tamil: 'Vanakkam', pronunciation: { telugu: 'Na-mas-kaa-ram' } },
  { id: 'ph_2', category: 'greetings', english: 'How are you?', telugu: 'Meeru ela unnaru?', hindi: 'Aap kaise hain?', tamil: 'Eppadi irukkinga?', pronunciation: { telugu: 'Mee-ru e-la un-na-ru?' } },
  { id: 'ph_3', category: 'greetings', english: 'I am fine', telugu: 'Nenu bagunnanu', hindi: 'Main theek hoon', tamil: 'Naan nalla irukken', pronunciation: { telugu: 'Ne-nu baa-gun-na-nu' } },
  { id: 'ph_4', category: 'greetings', english: 'Thank you', telugu: 'Dhanyavadalu', hindi: 'Dhanyavad', tamil: 'Nandri', pronunciation: { telugu: 'Dhan-ya-vaa-da-lu' } },
  
  // Directions
  { id: 'ph_5', category: 'directions', english: 'Where is...?', telugu: '... ekkada undi?', hindi: '... kahan hai?', tamil: '... enge irukku?', pronunciation: { telugu: '... ek-ka-da un-di?' } },
  { id: 'ph_6', category: 'directions', english: 'Left', telugu: 'Edama', hindi: 'Baen', tamil: 'Idadhu', pronunciation: { telugu: 'E-da-ma' } },
  { id: 'ph_7', category: 'directions', english: 'Right', telugu: 'Kudi', hindi: 'Daen', tamil: 'Valadhu', pronunciation: { telugu: 'Ku-di' } },
  { id: 'ph_8', category: 'directions', english: 'Straight', telugu: 'Tinnaga', hindi: 'Seedha', tamil: 'Nera', pronunciation: { telugu: 'Tin-na-ga' } },
  { id: 'ph_9', category: 'directions', english: 'How far is it?', telugu: 'Entha dooram?', hindi: 'Kitni door hai?', tamil: 'Evvalavu thooram?', pronunciation: { telugu: 'En-tha doo-ram?' } },
  
  // Transport
  { id: 'ph_10', category: 'transport', english: 'I want to go to...', telugu: 'Nenu ... vellali', hindi: 'Mujhe ... jana hai', tamil: 'Naan ... poganum', pronunciation: { telugu: 'Ne-nu ... vel-la-li' } },
  { id: 'ph_11', category: 'transport', english: 'How much is the fare?', telugu: 'Charge entha?', hindi: 'Kiraya kitna hai?', tamil: 'Kattanam evvalavu?', pronunciation: { telugu: 'Char-ge en-tha?' } },
  { id: 'ph_12', category: 'transport', english: 'Stop here', telugu: 'Ikkada aapandi', hindi: 'Yahan roko', tamil: 'Inga niruthunga', pronunciation: { telugu: 'Ik-ka-da aa-pan-di' } },
  
  // Food
  { id: 'ph_13', category: 'food', english: 'Water', telugu: 'Neellu', hindi: 'Pani', tamil: 'Thanneer', pronunciation: { telugu: 'Neel-lu' } },
  { id: 'ph_14', category: 'food', english: 'Food', telugu: 'Bhojanam / Tindi', hindi: 'Khana', tamil: 'Saappadu', pronunciation: { telugu: 'Bho-ja-nam' } },
  { id: 'ph_15', category: 'food', english: 'Is this spicy?', telugu: 'Idi karanga unda?', hindi: 'Kya yeh teekha hai?', tamil: 'Idhu karama irukka?', pronunciation: { telugu: 'I-di kaa-ran-ga un-da?' } },
  { id: 'ph_16', category: 'food', english: 'No spice please', telugu: 'Karam vaddu', hindi: 'Mirchi nahi chahiye', tamil: 'Karam vendam', pronunciation: { telugu: 'Kaa-ram vad-du' } },
  { id: 'ph_17', category: 'food', english: 'Check/Bill please', telugu: 'Bill ivvandi', hindi: 'Bill dijiye', tamil: 'Bill kudunga', pronunciation: { telugu: 'Bill iv-van-di' } },
  
  // Shopping
  { id: 'ph_18', category: 'shopping', english: 'How much is this?', telugu: 'Idi entha?', hindi: 'Yeh kitne ka hai?', tamil: 'Idhu evvalavu?', pronunciation: { telugu: 'I-di en-tha?' } },
  { id: 'ph_19', category: 'shopping', english: 'Too expensive', telugu: 'Chala ekkuva', hindi: 'Bahut mehenga hai', tamil: 'Romba vilai', pronunciation: { telugu: 'Cha-la ek-ku-va' } },
  { id: 'ph_20', category: 'shopping', english: 'Give some discount', telugu: 'Koncham thagginchandi', hindi: 'Thoda kam kijiye', tamil: 'Konjam kurainga', pronunciation: { telugu: 'Kon-cham thag-gin-chan-di' } },
  
  // Emergency & General
  { id: 'ph_21', category: 'emergency', english: 'Help!', telugu: 'Sahaayam!', hindi: 'Madad!', tamil: 'Kaappatrrunga!', pronunciation: { telugu: 'Sa-haa-yam!' } },
  { id: 'ph_22', category: 'emergency', english: 'I need a doctor', telugu: 'Naku doctor kavali', hindi: 'Mujhe doctor chahiye', tamil: 'Enakku doctor venum', pronunciation: { telugu: 'Na-ku doctor ka-va-li' } },
  { id: 'ph_23', category: 'emergency', english: 'Call police', telugu: 'Police ni pilavandi', hindi: 'Police bulao', tamil: 'Police koopidunga', pronunciation: { telugu: 'Po-lice ni pi-la-van-di' } },
  { id: 'ph_24', category: 'general', english: 'I don\'t know Telugu', telugu: 'Naku Telugu radu', hindi: 'Mujhe Telugu nahi aati', tamil: 'Enakku Telugu theriyaadhu', pronunciation: { telugu: 'Na-ku Te-lu-gu raa-du' } },
  { id: 'ph_25', category: 'general', english: 'Do you speak English?', telugu: 'Meeru English matladathara?', hindi: 'Kya aap English bolte hain?', tamil: 'Neenga English pesuvingala?', pronunciation: { telugu: 'Mee-ru English maat-la-da-tha-ra?' } },
];

export const getPhrasesByCategory = (category) => {
  return phrases.filter(ph => ph.category === category);
};

export const getAvailableLanguages = () => {
  return languages;
};

export const getPhraseCategories = () => {
  return [...new Set(phrases.map(ph => ph.category))];
};
