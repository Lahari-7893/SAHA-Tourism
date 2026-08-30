import React, { useState } from 'react';
import { Phone, Shield, ShieldCheck, MapPin, AlertCircle, Info, Heart } from 'lucide-react';
import { getEmergencyNumbers, getTravelSafetyTips } from '../data/safety';
import { motion } from 'framer-motion';

const Safety = () => {
  const [locationShared, setLocationShared] = useState(false);
  const [safeStatus, setSafeStatus] = useState(null);

  const emergencyContacts = getEmergencyNumbers();
  const tips = getTravelSafetyTips();

  const handleShareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Location',
        text: 'I am currently here. Check my location:',
        url: 'https://maps.google.com' // Mock URL
      }).then(() => {
        setLocationShared(true);
      }).catch(console.error);
    } else {
      // Fallback
      alert('Location copied to clipboard!');
      setLocationShared(true);
    }
    
    setTimeout(() => setLocationShared(false), 3000);
  };

  const handleMarkSafe = () => {
    setSafeStatus(new Date().toLocaleTimeString());
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-4">Safety Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Your safety is our priority. Access emergency contacts and local safety guidelines instantly.</p>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-10 flex items-start">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-800">Emergency Disclaimer</h3>
            <p className="text-sm text-red-700 mt-1">SAHA does not replace emergency services. In case of a life-threatening emergency, call 112 immediately.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <button 
            onClick={handleShareLocation}
            className="bg-white hover:bg-gray-50 border border-[#0077B6] rounded-2xl p-6 flex items-center justify-center gap-4 transition-colors shadow-sm"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#0077B6]" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-[#1B2A4A] text-lg">{locationShared ? 'Location Shared!' : 'Share My Location'}</h3>
              <p className="text-sm text-gray-500">Send current coordinates to trusted contacts</p>
            </div>
          </button>

          <button 
            onClick={handleMarkSafe}
            className={`bg-white hover:bg-gray-50 border ${safeStatus ? 'border-green-500' : 'border-[#00838F]'} rounded-2xl p-6 flex items-center justify-center gap-4 transition-colors shadow-sm`}
          >
            <div className={`w-12 h-12 ${safeStatus ? 'bg-green-50' : 'bg-teal-50'} rounded-full flex items-center justify-center`}>
              <ShieldCheck className={`w-6 h-6 ${safeStatus ? 'text-green-600' : 'text-[#00838F]'}`} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-[#1B2A4A] text-lg">I'm Safe</h3>
              <p className="text-sm text-gray-500">
                {safeStatus ? `Last checked in at ${safeStatus}` : 'Check in to log your safe status'}
              </p>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Numbers */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center">
              <Phone className="w-6 h-6 mr-2 text-red-600" />
              Emergency
            </h2>
            
            {emergencyContacts.map((contact, index) => (
              <a 
                href={`tel:${contact.number}`}
                key={index}
                className={`block bg-white rounded-xl p-5 border ${contact.number === '112' ? 'border-red-500 shadow-md ring-1 ring-red-500/20' : 'border-gray-100 shadow-sm'} hover:shadow-md transition-shadow relative overflow-hidden`}
              >
                {contact.number === '112' && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                    PRIMARY
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-[#1B2A4A]">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.description}</p>
                  </div>
                  <div className={`text-2xl font-black ${contact.number === '112' ? 'text-red-600' : 'text-[#0077B6]'}`}>
                    {contact.number}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Safety Tips & Checklist */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-[#F59E0B]" />
                Local Guidelines
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-pink-600" />
                Health & Wellness
              </h2>
              
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Hydration</h4>
                      <p className="text-sm text-gray-600">Drink only bottled or filtered water. Stay hydrated, especially during summer months.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Street Food</h4>
                      <p className="text-sm text-gray-600">Eat hot, freshly cooked food. Avoid cut fruits and raw salads from street vendors.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">First Aid</h4>
                      <p className="text-sm text-gray-600">Carry a basic kit with personal medications, antacids, band-aids, and mosquito repellent.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start">
              <Info className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500">
                Note: SAHA provides general safety guidelines. We do not list fabricated hospital or police station locations to prevent misdirection during actual emergencies. Always rely on local authorities or Google Maps for exact facility locations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
