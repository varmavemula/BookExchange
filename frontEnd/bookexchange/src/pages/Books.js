import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/index.css";

const API_BASE_URL = 'http://localhost:3001';

const BookForm = () => {
  const userId = localStorage.getItem('id');
  
  const initialFormState = {
    title: '',
    author: '',
    publishedYear: '',
    genre: '',
    description: '',
    userId: userId
  };

  const [formData, setFormData] = useState(initialFormState);
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if(userId) {
      fetchUserBooks();
    }
  }, [userId]);

  const fetchUserBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books/user/${userId}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = 'Title is required';
    if (!formData.author.trim()) tempErrors.author = 'Author is required';
    if (!formData.publishedYear) tempErrors.publishedYear = 'Published year is required';
    if (formData.publishedYear && (isNaN(formData.publishedYear) || formData.publishedYear < 1800)) {
      tempErrors.publishedYear = 'Enter a valid year (1800 or later)';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        const bookData = {
          ...formData,
          publishedYear: parseInt(formData.publishedYear),
          userId
        };

        if (editingId) {
          // Update existing book
          await axios.put(`${API_BASE_URL}/books/${editingId}`, bookData);
          setSuccessMessage('Book updated successfully!');
        } else {
          // Add new book
          await axios.post(`${API_BASE_URL}/books`, bookData);
          setSuccessMessage('Book added successfully!');
        }

        // Reset form and refresh books list
        setFormData(initialFormState);
        setEditingId(null);
        fetchUserBooks();
      } catch (error) {
        console.error('Error saving book:', error);
        setErrors({
          submit: error.response?.data?.message || 'Error saving book. Please try again.'
        });
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${API_BASE_URL}/books/${bookId}?userId=${userId}`);
        setSuccessMessage('Book deleted successfully!');
        fetchUserBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
        setErrors({
          submit: 'Error deleting book. Please try again.'
        });
      }
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setFormData({
      ...book,
      userId // Ensure userId is included
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return  (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24"> {/* Added pt-24 for header space */}
          {/* Page Title with gradient text */}
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200 mb-8">
            {editingId ? 'Edit Book' : 'Add New Book'}
          </h2>
  
          {/* Messages */}
          {successMessage && (
            <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 
                         rounded-xl p-4 mb-6 text-emerald-200 shadow-lg animate-fadeIn">
              {successMessage}
            </div>
          )}
  
          {errors.submit && (
            <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 
                         rounded-xl p-4 mb-6 text-red-200 shadow-lg animate-fadeIn">
              {errors.submit}
            </div>
          )}
  
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 
                                                p-8 mb-12 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-white/90 font-medium mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.title ? 'border-red-500/50' : 'border-white/10'
                  } focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 
                  text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300`}
                  placeholder="Enter book title"
                />
                {errors.title && (
                  <div className="text-red-400 text-sm mt-1 pl-1">{errors.title}</div>
                )}
              </div>
  
              {/* Author Input */}
              <div>
                <label className="block text-white/90 font-medium mb-2">Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.author ? 'border-red-500/50' : 'border-white/10'
                  } focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 
                  text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300`}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <div className="text-red-400 text-sm mt-1 pl-1">{errors.author}</div>
                )}
              </div>
  
              {/* Published Year Input */}
              <div>
                <label className="block text-white/90 font-medium mb-2">Published Year *</label>
                <input
                  type="text"
                  name="publishedYear"
                  value={formData.publishedYear}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.publishedYear ? 'border-red-500/50' : 'border-white/10'
                  } focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 
                  text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300`}
                  placeholder="Enter published year"
                />
                {errors.publishedYear && (
                  <div className="text-red-400 text-sm mt-1 pl-1">{errors.publishedYear}</div>
                )}
              </div>
  
              {/* Genre Select */}
              <div>
                <label className="block text-white/90 font-medium mb-2">Genre</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                           focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                           focus:ring-emerald-400/20 text-white backdrop-blur-md 
                           transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-gray-800">Select Genre</option>
                  <option value="fiction" className="bg-gray-800">Fiction</option>
                  <option value="non-fiction" className="bg-gray-800">Non-Fiction</option>
                  <option value="mystery" className="bg-gray-800">Mystery</option>
                  <option value="science-fiction" className="bg-gray-800">Science Fiction</option>
                  <option value="fantasy" className="bg-gray-800">Fantasy</option>
                  <option value="romance" className="bg-gray-800">Romance</option>
                  <option value="thriller" className="bg-gray-800">Thriller</option>
                  <option value="horror" className="bg-gray-800">Horror</option>
                </select>
              </div>
  
              {/* Description Textarea */}
              <div>
                <label className="block text-white/90 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                           focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                           focus:ring-emerald-400/20 text-white placeholder-gray-400 
                           backdrop-blur-md transition-all duration-300 min-h-[120px] resize-y"
                  placeholder="Enter book description"
                />
              </div>
  
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg backdrop-blur-md transition-all duration-300 
                         transform hover:translate-y-[-1px] ${
                           isSubmitting 
                             ? 'bg-emerald-500/30 cursor-not-allowed' 
                             : 'bg-emerald-500/50 hover:bg-emerald-500/70 border border-emerald-400/30'
                         } text-white font-semibold shadow-lg hover:shadow-emerald-500/20`}
              >
                {isSubmitting ? 'Saving...' : (editingId ? 'Update Book' : 'Add Book')}
              </button>
            </div>
          </form>
  
          {/* Books List Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                         from-white to-emerald-200">
              Your Books
            </h3>
            
            {isLoading ? (
              <div className="text-center text-white/60 py-12 backdrop-blur-md bg-white/5 
                           rounded-xl border border-white/10">
                Loading books...
              </div>
            ) : books.length === 0 ? (
              <div className="text-center text-white/60 py-12 backdrop-blur-md bg-white/5 
                           rounded-xl border border-white/10">
                No books found
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {books.map(book => (
                  <div
                    key={book._id}
                    className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 
                             hover:bg-white/10 transition-all duration-300 flex flex-col
                             transform hover:translate-y-[-2px] hover:shadow-xl 
                             hover:shadow-emerald-500/10"
                  >
                    {/* Card Content */}
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-semibold text-white">{book.title}</h4>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 
                                     text-xs font-medium whitespace-nowrap ml-2">
                          {book.genre || 'Unspecified'}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-white/80">
                          <span className="text-white/50">Author:</span> {book.author}
                        </p>
                        <p className="text-white/80">
                          <span className="text-white/50">Published:</span> {book.publishedYear}
                        </p>
                        {book.description && (
                          <div className="mt-4">
                            <p className="text-white/50 text-sm">Description:</p>
                            <p className="text-white/70 text-sm line-clamp-3">{book.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
  
                    {/* Card Actions */}
                    <div className="p-6 pt-0 mt-auto">
                      <div className="flex gap-3 border-t border-white/10 pt-4">
                        <button
                          onClick={() => handleEdit(book)}
                          className="flex-1 px-4 py-2 rounded-lg bg-emerald-500/30 
                                   hover:bg-emerald-500/50 text-white transition-all duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="flex-1 px-4 py-2 rounded-lg bg-red-500/30 
                                   hover:bg-red-500/50 text-white transition-all duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

export default BookForm;