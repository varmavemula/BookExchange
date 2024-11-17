// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/UserDB');

// GET all books with user details
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find().populate('userId', 'name email -_id');
        console.log(books);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET books by user ID
router.get('/books/user/:userId', async (req, res) => {
    try {
        const books = await Book.find({ userId: req.params.userId })
            .populate('userId', 'name email -_id');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new book with user ID
router.post('/books', async (req, res) => {
    try {
        // First check if user exists
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear,
            genre: req.body.genre,
            description: req.body.description,
            userId: req.body.userId,
            tags: req.body.tags,
            available: req.body.available,
            condition: req.body.condition
        });

        const newBook = await book.save();
        await newBook.populate('userId', 'name email -_id');
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE book (checking user ownership)
router.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOne({
            _id: req.params.id,
            userId: req.body.userId
        });

        if (!book) {
            return res.status(404).json({
                message: 'Book not found or user does not have permission'
            });
        }

        Object.assign(book, req.body);
        const updatedBook = await book.save();
        await updatedBook.populate('userId', 'name email -_id');
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE book (checking user ownership)
router.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOne({
            _id: req.params.id,
            userId: req.query.userId
        });

        if (!book) {
            return res.status(404).json({
                message: 'Book not found or user does not have permission'
            });
        }

        await book.deleteOne();
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;