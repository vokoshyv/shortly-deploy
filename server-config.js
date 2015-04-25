var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var handler = require('./lib/request-handler');

var app = express();

// MONGOOSE SWITCHOVER
mongoose.connect('mongodb://localhost/shortlyDeploy');
// MONGOOSE SWITCHOVER


app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(morgan('dev'));
  app.use(partials());
  // app.use(express.bodyParser());
  // MONGOOSE SWITCHOVER
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  // MONGOOSE SWITCHOVER
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

app.get('/', util.checkUser, handler.renderIndex);
app.get('/create', util.checkUser, handler.renderIndex);

app.get('/links', util.checkUser, handler.fetchLinks);
app.post('/links', handler.saveLink);

app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

app.get('/*', handler.navToLink);

module.exports = app;
