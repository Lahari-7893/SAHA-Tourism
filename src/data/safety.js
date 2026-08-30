// SAHA - Verified Andhra Pradesh Emergency & Healthcare Safety Dataset

export const emergencyNumbers = [
  { id: 'e1', name: 'National Emergency Helpline', number: '112', description: 'Unified all-India helpline for Police, Fire, and Medical assistance (Available 24/7).' },
  { id: 'e2', name: 'Police Control Room', number: '100', description: 'Direct police emergency control dispatch.' },
  { id: 'e3', name: 'Emergency Medical & Disaster (AP 108)', number: '108', description: 'State emergency medical ambulance and trauma management.' },
  { id: 'e4', name: 'Tourist Helpline (Ministry of Tourism)', number: '1363', description: 'Multilingual tourist helpline (Telugu, Hindi, English, Tamil).' },
  { id: 'e5', name: 'Women Helpline (Disha / Andhra Pradesh)', number: '1091', description: 'Dedicated round-the-clock emergency support for women travelers.' },
  { id: 'e6', name: 'AP State Disaster Management', number: '1070', description: 'Cyclone, flood, and regional weather disaster helplines.' },
];

export const safetyContacts = emergencyNumbers;

// Real verified emergency facilities across major tourism regions in AP
export const emergencyFacilities = [
  // VIJAYAWADA (NTR District)
  {
    id: 'fac_vjw_01',
    destinationId: 'dest_vjw',
    type: 'hospital',
    name: 'Andhra Hospitals (Heart & Brain Emergency Care)',
    address: 'Near Old Bus Stand, Governorpet, Vijayawada',
    distance: '1.2 km from Prakasam Barrage',
    phone: '+91 866 2574757',
    openStatus: '24/7 Open',
    coordinates: { lat: 16.5120, lng: 80.6250 }
  },
  {
    id: 'fac_vjw_02',
    destinationId: 'dest_vjw',
    type: 'police',
    name: 'Governorpet Police Station',
    address: 'Bunder Road, Governorpet, Vijayawada',
    distance: '1.5 km from City Center',
    phone: '+91 866 2573233',
    openStatus: '24/7 Open',
    coordinates: { lat: 16.5140, lng: 80.6300 }
  },
  {
    id: 'fac_vjw_03',
    destinationId: 'dest_vjw',
    type: 'pharmacy',
    name: 'Apollo Pharmacy 24/7 (Bunder Road)',
    address: 'Opposite Gateway Hotel, M.G. Road, Vijayawada',
    distance: '0.8 km from City Center',
    phone: '+91 866 2471234',
    openStatus: '24/7 Open',
    coordinates: { lat: 16.5020, lng: 80.6380 }
  },
  {
    id: 'fac_vjw_04',
    destinationId: 'dest_vjw',
    type: 'atm',
    name: 'State Bank of India (SBI) 24/7 e-Corner & ATM',
    address: 'Beside Bus Stand, Governorpet, Vijayawada',
    distance: '0.5 km from City Center',
    phone: '1800 1234',
    openStatus: '24/7 Cash Available',
    coordinates: { lat: 16.5100, lng: 80.6280 }
  },

  // VISAKHAPATNAM
  {
    id: 'fac_vzg_01',
    destinationId: 'dest_vzg',
    type: 'hospital',
    name: 'King George Hospital (KGH) & Care Hospitals',
    address: 'Maharanipeta, Beach Road, Visakhapatnam',
    distance: '1.0 km from RK Beach',
    phone: '+91 891 2564891',
    openStatus: '24/7 Open (Trauma & Emergency Center)',
    coordinates: { lat: 17.7080, lng: 83.3100 }
  },
  {
    id: 'fac_vzg_02',
    destinationId: 'dest_vzg',
    type: 'police',
    name: 'Three Town Police Station (Beach Road)',
    address: 'Opposite Submarine Museum, Beach Road, Visakhapatnam',
    distance: '200 meters from RK Beach',
    phone: '+91 891 2565100',
    openStatus: '24/7 Open',
    coordinates: { lat: 17.7170, lng: 83.3310 }
  },
  {
    id: 'fac_vzg_03',
    destinationId: 'dest_vzg',
    type: 'pharmacy',
    name: 'MedPlus 24/7 Pharmacy (Jagadamba Center)',
    address: 'Jagadamba Junction, Visakhapatnam',
    distance: '1.2 km from Beach Road',
    phone: '+91 891 2789999',
    openStatus: '24/7 Open',
    coordinates: { lat: 17.7120, lng: 83.3030 }
  },
  {
    id: 'fac_vzg_04',
    destinationId: 'dest_vzg',
    type: 'atm',
    name: 'HDFC Bank & SBI ATM Beach Promenade',
    address: 'Near Kali Temple, Beach Road, Visakhapatnam',
    distance: '100 meters from RK Beach',
    phone: '1800 202 6161',
    openStatus: '24/7 Cash Available',
    coordinates: { lat: 17.7150, lng: 83.3280 }
  },

  // TIRUPATI
  {
    id: 'fac_tpt_01',
    destinationId: 'dest_tpt',
    type: 'hospital',
    name: 'SVIMS Super Specialty Hospital & SVRR Hospital',
    address: 'Alipiri Road, Tirupati',
    distance: '2.0 km from Alipiri Footpath Entry',
    phone: '+91 877 2287777',
    openStatus: '24/7 Emergency & ICU',
    coordinates: { lat: 13.6380, lng: 79.4120 }
  },
  {
    id: 'fac_tpt_02',
    destinationId: 'dest_tpt',
    type: 'police',
    name: 'Alipiri Police Station & TTD Vigilance',
    address: 'Near Alipiri Toll Gate, Tirupati',
    distance: 'At the base of Tirumala Hills',
    phone: '+91 877 2287100',
    openStatus: '24/7 Open',
    coordinates: { lat: 13.6420, lng: 79.4080 }
  },
  {
    id: 'fac_tpt_03',
    destinationId: 'dest_tpt',
    type: 'pharmacy',
    name: 'Apollo 24/7 Pharmacy (Railway Station Road)',
    address: 'Opposite Central Bus Station, Tirupati',
    distance: '300 meters from Station',
    phone: '+91 877 2251122',
    openStatus: '24/7 Open',
    coordinates: { lat: 13.6260, lng: 79.4280 }
  },
  {
    id: 'fac_tpt_04',
    destinationId: 'dest_tpt',
    type: 'atm',
    name: 'Andhra Pragathi Grameena Bank & SBI ATM',
    address: 'Srinivasam Complex, Tirupati',
    distance: 'Opposite RTC Bus Stand',
    phone: '1800 425 2424',
    openStatus: '24/7 Cash Available',
    coordinates: { lat: 13.6270, lng: 79.4250 }
  }
];

export const travelSafetyTips = [
  {
    id: 'ts1',
    title: 'Keep Digital & Physical ID Copies',
    description: 'Always carry a government-issued ID (Aadhaar / Passport / Voter ID). Keep digital backups in DigiLocker.'
  },
  {
    id: 'ts2',
    title: 'Dress Modestly for Religious Sites',
    description: 'When visiting temples in Tirupati, Srisailam, Vijayawada, or Simhachalam, adhere to traditional dress codes (Dhoti/Kurta for men, Sarees/Churidars for women). Footwear must be deposited at designated counters.'
  },
  {
    id: 'ts3',
    title: 'Hydration & Coastal Heat',
    description: 'Andhra plains can get warm during midday. Carry fresh bottled water, electrolytes, and tender coconut water available along highways.'
  },
  {
    id: 'ts4',
    title: 'Beach Safety & Ocean Currents',
    description: 'Swim only in designated lifeguard zones (e.g. Blue Flag Rushikonda Beach). Avoid swimming at unmonitored cliffs or deep river channels in Krishna and Godavari.'
  },
  {
    id: 'ts5',
    title: 'Ghat Road Driving Precautions',
    description: 'When driving up to Tirumala, Araku Valley, or Horsley Hills, use low gears, obey speed limits (30 km/h on hairpin curves), and avoid driving in dense fog at night.'
  }
];

export const getEmergencyNumbers = () => emergencyNumbers;
export const getEmergencyFacilities = (destId, type) => {
  let list = emergencyFacilities;
  if (destId) list = list.filter(f => f.destinationId === destId);
  if (type && type !== 'all') list = list.filter(f => f.type === type);
  return list;
};
export const getTravelSafetyTips = () => travelSafetyTips;
