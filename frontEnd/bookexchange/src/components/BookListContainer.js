import React from 'react';
import { BookOpen, Edit, Trash2 } from 'lucide-react';
import BookList from './BookList';

// Loading and Empty States
const BookListContainer = ({ books, isLoading, handleEdit, handleDelete }) => {
    if (isLoading) {
      return (
        <div className="text-center text-white/60 py-12 backdrop-blur-md bg-white/5 
                      rounded-xl border border-white/10">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 
                        rounded-full animate-spin mx-auto mb-4" />
          Loading books...
        </div>
      );
    }
  
    if (!books?.length) {
      return (
        <div className="text-center text-white/60 py-12 backdrop-blur-md bg-white/5 
                      rounded-xl border border-white/10">
          <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p>No books found</p>
        </div>
      );
    }
  
    return (
      <BookList
        books={books}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );
  };

  export default BookListContainer;