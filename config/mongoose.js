// require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/vending_machine_db');
// mongoose.connect('mongodb+srv://aman:anand@cluster0.1cvld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// acquire the connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'connection error:'));

// up and running then print the message
db.once('open', function() {
    console.log('Sucessfully connected to the database');
}); 