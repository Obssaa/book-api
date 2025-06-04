require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();

// Allows Express to parse JSON in the request body
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// GET /books – Get all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// POST /books – Add a new book
app.post('/books', async (req, res) => {
  const newBook = new Book(req.body); // You forgot `new` here
  await newBook.save();
  res.status(201).json(newBook);
});

// GET /books/:id – Get a book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // await was missing
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /books/:id – Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`); // Use backticks here
});
