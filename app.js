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

let user = {username : 'admin', password : '1234'};

let users = [];
users.push(user);


app.locals.moment=moment;
app.locals.shortDateFormat="MM/DD/YYYY";
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser('my secret'));
app.use(cookieParser());

app.use(session({ 
    secret: 'my secret',
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
}));

// app.all('/*', function(req, res, next) {
//     // CORS headers
//     res.header("Access-Control-Allow-Origin", "*"); 
//     // restrict it to the required domain
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
//     if(req.method== 'OPTIONS') {
//         res.status(200).end();
//     } else{ next(); 
//     }
// });

// const logs=(req,res,next) => {
//   console.log(req.sessionID);
//   next();
// };
// //Login and check user account, set session idUser
// app.get('/login',logs,function(req,res){
//   i=0;
//   users.forEach(user => {
//     if(req.query.username===user.username && req.query.password===user.password){
//       req.session.iduser=i;
//       res.send("login success!");
//     }
//     i++;
//   });
//   if( ! (req.session.iduser >= 0) ){
//     //res.send("Loginfailed!<ahref='/login_form'>Tryagain</a>");
//     res.send('not authorized');
//   };
// });

// app.get('/login_form', (req,res) => {
//   let username = '';
//   if(req.cookies && req.cookies.username)
//     username=req.cookies.username;
//     res.render('login_form.ejs', {'username' : username});
// });

// //Check login and password 
// const check = (req,res,next) => {
//   if(req.session && (req.session.iduser >=0 )){
//      next();
//   }else{ 
//     res.send("Access denied ! ");
//   }
// };

//Get content endpoint 
// app.get('/',check,function(req,res){
//  // res.send("You can only see this after you've logged in.<br> <a href='/logout'>Logout</a>");
//   app.use('/', routes);
// });

//Logout and destroy session 
// app.get('/logout',function(req,res){
//   req.session.destroy();
//   res.send("Logout success!");
// });


app.use(flash());
app.use(bodyParser.json());
app.use('/', routes);
app.listen(8080, function () {
    console.log("App started at port 8080!!");
});