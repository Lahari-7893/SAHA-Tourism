import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => storageService.getUser());
  const [currentTrip, setCurrentTrip] = useState(() => storageService.getCurrentTrip());
  const [favorites, setFavorites] = useState(() => storageService.getFavorites());
  const [settings, setSettings] = useState(() => storageService.getSettings());

  const isAuthenticated = !!user;

  // Persist state changes
  useEffect(() => {
    if (user) storageService.setUser(user);
    else storageService.clearUser();
  }, [user]);

  useEffect(() => {
    if (currentTrip) storageService.setCurrentTrip(currentTrip);
    else storageService.clearCurrentTrip();
  }, [currentTrip]);

  useEffect(() => {
    storageService.saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    storageService.saveSettings(settings);
  }, [settings]);

  // Auth
  const login = useCallback((userData) => {
    setUser({ ...userData, id: userData.id || Date.now().toString() });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentTrip(null);
  }, []);

  const loginAsGuest = useCallback(() => {
    setUser({ id: 'guest', name: 'Guest Traveler', email: '', isGuest: true });
  }, []);

  // Trip management
  const updateTrip = useCallback((tripData) => {
    setCurrentTrip(prev => prev ? { ...prev, ...tripData } : tripData);
  }, []);

  const startTrip = useCallback((tripData) => {
    const trip = {
      ...tripData,
      id: tripData.id || Date.now().toString(),
      status: 'active',
      startedAt: new Date().toISOString(),
      expenses: [],
      totalSpent: 0,
    };
    setCurrentTrip(trip);
    return trip;
  }, []);

  const completeTrip = useCallback(() => {
    if (!currentTrip) return null;
    const completed = {
      ...currentTrip,
      status: 'completed',
      completedAt: new Date().toISOString(),
    };
    storageService.saveTrip(completed);
    setCurrentTrip(null);
    return completed;
  }, [currentTrip]);

  // Expenses
  const addExpense = useCallback((expense) => {
    if (!currentTrip) return;
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setCurrentTrip(prev => {
      const expenses = [...(prev.expenses || []), newExpense];
      const totalSpent = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
      return { ...prev, expenses, totalSpent };
    });
  }, [currentTrip]);

  const removeExpense = useCallback((expenseId) => {
    setCurrentTrip(prev => {
      if (!prev) return prev;
      const expenses = (prev.expenses || []).filter(e => e.id !== expenseId);
      const totalSpent = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
      return { ...prev, expenses, totalSpent };
    });
  }, []);

  // Favorites
  const toggleFavorite = useCallback((type, itemId) => {
    setFavorites(prev => {
      const updated = { ...prev };
      if (!updated[type]) updated[type] = [];
      const idx = updated[type].indexOf(itemId);
      if (idx > -1) {
        updated[type] = updated[type].filter(id => id !== itemId);
      } else {
        updated[type] = [...updated[type], itemId];
      }
      return updated;
    });
  }, []);

  const isFavorite = useCallback((type, itemId) => {
    return (favorites[type] || []).includes(itemId);
  }, [favorites]);

  // Settings
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        // Auth
        user,
        isAuthenticated,
        login,
        logout,
        loginAsGuest,
        // Trip
        currentTrip,
        setCurrentTrip,
        updateTrip,
        startTrip,
        completeTrip,
        // Expenses
        addExpense,
        removeExpense,
        // Favorites
        favorites,
        toggleFavorite,
        isFavorite,
        // Settings
        settings,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
