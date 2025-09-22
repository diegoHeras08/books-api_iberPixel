// models/books.js
const db = require('../database');

// Obtener todos los libros con filtros opcionales
function findAll(filters = {}, callback) {
  let sql = 'SELECT * FROM books';
  const params = [];

  if (filters.author || filters.title) {
    sql += ' WHERE';
    const conditions = [];
    if (filters.author) {
      conditions.push(' author LIKE ? ');
      params.push(`%${filters.author}%`);
    }
    if (filters.title) {
      conditions.push(' title LIKE ? ');
      params.push(`%${filters.title}%`);
    }
    sql += conditions.join(' AND ');
  }

  db.all(sql, params, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

// Buscar libro por ID
function findById(id, callback) {
  db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
    if (err) return callback(err);
    callback(null, row || null);
  });
}

// Agregar libro
function add(book, callback) {
  const { id, title, author, isRead, createdAt } = book;
  db.run(
    'INSERT INTO books (id, title, author, isRead, createdAt) VALUES (?, ?, ?, ?, ?)',
    [id, title, author, isRead ? 1 : 0, createdAt],
    function (err) {
      if (err) return callback(err);
      callback(null, book); // <- devuelves el objeto tal cual se insertó
    }
  );
}

// Actualizar libro
function update(id, data, callback) {
  const { title, author, isRead } = data;
  db.run(
    'UPDATE books SET title = ?, author = ?, isRead = ? WHERE id = ?',
    [title, author, isRead ? 1 : 0, id],
    function (err) {
      if (err) return callback(err);
      if (this.changes === 0) return callback(null, null);
      findById(id, callback);
    }
  );
}

// Eliminar libro
function remove(id, callback) {
  db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
    if (err) return callback(err);
    callback(null, this.changes > 0);
  });
}

module.exports = {
  getAllBooks: findAll,
  getBookById: findById,
  addBook: add,
  updateBook: update,
  deleteBook: remove
};