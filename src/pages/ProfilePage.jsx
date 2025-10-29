import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileEditModal from '../components/ProfileEditModal';

function ProfilePage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return <div className="glass-card">Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-page glass-card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Your Profile</h2>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <img src={user.profile_picture || `https://i.pravatar.cc/150?img=${user.id || 3}`} alt="Profile Avatar" style={{ width: '120px', height: '120px', borderRadius: '50%', border: '3px solid rgba(255, 255, 255, 0.4)', objectFit: 'cover' }} />
      </div>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {user.role === 'Member' && <p><strong>Club:</strong> {user.club}</p>}
      {/* Add year if applicable, based on your schema */}

      <button onClick={() => setIsModalOpen(true)} className="glassy-button" style={{ width: '100%', marginTop: '1.5rem' }}>
        Edit Profile
      </button>

      {isModalOpen && (
        <ProfileEditModal
          user={user}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ProfilePage;
