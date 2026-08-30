export const emergencyNumbers = [
  { id: 'e1', name: 'National Emergency Number', number: '112', description: 'Single emergency helpline for immediate assistance.' },
  { id: 'e2', name: 'Police', number: '100', description: 'Immediate police assistance.' },
  { id: 'e3', name: 'Fire', number: '101', description: 'Fire brigade and rescue operations.' },
  { id: 'e4', name: 'Ambulance', number: '102', description: 'Medical emergencies.' },
  { id: 'e5', name: 'Emergency Disaster Management', number: '108', description: 'Health emergencies, accidents, and disasters.' },
  { id: 'e6', name: 'Women Helpline', number: '1091', description: 'Dedicated helpline for women in distress.' },
  { id: 'e7', name: 'Tourist Helpline', number: '1363', description: 'Ministry of Tourism helpline (Available in multiple languages).' },
];

export const safetyContacts = emergencyNumbers;

export const travelSafetyTips = [
  {
    id: 'ts1',
    title: 'Keep documents secure',
    description: 'Always carry a physical and digital copy of your ID (Aadhar, Passport) and booking confirmations. Keep originals in a safe place.'
  },
  {
    id: 'ts2',
    title: 'Stay hydrated safely',
    description: 'Drink only bottled or filtered water. Avoid ice in drinks from street vendors to prevent water-borne diseases.'
  },
  {
    id: 'ts3',
    title: 'Be cautious with street food',
    description: 'While delicious, ensure the street food vendor maintains basic hygiene. Eat at places that have high turnover/crowds.'
  },
  {
    id: 'ts4',
    title: 'Transport safety',
    description: 'Use official pre-paid taxi stands or verified ride-hailing apps (Ola, Uber) especially late at night. Share ride details with someone.'
  },
  {
    id: 'ts5',
    title: 'Respect local customs',
    description: 'Dress modestly when visiting temples and religious sites (shoulders and knees covered). Remove footwear before entering.'
  }
];

export const regionalSafetyTips = [
  {
    id: 'rs1',
    region: 'Coastal Andhra',
    tips: [
      'Be cautious of strong ocean currents; swim only in designated safe zones on beaches.',
      'Summers (April-June) are extremely hot and humid. Avoid afternoon sun.',
      'Check weather advisories during monsoon (October-November) as cyclones can occur.'
    ]
  },
  {
    id: 'rs2',
    region: 'Rayalaseema',
    tips: [
      'The region can be very dry and hot. Carry ample water during road trips.',
      'When visiting remote spots like Gandikota, travel during daylight as facilities and lighting are scarce.'
    ]
  },
  {
    id: 'rs3',
    region: 'Hill Stations (Araku/Horsley)',
    tips: [
      'Carry light woolens even in summer as evenings can be chilly.',
      'Drive carefully on winding ghat roads; avoid driving in heavy fog or late at night.'
    ]
  }
];

export const packingChecklist = [
  { category: 'Essentials', items: ['ID Cards / Passport', 'Tickets & Itinerary', 'Cash & Cards', 'First-Aid Kit'] },
  { category: 'Clothing', items: ['Cotton clothes for plains', 'Light jacket for hills', 'Modest wear for temples', 'Comfortable walking shoes'] },
  { category: 'Electronics', items: ['Phone Charger', 'Power Bank', 'Universal Adapter', 'Camera (optional)'] },
  { category: 'Health & Hygiene', items: ['Hand Sanitizer', 'Sunscreen', 'Mosquito Repellent', 'Prescription Medicines', 'Wet Wipes'] },
];

export const getEmergencyNumbers = () => emergencyNumbers;
export const getTravelSafetyTips = () => travelSafetyTips;
export const getRegionalSafetyTips = () => regionalSafetyTips;
export const getPackingChecklist = () => packingChecklist;
