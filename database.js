// database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./books.db', (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err.message);
  } else {
    console.log('Conectado a SQLite');
  }
});

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      isRead INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL
    )
  `);
});

module.exports = db;