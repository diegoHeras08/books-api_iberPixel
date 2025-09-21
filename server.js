// server.js
const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Books API escuchando en http://localhost:${PORT}`);
});