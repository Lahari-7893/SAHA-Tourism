import React, { useState, useEffect } from 'react';
import { Star, User, Calendar, Edit3, MessageSquare } from 'lucide-react';

// Demo sample reviews data
const sampleReviews = {
  'dest_vjw': [
    { id: 'r1', author: 'Rahul S.', rating: 5, date: '2023-11-12', text: 'Prakasam Barrage at night is stunning. The food at cross roads restaurant was amazing!', isReal: false },
    { id: 'r2', author: 'Anita K.', rating: 4, date: '2023-10-05', text: 'Loved the Undavalli caves architecture. It was quite hot during the day though.', isReal: false }
  ],
  'dest_vzg': [
    { id: 'r3', author: 'Mohan Das', rating: 5, date: '2024-01-20', text: 'RK Beach and Rushikonda are extremely clean. Had a wonderful time surfing.', isReal: false }
  ]
};

export default function ReviewsList({ destinationId }) {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: '', author: '' });

  useEffect(() => {
    // Load reviews from localStorage + sample reviews
    const saved = localStorage.getItem(`saha_reviews_${destinationId}`);
    const parsedSaved = saved ? JSON.parse(saved) : [];
    const samples = sampleReviews[destinationId] || [];
    setReviews([...parsedSaved, ...samples]);
  }, [destinationId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.text.trim() || !newReview.author.trim()) return;

    const reviewObj = {
      id: Date.now().toString(),
      author: newReview.author,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      text: newReview.text,
      isReal: true
    };

    // Save to local storage
    const saved = localStorage.getItem(`saha_reviews_${destinationId}`);
    const parsedSaved = saved ? JSON.parse(saved) : [];
    const updated = [reviewObj, ...parsedSaved];
    localStorage.setItem(`saha_reviews_${destinationId}`, JSON.stringify(updated));

    // Update state
    const samples = sampleReviews[destinationId] || [];
    setReviews([...updated, ...samples]);
    setShowModal(false);
    setNewReview({ rating: 5, text: '', author: '' });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-teal-900/10 mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-black text-[#0B2545] flex items-center gap-2">
            <MessageSquare size={20} className="text-[#00838F]" /> Traveler Experiences & Reviews
          </h2>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#0077B6] to-[#00A896] hover:from-[#0A3D62] hover:to-[#00838F] text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 transition-all"
        >
          <Edit3 size={14} /> Write a Review
        </button>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">No reviews yet. Be the first to share your experience!</p>
        ) : (
          reviews.map(r => (
            <div key={r.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-[#00838F] flex items-center justify-center font-bold text-xs">
                    {r.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2545]">{r.author}</h4>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Calendar size={10} /> {r.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {r.isReal && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[9px] font-bold uppercase">
                      Verified Tourist
                    </span>
                  )}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-2">{r.text}</p>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[500] p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-black text-[#0B2545] mb-4">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={newReview.author}
                  onChange={e => setNewReview({...newReview, author: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0077B6] outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setNewReview({...newReview, rating: num})}
                    >
                      <Star size={24} className={newReview.rating >= num ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Your Review</label>
                <textarea 
                  required
                  rows="4"
                  value={newReview.text}
                  onChange={e => setNewReview({...newReview, text: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0077B6] outline-none"
                  placeholder="Tell us about your visit..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-[#0077B6] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#005f92]"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
