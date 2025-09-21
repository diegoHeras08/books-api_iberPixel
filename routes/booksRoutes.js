// routes/booksRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/booksController');

router.get('/', ctrl.getAllBooks);
router.get('/:id', ctrl.getBookById);
router.post('/', ctrl.createBook);
router.put('/:id', ctrl.replaceBook);
router.patch('/:id/read', ctrl.toggleRead);
router.delete('/:id', ctrl.deleteBook);

module.exports = router;