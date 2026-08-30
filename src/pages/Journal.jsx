import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Calendar, MapPin, Heart, Sparkles, Utensils, Hotel, Clock, MessageSquare, Share2, Plus, Check } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { destinations } from '../data/destinations';

export default function Journal() {
  const { currentTrip } = useApp();

  const [journals, setJournals] = useState([
    {
      id: 'journal_demo_1',
      title: 'My Vijayawada Trip — 2 Days',
      destinationName: 'Vijayawada',
      date: 'Aug 28-30, 2026',
      duration: '2 Days',
      heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
      placesVisited: ['Kanaka Durga Temple', 'Prakasam Barrage', 'Bhavani Island', 'Undavalli Caves'],
      foodEnjoyed: ['Subbayya Gari Butta Bhojanam', 'Pesarattu Upma'],
      hotelStayed: 'Minerva Grand Vijayawada',
      photos: [
        '/images/andhra_bhojanam.jpg',
        '/images/kurnool_fort.jpg',
        '/images/pesarattu_upma.jpg'
      ],
      aiMemories: 'Standing on the peaceful banks of the Krishna River as sunset cast a golden glow over Prakasam Barrage was unforgettable. The spicy, authentic flavours of the banana leaf meals in Governorpet brought true local warmth to the journey.',
      comments: [
        { author: 'Rahul M.', text: 'The boat ride to Bhavani Island in the evening was super serene!' },
        { author: 'Ananya S.', text: 'Subbayya Gari Thali is a absolute must-try! Unlimited food and ghee!' }
      ]
    }
  ]);

  const [activeJournal, setActiveJournal] = useState(journals[0]);
  const [newComment, setNewComment] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  // Form for new journal
  const [tripTitle, setTripTitle] = useState('My Unforgettable AP Trip');
  const [selectedDest, setSelectedDest] = useState(destinations[0]?.id || '');
  const [memoryText, setMemoryText] = useState('');

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setUploadedPhotos(prev => [...prev, ...urls]);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const updated = {
      ...activeJournal,
      comments: [...activeJournal.comments, { author: 'You (Traveler)', text: newComment }]
    };
    setActiveJournal(updated);
    setJournals(journals.map(j => j.id === updated.id ? updated : j));
    setNewComment('');
  };

  const handleCreateJournal = () => {
    const destObj = destinations.find(d => d.id === selectedDest) || destinations[0];
    const newEntry = {
      id: `journal_${Date.now()}`,
      title: tripTitle,
      destinationName: destObj.name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: '2 Days',
      heroImage: destObj.heroImage,
      placesVisited: [destObj.name + ' Central', 'Local Heritage Sites', 'Scenic Viewpoint'],
      foodEnjoyed: ['Andhra Bhojanam', 'Local Tiffins'],
      hotelStayed: 'APTDC Haritha Resort',
      photos: uploadedPhotos.length > 0 ? uploadedPhotos : [destObj.heroImage, '/images/andhra_bhojanam.jpg'],
      aiMemories: memoryText || `A mesmerizing journey through the heart of ${destObj.name}. Filled with rich cultural encounters, mouthwatering regional delicacies, and beautiful memories!`,
      comments: [{ author: 'SAHA AI', text: 'Congratulations on completing this trip! Journal generated successfully.' }]
    };

    setJournals([newEntry, ...journals]);
    setActiveJournal(newEntry);
    setIsCreating(false);
    setUploadedPhotos([]);
    setMemoryText('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Header */}
      <div className="bg-[#1B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077B6]/30 text-[#4FC3F7] text-xs font-bold uppercase tracking-wider mb-3 border border-[#0077B6]/40">
            <Sparkles size={14} /> AI Digital Travel Journal
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            My Travel Journals & Memories
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Automatically package your past trips into stunning digital storybooks complete with photos, timelines, food memories, and AI reflections.
          </p>

          <button
            onClick={() => setIsCreating(!isCreating)}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#0077B6] to-[#00838F] text-white text-xs font-extrabold shadow-lg hover:shadow-xl transition-all"
          >
            <Plus size={16} /> {isCreating ? 'Cancel Creation' : 'Create New Travel Journal'}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Creation Form Modal / Card */}
        {isCreating && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-200 shadow-md space-y-5">
            <h2 className="text-xl font-black text-[#1B2A4A] flex items-center gap-2">
              <Camera className="text-[#0077B6]" size={20} /> Generate AI Travel Journal
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Journal Title</label>
                <input
                  type="text"
                  value={tripTitle}
                  onChange={(e) => setTripTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  placeholder="e.g. My Vijayawada Trip — 2 Days"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Destination</label>
                <select
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                >
                  {destinations.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.district})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Trip Memories / Reflections</label>
              <textarea
                value={memoryText}
                onChange={(e) => setMemoryText(e.target.value)}
                placeholder="What was the highlight of your trip? Mention any special food or places..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0077B6] h-24"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Upload Trip Photos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-[#0077B6] hover:file:bg-teal-100"
              />
              {uploadedPhotos.length > 0 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {uploadedPhotos.map((url, idx) => (
                    <img key={idx} src={url} alt="upload" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleCreateJournal}
              className="w-full py-3 bg-[#0077B6] text-white text-xs font-black rounded-xl shadow-md hover:bg-[#0B2545] transition-colors"
            >
              Generate AI Digital Journal
            </button>
          </motion.div>
        )}

        {/* Journal Selector Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 border-b border-slate-200">
          {journals.map(j => (
            <button
              key={j.id}
              onClick={() => setActiveJournal(j)}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                activeJournal.id === j.id
                  ? 'bg-[#0077B6] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Camera size={14} />
              <span>{j.title}</span>
            </button>
          ))}
        </div>

        {/* Active Journal View */}
        {activeJournal && (
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm space-y-8">
            {/* Journal Hero Cover */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={activeJournal.heroImage}
                alt={activeJournal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider">
                  📍 {activeJournal.destinationName} &bull; {activeJournal.duration}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black">{activeJournal.title}</h2>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {activeJournal.date}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Photo Gallery */}
              <div className="space-y-3">
                <h3 className="text-base font-black text-[#1B2A4A] flex items-center gap-2">
                  <Camera size={18} className="text-[#0077B6]" /> Trip Photo Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeJournal.photos.map((img, idx) => (
                    <div key={idx} className="h-44 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                      <img src={img} alt={`Trip Memory ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Memory Reflection */}
              <div className="bg-teal-50/60 rounded-2xl p-5 border border-teal-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-[#00838F]">
                  <Sparkles size={14} /> SAHA AI Journey Reflection
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#1B2A4A] italic leading-relaxed">
                  "{activeJournal.aiMemories}"
                </p>
              </div>

              {/* Grid: Places, Food & Stay */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-[#0077B6] flex items-center gap-1">
                    <MapPin size={12} /> Places Visited
                  </span>
                  <ul className="space-y-1">
                    {activeJournal.placesVisited.map((p, i) => (
                      <li key={i} className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0077B6]" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-emerald-700 flex items-center gap-1">
                    <Utensils size={12} /> Food Enjoyed
                  </span>
                  <ul className="space-y-1">
                    {activeJournal.foodEnjoyed.map((f, i) => (
                      <li key={i} className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-amber-700 flex items-center gap-1">
                    <Hotel size={12} /> Accommodation Stay
                  </span>
                  <p className="text-xs font-bold text-slate-700 mt-1">
                    🏨 {activeJournal.hotelStayed}
                  </p>
                </div>
              </div>

              {/* User Comments / Notes */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-base font-black text-[#1B2A4A] flex items-center gap-2">
                  <MessageSquare size={18} className="text-[#0077B6]" /> Traveler Notes & Comments
                </h3>

                <div className="space-y-2">
                  {activeJournal.comments.map((c, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                      <span className="font-extrabold text-[#0077B6]">{c.author}: </span>
                      <span className="text-slate-700 font-medium">{c.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment or personal note..."
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  />
                  <button
                    onClick={handleAddComment}
                    className="px-4 py-2.5 bg-[#0077B6] text-white text-xs font-bold rounded-xl hover:bg-[#0B2545] transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
