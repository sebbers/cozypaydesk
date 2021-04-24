const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const path = require('path');


app.use(cors());
app.use(bodyParser.json());

var uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/test';

mongoose.connect(uristring, {useNewUrlParser: true});


const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
