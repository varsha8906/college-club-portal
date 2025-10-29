import React, { useState } from 'react';
import { getDB } from '../db/initDB';

function ActivityForm({ clubName, onActivityAdded }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store as base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const db = getDB();
    try {
      db.run("INSERT INTO events (title, date, description, club, image) VALUES (?, ?, ?, ?, ?)", [title, date, description, clubName, image]);
      setMessage('Activity added successfully!');
      setTitle('');
      setDate('');
      setDescription('');
      setImage(null);
      if (onActivityAdded) {
        onActivityAdded();
      }
    } catch (error) {
      setMessage('Failed to add activity.');
      console.error("Error adding activity:", error);
    }
  };

  return (
    <div className="activity-form glass-card">
      <h3>Add New Activity</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '5px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.5)', boxSizing: 'border-box' }}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '1rem' }}
        />
        {image && <img src={image} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px', marginBottom: '1rem' }} />}
        <button type="submit" className="glassy-button">Add Activity</button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}

export default ActivityForm;
