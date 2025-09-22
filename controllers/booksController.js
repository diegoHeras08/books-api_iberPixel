// controllers/booksController.js
const { v4: uuidv4 } = require('uuid');
const model = require('../models/books');

// Obtener todos los libros
function getAllBooks(req, res) {
  model.getAllBooks(req.query, (err, books) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los libros' });
    res.json(books);
  });
}

// Obtener un libro por id
function getBookById(req, res) {
  model.getBookById(req.params.id, (err, book) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el libro' });
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  });
}

// Crear un nuevo libro
function createBook(req, res) {
  const newBook = {
    id: uuidv4(),
    title: req.body.title,
    author: req.body.author,
    isRead: req.body.isRead || false,
    createdAt: new Date().toISOString()
  };

  model.addBook(newBook, (err) => {
    if (err) return res.status(500).json({ error: 'Error al crear el libro' });
    res.status(201).json(newBook);
  });
}

// Reemplazar un libro  
function replaceBook(req, res) {
  const replacement = {
    id: req.params.id,
    title: req.body.title,
    author: req.body.author,
    isRead: req.body.isRead ?? false,
    createdAt: new Date().toISOString()
  };

  model.updateBook(req.params.id, replacement, (err, replaced) => {
    if (err) return res.status(500).json({ error: 'Error al reemplazar el libro' });
    if (!replaced) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(replaced);
  });
}

// Actualizar un libro
function updateBook(req, res) {
  model.updateBook(req.params.id, req.body, (err, updated) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el libro' });
    if (!updated) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(updated);
  });
}

// Eliminar un libro
function deleteBook(req, res) {
  model.deleteBook(req.params.id, (err, deleted) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el libro' });
    if (!deleted) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(204).send();
  });
}

// Marcar un libro como leído/no leído 
function toggleRead(req, res) {
  model.getBookById(req.params.id, (err, book) => {
    if (err) return res.status(500).json({ error: 'Error al buscar el libro' });
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    const newValue = (req.body && typeof req.body.isRead === 'boolean')
      ? req.body.isRead
      : !book.isRead;

    model.updateBook(req.params.id, { isRead: newValue }, (err, updated) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar el libro' });
      res.json(updated);
    });
  });
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  replaceBook, 
  updateBook,
  deleteBook,
  toggleRead 
};