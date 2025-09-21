// models/books.js
const initialBooks = [
  {
    id: "1",
    title: "Don Quijote",
    author: "Miguel de Cervantes",
    isRead: false,
    createdAt: "2024-01-22T10:00:00Z"
  }
];

let books = initialBooks.map(b => ({ ...b }));

function findAll(filters = {}) {
  let results = books;
  const { author, title } = filters;
  if (author) results = results.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  if (title) results = results.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
  return results;
}

function findById(id) {
    return books.find(b => String(b.id) === String(id)) || null;
}

function add(book) {
  books.push(book);
  return book;
}

function update(id, data) {
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return null;
  books[idx] = { ...books[idx], ...data };
  return books[idx];
}

function remove(id) {
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return false;
  books.splice(idx, 1);
  return true;
}

function resetData() {
  books = initialBooks.map(b => ({ ...b }));
}

module.exports = {
  getAllBooks: findAll,
  getBookById: findById,
  addBook: add,
  updateBook: update,
  deleteBook: remove,
  resetData
};