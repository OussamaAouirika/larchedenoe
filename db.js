var mysql= require('mysql');
var config=require('./config');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'raat',
    database:'mydb'
    });
module.exports = connection;