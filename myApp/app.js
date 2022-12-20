// ---------------------------------------------------------------------------
var express = require('express');
var path = require('path');
var fs = require('fs');
const { json } = require('express');
const { MongoClient } = require('mongodb');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ----------------------------------------------------------------------------------- the part above is fixed

 /*
html pages classifications :-

login         : first page to be displayed
registration  : shown if user clicked on 'I don't have an account ' in the login page
home          : direct page after login page (if user entered valid credentials in login page)
cities        : a category (clicked in the 'home'page)
hiking        : a category (clicked in the 'home'page)
islands       : a category (clicked in the 'home'page)
annapurna     : a destination ((for 'hiking' category))
inca          : a destination (for 'hiking' category)
paris         : a destination (for 'cities' category)
rome          : a destination (for 'cities' category)
bali          : a destination (for 'islands' category)
santorini     : a destination (for 'islands' category)
searchresults : shown after clicking on the 'search' button exsisting in all the pages in this project
wanttogo      : shown if user clicked on  'want to go list' in the home page

 -------------------------------------------------------------------------------------------
 below is the pizza page code from vedio 1 , to get an idea of how 'get' and 'post' functions are done in the easiest scenario

 app.get('/pizza' , function(req,res){
 res.render('pizzaPage' , {ppp:"pizza"});
 });

 app.post('/pizza' , function(req , res){
   var x = req.body.user;
   var y = req.body.pass;
   console.log(x);
   console.log(y);

 });
----------------------------------------------------------------------------------------------
variablese and objects code from vedio 2

var x = {name: "ali" , age: 27 , username: "ali92" , password: "abc123"};
var y = JSON.stringify(x);
fs.writeFileSync("users.json",y);

var data = fs.readFileSync("users.json");
var z = JSON.parse(data);

-------------------------------------------------------------------------- database connection 
*/
// first step : connect to the database, using code from vedio 2 (minute 39)
MongoClient.connect("mongodb://127.0.0.1:27017" , function(err,client){ // the 127.0.0.1:27017 is from the email sent by dr amr
if(err) throw err;
var db = client.db('myDB');
// inserting records 
db.collection('myCollection').insertOne({username: "ali" , password: "abc"});
// getting a certain record


});


// ---------------------------------------------------------------------------

app.get('/' , function(req,res){
  res.render('login');
});

app.post('/search' , function(req,res){ // i think it must take a parameter (the text written in search bar)
  res.render('searchresults');
});








app.listen(3000);
