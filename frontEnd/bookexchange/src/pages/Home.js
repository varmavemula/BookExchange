import React, { useState } from 'react';
import { Search, Book } from 'lucide-react';

// Assuming Layout component is in a components folder
import Layout from '../components/Layout';
// If Layout is in a different location, adjust the import path accordingly

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Fiction' },
    { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Mystery' },
    { id: 3, title: 'Book 3', author: 'Author 3', genre: 'Science Fiction' },
    { id: 4, title: 'Book 4', author: 'Author 4', genre: 'Romance' },
  ];

  return (
    <Layout>
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      {/* Search Section */}
      <div className="w-full backdrop-blur-md bg-white/5 border-b border-white/10 mb-8 py-6">
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search books..." 
              value={searchQuery}
              onChange={handleSearch}
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
          </div>
        </div>
      </div>

      {/* Books Grid Section */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {books.map((book) => (
            <div 
              key={book.id}
              className="backdrop-blur-md bg-white/5 rounded-xl 
                       border border-white/10 overflow-hidden 
                       group hover:bg-white/10 
                       transition-all duration-300
                       transform hover:-translate-y-1 
                       hover:shadow-xl hover:shadow-emerald-500/10"
            >
              {/* Book Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-emerald-500/20 to-blue-500/20">
                <Book className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                              h-12 w-12 text-white/30 group-hover:text-white/50 transition-all duration-300" />
              </div>

              {/* Book Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  by {book.author}
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 rounded-full 
                               bg-emerald-500/20 text-emerald-300 
                               text-xs font-medium">
                    {book.genre}
                  </span>
                  <button className="px-4 py-1 rounded-lg 
                                 bg-white/10 hover:bg-white/20 
                                 text-white text-sm
                                 transition-all duration-300">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {books.length === 0 && (
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
        )}
      </div>

      {/* Optional: Section for Featured or Categories */}
      <div className="w-full backdrop-blur-md bg-white/5 border-t border-white/10 mt-8 py-8">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Fiction', 'Mystery', 'Science Fiction', 'Romance'].map((category) => (
              <button
                key={category}
                className="p-4 rounded-xl bg-white/5 border border-white/10 
                         text-white hover:bg-white/10 transition-all duration-300
                         backdrop-blur-md hover:shadow-lg hover:shadow-emerald-500/10"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Home;