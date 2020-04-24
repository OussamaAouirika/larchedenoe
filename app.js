const express = require('express');
const mysql = require('mysql');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const session= require('express-session');
const flash = require('express-flash');
const app = express();
const routes = require('./routes/routes');
const path = require('path');
const methodOverride = require('method-override');
const moment= require('moment');
let connection= require('./db.js');
app.locals.moment=moment;
app.locals.shortDateFormat="MM/DD/YYYY";
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser('keyboard cat'));
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
app.use(flash());
app.use(bodyParser.json());
app.use('/', routes);
app.listen(8080, function () {
    console.log("App started at port 8080!!");
});