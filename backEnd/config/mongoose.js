//required library
const mongoose = require('mongoose');

//connect to required database named contact_list_db
mongoose.connect('mongodb://127.0.0.1:27017/BookUserData');

//give connection to a variable
const db = mongoose.connection;

//for error handling
db.on('error', console.error.bind(console, 'error in connecting to database'));

//if successfully connected to the database
db.once('open', function(){
    console.log('the database is successfully connected');
});