import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Modal from '../components/Modal';
import BudgetDisplay from '../components/BudgetDisplay';
import { 
  MapPin, Calendar, CreditCard, Clock, Navigation, CheckCircle2, 
  Plus, MessageSquare, AlertTriangle, Compass, RefreshCw, Check,
  Utensils, Car, Ticket, ShoppingBag, Bed, Trash2, ArrowRight,
  Shield, Volume2, CloudRain
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyTrip() {
  const { currentTrip, updateTrip, addExpense, removeExpense, completeTrip } = useApp();
  const navigate = useNavigate();

  // Modals
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showReplanModal, setShowReplanModal] = useState(false);
  const [replanSuccess, setReplanSuccess] = useState('');

  // Expense form
  const [expenseData, setExpenseData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  // Visited stops tracker
  const [completedStops, setCompletedStops] = useState([]);

  if (!currentTrip) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-200 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Compass className="w-10 h-10 text-[#0077B6]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-2">No Active Trip Found</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            You don't have an ongoing trip in progress. Plan your custom journey to explore Andhra Pradesh!
          </p>
          <button 
            onClick={() => navigate('/planner')}
            className="w-full bg-gradient-to-r from-[#0077B6] to-[#00695C] text-white py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
          >
            Plan a New Trip
          </button>
        </motion.div>
      </div>
    );
  }

  const destination = currentTrip.destination || {};
  const stops = currentTrip.stops || [];
  const expenses = currentTrip.expenses || [];
  const totalBudget = currentTrip.planningParams?.totalBudget || currentTrip.summary?.estimatedCostAvg || 1000;
  const totalSpent = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const budgetRemaining = totalBudget - totalSpent;

  const toggleStopCompleted = (stopId) => {
    setCompletedStops(prev => 
      prev.includes(stopId) ? prev.filter(id => id !== stopId) : [...prev, stopId]
    );
  };

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseData.title || !expenseData.amount) return;
    
    addExpense({
      title: expenseData.title,
      amount: Number(expenseData.amount),
      category: expenseData.category,
      date: expenseData.date
    });

    setExpenseData({
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    });
    setShowExpenseModal(false);
  };

  const handleApplyReplan = (scenario) => {
    if (scenario === 'rain') {
      // Re-order stops so indoor/sheltered spots come first
      const modifiedStops = [...stops].sort((a, b) => {
        const aIndoor = (a.description || '').toLowerCase().includes('cave') || (a.description || '').toLowerCase().includes('museum');
        const bIndoor = (b.description || '').toLowerCase().includes('cave') || (b.description || '').toLowerCase().includes('museum');
        return bIndoor - aIndoor;
      });
      updateTrip({ stops: modifiedStops });
      setReplanSuccess('Itinerary adjusted for rainy weather: Indoor & heritage sites prioritized.');
    } else if (scenario === 'late') {
      // Remove last stop to fit remaining time
      if (stops.length > 2) {
        const modifiedStops = stops.slice(0, -1);
        updateTrip({ stops: modifiedStops });
        setReplanSuccess('Adjusted for time constraint: Final stop removed to keep rest of schedule relaxed.');
      } else {
        setReplanSuccess('Schedule compressed by 30 minutes for faster transitions.');
      }
    } else if (scenario === 'budget') {
      setReplanSuccess('Transport guidance updated: Recommended Auto / City Bus over Cabs.');
    }
    setTimeout(() => {
      setShowReplanModal(false);
      setReplanSuccess('');
    }, 2000);
  };

  const handleCompleteTrip = () => {
    const finalized = completeTrip();
    navigate('/trip-complete', { state: { trip: finalized || currentTrip, totalSpent } });
  };

  const nextStop = stops.find(s => !completedStops.includes(s.id)) || stops[stops.length - 1];

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Food': return <Utensils className="w-4 h-4 text-orange-600" />;
      case 'Transport': return <Car className="w-4 h-4 text-blue-600" />;
      case 'Activities': return <Ticket className="w-4 h-4 text-purple-600" />;
      case 'Accommodation': return <Bed className="w-4 h-4 text-emerald-600" />;
      case 'Shopping': return <ShoppingBag className="w-4 h-4 text-pink-600" />;
      default: return <CreditCard className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Live Trip Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Active Trip
              </span>
              <span className="text-slate-500 text-xs font-semibold">
                {currentTrip.summary?.travelers || 1} Travelers &bull; {destination.district}, {destination.state}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1B2A4A]">
              Exploring {destination.name || 'Andhra Pradesh'}
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            <button 
              onClick={() => setShowReplanModal(true)}
              className="bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-[#00838F]" /> Replan Day
            </button>
            <button 
              onClick={() => navigate('/ask-saha')}
              className="bg-sky-50 border border-sky-200 text-[#0077B6] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-sky-100 transition-colors flex items-center shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Ask SAHA
            </button>
            <button 
              onClick={handleCompleteTrip}
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center shadow-md shadow-emerald-600/20"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Complete Trip
            </button>
          </div>
        </div>

        {/* Live Trip Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center text-slate-500 text-xs font-semibold mb-1">
              <Clock className="w-4 h-4 mr-1.5 text-[#00838F]" /> Total Planned
            </div>
            <div className="text-lg sm:text-xl font-black text-[#1B2A4A]">{currentTrip.summary?.totalTime || '5 Hours'}</div>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center text-slate-500 text-xs font-semibold mb-1">
              <CreditCard className="w-4 h-4 mr-1.5 text-[#00838F]" /> Remaining Budget
            </div>
            <div className={`text-lg sm:text-xl font-black ${budgetRemaining >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              ₹{budgetRemaining}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center text-slate-500 text-xs font-semibold mb-1">
              <MapPin className="w-4 h-4 mr-1.5 text-[#00838F]" /> Places Completed
            </div>
            <div className="text-lg sm:text-xl font-black text-[#1B2A4A]">
              {completedStops.length} / {stops.length} Stops
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center text-slate-500 text-xs font-semibold mb-1">
              <Navigation className="w-4 h-4 mr-1.5 text-[#0077B6]" /> Next Destination
            </div>
            <div className="text-lg sm:text-xl font-black text-[#0077B6] truncate">
              {nextStop ? nextStop.name : 'All stops done!'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Live Itinerary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-black text-[#1B2A4A]">Live Itinerary Timeline</h3>
                  <p className="text-xs text-slate-500">Tap checkbox to mark attractions as visited</p>
                </div>
                <button 
                  onClick={() => setShowReplanModal(true)}
                  className="text-[#0077B6] text-xs font-bold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Replan Stops
                </button>
              </div>
              
              <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
                {stops.map((stop, index) => {
                  const isDone = completedStops.includes(stop.id);
                  return (
                    <div key={stop.id || index} className="relative pl-6">
                      {/* Node circle */}
                      <button
                        onClick={() => toggleStopCompleted(stop.id)}
                        className={`absolute -left-3 top-1 w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-all ${
                          isDone 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-slate-200 hover:bg-[#0077B6] text-transparent hover:text-white'
                        }`}
                        title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>

                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-bold">{stop.arrivalTime} &bull; {stop.duration} visit</span>
                        {stop.transport && (
                          <span className="text-[#00838F] font-semibold">
                            {stop.transport.mode} ({stop.transport.estimatedCost})
                          </span>
                        )}
                      </div>

                      <div className={`p-4 rounded-2xl border transition-all ${
                        isDone 
                          ? 'bg-slate-50 border-slate-200 opacity-60' 
                          : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`font-bold text-base ${isDone ? 'line-through text-slate-500' : 'text-[#1B2A4A]'}`}>
                              {stop.name}
                            </h4>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{stop.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                          <span className="text-slate-500 font-medium">
                            Entry: <strong>{stop.entryFee}</strong>
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleStopCompleted(stop.id)}
                              className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors ${
                                isDone 
                                  ? 'bg-slate-200 text-slate-700' 
                                  : 'bg-sky-50 text-[#0077B6] hover:bg-sky-100'
                              }`}
                            >
                              {isDone ? 'Visited' : 'Mark Done'}
                            </button>
                            <Link 
                              to={`/destination/${destination.slug || 'vijayawada'}`}
                              className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold text-xs transition-colors"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Quick Action Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button 
                onClick={() => navigate('/transport')}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-teal-50 text-[#00838F] rounded-xl">
                    <Car className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm text-[#1B2A4A]">Local Transport Guide</h4>
                    <p className="text-xs text-slate-500">Auto, Cab, Bus fares in {destination.name}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => navigate('/safety')}
                className="bg-rose-50 p-4 rounded-2xl shadow-sm border border-rose-100 flex items-center justify-between hover:bg-rose-100/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm text-rose-900">Safety & Emergency</h4>
                    <p className="text-xs text-rose-700">Dial 112, Safety Tips, Check-in</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Expense Tracker & Travel Helpers */}
          <div className="space-y-6">
            
            {/* Expense Tracker Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-lg font-black text-[#1B2A4A]">Expense Tracker</h3>
                  <p className="text-xs text-slate-500">Real-time spend vs ₹{totalBudget}</p>
                </div>
                <button 
                  onClick={() => setShowExpenseModal(true)}
                  className="p-2 bg-[#0077B6] hover:bg-[#00695C] text-white rounded-xl shadow transition-colors"
                  title="Add Expense"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">Spent: ₹{totalSpent}</span>
                  <span className="text-slate-600">Budget: ₹{totalBudget}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      totalSpent > totalBudget ? 'bg-rose-500' : 'bg-gradient-to-r from-[#0077B6] to-[#00695C]'
                    }`}
                    style={{ width: `${Math.min(100, (totalSpent / Math.max(1, totalBudget)) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1.5">
                  <span>{Math.round((totalSpent / Math.max(1, totalBudget)) * 100)}% Used</span>
                  <span className={budgetRemaining >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                    ₹{budgetRemaining} left
                  </span>
                </div>
              </div>

              {/* Expenses List */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Recorded Expenses ({expenses.length})
                </h4>
                
                {expenses.length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl">
                    <p className="text-xs text-slate-500 mb-2">No expenses added yet</p>
                    <button
                      onClick={() => setShowExpenseModal(true)}
                      className="text-xs font-bold text-[#0077B6] hover:underline"
                    >
                      + Add your first expense
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {expenses.map((exp) => (
                      <div 
                        key={exp.id}
                        className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                            {getCategoryIcon(exp.category)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{exp.title}</p>
                            <p className="text-[10px] text-slate-400">{exp.category} &bull; {exp.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900">₹{exp.amount}</span>
                          <button
                            onClick={() => removeExpense(exp.id)}
                            className="text-slate-300 hover:text-rose-500"
                            title="Delete expense"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Language Quick Assistance Widget */}
            <div className="bg-gradient-to-br from-[#0077B6] to-[#00695C] rounded-3xl shadow-md p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-sky-300" /> Telugu Audio Phrases
                </h3>
                <Link 
                  to="/language"
                  className="text-xs font-bold text-sky-200 hover:text-white underline"
                >
                  All 25+
                </Link>
              </div>
              <div className="space-y-2.5">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                  <p className="text-[11px] text-sky-200">How much is this?</p>
                  <p className="font-bold text-sm">Idhi entha? (ఇది ఎంత?)</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                  <p className="text-[11px] text-sky-200">Take me to this temple</p>
                  <p className="font-bold text-sm">Nannu ee gudi daggiriki teesukellandi</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        title="Record Trip Expense"
      >
        <form onSubmit={handleAddExpenseSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expense Title</label>
            <input 
              type="text"
              required
              placeholder="e.g. Auto fare to temple, Lunch at hotel..."
              value={expenseData.title}
              onChange={(e) => setExpenseData({ ...expenseData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Amount (₹)</label>
              <input 
                type="number"
                required
                min="1"
                placeholder="150"
                value={expenseData.amount}
                onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={expenseData.category}
                onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0077B6] bg-white"
              >
                <option value="Food">Food & Dining</option>
                <option value="Transport">Transport (Auto/Cab)</option>
                <option value="Activities">Entry Fees & Sightseeing</option>
                <option value="Accommodation">Stay / Hotel</option>
                <option value="Shopping">Shopping & Souvenirs</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#0077B6] hover:bg-[#00695C] text-white font-bold text-sm rounded-xl transition-colors shadow"
          >
            Save Expense
          </button>
        </form>
      </Modal>

      {/* Replan Day Modal */}
      <Modal
        isOpen={showReplanModal}
        onClose={() => setShowReplanModal(false)}
        title="Dynamic Day Replanning"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            Has your travel context changed? Choose an on-ground condition to dynamically adapt your itinerary:
          </p>

          {replanSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold">
              {replanSuccess}
            </div>
          )}

          <div className="space-y-2.5">
            <button
              onClick={() => handleApplyReplan('rain')}
              className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-[#0077B6] hover:bg-sky-50 text-left transition-all flex items-start gap-3"
            >
              <CloudRain className="w-5 h-5 text-[#0077B6] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-[#1B2A4A]">Rain or Bad Weather Expected</h4>
                <p className="text-xs text-slate-500">Swap outdoor locations with sheltered caves, museums, and temples</p>
              </div>
            </button>

            <button
              onClick={() => handleApplyReplan('late')}
              className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-[#0077B6] hover:bg-sky-50 text-left transition-all flex items-start gap-3"
            >
              <Clock className="w-5 h-5 text-[#00838F] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-[#1B2A4A]">Running 1-2 Hours Behind Schedule</h4>
                <p className="text-xs text-slate-500">Compress durations or optimize remaining stops to prevent rushing</p>
              </div>
            </button>

            <button
              onClick={() => handleApplyReplan('budget')}
              className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-[#0077B6] hover:bg-sky-50 text-left transition-all flex items-start gap-3"
            >
              <CreditCard className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-[#1B2A4A]">Tight Budget Remaining</h4>
                <p className="text-xs text-slate-500">Switch transport mode to shared auto / public transit to save funds</p>
              </div>
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
