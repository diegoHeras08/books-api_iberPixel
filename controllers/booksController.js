// controllers/booksController.js
const { v4: uuidv4 } = require('uuid');
const model = require('../models/books');


// Obtener todos los libros
function getAllBooks(req, res) {
  const books = model.getAllBooks();
  res.json(books);
}

// Obtener un libro por id
function getBookById(req, res) {
  const book = model.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Libro no encontrado' });
  }
  res.json(book);
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
  model.addBook(newBook);
  res.status(201).json(newBook);
}

// Reemplazar un libro  
function replaceBook(req, res) {
  const replaced = model.updateBook(req.params.id, {
    id: req.params.id,
    title: req.body.title,
    author: req.body.author,
    isRead: req.body.isRead ?? false,
    createdAt: new Date().toISOString()
  });
  if (!replaced) {
    return res.status(404).json({ message: 'Libro no encontrado' });
  }
  res.json(replaced);
}

// Actualizar un libro
function updateBook(req, res) {
  const updatedBook = model.updateBook(req.params.id, req.body);
  if (!updatedBook) {
    return res.status(404).json({ message: 'Libro no encontrado' });
  }
  res.json(updatedBook);
}

// Eliminar un libro
function deleteBook(req, res) {
  const deleted = model.deleteBook(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Libro no encontrado' });
  }
  res.status(204).send();
}

// Marcar un libro como leído/no leído 
function toggleRead(req, res) {
  const book = model.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Libro no encontrado' });
  }

  const newValue = (req.body && typeof req.body.isRead === 'boolean')
    ? req.body.isRead
    : !book.isRead;

  const updatedBook = model.updateBook(req.params.id, { isRead: newValue });
  res.json(updatedBook);
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
