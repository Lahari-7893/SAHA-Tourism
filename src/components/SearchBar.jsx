import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';

export default function SearchBar({ onSearch, placeholder = "Where do you want to go?", value = "" }) {
  const [query, setQuery] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto shadow-lg rounded-full flex items-center bg-white border-2 border-transparent focus-within:border-[#4FC3F7] transition-all group overflow-hidden">
      <div className="pl-6 pr-2 text-gray-400 group-focus-within:text-[#0077B6]">
        <Search size={22} />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-4 px-2 bg-transparent text-gray-800 text-lg focus:outline-none placeholder-gray-400 font-medium"
      />
      
      {query && (
        <button 
          type="button" 
          onClick={() => setQuery('')}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      )}

      <div className="flex items-center gap-2 pr-2">
        <button 
          type="button"
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#00838F] hover:bg-gray-100 rounded-full transition-colors whitespace-nowrap"
          title="Use my location"
        >
          <MapPin size={18} />
          <span>Near me</span>
        </button>
        
        <button 
          type="submit"
          className="bg-[#0077B6] hover:bg-[#00695C] text-white px-6 py-3 m-1 rounded-full font-semibold transition-colors shadow-md"
        >
          Search
        </button>
      </div>
    </form>
  );
}
