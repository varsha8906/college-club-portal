import React from 'react';
import ClubLeaderboardTable from '../components/ClubLeaderboardTable';
import ManageEventsPanel from '../components/ManageEventsPanel';

function AdminDashboard({ user }) {
  return (
    <div className="admin-dashboard">
      <div className="glass-card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2>Admin Dashboard</h2>
        <p>Welcome, {user.name}!</p>
      </div>
      <ClubLeaderboardTable />
      <ManageEventsPanel />
    </div>
  );
}

export default AdminDashboard;
