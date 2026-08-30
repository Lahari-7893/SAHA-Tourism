import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { transportModes, calculateFare } from '../data/transport';
import { Bus, Car, Users, Navigation, Info, Star, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Transport = () => {
  const { currentTrip } = useApp();
  const [distance, setDistance] = useState(5);
  const [groupSize, setGroupSize] = useState(currentTrip?.travelers || 2);

  const handleDistanceChange = (e) => {
    setDistance(Number(e.target.value));
  };

  const handleGroupSizeChange = (e) => {
    setGroupSize(Number(e.target.value));
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-4">Local Transport Guide</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Navigate the city like a local. Find the best transport options based on your group size and budget.</p>
        </div>

        {/* Fare Calculator & Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-12">
          <h2 className="text-xl font-bold text-[#1B2A4A] mb-6 flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-[#0077B6]" />
            Fare Estimator
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance: {distance} km
              </label>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={distance}
                onChange={handleDistanceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0077B6]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 km</span>
                <span>50 km</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-1" /> Group Size: {groupSize} {groupSize === 1 ? 'person' : 'people'}
              </label>
              <input 
                type="range" 
                min="1" 
                max="15" 
                value={groupSize}
                onChange={handleGroupSizeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0077B6]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transport Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transportModes.map((mode, index) => {
            const isRecommended = groupSize >= mode.suitableGroupSize.min && groupSize <= mode.suitableGroupSize.max;
            const fareResult = calculateFare(mode.id, distance, groupSize);
            
            return (
              <motion.div 
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-sm border ${isRecommended ? 'border-[#0077B6] ring-1 ring-[#0077B6]/20' : 'border-gray-100'} p-6 relative overflow-hidden`}
              >
                {isRecommended && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-current" /> Recommended
                  </div>
                )}
                
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {mode.id === 'bus' && <Bus className="w-6 h-6 text-[#0077B6]" />}
                  {mode.id === 'auto' && <Car className="w-6 h-6 text-[#0077B6]" />}
                  {mode.id === 'cab' && <Car className="w-6 h-6 text-[#0077B6]" />}
                  {mode.id === 'metro' && <Navigation className="w-6 h-6 text-[#0077B6]" />}
                  {['bus', 'auto', 'cab', 'metro'].indexOf(mode.id) === -1 && <Car className="w-6 h-6 text-[#0077B6]" />}
                </div>
                
                <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">{mode.name}</h3>
                <p className="text-sm text-gray-600 mb-6">{mode.description}</p>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Est. Fare ({distance}km)</span>
                    <span className="font-bold text-[#1B2A4A] text-lg">₹{fareResult.estimatedCost}</span>
                  </div>
                  <div className="w-full h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Base Fare</span>
                    <span className="text-sm font-medium text-gray-700">₹{mode.baseFare}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    Ideal for: {mode.suitableGroupSize.min} to {mode.suitableGroupSize.max} people
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2 text-gray-400" />
                    Comfort: {Array(mode.comfort).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 text-[#F59E0B] fill-current inline-block mr-0.5" />)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    Speed: {mode.speed} km/h
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start">
          <Info className="w-5 h-5 text-[#0077B6] mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#1B2A4A]">
            <strong className="block mb-1">Disclaimer</strong>
            Approximate fares — actual prices may vary based on time of day, traffic conditions, and specific service providers. Always negotiate or insist on meter for auto-rickshaws where app-based services aren't available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Transport;
