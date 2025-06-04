require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();

//Serve Static Files from Express

app.use(express.static(path.join(__dirname, '../public')));

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
app.post('/books',
    [
      body('title').notEmpty().withMessage('Title is required'),
      body('author').notEmpty().withMessage('Author is required'),
      body('year').isInt({ min: 0, max: 2025 }).withMessage('Year must be a number between 0 and 2025')
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
      } catch (err) {
        res.status(500).json({ error: 'Failed to save book' });
      }
    }
  );

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

// PUT /books/:id – Update a book
app.put('/books/:id', async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update book' });
    }
  });

  
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`); // Use backticks here
});
