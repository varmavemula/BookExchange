import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import BookExchange from './pages/bookExchange';
import ForgetPassword from './pages/forgetPassword';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookExchange />} />
        <Route path="/forgetPassword" element={<ForgetPassword />}/>
      </Routes>
      
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><Layout><Books /></Layout></ProtectedRoute>} />
        
         {/* 404 Not Found Route */}
         <Route path="*" element={<NotFound />} />

      </Routes>
      
    </Router>
  );
};

export default App;