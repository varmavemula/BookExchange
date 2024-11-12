import React, { useState } from 'react';

const ExchangeRequest = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [requestMessage, setRequestMessage] = useState('');

  const handleBookTitleChange = (event) => {
    setBookTitle(event.target.value);
  };

  const handleRequestMessageChange = (event) => {
    setRequestMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Send exchange request to the server
    // You can use the bookTitle and requestMessage values to send the request
    // You can also include additional form fields as needed
  };

  return (
    <div>
      <h2>Exchange Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bookTitle">Book Title:</label>
          <input type="text" id="bookTitle" value={bookTitle} onChange={handleBookTitleChange} />
        </div>
        <div>
          <label htmlFor="requestMessage">Request Message:</label>
          <textarea id="requestMessage" value={requestMessage} onChange={handleRequestMessageChange} />
        </div>
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
};

export default ExchangeRequest;