import React from 'react';

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-3 min-w-max">
        <button
          onClick={() => onChange('All')}
          className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
            selected === 'All' 
              ? 'bg-[#1B2A4A] text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selected === category.id || selected === category.name;
          return (
            <button
              key={category.id || category.name}
              onClick={() => onChange(category.id || category.name)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
                isSelected 
                  ? 'bg-[#0077B6] text-white border-transparent' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {Icon && <Icon size={16} className={isSelected ? 'text-white' : 'text-[#00838F]'} />}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
