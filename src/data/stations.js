// SAHA - Verified Railway Stations & Major Bus Terminals in Andhra Pradesh

export const transitStations = [
  // VIJAYAWADA
  {
    id: 'stn_vjw_01',
    destinationId: 'dest_vjw',
    type: 'railway',
    name: 'Vijayawada Junction Railway Station (BZA)',
    code: 'BZA',
    address: 'Station Road, Hanumanpet, Vijayawada',
    coordinates: { lat: 16.5175, lng: 80.6200 },
    bookingUrl: 'https://www.irctc.co.in',
    description: 'One of the busiest A1 railway junctions in India, South Central Railway headquarters division.'
  },
  {
    id: 'stn_vjw_02',
    destinationId: 'dest_vjw',
    type: 'bus',
    name: 'Pandit Nehru Central Bus Station (PNBS)',
    code: 'PNBS',
    address: 'National Highway 65, Krishna River Bank, Vijayawada',
    coordinates: { lat: 16.5050, lng: 80.6180 },
    bookingUrl: 'https://www.apsrtconline.in',
    description: 'One of the largest bus terminals in Asia with 60+ platforms connecting all AP and interstate routes.'
  },

  // VISAKHAPATNAM
  {
    id: 'stn_vzg_01',
    destinationId: 'dest_vzg',
    type: 'railway',
    name: 'Visakhapatnam Junction Railway Station (VSKP)',
    code: 'VSKP',
    address: 'Railway Colony, Visakhapatnam',
    coordinates: { lat: 17.7215, lng: 83.2906 },
    bookingUrl: 'https://www.irctc.co.in',
    description: 'Major East Coast Railway terminus with Vistadome tourist train connection to Araku Valley.'
  },
  {
    id: 'stn_vzg_02',
    destinationId: 'dest_vzg',
    type: 'bus',
    name: 'Dwaraka RTC Complex Bus Station (RTC Complex)',
    code: 'RTC_VSKP',
    address: 'Dwaraka Nagar, Visakhapatnam',
    coordinates: { lat: 17.7260, lng: 83.3050 },
    bookingUrl: 'https://www.apsrtconline.in',
    description: 'Central transit terminal for city buses, coastal routes, and interstate departures.'
  },

  // TIRUPATI
  {
    id: 'stn_tpt_01',
    destinationId: 'dest_tpt',
    type: 'railway',
    name: 'Tirupati Main Railway Station (TPTY)',
    code: 'TPTY',
    address: 'Gandhi Road, Tirupati',
    coordinates: { lat: 13.6260, lng: 79.4200 },
    bookingUrl: 'https://www.irctc.co.in',
    description: 'Major pilgrimage rail hub with dedicated TTD pilgrim amenities and Cloak rooms.'
  },
  {
    id: 'stn_tpt_02',
    destinationId: 'dest_tpt',
    type: 'bus',
    name: 'Sri Venkateswara Central Bus Station (SV Bus Stand)',
    code: 'SVBS_TPT',
    address: 'Opposite Railway Station, Tirupati',
    coordinates: { lat: 13.6280, lng: 79.4220 },
    bookingUrl: 'https://www.apsrtconline.in',
    description: 'Round-the-clock ghat road electric and express buses ascending to Tirumala every 2 minutes.'
  },

  // KURNOOL
  {
    id: 'stn_knl_01',
    destinationId: 'dest_knl',
    type: 'railway',
    name: 'Kurnool City Railway Station (KRNT)',
    code: 'KRNT',
    address: 'Station Road, Kurnool',
    coordinates: { lat: 15.8300, lng: 78.0400 },
    bookingUrl: 'https://www.irctc.co.in',
    description: 'Main rail gateway to Rayalaseema historical forts and Belum Caves.'
  },
  {
    id: 'stn_knl_02',
    destinationId: 'dest_knl',
    type: 'bus',
    name: 'Kurnool Central RTC Bus Station',
    code: 'KNL_BUS',
    address: 'Ballari Road, Kurnool',
    coordinates: { lat: 15.8250, lng: 78.0350 },
    bookingUrl: 'https://www.apsrtconline.in',
    description: 'Key transit hub connecting Hyderabad-Bengaluru NH44 corridor.'
  },

  // RAJAHMUNDRY & KAKINADA
  {
    id: 'stn_rjy_01',
    destinationId: 'dest_rjy',
    type: 'railway',
    name: 'Rajahmundry Railway Station (RJY)',
    code: 'RJY',
    address: 'Railway Station Road, Rajahmundry',
    coordinates: { lat: 17.0050, lng: 81.7850 },
    bookingUrl: 'https://www.irctc.co.in',
    description: 'Scenic railway line crossing the Godavari Arch Bridge.'
  },
  {
    id: 'stn_kkn_01',
    destinationId: 'dest_kkn',
    type: 'railway',
    name: 'Kakinada Town Railway Station (CCT)',
    code: 'CCT',
    address: 'Cinema Road, Kakinada',
    coordinates: { lat: 16.9800, lng: 82.2400 },
    bookingUrl: 'https://www.irctc.co.in',
    description: 'Direct train terminus connecting to Hope Island and Coringa wildlife coast.'
  }
];

export const getTransitStationsByDestination = (destId) => {
  return transitStations.filter(s => s.destinationId === destId);
};
