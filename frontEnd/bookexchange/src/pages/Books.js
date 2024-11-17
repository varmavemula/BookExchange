import React, { useState, useEffect } from 'react';
import BookListContainer from '../components/BookListContainer';
import "../styles/index.css";
import axios from 'axios';
import API_BASE_URL from '../utils/constants.js';

// const API_BASE_URL = 'http://localhost:3001';

const Books = () => {
  const userId = localStorage.getItem('id');
  // Updated initial form state in your Books component:
  const initialFormState = {
    title: '',
    author: '',
    publishedYear: '',
    genre: '',
    description: '',
    available: true,     // Added default true
    condition: 'good',   // Added default value
    tags: [],           // Added empty array for tags
    userId: userId
  };
  // States
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({}); // Changed from setError to setErrors for consistency
  const [formData, setFormData] = useState(initialFormState);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    bookId: null
  });

  useEffect(() => {
    if (userId) {
      fetchUserBooks();
    }
  }, [userId]);

  // Handlers
  const fetchUserBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books/user/${userId}`);
      setBooks(response.data);
    } catch (error) {
      setErrors({ submit: 'Failed to fetch books' });
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
          available: Boolean(formData.available),
          tags: formData.tags.filter(tag => tag.trim() !== ''), // Clean empty tags
          userId
        };

        if (editingId) {
          await axios.put(`${API_BASE_URL}/books/${editingId}`, bookData);
          setSuccessMessage('Book updated successfully!');
        } else {
          await axios.post(`${API_BASE_URL}/books`, bookData);
          setSuccessMessage('Book added successfully!');
        }

        setFormData(initialFormState);
        setEditingId(null);
        fetchUserBooks();
      } catch (error) {
        setErrors({
          submit: error.response?.data?.message || 'Error saving book. Please try again.'
        });
      }
    }
    setIsSubmitting(false);
  };

  {/* Update your handleEdit function to handle the new fields */ }
  const handleEdit = (book) => {
    setEditingId(book._id);
    setFormData({
      ...book,
      tags: book.tags || [], // Ensure tags is always an array
      available: book.available ?? true, // Default to true if undefined
      condition: book.condition || 'good', // Default condition
      userId
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // Add delete handler functions
  const handleDelete = async (bookId) => {
    setDeleteConfirm({
      show: true,
      bookId
    });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/books/${deleteConfirm.bookId}?userId=${userId}`);
      setSuccessMessage('Book deleted successfully!');
      fetchUserBooks();
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Error deleting book. Please try again.'
      });
    } finally {
      setDeleteConfirm({ show: false, bookId: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, bookId: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Title */}
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
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.title ? 'border-red-500/50' : 'border-white/10'
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
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.author ? 'border-red-500/50' : 'border-white/10'
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
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.publishedYear ? 'border-red-500/50' : 'border-white/10'
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

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    available: e.target.checked
                  }));
                }}
                className="w-5 h-5 rounded border-white/10 bg-white/5 
                 checked:bg-emerald-500/50 focus:ring-2 focus:ring-emerald-400/20 
                 focus:ring-offset-0 focus:ring-offset-transparent
                 transition-all duration-300"
              />
              <label htmlFor="available" className="text-white/90 font-medium">
                Available for Exchange
              </label>
            </div>

            {/* Condition Select */}
            <div>
              <label className="block text-white/90 font-medium mb-2">Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                 focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                 focus:ring-emerald-400/20 text-white backdrop-blur-md 
                 transition-all duration-300 appearance-none"
              >
                <option value="new" className="bg-gray-800">New</option>
                <option value="good" className="bg-gray-800">Good</option>
                <option value="old" className="bg-gray-800">Old</option>
              </select>
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-white/90 font-medium mb-2">
                Tags
                <span className="text-white/50 text-sm ml-2">
                  (Separate with commas)
                </span>
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={(e) => {
                  const tagsArray = e.target.value
                    .split(',')
                    .map(tag => tag.trim())
                  setFormData(prev => ({
                    ...prev,
                    tags: tagsArray
                  }));
                  console.log(tagsArray);
                }

                }
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                 focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                 focus:ring-emerald-400/20 text-white placeholder-gray-400 
                 backdrop-blur-md transition-all duration-300"
                placeholder="Enter tags (e.g., fantasy, adventure, magic)"
              />
              {/* Tags Preview */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 
                       text-xs font-medium border border-emerald-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
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
                         transform hover:translate-y-[-1px] ${isSubmitting
                  ? 'bg-emerald-500/30 cursor-not-allowed'
                  : 'bg-emerald-500/50 hover:bg-emerald-500/70 border border-emerald-400/30'
                } text-white font-semibold shadow-lg hover:shadow-emerald-500/20`}
            >
              {isSubmitting ? 'Saving...' : (editingId ? 'Update Book' : 'Add Book')}
            </button>
          </div>
        </form>
        {/* Books List Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
            Your Books
          </h2>

          <BookListContainer
            books={books}
            isLoading={isLoading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
        {deleteConfirm.show && (
          <div className="fixed inset-0 backdrop-blur-xl bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/30 to-emerald-500/30 rounded-2xl blur">
              </div>
              <div className="relative bg-gray-900/50 backdrop-blur-2xl rounded-2xl p-6 lg:p-8 
                            border border-white/10 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Confirm Delete</h3>
                  <p className="text-white/70 mb-6">
                    Are you sure you want to delete this book? This action cannot be undone.
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={cancelDelete}
                      className="flex-1 px-4 py-3 rounded-lg border border-white/10 
                               text-white hover:bg-white/10 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 px-4 py-3 rounded-lg bg-red-500/50 
                               hover:bg-red-500/70 text-white font-semibold 
                               transition-all duration-300 border border-red-400/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Books;