// SAHA - Multilingual Tourism Audio Phrasebook & Translation Dataset
// Verified Indian Tourism Languages: Telugu, Tamil, Hindi, Kannada, Malayalam, Odia, English

export const languages = [
  { code: 'te', name: 'Telugu (తెలుగు)', speechCode: 'te-IN', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil (தமிழ்)', speechCode: 'ta-IN', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi (हिन्दी)', speechCode: 'hi-IN', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)', speechCode: 'kn-IN', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam (മലയാളം)', speechCode: 'ml-IN', flag: '🇮🇳' },
  { code: 'en', name: 'English', speechCode: 'en-IN', flag: '🌐' },
  { code: 'or', name: 'Odia (ଓଡ଼ିଆ)', speechCode: 'or-IN', flag: '🇮🇳' }
];

export const phrases = [
  // GREETINGS & ESSENTIALS
  {
    id: 'ph_1',
    category: 'Greetings',
    english: 'Hello / Greetings',
    telugu: 'నమస్కారం (Namaskaram)',
    tamil: 'வணக்கம் (Vanakkam)',
    hindi: 'नमस्ते (Namaste)',
    kannada: 'ನಮಸ್ಕಾರ (Namaskara)',
    malayalam: 'നമസ്കാരം (Namaskaram)',
    odia: 'ନମସ୍କାର (Namaskara)',
    pronunciation: 'Na-mas-kaa-ram'
  },
  {
    id: 'ph_2',
    category: 'Greetings',
    english: 'How are you?',
    telugu: 'మీరు ఎలా ఉన్నారు? (Meeru ela unnaru?)',
    tamil: 'எப்படி இருக்கிறீர்கள்? (Eppadi irukkeenga?)',
    hindi: 'आप कैसे हैं? (Aap kaise hain?)',
    kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಿ? (Neevu hegiddiri?)',
    malayalam: 'സുഖമാണോ? (Sukhamano?)',
    odia: 'ଆପଣ କେମିତି ଅଛନ୍ତି? (Apana kemiti achanti?)',
    pronunciation: 'Mee-ru e-la un-naa-ru?'
  },
  {
    id: 'ph_3',
    category: 'Greetings',
    english: 'Thank you very much',
    telugu: 'చాలా ధన్యవాదాలు (Chala Dhanyavadalu)',
    tamil: 'மிக்க நன்றி (Mikka Nandri)',
    hindi: 'बहुत धन्यवाद (Bahut Dhanyavad)',
    kannada: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು (Tumba Dhanyavadagalu)',
    malayalam: 'വളരെ നന്ദി (Valare Nandi)',
    odia: 'ଅନେକ ଧନ୍ୟବାଦ (Aneka Dhanyavada)',
    pronunciation: 'Chaa-la Dhan-ya-vaa-da-lu'
  },

  // DIRECTIONS
  {
    id: 'ph_4',
    category: 'Directions',
    english: 'Where is the temple / beach?',
    telugu: 'గుడి / బీచ్ ఎక్కడ ఉంది? (Gudi / Beach ekkada undi?)',
    tamil: 'கோவில் / கடற்கரை எங்கே உள்ளது? (Kovil / Kadarkarai enge ulladhu?)',
    hindi: 'मंदिर / बीच कहाँ है? (Mandir / Beach kahan hai?)',
    kannada: 'ದೇವಸ್ಥಾನ / ಬೀಚ್ ಎಲ್ಲಿದೆ? (Devalaya / Beach ellide?)',
    malayalam: 'അമ്പലം / കടപ്പുറം എവിടെയാണ്? (Ambalam / Kadappuram evideyannu?)',
    odia: 'ମନ୍ଦିର କେଉଁଠି? (Mandira keunthi?)',
    pronunciation: 'Gu-di / Beach ek-ka-da un-di?'
  },
  {
    id: 'ph_5',
    category: 'Directions',
    english: 'How far is it from here?',
    telugu: 'ఇక్కడి నుంచి ఎంత దూరం? (Ikkadi nunchi entha dooram?)',
    tamil: 'இங்கிருந்து எவ்வளவு தூரம்? (Ingirundhu evvalavu thooram?)',
    hindi: 'यहाँ से कितनी दूर है? (Yahan se kitni door hai?)',
    kannada: 'ಇಲ್ಲಿಂದ ಎಷ್ಟು ದೂರ? (Illinda eshtu doora?)',
    malayalam: 'ഇവിടെ നിന്ന് എത്ര ദൂരമുണ്ട്? (Ivide ninnu ethra dooramundu?)',
    odia: 'ଏଠାରୁ କେତେ ଦୂର? (Etharu kete doora?)',
    pronunciation: 'Ik-ka-di nun-chi en-tha doo-ram?'
  },
  {
    id: 'ph_6',
    category: 'Directions',
    english: 'Go straight and turn right',
    telugu: 'తిన్నగా వెళ్లి కుడి వైపు తిరగండి (Tinnaga velli kudi vaipu tiragandi)',
    tamil: 'நேராக சென்று வலது பக்கம் திரும்புங்கள் (Neraaga sendru valadhu pakkam thirumbunga)',
    hindi: 'सीधे जाकर दाहिने मुड़ें (Seedhe jakar dahine mudein)',
    kannada: 'ನೇರವಾಗಿ ಹೋಗಿ ಬಲಕ್ಕೆ ತಿರುಗಿ (Neravagi hogi balakke thirugi)',
    malayalam: 'നേരെ പോയി വലത്തോട്ട് തിരിയുക (Nere poyi valathottu thiriyuka)',
    odia: 'ସିଧା ଯାଇ ଡାହାଣକୁ ବୁଲନ୍ତୁ (Sidha jai dahana ku bulantu)',
    pronunciation: 'Tin-na-ga vel-li ku-di vai-pu ti-ra-gan-di'
  },

  // TRANSPORT
  {
    id: 'ph_7',
    category: 'Transport',
    english: 'Will you go to the railway station?',
    telugu: 'రైల్వే స్టేషన్ కి వస్తారా? (Railway station ki vastara?)',
    tamil: 'ரயில் நிலையத்திற்கு வருவீர்களா? (Railway station-ukku varuveergala?)',
    hindi: 'क्या आप रेलवे स्टेशन चलेंगे? (Kya aap railway station chalenge?)',
    kannada: 'ರೈಲ್ವೆ ನಿಲ್ದಾಣಕ್ಕೆ ಬರುತ್ತೀರಾ? (Railway nildanakke baruttira?)',
    malayalam: 'റെയിൽവേ സ്റ്റേഷനിലേക്ക് വരുമോ? (Railway stationilekku varumo?)',
    odia: 'ରେଳ ଷ୍ଟେସନ ଯିବେ କି? (Railway station jibe ki?)',
    pronunciation: 'Rail-way sta-tion ki vas-taa-ra?'
  },
  {
    id: 'ph_8',
    category: 'Transport',
    english: 'How much is the auto fare by meter?',
    telugu: 'మీటర్ చార్జ్ ఎంత అవుతుంది? (Meter charge entha avutundi?)',
    tamil: 'மீட்டர் படி எவ்வளவு கட்டணம்? (Meter padi evvalavu kattanam?)',
    hindi: 'मीटर से कितना किराया होगा? (Meter se kitna kiraya hoga?)',
    kannada: 'ಮೀಟರ್ ಪ್ರಕಾರ ಎಷ್ಟು ಬಾಡಿಗೆ? (Meter prakara eshtu badige?)',
    malayalam: 'മീറ്റർ പ്രകാരം എത്ര ചാർജ്ജാകും? (Meter prakaram ethra charge aakum?)',
    odia: 'ମିଟର ହିସାବରେ କେତେ ଭଡ଼ା? (Meter hisabare kete bhada?)',
    pronunciation: 'Mee-ter charge en-tha a-vu-tun-di?'
  },

  // FOOD & DINING
  {
    id: 'ph_9',
    category: 'Food',
    english: 'One full Andhra meals please',
    telugu: 'ఒక ఫుల్ ఆంధ్ర భోజనం ఇవ్వండి (Oka full Andhra bhojanam ivvandi)',
    tamil: 'ஒரு ஆந்திரா சாப்பாடு கொடுங்கள் (Oru Andhra saappadu kudunga)',
    hindi: 'एक फुल आंध्रा थाली दीजिए (Ek full Andhra thali dijiye)',
    kannada: 'ಒಂದು ಆಂಧ್ರ ಊಟ ಕೊಡಿ (Ondu Andhra oota kodi)',
    malayalam: 'ഒരു ആന്ധ്ര ഊണ് തരൂ (Oru Andhra oonu tharoo)',
    odia: 'ଗୋଟିଏ ଆନ୍ଧ୍ର ଥାଳି ଦିଅନ୍ତୁ (Gotiye Andhra thali diyantu)',
    pronunciation: 'O-ka full Aandh-ra bho-ja-nam iv-van-di'
  },
  {
    id: 'ph_10',
    category: 'Food',
    english: 'Please make it less spicy',
    telugu: 'కొంచెం కారం తక్కువగా చేయండి (Koncham karam thakkuvaga cheyandi)',
    tamil: 'காரம் கொஞ்சம் குறைவாக வையுங்கள் (Kaaram konjam kuraivaaga vaiyunga)',
    hindi: 'कृपया तीखा कम रखिये (Kripya teekha kam rakhiye)',
    kannada: 'ಸ್ವಲ್ಪ ಖಾರ ಕಡಿಮೆ ಮಾಡಿ (Svalpa khaara kadime maadi)',
    malayalam: 'എരിവ് കുറച്ച് തരണം (Erivu kurachu tharanam)',
    odia: 'ଦୟାକରି କମ ରାଗ କରନ୍ତୁ (Dayakari kama raga karantu)',
    pronunciation: 'Kon-cham kaa-ram thak-ku-va-ga che-yan-di'
  },
  {
    id: 'ph_11',
    category: 'Food',
    english: 'Drinking water bottle please',
    telugu: 'మంచి నీళ్ల బాటిల్ ఇవ్వండి (Manchi neella bottle ivvandi)',
    tamil: 'குடிநீர் பாட்டில் கொடுங்கள் (Kudineer bottle kudunga)',
    hindi: 'पीने के पानी की बोतल दीजिए (Peene ke pani ki bottle dijiye)',
    kannada: 'ಕುಡಿಯುವ ನೀರಿನ ಬಾಟಲ್ ಕೊಡಿ (Kudiyuva neerina bottle kodi)',
    malayalam: 'കുടിവെള്ളം തരൂ (Kudivellam tharoo)',
    odia: 'ପିଇବା ପାଣି ବୋତଲ ଦିଅନ୍ତୁ (Piba pani bottle diyantu)',
    pronunciation: 'Man-chi neel-la bot-tle iv-van-di'
  },

  // SHOPPING
  {
    id: 'ph_12',
    category: 'Shopping',
    english: 'What is the price of this item?',
    telugu: 'దీని ధర ఎంత? (Deeni dhara entha?)',
    tamil: 'இதன் விலை என்ன? (Idhan vilai enna?)',
    hindi: 'इसका दाम कितना है? (Iska daam kitna hai?)',
    kannada: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು? (Idara bele eshtu?)',
    malayalam: 'ഇതിന് എത്രയാണ് വില? (Ithinu ethrayanu vila?)',
    odia: 'ଏହାର ଦାମ କେତେ? (Ehara dama kete?)',
    pronunciation: 'Dee-ni dha-ra en-tha?'
  },
  {
    id: 'ph_13',
    category: 'Shopping',
    english: 'Can you give a small discount?',
    telugu: 'కొంచెం తగ్గించి ఇవ్వగలరా? (Koncham thagginchi ivvagalara?)',
    tamil: 'கொஞ்சம் குறைத்து தருவீர்களா? (Konjam kuraithu tharuveergala?)',
    hindi: 'क्या थोड़ा कम कर सकते हैं? (Kya thoda kam kar sakte hain?)',
    kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿಕೊಡಬಹುದಾ? (Svalpa kadime maadikodabahuda?)',
    malayalam: 'കുറച്ച് കുറച്ചു തരുമോ? (Kurachu kurachu tharumo?)',
    odia: 'ଟିକେ କମ କରିବେ କି? (Tike kama karibe ki?)',
    pronunciation: 'Kon-cham thag-gin-chi iv-va-ga-la-ra?'
  },

  // EMERGENCY
  {
    id: 'ph_14',
    category: 'Emergency',
    english: 'Please help me, it is an emergency!',
    telugu: 'దయచేసి సహాయం చేయండి, ఇది ఎమర్జెన్సీ! (Dayachesi sahaayam cheyandi, idi emergency!)',
    tamil: 'தயவுசெய்து உதவுங்கள், இது அவசரம்! (Dayavuseidhu udhavunga, idhu avasaram!)',
    hindi: 'कृपया मदद कीजिये, आपातकालीन है! (Kripya madad kijiye, emergency hai!)',
    kannada: 'ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ, ಇದು ತುರ್ತು! (Dayavittu sahay maadi, idu thurtu!)',
    malayalam: 'ദയവായി സഹായിക്കൂ, അത്യാഹിതമാണ്! (Dayavayi sahayikoo, athyahithamanu!)',
    odia: 'ଦୟାକରି ସାହାଯ୍ୟ କରନ୍ତୁ! (Dayakari sahayya karantu!)',
    pronunciation: 'Da-ya-che-si sa-haa-yam che-yan-di!'
  },
  {
    id: 'ph_15',
    category: 'Emergency',
    english: 'Where is the nearest hospital or doctor?',
    telugu: 'దగ్గర్లోని హాస్పిటల్ ఎక్కడ ఉంది? (Daggarloni hospital ekkada undi?)',
    tamil: 'அருகிலுள்ள மருத்துவமனை எங்கே உள்ளது? (Arugilulla maruthuvamanai enge ulladhu?)',
    hindi: 'नजदीकी अस्पताल कहाँ है? (Nazdeeki aspatal kahan hai?)',
    kannada: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ? (Hatthirada aaspatre ellide?)',
    malayalam: 'അടുത്തുള്ള ആശുപത്രി എവിടെയാണ്? (Aduthulla aashupathri evideyannu?)',
    odia: 'ପାଖ ଡାକ୍ତରଖାନା କେଉଁଠି? (Pakha daktarkhana keunthi?)',
    pronunciation: 'Dag-gar-lo-ni hos-pi-tal ek-ka-da un-di?'
  }
];

export const getPhrasesByCategory = (category) => {
  if (!category || category === 'All') return phrases;
  return phrases.filter(ph => ph.category.toLowerCase() === category.toLowerCase());
};

export const getAvailableLanguages = () => languages;
export const getPhraseCategories = () => ['All', 'Greetings', 'Directions', 'Transport', 'Food', 'Shopping', 'Emergency'];
