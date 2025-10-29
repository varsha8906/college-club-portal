import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import PublicPage from './pages/PublicPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

function AppContent() {
  const { user, logout } = useAuth();

  return (
    <div className="app-container">
      <header className="glass-card" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, color: '#4A2C4A' }}>Club Management</h1>
        <nav>
          <Link to="/" style={{ margin: '0 10px', color: '#333', textDecoration: 'none' }}>Public</Link>
          <Link to="/leaderboard" style={{ margin: '0 10px', color: '#333', textDecoration: 'none' }}>Leaderboard</Link>
          {!user && <Link to="/auth" style={{ margin: '0 10px', color: '#333', textDecoration: 'none' }}>Login</Link>}
          {user && <Link to="/dashboard" style={{ margin: '0 10px', color: '#333', textDecoration: 'none' }}>Dashboard</Link>}
          {user && <Link to="/profile" style={{ margin: '0 10px', color: '#333', textDecoration: 'none' }}>Profile</Link>}
          {user && <button onClick={logout} className="glassy-button" style={{ marginLeft: '10px', padding: '0.5rem 1rem' }}>Logout</button>}
        </nav>
      </header>

      <main style={{ padding: '1rem', marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;