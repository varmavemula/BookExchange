import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import BookExchange from './pages/bookExchange';
import ForgetPassword from './pages/forgetPassword';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookExchange />} />
        <Route path="/forgetPassword" element={<ForgetPassword />}/>
        <Route path="/books" element={<Books />} />
        <Route path="/home" element={<Home />} />
     
      </Routes>
    </Router>
  );
};

export default App;