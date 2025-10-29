import React, { useState, useEffect } from 'react';
import { getDB } from '../db/initDB';

function LeaderboardCard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = () => {
    const db = getDB();
    const res = db.exec("SELECT user_name, club_name, total_points FROM leaderboard ORDER BY total_points DESC");
    if (res[0] && res[0].values) {
      const fetchedLeaderboard = res[0].values.map(row => ({
        userName: row[0],
        clubName: row[1],
        points: row[2],
      }));
      setLeaderboard(fetchedLeaderboard);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-card glass-card" style={{ width: '80%', margin: '2rem auto', padding: '1.5rem' }}>
      <h2 style={{ fontWeight: 600, marginBottom: '1.5rem', color: '#4A2C4A' }}>🏆 RIT Club Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p style={{ color: '#333' }}>No entries on the leaderboard yet.</p>
      ) : (
        <div className="leaderboard">
          <div className="row header" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 3fr 1fr', padding: '0.75rem', borderRadius: '12px', margin: '0.4rem 0', backgroundColor: 'rgba(255, 255, 255, 0.2)', fontWeight: 'bold' }}>
            <span>Rank</span>
            <span>Name</span>
            <span>Club</span>
            <span>Points</span>
          </div>
          {leaderboard.map((entry, index) => (
            <div key={index} className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 3fr 1fr', padding: '0.75rem', borderRadius: '12px', margin: '0.4rem 0', backgroundColor: 'rgba(255, 255, 255, 0.07)', transition: '0.3s' }}>
              <span>{index + 1}</span>
              <span>{entry.userName}</span>
              <span>{entry.clubName}</span>
              <span>{entry.points}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LeaderboardCard;