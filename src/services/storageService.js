const KEYS = {
  USER: 'saha_user',
  CURRENT_TRIP: 'saha_current_trip',
  SAVED_TRIPS: 'saha_saved_trips',
  EXPENSES: 'saha_expenses',
  FAVORITES: 'saha_favorites',
  SETTINGS: 'saha_settings',
  CHAT_HISTORY: 'saha_chat_history',
};

function safeGet(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

export const storageService = {
  // User
  getUser: () => safeGet(KEYS.USER),
  setUser: (user) => safeSet(KEYS.USER, user),
  clearUser: () => localStorage.removeItem(KEYS.USER),

  // Current Trip
  getCurrentTrip: () => safeGet(KEYS.CURRENT_TRIP),
  setCurrentTrip: (trip) => safeSet(KEYS.CURRENT_TRIP, trip),
  saveCurrentTrip: (trip) => safeSet(KEYS.CURRENT_TRIP, trip),
  clearCurrentTrip: () => localStorage.removeItem(KEYS.CURRENT_TRIP),

  // Saved Trips
  getSavedTrips: () => safeGet(KEYS.SAVED_TRIPS, []),
  saveTrip: (trip) => {
    const trips = safeGet(KEYS.SAVED_TRIPS, []);
    const tripWithId = { ...trip, id: trip.id || Date.now().toString(), savedAt: new Date().toISOString() };
    trips.push(tripWithId);
    safeSet(KEYS.SAVED_TRIPS, trips);
    return tripWithId;
  },
  removeSavedTrip: (tripId) => {
    const trips = safeGet(KEYS.SAVED_TRIPS, []);
    safeSet(KEYS.SAVED_TRIPS, trips.filter(t => t.id !== tripId));
  },

  // Expenses
  getExpenses: (tripId) => {
    const all = safeGet(KEYS.EXPENSES, {});
    return all[tripId] || [];
  },
  addExpense: (tripId, expense) => {
    const all = safeGet(KEYS.EXPENSES, {});
    if (!all[tripId]) all[tripId] = [];
    const expenseWithId = { ...expense, id: Date.now().toString(), createdAt: new Date().toISOString() };
    all[tripId].push(expenseWithId);
    safeSet(KEYS.EXPENSES, all);
    return expenseWithId;
  },
  removeExpense: (tripId, expenseId) => {
    const all = safeGet(KEYS.EXPENSES, {});
    if (all[tripId]) {
      all[tripId] = all[tripId].filter(e => e.id !== expenseId);
      safeSet(KEYS.EXPENSES, all);
    }
  },
  getTotalSpent: (tripId) => {
    const expenses = safeGet(KEYS.EXPENSES, {})[tripId] || [];
    return expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  },

  // Favorites
  getFavorites: () => safeGet(KEYS.FAVORITES, { destinations: [], attractions: [], food: [] }),
  saveFavorites: (favs) => safeSet(KEYS.FAVORITES, favs),
  toggleFavorite: (type, itemId) => {
    const favs = safeGet(KEYS.FAVORITES, { destinations: [], attractions: [], food: [] });
    if (!favs[type]) favs[type] = [];
    const idx = favs[type].indexOf(itemId);
    if (idx > -1) {
      favs[type].splice(idx, 1);
    } else {
      favs[type].push(itemId);
    }
    safeSet(KEYS.FAVORITES, favs);
    return favs;
  },
  isFavorite: (type, itemId) => {
    const favs = safeGet(KEYS.FAVORITES, { destinations: [], attractions: [], food: [] });
    return (favs[type] || []).includes(itemId);
  },

  // Settings
  getSettings: () => safeGet(KEYS.SETTINGS, { language: 'en', currency: 'INR', theme: 'light' }),
  saveSettings: (settings) => safeSet(KEYS.SETTINGS, settings),
  updateSettings: (partial) => {
    const current = safeGet(KEYS.SETTINGS, { language: 'en', currency: 'INR', theme: 'light' });
    safeSet(KEYS.SETTINGS, { ...current, ...partial });
  },

  // Chat History
  getChatHistory: () => safeGet(KEYS.CHAT_HISTORY, []),
  saveChatHistory: (history) => safeSet(KEYS.CHAT_HISTORY, history),
  clearChatHistory: () => localStorage.removeItem(KEYS.CHAT_HISTORY),

  // Clear all
  clearAll: () => {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  },

  // Passport & Visited Destinations
  getVisitedDestinations: () => safeGet('saha_visited_destinations', []),
  markDestinationVisited: (destId) => {
    const visited = safeGet('saha_visited_destinations', []);
    if (!visited.includes(destId)) {
      visited.push(destId);
      safeSet('saha_visited_destinations', visited);
    }
    return visited;
  },
  resetPassport: () => safeSet('saha_visited_destinations', []),
};
