import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Explore from './pages/Explore';
import DestinationDetails from './pages/DestinationDetails';
import Planner from './pages/Planner';
import Itinerary from './pages/Itinerary';
import MyTrip from './pages/MyTrip';
import Transport from './pages/Transport';
import Language from './pages/Language';
import AskSaha from './pages/AskSaha';
import Safety from './pages/Safety';
import Profile from './pages/Profile';
import TripComplete from './pages/TripComplete';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppRoutes() {
  const { isAuthenticated } = useApp();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/destination/:slug"
          element={
            <ProtectedRoute>
              <DestinationDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <Planner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plan"
          element={<Navigate to="/planner" replace />}
        />
        <Route
          path="/itinerary"
          element={
            <ProtectedRoute>
              <Itinerary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-trip"
          element={
            <ProtectedRoute>
              <MyTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transport"
          element={
            <ProtectedRoute>
              <Transport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/language"
          element={
            <ProtectedRoute>
              <Language />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ask-saha"
          element={
            <ProtectedRoute>
              <AskSaha />
            </ProtectedRoute>
          }
        />
        <Route
          path="/safety"
          element={
            <ProtectedRoute>
              <Safety />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trip-complete"
          element={
            <ProtectedRoute>
              <TripComplete />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;
