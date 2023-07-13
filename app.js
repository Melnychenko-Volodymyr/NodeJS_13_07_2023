const express = require('express');
const bodyParser = require('body-parser');
const mainRoute = require('./routes/main');

const mongoose = require('mongoose');

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);


const server = express();

server.use(bodyParser.json());

server.set('view engine','ejs');
server.set('views', __dirname + '/views');

server.use(express.static(__dirname +  '/public'));


// Підключення до бази даних MongoDB
mongoose.connect('mongodb://localhost/session-auth-example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Налаштування сесій та збереження сесій в базі даних MongoDB
const store = new MongoDBStore({
  uri: 'mongodb://localhost/session-auth-example',
  collection: 'sessions',
});

server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
  store: store
}));


server.use('/', mainRoute);

server.listen(3000);


