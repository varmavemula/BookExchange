// BookListContainer.js
// This component serves as a wrapper for the BookList component
// Handles loading states and empty states with appropriate UI feedback
import React from 'react';
// Import icons from lucide-react library
import { BookOpen, Edit, Trash2 } from 'lucide-react';
// Import BookList component for rendering the grid of books
import BookList from './BookList';

/**
 * BookListContainer Component
 * A container component that manages different states of the book list display:
 * - Loading state with spinner
 * - Empty state with message
 * - Populated state with grid of books
 * 
 * @param {Array} books - Array of book objects to display
 * @param {boolean} isLoading - Loading state flag
 * @param {Function} handleEdit - Function to handle book editing
 * @param {Function} handleDelete - Function to handle book deletion
 * @returns {JSX.Element} Appropriate UI based on current state
 */
const BookListContainer = ({ books, isLoading, handleEdit, handleDelete }) => {
  // Loading State
  // Displays a spinning loader while data is being fetched
  if (isLoading) {
    return (
      // Loading indicator container with glass morphism effect
      <div className="text-center                     /* Center align content */
                      text-white/60                    /* Semi-transparent text */
                      py-12                           /* Vertical padding */
                      backdrop-blur-md bg-white/5     /* Glass effect */
                      rounded-xl                      /* Rounded corners */
                      border border-white/10">        /* Subtle border */
        {/* Spinning loader circle */}
        <div className="w-12 h-12                     /* Loader dimensions */
                        border-4                       /* Border thickness */
                        border-emerald-500/30         /* Base border color */
                        border-t-emerald-500          /* Top border highlight */
                        rounded-full                  /* Circular shape */
                        animate-spin                  /* Spinning animation */
                        mx-auto mb-4" />              /* Centering and spacing */
        Loading books...                            {/* Loading message */}
      </div>
    );
  }

  // Empty State
  // Displays when no books are available
  if (!books?.length) {
    return (
      // Empty state container with glass morphism effect
      <div className="text-center                     /* Center align content */
                      text-white/60                    /* Semi-transparent text */
                      py-12                           /* Vertical padding */
                      backdrop-blur-md bg-white/5     /* Glass effect */
                      rounded-xl                      /* Rounded corners */
                      border border-white/10">        /* Subtle border */
        {/* Book icon */}
        <BookOpen className="w-16 h-16                /* Icon size */
                            text-white/20             /* Semi-transparent icon */
                            mx-auto mb-4" />          /* Centering and spacing */
        <p>No books found</p>                       {/* Empty state message */}
      </div>
    );
  }

  // Populated State
  // Renders the BookList component when books are available
  return (
    <BookList
      books={books}                                 // Pass books data
      handleEdit={handleEdit}                      // Pass edit handler
      handleDelete={handleDelete}                  // Pass delete handler
    />
  );
};

/* Props Description:
 * books: Array of book objects
 *   - Can be null/undefined, handled in empty state check
 *   - Used to render book list when available
 * 
 * isLoading: boolean
 *   - Indicates if books are being fetched
 *   - Shows loading spinner when true
 * 
 * handleEdit: Function(book) => void
 *   - Passed to BookList for edit functionality
 * 
 * handleDelete: Function(bookId) => void
 *   - Passed to BookList for delete functionality
 */

/* State Handling:
 * 1. Loading State:
 *    - Shows spinning loader
 *    - Glass morphism container
 *    - Loading message
 *
 * 2. Empty State:
 *    - Shows book icon
 *    - Glass morphism container
 *    - "No books found" message
 *
 * 3. Populated State:
 *    - Renders BookList component
 *    - Passes necessary props
 */

/* Styling Features:
 * - Consistent glass morphism effect across states
 * - Responsive padding and spacing
 * - Animated loading spinner
 * - Semi-transparent text for better readability
 * - Consistent border radius and border styles
 */

export default BookListContainer;