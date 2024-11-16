import React from 'react';
import { BookOpen, Edit, Trash2 } from 'lucide-react';

const Book = ({ book, onEdit, onDelete }) => {
  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 
                   hover:bg-white/10 transition-all duration-300 flex flex-col
                   transform hover:translate-y-[-2px] hover:shadow-xl 
                   hover:shadow-emerald-500/10">
      {/* Book Cover/Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 
                    rounded-t-xl flex items-center justify-center">
        <BookOpen className="w-16 h-16 text-white/20" />
      </div>

      {/* Book Content */}
      <div className="p-6 flex-grow">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-xl font-semibold text-white line-clamp-2">
            {book.title}
          </h4>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 
                       text-xs font-medium whitespace-nowrap ml-2">
            {book.genre || 'Unspecified'}
          </span>
        </div>
        
        {/* Book Details */}
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
              <p className="text-white/70 text-sm line-clamp-3">
                {book.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-0 mt-auto">
        <div className="flex gap-3 border-t border-white/10 pt-4">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 px-4 py-2 rounded-lg bg-emerald-500/30 
                     hover:bg-emerald-500/50 text-white transition-all duration-300
                     flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="flex-1 px-4 py-2 rounded-lg bg-red-500/30 
                     hover:bg-red-500/50 text-white transition-all duration-300
                     flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;