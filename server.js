  
//Install express server
const PORT = process.env.PORT || 8080
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const client = require('./db/connection')
var path = require('path'); 

//Declaration des routes
var users = require('./routes/users');
var auth = require('./auth/auth');

// Connect to databse
client.connect()

const app = express();

// Enable Cors policy
app.use(cors())

// User body parser for json object
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended : false}))

// Enable persistance access
app.use('/users', users);
app.use('/auth', auth);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/weedFront'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname +'/dist/weedFront/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(PORT, () => console.log("Listening on port " + PORT));