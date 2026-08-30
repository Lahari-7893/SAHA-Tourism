import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, color = "blue" }) {
  const colorMap = {
    blue: "bg-blue-100 text-[#0077B6]",
    teal: "bg-teal-100 text-[#00838F]",
    navy: "bg-[#F0F9FF] text-[#1B2A4A]",
    gold: "bg-amber-100 text-[#D97706]",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all text-center flex flex-col items-center group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 z-10 ${colorMap[color] || colorMap.blue} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
        {Icon && <Icon size={32} />}
      </div>
      
      <h3 className="text-xl font-bold text-[#1B2A4A] mb-3 z-10">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed z-10">
        {description}
      </p>
    </motion.div>
  );
}
