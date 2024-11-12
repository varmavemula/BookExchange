const express = require('express');
const mongoose = require('./config/mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const resetPassRoute = require('./routes/passreset');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/auth', authRoutes);
app.use('', require('./routes/books'));
app.use('', resetPassRoute);
// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});