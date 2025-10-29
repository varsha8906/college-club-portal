import React from 'react';

function ProfileCard({ user }) {
  return (
    <div className="profile-card glass-card" style={{ marginBottom: '1rem' }}>
      <h3>Your Profile</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Club:</strong> {user.club}</p>
    </div>
  );
}

export default ProfileCard;
