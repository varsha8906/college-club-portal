import React, { createContext, useState, useContext, useEffect } from 'react';
import { getDB } from '../db/initDB';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const db = getDB();
    const res = db.exec("SELECT id, name, email, role, club, profile_picture FROM users WHERE email = ? AND password = ?", [email, password]);
    if (res[0] && res[0].values.length > 0) {
      const userData = res[0].values[0];
      const loggedInUser = {
        id: userData[0],
        name: userData[1],
        email: userData[2],
        role: userData[3],
        club: userData[4],
        profile_picture: userData[5],
      };
      setUser(loggedInUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      return loggedInUser;
    }
    return null;
  };

  const signup = (name, email, password, role, club) => {
    const db = getDB();
    try {
      db.run("INSERT INTO users (name, email, password, role, club, profile_picture) VALUES (?, ?, ?, ?, ?, ?)", [name, email, password, role, club, null]);
      return true;
    } catch (e) {
      if (e.message.includes('UNIQUE constraint failed')) {
        return 'Email already registered.';
      }
      console.error(e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUserInContext = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUserInContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
