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

// POST /books: Add a new book
app.post('/books', async(req,res) =>{
    const newBook = Book(req.body);
    await newBook.save()
    res.status(201).json(newBook);
});

// GET /books/:id: Get a book by ID

app.get('/books:id',async(req,res) =>{
    const book = Book.findById(req.params.id);
    await Book.find(id);
    res.json(book);

});
// DELETE /books/:id: Delete a book

app.delete('/books:id', async(req, res) =>{
    await Book.findByIdAndDelete(req.params.id); 
    res.json({message:"Book Deleted"});
});
//Tells Express to start listening for incoming requests on a port defined in .env (like 3000).
app.listen(process.env.PORT, () =>{
    console.log('Server running on port ${process.env.PORT}')
})
