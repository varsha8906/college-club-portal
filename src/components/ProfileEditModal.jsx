import React, { useState } from 'react';
import { getDB } from '../db/initDB';
import { useAuth } from '../context/AuthContext';

function ProfileEditModal({ user, onClose }) {
  const { updateUserInContext } = useAuth();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [club, setClub] = useState(user.club || '');
  const [profilePicture, setProfilePicture] = useState(user.profile_picture || null);
  const [message, setMessage] = useState('');
  const [clubs, setClubs] = useState([]);

  React.useEffect(() => {
    async function fetchClubs() {
      const db = getDB();
      const res = db.exec("SELECT name FROM clubs");
      if (res[0] && res[0].values) {
        setClubs(res[0].values.map(row => row[0]));
      }
    }
    fetchClubs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Store as base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const db = getDB();
    try {
      db.run("UPDATE users SET name = ?, email = ?, club = ?, profile_picture = ? WHERE id = ?", [name, email, club, profilePicture, user.id]);
      const updatedUser = { ...user, name, email, club, profile_picture: profilePicture };
      updateUserInContext(updatedUser);
      setMessage('Profile updated successfully!');
      onClose();
    } catch (e) {
      if (e.message.includes('UNIQUE constraint failed')) {
        setMessage('Email already in use.');
      } else {
        setMessage('Failed to update profile.');
        console.error(e);
      }
    }
  };

  return (
    <div className="modal" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div className="modal-content glass-card" style={{ width: '300px', padding: '2rem', textAlign: 'center' }}>
        <h3>Edit Profile</h3>
        <label style={{ display: 'block', margin: '10px 0' }}>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: 'none', outline: 'none', marginTop: '5px' }} />
        </label>
        <label style={{ display: 'block', margin: '10px 0' }}>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: 'none', outline: 'none', marginTop: '5px' }} />
        </label>
        {user.role === 'Member' && clubs.length > 0 && (
          <label style={{ display: 'block', margin: '10px 0' }}>
            Club:
            <select value={club} onChange={(e) => setClub(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: 'none', outline: 'none', marginTop: '5px' }}>
              {clubs.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        )}
        <label style={{ display: 'block', margin: '10px 0' }}>
          Profile Picture:
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: 'none', outline: 'none', marginTop: '5px' }} />
          {profilePicture && <img src={profilePicture} alt="Profile Preview" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px', borderRadius: '50%' }} />}
        </label>
        {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
        <button onClick={handleSave} className="glassy-button" style={{ marginTop: '1rem', marginRight: '10px' }}>Save</button>
        <button onClick={onClose} className="glassy-button" style={{ background: '#6c757d', marginTop: '1rem' }}>Cancel</button>
      </div>
    </div>
  );
}

export default ProfileEditModal;
