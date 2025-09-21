// app.js
const express = require('express');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/booksRoutes');

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use('/api/books', booksRoutes);

// 404 for API
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  next();
});

// Error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Biblioteca. Usa /api/books');
});

module.exports = app;