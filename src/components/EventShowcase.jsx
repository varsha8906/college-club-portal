import React, { useState, useEffect } from 'react';
import { getDB } from '../db/initDB';

function EventShowcase() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const db = getDB();
    // Fetch all events, ordered by date, only future events
    const today = new Date().toISOString().split('T')[0];
    const res = db.exec("SELECT title, date, description, club, image FROM events WHERE date >= ? ORDER BY date ASC", [today]);
    if (res[0] && res[0].values) {
      const fetchedEvents = res[0].values.map(row => ({
        title: row[0],
        date: row[1],
        description: row[2],
        club: row[3],
        image: row[4],
      }));
      setEvents(fetchedEvents);
    }
  }, []);

  return (
    <div className="event-showcase glass-card">
      <h3>Upcoming Events</h3>
      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {events.map((event, index) => (
            <div key={index} className="glass-card" style={{ padding: '1rem' }}>
              <h4>{event.title}</h4>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Club:</strong> {event.club}</p>
              <p>{event.description}</p>
              {event.image && <img src={event.image} alt={event.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventShowcase;
