import React from 'react';
import { FolderOpen } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = FolderOpen, 
  title = "No items found", 
  description = "Get started by creating a new item.", 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-dashed border-gray-300">
      <div className="w-20 h-20 bg-[#F0F9FF] rounded-full flex items-center justify-center mb-6">
        <Icon size={40} className="text-[#0077B6]" />
      </div>
      <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="bg-[#0077B6] hover:bg-[#00695C] text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
