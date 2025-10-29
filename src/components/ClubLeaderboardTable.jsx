import React, { useState, useEffect } from 'react';
import { getDB } from '../db/initDB';

function ClubLeaderboardTable() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const db = getDB();
    const res = db.exec("SELECT name, points FROM clubs ORDER BY points DESC");
    if (res[0] && res[0].values) {
      const fetchedLeaderboard = res[0].values.map(row => ({
        name: row[0],
        points: row[1],
      }));
      setLeaderboard(fetchedLeaderboard);
    }
  }, []);

  return (
    <div className="club-leaderboard-table glass-card" style={{ marginBottom: '1rem' }}>
      <h3>Club Leaderboard</h3>
      {leaderboard.length === 0 ? (
        <p>No clubs on the leaderboard yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Club Name</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((club, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{club.name}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{club.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClubLeaderboardTable;
