const express = require('express');
const app = express();
var fs=require('fs');
var mysql = require('mysql');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var path = require('path');
const events = require('events');
var JSAlert = require("js-alert");
var login=('./login.js');

var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'mysql-user',
   password : 'mysql-password',
   database : 'database-name'
 });

app.use('/public', express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
connection.connect();

app.get('/', function(req, res){
   //res.send("Hello world!");
   connection.resume();
   res.sendFile('/home/trainee/Documents/myapp/views/index.html');
   

});

app.get('/login', function(req, res){
   var email = req.query.email; //mytext is the name of your input box
   var pass = req.query.pass;

   
   connection.query('SELECT `email`,`password` FROM `user`', function (error, results, fields) {
      // error will be an Error if one occurred during the query
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
      if (error) throw error;
      var result=results;
      var flag=0;
      console.log(result);
      for(var i=0;i<result.length;i++){
         if(result[i]['email']==email){
            flag=1;
            if(result[i]['password']==pass){
               res.sendFile('/home/trainee/Documents/myApp2/views/success.html');
            }
            else{
               res.sendFile('/home/trainee/Documents/myApp2/views/error.html');
            }
         }
      }
      if(flag==0){
         res.sendFile('/home/trainee/Documents/myApp2/views/register.html');
      }
    });
     
    

});
app.get('/register', function(req, res){
   
   var name= req.query.name;
   var email=req.query.email;
   var pass = req.query.pass; //mytext is the name of your input box

   connection.query('SELECT `email`,`password` FROM `user`', function (error, results, fields) {
      // error will be an Error if one occurred during the query
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
      if (error) throw error;
      var result=results;
      var flag=0;
      console.log(result);
      for(var i=0;i<result.length;i++){
         if(result[i]['email']==email){
            flag=1;
            res.sendFile('/home/trainee/Documents/myApp2/views/index.html');
         }
      }
      if(flag==0){
         connection.query('insert into `user` (Name,email,Password) values (?,?,?)', [name,email,pass], function (error, results, fields) {
            // error will be an Error if one occurred during the query
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            //if (error) throw error;
            var result=results;
            res.sendFile('/home/trainee/Documents/myapp/views/registrer_success.html');
            console.log('Data inserted');
            connection.pause();
         });
      }
    });
   

});


app.listen(3000);
console.log('Server running on: http://127.0.0.1:3000');
