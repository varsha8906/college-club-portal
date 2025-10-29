
import initSqlJs from 'sql.js';

const SQL = await initSqlJs({
  locateFile: file => `https://sql.js.org/dist/${file}`
});

let db;

export async function initDB() {
  if (db) return db;

  db = new SQL.Database();

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      club TEXT,
      profile_picture TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS clubs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      logo TEXT,
      description TEXT,
      points INTEGER DEFAULT 0
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      club TEXT NOT NULL,
      image TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT,
      club_name TEXT,
      participation_count INTEGER DEFAULT 0,
      leadership_points INTEGER DEFAULT 0,
      total_points INTEGER AS (participation_count * 10 + leadership_points * 20) STORED
    );
  `);

  // Seed clubs if not already seeded
  const clubs = [
    "YUVA",
    "Unnat Bharat Abhiyan",
    "National Service Scheme (NSS)",
    "Youth Red Cross",
    "Women Empowerment Cell",
    "Rotaract Club",
    "Women in STEM",
    "Techsparks",
    "Infinitus",
    "STEAM",
    "Fusion – Language Club",
    "Vaarithi Muthamizh Mandram",
    "Artist League",
    "Photography Club",
    "Podcast RIT",
    "Nippon Club",
    "Mediastic Hub – Social Media Club"
  ];

  clubs.forEach(clubName => {
    try {
      db.run(`INSERT INTO clubs (name) VALUES (?)`, [clubName]);
    } catch (e) {
      // Club already exists, ignore
    }
  });

  console.log("Database initialized and seeded.");
  return db;
}

export function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call initDB() first.");
  }
  return db;
}
