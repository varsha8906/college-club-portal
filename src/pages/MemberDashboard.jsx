import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import EventHistoryTable from '../components/EventHistoryTable';
import ActivityForm from '../components/ActivityForm';

function MemberDashboard({ user }) {
  const [refreshEvents, setRefreshEvents] = useState(false);

  useEffect(() => {
    console.log("MemberDashboard received user:", user);
  }, [user]);

  const handleActivityAdded = () => {
    setRefreshEvents(!refreshEvents);
  };

  return (
    <div className="member-dashboard">
      <h2>Member Dashboard</h2>
      <ProfileCard user={user} />
      <ActivityForm clubName={user.club} onActivityAdded={handleActivityAdded} />
      <EventHistoryTable clubName={user.club} key={refreshEvents} />
    </div>
  );
}

export default MemberDashboard;
