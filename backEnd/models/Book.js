const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    
    publishedYear: { 
        type: Number, 
        required: true 
    },
    genre: { 
        type: String,
        required: false 
    },
    description: { 
        type: String,
        required: false 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;