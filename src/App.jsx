import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import PublicPage from "./pages/PublicPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./index.css";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

function AppContent() {
  const { user, logout } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #f8f4ff, #e0d4f7)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0, color: "#4A2C4A", fontWeight: "700" }}>
          Club Management
        </h1>

        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link to="/" style={{ color: "#4A2C4A", textDecoration: "none", fontWeight: 500 }}>
            Public
          </Link>
          <Link to="/leaderboard" style={{ color: "#4A2C4A", textDecoration: "none", fontWeight: 500 }}>
            Leaderboard
          </Link>
          {!user && (
            <Link to="/auth" style={{ color: "#4A2C4A", textDecoration: "none", fontWeight: 500 }}>
              Login
            </Link>
          )}
          {user && (
            <>
              <Link to="/dashboard" style={{ color: "#4A2C4A", textDecoration: "none", fontWeight: 500 }}>
                Dashboard
              </Link>
              <Link to="/profile" style={{ color: "#4A2C4A", textDecoration: "none", fontWeight: 500 }}>
                Profile
              </Link>
              <button
                onClick={logout}
                style={{
                  background: "#6B3FA0",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.4rem 1rem",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Main */}
      <main
        style={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
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
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          fontSize: "0.9rem",
          color: "#4A2C4A",
          opacity: 0.8,
          background: "rgba(255,255,255,0.7)",
          borderTop: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        © {new Date().getFullYear()} Club Management System
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router basename="/college-club-portal">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
