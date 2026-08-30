import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { replanForDelay } from '../services/itineraryService';
import Modal from '../components/Modal';
import BudgetDisplay from '../components/BudgetDisplay';
import { 
  MapPin, Calendar, CreditCard, Clock, Navigation, CheckCircle2, 
  Plus, MessageSquare, AlertTriangle, Compass, RefreshCw, Check,
  Utensils, Car, Ticket, ShoppingBag, Bed, Trash2, ArrowRight,
  Shield, Volume2, CloudRain, Download, Bookmark
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyTrip() {
  const { currentTrip, updateTrip, addExpense, removeExpense, completeTrip } = useApp();
  const navigate = useNavigate();

  // Tabs: 'active' | 'offline'
  const [activeTab, setActiveTab] = useState('active');
  const [offlineTrips, setOfflineTrips] = useState([]);

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

  useEffect(() => {
    try {
      const storedOffline = JSON.parse(localStorage.getItem('saha_offline_trips') || '[]');
      setOfflineTrips(storedOffline);
    } catch (e) {
      console.error('Failed to load offline trips:', e);
    }
  }, []);

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
      setReplanSuccess('Itinerary adjusted for rainy weather: Indoor & cave sites prioritized.');
    } else if (scenario === 'late') {
      setReplanSuccess('Schedule compressed by 30 mins to ensure sunset arrival by 5:30 PM.');
    } else if (scenario === 'budget') {
      setReplanSuccess('Budget Mode active: Recommended Auto sharing & affordable Andhra Meals.');
    }
    setTimeout(() => {
      setShowReplanModal(false);
      setReplanSuccess('');
    }, 2000);
  };

  const toggleStopCompleted = (stopId) => {
    setCompletedStops(prev => 
      prev.includes(stopId) ? prev.filter(id => id !== stopId) : [...prev, stopId]
    );
  };

  const handleFinishTrip = () => {
    completeTrip();
    navigate('/trip-complete', { state: { trip: currentTrip } });
  };

  const handleTriggerDelayReplan = () => {
    if (!currentTrip) return;
    const replanned = replanForDelay(currentTrip, 90); // 1h 30m delay
    updateTrip(replanned);
  };

  const handleDeleteOfflineTrip = (id) => {
    const updated = offlineTrips.filter(t => t.id !== id);
    setOfflineTrips(updated);
    localStorage.setItem('saha_offline_trips', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#00838F] text-xs font-black uppercase tracking-wider mb-1">
              <Compass size={13} /> Live Travel Hub
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0B2545]">My Travel Dashboard</h1>
          </div>

          <div className="inline-flex p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'active'
                  ? 'bg-gradient-to-r from-[#0077B6] to-[#00A896] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0077B6]'
              }`}
            >
              Active Live Trip {currentTrip ? '🟢' : ''}
            </button>
            <button
              onClick={() => setActiveTab('offline')}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'offline'
                  ? 'bg-gradient-to-r from-[#0077B6] to-[#00A896] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0077B6]'
              }`}
            >
              My Offline Trips ({offlineTrips.length})
            </button>
          </div>
        </div>

        {/* TAB 1: ACTIVE TRIP */}
        {activeTab === 'active' && (
          <>
            {!currentTrip ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
                <div className="w-16 h-16 bg-teal-50 text-[#0077B6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Compass size={32} />
                </div>
                <h3 className="text-xl font-black text-[#0B2545] mb-2">No Active Trip in Progress</h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Generate a personalized day-by-day plan with SAHA's AI trip planner to start tracking live progress and expenses!
                </p>
                <Link
                  to="/planner"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#E76F51] text-white rounded-2xl text-xs font-black shadow-md"
                >
                  Plan a New Journey →
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* Delay Alert Notification */}
                {currentTrip.delayAlert && (
                  <div className="p-4 rounded-2xl bg-amber-500 text-white shadow-md text-xs font-extrabold flex items-center gap-2">
                    <RefreshCw size={16} className="animate-spin" />
                    <span>{currentTrip.delayAlert}</span>
                  </div>
                )}
                
                {/* Active Trip Banner */}
                <div className="bg-gradient-to-r from-[#031926] via-[#0B2545] to-[#0077B6] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <span className="text-[10px] font-black uppercase text-teal-300 bg-teal-500/20 px-2.5 py-0.5 rounded-md border border-teal-500/30">
                      Live Journey Active
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black mt-2 mb-1">
                      {currentTrip.destination?.name || 'Andhra Pradesh'}
                    </h2>
                    <p className="text-xs text-slate-300">
                      {completedStops.length} of {(currentTrip.stops || []).length} stops visited • {currentTrip.days || 1} Day(s)
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={handleTriggerDelayReplan}
                      className="px-4 py-2 bg-amber-400 text-slate-900 rounded-xl text-xs font-black shadow-sm hover:bg-amber-300 transition-all flex items-center gap-1.5"
                      title="Spent extra time? Let SAHA recalculate!"
                    >
                      <Clock size={14} /> ⏱️ Running Late? (Auto-Replan)
                    </button> 
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setShowReplanModal(true)}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/30 backdrop-blur-sm transition-all flex items-center gap-1.5"
                    >
                      <RefreshCw size={13} /> Replan My Day
                    </button>
                    <button
                      onClick={() => setShowExpenseModal(true)}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/30 backdrop-blur-sm transition-all flex items-center gap-1.5"
                    >
                      <Plus size={14} /> Add Expense
                    </button>
                    <button
                      onClick={handleFinishTrip}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Check size={14} /> Complete Trip
                    </button>
                  </div>
                </div>

                {/* Grid: Stops Checklist vs Expense Tracker */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left: Stops Checklist */}
                  <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 space-y-4">
                    <h3 className="text-base font-black text-[#0B2545] flex items-center justify-between">
                      <span>Today's Timeline Checklist</span>
                      <span className="text-xs font-bold text-slate-500">Tap to mark visited</span>
                    </h3>

                    <div className="space-y-3">
                      {(currentTrip.stops || []).map((stop, idx) => {
                        const isDone = completedStops.includes(stop.id || idx);
                        return (
                          <div
                            key={stop.id || idx}
                            onClick={() => toggleStopCompleted(stop.id || idx)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                              isDone
                                ? 'bg-emerald-50/50 border-emerald-200 opacity-60'
                                : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-xs'
                            }`}
                          >
                            <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                              isDone ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                            }`}>
                              {isDone && <Check size={13} strokeWidth={3} />}
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-black text-[#0B2545]">{stop.title || stop.name}</span>
                                <span className="text-[10px] font-bold text-slate-400">{stop.time}</span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{stop.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Real-Time Expenses */}
                  <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-900/10 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-black text-[#0B2545]">Live Expense Tracker</h3>
                      <button
                        onClick={() => setShowExpenseModal(true)}
                        className="text-xs font-black text-[#0077B6] hover:underline"
                      >
                        + Add Expense
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(currentTrip.expenses || []).map((exp, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                          <div>
                            <p className="font-bold text-[#0B2545]">{exp.title}</p>
                            <span className="text-[10px] text-slate-400">{exp.category} • {exp.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-[#0B2545]">₹{exp.amount}</span>
                            <button
                              onClick={() => removeExpense(i)}
                              className="text-slate-300 hover:text-rose-600"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}

                      {(!currentTrip.expenses || currentTrip.expenses.length === 0) && (
                        <p className="text-xs text-slate-400 py-4 text-center">
                          No expenses logged yet. Tap "+ Add Expense" to record meals, auto fares, and tickets.
                        </p>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            )}
          </>
        )}

        {/* TAB 2: MY OFFLINE TRIPS */}
        {activeTab === 'offline' && (
          <div className="space-y-6">
            <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 flex items-center justify-between text-xs text-[#00838F]">
              <span className="font-bold">
                📱 Offline Storage: These itineraries are cached locally in your browser and can be accessed with zero internet connectivity.
              </span>
            </div>

            {offlineTrips.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Bookmark size={36} className="text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-black text-[#0B2545]">No Offline Trips Saved Yet</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  When you view any generated itinerary, tap "Save for Offline" to store it for remote travel.
                </p>
                <Link
                  to="/planner"
                  className="px-5 py-2.5 bg-[#0077B6] text-white rounded-xl text-xs font-black"
                >
                  Create an Itinerary
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offlineTrips.map(trip => (
                  <div key={trip.id} className="bg-white rounded-3xl p-6 shadow-xs border border-teal-900/10 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black uppercase text-[#00838F] bg-teal-50 px-2 py-0.5 rounded-md">
                          Cached Offline
                        </span>
                        <button
                          onClick={() => handleDeleteOfflineTrip(trip.id)}
                          className="text-slate-300 hover:text-rose-500"
                          title="Delete offline trip"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <h3 className="text-lg font-black text-[#0B2545]">{trip.destination?.name || 'Andhra Pradesh'}</h3>
                      <p className="text-xs text-slate-500 mb-4">{trip.days || 1} Day(s) • {trip.travelers || 2} Travelers</p>

                      <div className="space-y-1 text-xs text-slate-600 mb-4">
                        <p>• Estimated Budget: <strong>₹{trip.grandTotalCost || 4000}</strong></p>
                        <p>• Total Stops: <strong>{trip.dailyPlans?.[0]?.stops?.length || 4} Sights & Meals</strong></p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/itinerary', { state: { planningData: { destinationId: trip.destination?.id, days: trip.days, travelers: trip.travelers } } })}
                      className="w-full py-2.5 bg-slate-100 hover:bg-[#0077B6] hover:text-white text-[#0B2545] rounded-xl text-xs font-bold transition-all text-center"
                    >
                      Open Full Offline Itinerary →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Expense Modal */}
        {showExpenseModal && (
          <Modal title="Log Travel Expense" onClose={() => setShowExpenseModal(false)}>
            <form onSubmit={handleAddExpenseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expense Title</label>
                <input
                  type="text"
                  placeholder="e.g. Subbayya Gari Lunch, Auto to Temple"
                  value={expenseData.title}
                  onChange={(e) => setExpenseData({ ...expenseData, title: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="250"
                    value={expenseData.amount}
                    onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={expenseData.category}
                    onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2545] bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  >
                    <option value="Food">Food & Dining</option>
                    <option value="Transport">Auto & Cab</option>
                    <option value="EntryFee">Entry Tickets</option>
                    <option value="Hotel">Hotel Stay</option>
                    <option value="Shopping">Handicrafts</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0077B6] hover:bg-[#00695C] text-white rounded-xl text-xs font-black shadow-md transition-colors"
              >
                Record Expense
              </button>
            </form>
          </Modal>
        )}

        {/* Replan Modal */}
        {showReplanModal && (
          <Modal title="Dynamic Day Replanner" onClose={() => setShowReplanModal(false)}>
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Encountered unexpected delays or weather changes? Choose a scenario to adjust your timeline:
              </p>

              {replanSuccess ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold">
                  ✓ {replanSuccess}
                </div>
              ) : (
                <div className="space-y-2.5">
                  <button
                    onClick={() => handleApplyReplan('rain')}
                    className="w-full p-3.5 bg-slate-50 hover:bg-teal-50 rounded-xl text-left border border-slate-200 transition-colors"
                  >
                    <p className="text-xs font-black text-[#0B2545]">🌧️ Unexpected Rain / Heavy Weather</p>
                    <span className="text-[10px] text-slate-500">Prioritizes caves, covered temples, and indoor museums.</span>
                  </button>

                  <button
                    onClick={() => handleApplyReplan('late')}
                    className="w-full p-3.5 bg-slate-50 hover:bg-teal-50 rounded-xl text-left border border-slate-200 transition-colors"
                  >
                    <p className="text-xs font-black text-[#0B2545]">⏰ Running 1 Hour Behind Schedule</p>
                    <span className="text-[10px] text-slate-500">Compresses visit durations so you catch sunset viewpoints on time.</span>
                  </button>

                  <button
                    onClick={() => handleApplyReplan('budget')}
                    className="w-full p-3.5 bg-slate-50 hover:bg-teal-50 rounded-xl text-left border border-slate-200 transition-colors"
                  >
                    <p className="text-xs font-black text-[#0B2545]">💰 Budget Conservation Mode</p>
                    <span className="text-[10px] text-slate-500">Switches recommendations to shared autos, APSRTC, and low-cost tiffins.</span>
                  </button>
                </div>
              )}
            </div>
          </Modal>
        )}

      </div>
    </div>
  );
}
