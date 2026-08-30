import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { CheckCircle2, Download, Home, Plus, MapPin, IndianRupee, Sparkles, Calendar, Users, ArrowRight, Star, Send, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

export default function TripComplete() {
  const { currentTrip } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const trip = location.state?.trip || currentTrip;
  const destination = trip?.destination || { name: 'Andhra Pradesh', state: 'Andhra Pradesh' };
  const travelers = trip?.travelers || 2;
  const grandTotal = trip?.grandTotalCost || 4000;

  // Feedback State
  const [overallRating, setOverallRating] = useState(5);
  const [destinationRating, setDestinationRating] = useState(5);
  const [itineraryRating, setItineraryRating] = useState(5);
  const [hotelRating, setHotelRating] = useState(5);
  const [foodRating, setFoodRating] = useState(5);
  const [aiRating, setAiRating] = useState(5);
  const [translatorRating, setTranslatorRating] = useState(5);
  const [emergencyRating, setEmergencyRating] = useState(5);
  const [writtenFeedback, setWrittenFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const expenseBreakdown = [
    { name: 'Transport & Local Auto', value: trip?.summary?.breakdown?.transport || 600, color: '#00838F' },
    { name: 'Entry Fees & Sights', value: trip?.summary?.breakdown?.entryFees || 450, color: '#0077B6' },
    { name: 'Food & Regional Dining', value: trip?.summary?.breakdown?.food || 1200, color: '#F59E0B' },
    { name: 'Hotel Accommodation', value: trip?.summary?.breakdown?.accommodation || 1800, color: '#00A896' }
  ].filter(e => e.value > 0);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const feedbackObj = {
      destination: destination.name,
      overallRating,
      destinationRating,
      itineraryRating,
      hotelRating,
      foodRating,
      aiRating,
      translatorRating,
      emergencyRating,
      writtenFeedback,
      submittedAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('saha_user_feedback') || '[]');
      existing.unshift(feedbackObj);
      localStorage.setItem('saha_user_feedback', JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to save feedback:', err);
    }

    setFeedbackSubmitted(true);
  };

  const handleDownloadSummary = () => {
    let summaryText = `====================================================\n`;
    summaryText += `       SAHA TRAVEL SUMMARY & COMPLETION REPORT\n`;
    summaryText += `    Smart Assistance for Tourists in Andhra Pradesh\n`;
    summaryText += `====================================================\n\n`;
    summaryText += `Destination: ${destination.name} (${destination.district || 'AP'})\n`;
    summaryText += `Travelers: ${travelers}\n`;
    summaryText += `Total Journey Cost: INR ${grandTotal}\n`;
    summaryText += `Per Person Cost: INR ${Math.round(grandTotal / travelers)}\n\n`;
    summaryText += `--- EXPENSE BREAKDOWN ---\n`;
    expenseBreakdown.forEach(e => {
      summaryText += `• ${e.name}: INR ${e.value}\n`;
    });
    summaryText += `\nThank you for exploring Andhra Pradesh with SAHA!\n`;

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SAHA_${destination.name}_Trip_Report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderStarInput = (val, setVal, label) => (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
      <span className="text-xs font-bold text-slate-700">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setVal(star)}
            className="p-1 text-slate-300 hover:text-amber-400 focus:outline-none transition-colors"
          >
            <Star size={16} className={star <= val ? 'fill-amber-400 text-amber-400' : 'text-slate-300'} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7FBFC] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </motion.div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#00838F] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            Journey Completed
          </span>
          <h1 className="text-3xl font-black text-[#0B2545] mt-2 mb-1">
            Your {destination.name} Journey is Complete!
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            We hope you experienced the rich heritage, authentic Andhra flavors, and warm hospitality!
          </p>
        </div>

        {/* Expense Summary Chart Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[10px] font-black uppercase text-[#00838F]">Final Trip Ledger</span>
            <h3 className="text-xl font-black text-[#0B2545] mt-1 mb-4">Total Spending: ₹{grandTotal.toLocaleString()}</h3>
            
            <div className="space-y-2.5 text-xs">
              {expenseBreakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-600">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span className="font-bold text-[#0B2545]">₹{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleDownloadSummary}
              className="mt-6 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0B2545] rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Download size={14} /> Download Trip Summary (.txt)
            </button>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-Criteria Feedback Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 mb-8">
          <div className="flex items-center gap-2 text-[#00838F] text-xs font-black uppercase tracking-wider mb-1">
            <MessageSquare size={14} /> Traveler Feedback
          </div>
          <h2 className="text-xl font-black text-[#0B2545] mb-2">How was your SAHA Journey?</h2>
          <p className="text-xs text-slate-500 mb-6">
            Your honest ratings help refine AI route recommendations, dining suggestions, and regional safety alerts for future travelers.
          </p>

          {feedbackSubmitted ? (
            <div className="p-6 bg-teal-50 rounded-2xl text-center border border-teal-200">
              <CheckCircle2 size={32} className="text-emerald-600 mx-auto mb-2" />
              <h3 className="font-black text-sm text-[#0B2545]">Thank You for Your Feedback!</h3>
              <p className="text-xs text-slate-600 mt-1">Your ratings have been saved into SAHA’s continuous improvement engine.</p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                {renderStarInput(overallRating, setOverallRating, '⭐ Overall Experience with SAHA')}
                {renderStarInput(destinationRating, setDestinationRating, `📍 ${destination.name} Sights & Attractions`)}
                {renderStarInput(itineraryRating, setItineraryRating, '⏱️ Route & Timings Optimization')}
                {renderStarInput(hotelRating, setHotelRating, '🏨 Hotel & Stay Recommendations')}
                {renderStarInput(foodRating, setFoodRating, '🍛 Restaurant & Andhra Meals Quality')}
                {renderStarInput(aiRating, setAiRating, '🤖 Ask SAHA AI Assistant Contextual Help')}
                {renderStarInput(translatorRating, setTranslatorRating, '🗣️ Voice & Audio Translator')}
                {renderStarInput(emergencyRating, setEmergencyRating, '🚨 Emergency Assistance Readiness')}
              </div>

              <div className="pt-3">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Written Feedback & Suggestions for Future Tourists
                </label>
                <textarea
                  value={writtenFeedback}
                  onChange={(e) => setWrittenFeedback(e.target.value)}
                  placeholder="Share highlights, favorite Andhra dishes, or tips for other travelers..."
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs text-[#0B2545] focus:ring-2 focus:ring-[#0077B6] focus:outline-none h-24"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#0077B6] via-[#00838F] to-[#00A896] hover:from-[#0A3D62] hover:to-[#00695C] text-white rounded-2xl text-xs font-black shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send size={14} /> Submit Feedback
              </button>
            </form>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/planner"
            className="px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#E76F51] text-white rounded-2xl text-xs font-black shadow-md transition-all flex items-center gap-2"
          >
            <Plus size={15} /> Plan Another Andhra Journey
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl text-xs font-bold transition-all flex items-center gap-2"
          >
            <Home size={15} /> Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
