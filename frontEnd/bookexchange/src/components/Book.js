// Book.js
// This component renders an individual book card with glass morphism effect
// Displays book details and provides edit/delete functionality
import React from 'react';
// Import required icons from lucide-react
import { BookOpen, Edit, Trash2 } from 'lucide-react';

/**
 * Book Component
 * @param {Object} book - Book object containing title, author, genre, etc.
 * @param {Function} onEdit - Handler function for edit action
 * @param {Function} onDelete - Handler function for delete action
 * @returns {JSX.Element} A card component displaying book information with actions
 */
const Book = ({ book, onEdit, onDelete }) => {
  return (
    // Main container with glass morphism effect and hover animations
    <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10  /* Glass effect */
                   hover:bg-white/10 transition-all duration-300 flex flex-col    /* Hover effects */
                   transform hover:translate-y-[-2px] hover:shadow-xl            /* Lift effect */
                   hover:shadow-emerald-500/10">                                 {/* Colored shadow */}

      {/* Book Cover Section */}
      {/* Displays a placeholder book icon with gradient background */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-500/10 to-blue-500/10  /* Gradient background */
                    rounded-t-xl flex items-center justify-center">              {/* Positioning */}
        <BookOpen className="w-16 h-16 text-white/20" />  {/* Placeholder icon */}
      </div>

      {/* Book Content Section */}
      {/* Contains book details with flex-grow to fill available space */}
      <div className="p-6 flex-grow">
        {/* Header Section - Title and Genre */}
        <div className="flex justify-between items-start mb-4">
          {/* Book Title - limited to 2 lines */}
          <h4 className="text-xl font-semibold text-white line-clamp-2">
            {book.title}
          </h4>
          {/* Genre Tag - with glass effect */}
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 
                       text-xs font-medium whitespace-nowrap ml-2">
            {book.genre || 'Unspecified'}
          </span>
        </div>

        {/* Book Details Section */}
        {/* Displays author, publication year, and description */}
        <div className="space-y-2">
          {/* Author Information */}
          <p className="text-white/80">
            <span className="text-white/50">Author:</span> {book.author}
          </p>
          {/* Publication Year */}
          <p className="text-white/80">
            <span className="text-white/50">Published:</span> {book.publishedYear}
          </p>
          {/* Conditional Description Rendering */}
          {book.description && (
            <div className="mt-4">
              <p className="text-white/50 text-sm">Description:</p>
              {/* Description limited to 3 lines */}
              <p className="text-white/70 text-sm line-clamp-3">
                {book.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Section */}
      {/* Contains Edit and Delete buttons */}
      <div className="p-6 pt-0 mt-auto">  {/* Pushed to bottom with mt-auto */}
        <div className="flex gap-3 border-t border-white/10 pt-4">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(book)}
            className="flex-1 px-4 py-2 rounded-lg bg-emerald-500/30          /* Base styles */
                     hover:bg-emerald-500/50 text-white transition-all        /* Hover effect */
                     duration-300 flex items-center justify-center gap-2"     /* Layout */
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(book._id)}
            className="flex-1 px-4 py-2 rounded-lg bg-red-500/30             /* Base styles */
                     hover:bg-red-500/50 text-white transition-all           /* Hover effect */
                     duration-300 flex items-center justify-center gap-2"    /* Layout */
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* Style Breakdown:
1. Glass Morphism:
   - backdrop-blur-xl: Heavy blur for glass effect
   - bg-white/5: Semi-transparent background
   - border-white/10: Subtle border

2. Animations:
   - hover:translate-y-[-2px]: Slight lift on hover
   - hover:shadow-xl: Enhanced shadow on hover
   - transition-all duration-300: Smooth transitions

3. Layout:
   - flex flex-col: Vertical layout
   - flex-grow: Fill available space
   - mt-auto: Push actions to bottom

4. Typography:
   - line-clamp-2: Limit title to 2 lines
   - line-clamp-3: Limit description to 3 lines
   - text-white/80: Semi-transparent white text

5. Interactive Elements:
   - hover:bg-emerald-500/50: Button hover states
   - hover:bg-red-500/50: Delete button hover
   - gap-2: Spacing between icon and text
*/

export default Book;