import React, { useState, useEffect } from 'react';
import { getDB } from '../db/initDB';

function EventHistoryTable({ clubName }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const db = getDB();
    const res = db.exec("SELECT title, date, description, image FROM events WHERE club = ? ORDER BY date DESC", [clubName]);
    if (res[0] && res[0].values) {
      const fetchedEvents = res[0].values.map(row => ({
        title: row[0],
        date: row[1],
        description: row[2],
        image: row[3],
      }));
      setEvents(fetchedEvents);
    }
  }, [clubName]);

  return (
    <div className="event-history-table glass-card" style={{ marginBottom: '1rem' }}>
      <h3>Your Club's Activities</h3>
      {events.length === 0 ? (
        <p>No activities recorded yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Image</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{event.date}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{event.title}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{event.description}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  {event.image && <img src={event.image} alt={event.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EventHistoryTable;
