import React from 'react';
import { useAuth } from '../context/AuthContext';
import MemberDashboard from './MemberDashboard';
import AdminDashboard from './AdminDashboard';

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <div className="glass-card">Loading user data...</div>; // Or redirect to login
  }

  return (
    <div className="dashboard-page">
      {user.role === 'Member' ? <MemberDashboard user={user} /> : <AdminDashboard user={user} />}
    </div>
  );
}

export default Dashboard;