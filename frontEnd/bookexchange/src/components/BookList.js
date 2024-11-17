// BookList.js
// This component renders a grid of Book components
// It handles the layout and mapping of individual book cards
import React from 'react';
// Import the Book component for rendering individual book cards
import Book from './Book';

/**
 * BookList Component
 * Renders a responsive grid of book cards
 * 
 * @param {Array} books - Array of book objects to display
 * @param {Function} handleEdit - Function to handle editing a book
 * @param {Function} handleDelete - Function to handle deleting a book
 * @returns {JSX.Element} A responsive grid of Book components
 */
const BookList = ({ books, handleEdit, handleDelete }) => {
  return (
    // Main container with responsive grid layout
    // grid-cols-1: Single column on mobile (default)
    // lg:grid-cols-2: Two columns on large screens (1024px+)
    // xl:grid-cols-3: Three columns on extra large screens (1280px+)
    // gap-6: 1.5rem gap between grid items
    <div className="grid 
                   grid-cols-1                /* Mobile: 1 column */
                   lg:grid-cols-2             /* Large screens: 2 columns */
                   xl:grid-cols-3             /* Extra large screens: 3 columns */
                   gap-6"                     /* Spacing between cards */
    >
      {/* Map through the books array and render a Book component for each book */}
      {/* Each Book component receives the book data and handler functions as props */}
      {books.map(book => (
        <Book
          key={book._id}                     /* Unique key for React rendering */
          book={book}                        /* Pass book data */
          onEdit={handleEdit}                /* Pass edit handler */
          onDelete={handleDelete}            /* Pass delete handler */
        />
      ))}
    </div>
  );
};

/* Props Description:
 * books: Array of book objects containing:
 *   - _id: Unique identifier
 *   - title: Book title
 *   - author: Book author
 *   - genre: Book genre
 *   - description: Book description
 *   - publishedYear: Year of publication
 * 
 * handleEdit: Function(book) => void
 *   Called when edit button is clicked
 * 
 * handleDelete: Function(bookId) => void
 *   Called when delete button is clicked
 */

/* Responsive Layout Breakdown:
 * Mobile (<1024px):
 * - Single column layout
 * - Full width cards
 * 
 * Large screens (1024px - 1279px):
 * - Two column layout
 * - Cards take 50% of container width
 * 
 * Extra large screens (1280px+):
 * - Three column layout
 * - Cards take 33.33% of container width
 */

/* Styling Notes:
 * - Uses CSS Grid for responsive layout
 * - Consistent gap spacing (1.5rem)
 * - Maintains card aspect ratio across breakpoints
 * - Allows for flexible content height
 */

export default BookList;