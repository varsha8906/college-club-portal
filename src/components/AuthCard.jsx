import React, { useState } from 'react';
import { getDB } from '../db/initDB';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AuthCard({ isLogin, toggleAuthMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Member');
  const [club, setClub] = useState('');
  const [message, setMessage] = useState('');
  const [clubs, setClubs] = useState([]);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchClubs() {
      const db = getDB();
      const res = db.exec("SELECT name FROM clubs");
      if (res[0] && res[0].values) {
        setClubs(res[0].values.map(row => row[0]));
        if (!club && res[0].values.length > 0) {
          setClub(res[0].values[0][0]); // Set default club
        }
      }
    }
    fetchClubs();
  }, [club]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (isLogin) {
      // Login logic
      const success = login(email, password);
      if (success) {
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        setMessage('Invalid credentials.');
      }
    } else {
      // Signup logic
      const result = signup(name, email, password, role, club);
      if (result === true) {
        setMessage('Signup successful! Please log in.');
        toggleAuthMode(); // Switch to login form after successful signup
      } else if (typeof result === 'string') {
        setMessage(result);
      } else {
        setMessage('Signup failed.');
      }
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '5px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.5)' }}>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
            {role === 'Member' && clubs.length > 0 && (
              <select value={club} onChange={(e) => setClub(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '5px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.5)' }}>
                {clubs.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )}
          </>
        )}
        <button type="submit" className="glassy-button" style={{ width: '100%' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
      <p style={{ marginTop: '1rem' }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <span onClick={toggleAuthMode} style={{ color: '#8A2BE2', cursor: 'pointer', textDecoration: 'underline' }}>
          {isLogin ? 'Sign Up' : 'Login'}
        </span>
      </p>
    </div>
  );
}

export default AuthCard;
