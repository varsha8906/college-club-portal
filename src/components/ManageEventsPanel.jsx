import React, { useState, useEffect } from 'react';
import { getDB } from '../db/initDB';

function ManageEventsPanel() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({
    id: null, title: '', date: '', description: '', club: '', image: null
  });

  const fetchEvents = () => {
    const db = getDB();
    const res = db.exec("SELECT id, title, date, description, club, image FROM events ORDER BY date DESC");
    if (res[0] && res[0].values) {
      const fetchedEvents = res[0].values.map(row => ({
        id: row[0],
        title: row[1],
        date: row[2],
        description: row[3],
        club: row[4],
        image: row[5],
      }));
      setEvents(fetchedEvents);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event) => {
    setEditingEvent(event.id);
    setForm(event);
  };

  const handleDelete = (id) => {
    const db = getDB();
    db.run("DELETE FROM events WHERE id = ?", [id]);
    fetchEvents();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const db = getDB();
    db.run("UPDATE events SET title = ?, date = ?, description = ?, club = ?, image = ? WHERE id = ?",
      [form.title, form.date, form.description, form.club, form.image, form.id]);
    setEditingEvent(null);
    setForm({ id: null, title: '', date: '', description: '', club: '', image: null });
    fetchEvents();
  };

  return (
    <div className="manage-events-panel glass-card">
      <h3>Manage All Club Events</h3>
      {events.length === 0 ? (
        <p>No events to manage yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Club</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <React.Fragment key={event.id}>
                <tr>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{event.title}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{event.date}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{event.club}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    <button onClick={() => handleEdit(event)} className="glassy-button" style={{ marginRight: '5px', padding: '5px 10px' }}>Edit</button>
                    <button onClick={() => handleDelete(event.id)} className="glassy-button" style={{ background: '#dc3545', padding: '5px 10px' }}>Delete</button>
                  </td>
                </tr>
                {editingEvent === event.id && (
                  <tr>
                    <td colSpan="4" style={{ padding: '15px', borderBottom: '1px solid #eee', background: 'rgba(255,255,255,0.1)' }}>
                      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input type="text" name="title" value={form.title} onChange={handleFormChange} placeholder="Title" required />
                        <input type="date" name="date" value={form.date} onChange={handleFormChange} required />
                        <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Description" style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.5)' }}></textarea>
                        <input type="text" name="club" value={form.club} onChange={handleFormChange} placeholder="Club" required />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {form.image && <img src={form.image} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                        <button type="submit" className="glassy-button">Update Event</button>
                        <button type="button" onClick={() => setEditingEvent(null)} className="glassy-button" style={{ background: '#6c757d' }}>Cancel</button>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageEventsPanel;
