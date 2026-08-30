import React from 'react';
import { Bookmark, MapPin, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlaceCard({ 
  id,
  image, 
  title, 
  subtitle, 
  rating, 
  categories = [], 
  link, 
  onFavorite, 
  isFavorite,
  place
}) {
  // Support both direct props and `place` object prop
  const item = place || {};
  const cardId = id || item.id;
  const cardTitle = title || item.name || 'Destination';
  const cardImage = image || item.heroImage || item.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80";
  const cardSubtitle = subtitle || item.district ? `${item.district}, ${item.state || 'AP'}` : (item.description || item.state || '');
  const cardRating = rating || item.rating || 4.8;
  const cardCategories = categories.length > 0 ? categories : (item.categories || item.tags || []);
  const cardLink = link || (item.slug ? `/destination/${item.slug}` : (item.id ? `/destination/${item.id}` : '#'));

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/80 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={cardImage} 
          alt={cardTitle} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        
        {onFavorite && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavorite(cardId);
            }}
            className="absolute top-3 right-3 p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/50 text-white transition-colors"
          >
            <Bookmark size={16} className={isFavorite ? "fill-amber-400 text-amber-400" : "text-white"} />
          </button>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex flex-wrap gap-1">
            {cardCategories.slice(0, 2).map((cat, i) => (
              <span key={i} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#0077B6]/90 text-white rounded-md backdrop-blur-sm">
                {cat}
              </span>
            ))}
          </div>
          {cardRating && (
            <div className="flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-lg backdrop-blur-sm shadow-xs">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-[#1B2A4A]">{cardRating}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4.5 flex-grow flex flex-col justify-between">
        <div>
          <Link to={cardLink} className="block group-hover:text-[#0077B6] transition-colors">
            <h3 className="text-base font-extrabold text-[#1B2A4A] mb-1 line-clamp-1">{cardTitle}</h3>
          </Link>
          <div className="flex items-start gap-1.5 text-slate-500 mb-3">
            <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#00838F]" />
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{cardSubtitle}</p>
          </div>
        </div>
        
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link 
            to={cardLink} 
            className="text-xs font-bold text-[#0077B6] hover:text-[#00695C] transition-colors flex items-center gap-1"
          >
            Explore Sights <ArrowRight size={13} />
          </Link>
          <Link
            to={`/planner?destination=${item.slug || cardId}`}
            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold rounded-lg transition-colors"
          >
            Plan Trip
          </Link>
        </div>
      </div>
    </div>
  );
}
