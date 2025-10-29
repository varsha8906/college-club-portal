import React from 'react';
import LeaderboardCard from '../components/LeaderboardCard';
import EventShowcase from '../components/EventShowcase';

function PublicPage() {
  return (
    <div className="public-page">
      <div className="glass-card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2>Welcome to Club Management Portal</h2>
        <p>Discover college clubs, track activities, and manage events.</p>
      </div>
      <LeaderboardCard />
      <EventShowcase />
    </div>
  );
}

export default PublicPage;
