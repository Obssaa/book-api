require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book')

// create an express app

const app = express()

// Allows Express to understand JSON sent in HTTP request bodies (like when you POST a new book).
app.use(express.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(console.log('MongoDB connected')))
.catch(err => console.error(err));

// When a user visits /books, fetch all books from MongoDB.
// res.json(books) sends them back as JSON.

app.get('/books', async(req, res) => {
    const books = await Book.find();
    res.json(books);
});
