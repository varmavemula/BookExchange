import React from 'react';
import Book from './Book';

const BookList = ({ books, handleEdit, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {books.map(book => (
        <Book
          key={book._id}
          book={book}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BookList;