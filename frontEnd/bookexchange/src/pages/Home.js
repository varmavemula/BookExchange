import React, { useState, useEffect } from 'react';
import { Search, Book, Filter } from 'lucide-react';
import BookListContainer from '../components/BookListContainer';
import axios from 'axios';
import Layout from '../components/Layout';

const API_BASE_URL = 'http://localhost:3001';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [searchParams, setSearchParams] = useState({
    title: '',
    author: '',
    genre: '',
    available: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const fetchUserBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`);
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      setErrors({ submit: 'Failed to fetch books' });
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    let results = [...books];

    // Filter by title
    if (searchParams.title) {
      results = results.filter(book => 
        book.title.toLowerCase().includes(searchParams.title.toLowerCase())
      );
    }

    // Filter by author
    if (searchParams.author) {
      results = results.filter(book => 
        book.author.toLowerCase().includes(searchParams.author.toLowerCase())
      );
    }

    // Filter by genre
    if (searchParams.genre) {
      results = results.filter(book => book.genre === searchParams.genre);
    }

    // Filter by availability
    if (searchParams.available) {
      results = results.filter(book => 
        book.available === (searchParams.available === 'true')
      );
    }

    setFilteredBooks(results);
  };

  // Update search whenever params change
  useEffect(() => {
    handleSearch();
  }, [searchParams]);

  const clearSearch = () => {
    setSearchParams({
      title: '',
      author: '',
      genre: '',
      available: ''
    });
    setFilteredBooks(books);
  };

  // Group books by genre
  const groupByGenre = (booksToGroup) => {
    return booksToGroup.reduce((grouped, book) => {
      const genre = book.genre || 'Uncategorized';
      if (!grouped[genre]) {
        grouped[genre] = [];
      }
      grouped[genre].push(book);
      return grouped;
    }, {});
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      {/* Search Section */}
      <div className="w-full backdrop-blur-md bg-white/5 border-b border-white/10 mb-8 py-6">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          {/* Main Search Bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by title..." 
              value={searchParams.title}
              onChange={(e) => setSearchParams(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-6 py-4 pl-12 rounded-xl 
                       bg-white/10 border border-white/20 
                       backdrop-blur-md text-white 
                       placeholder-white/50
                       focus:outline-none focus:ring-2 
                       focus:ring-emerald-500/30 
                       focus:border-emerald-500/50
                       transition-all duration-300
                       shadow-lg hover:shadow-xl"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            
            {/* Filter Toggle */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 
                       text-white/50 hover:text-white transition-all duration-300
                       ${showFilters ? 'text-emerald-400' : ''}`}
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>

          {/* Advanced Filters */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 
                        ${showFilters ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            {/* Author Filter */}
            <input
              type="text"
              placeholder="Filter by author..."
              value={searchParams.author}
              onChange={(e) => setSearchParams(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                       backdrop-blur-md text-white placeholder-white/50
                       focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />

            {/* Genre Filter */}
            <select
              value={searchParams.genre}
              onChange={(e) => setSearchParams(prev => ({ ...prev, genre: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                       backdrop-blur-md text-white appearance-none"
            >
              <option value="" className="bg-gray-800">All Genres</option>
              <option value="fiction" className="bg-gray-800">Fiction</option>
              <option value="non-fiction" className="bg-gray-800">Non-Fiction</option>
              <option value="mystery" className="bg-gray-800">Mystery</option>
              <option value="science-fiction" className="bg-gray-800">Science Fiction</option>
              <option value="fantasy" className="bg-gray-800">Fantasy</option>
              <option value="romance" className="bg-gray-800">Romance</option>
              <option value="thriller" className="bg-gray-800">Thriller</option>
              <option value="horror" className="bg-gray-800">Horror</option>
            </select>

            {/* Availability Filter */}
            <select
              value={searchParams.available}
              onChange={(e) => setSearchParams(prev => ({ ...prev, available: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                       backdrop-blur-md text-white appearance-none"
            >
              <option value="">All Books</option>
              <option value="true">Available Only</option>
              <option value="false">Unavailable Only</option>
            </select>
          </div>

          {/* Clear Search */}
          {(searchParams.title || searchParams.author || searchParams.genre || searchParams.available) && (
            <button
              onClick={clearSearch}
              className="text-white/70 hover:text-white text-sm transition-colors duration-300"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Books Display */}
      <div className="container mx-auto px-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="w-full py-12">
            <div className="backdrop-blur-md bg-white/5 rounded-xl 
                         border border-white/10 p-8 max-w-md mx-auto text-center">
              <Book className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Books Found
              </h3>
              <p className="text-white/70">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          </div>
        ) : (
          Object.entries(groupByGenre(filteredBooks)).map(([genre, genreBooks]) => (
            <div key={genre} className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-emerald-200">
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </h3>
              <BookListContainer
                books={genreBooks}
                isLoading={false}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;