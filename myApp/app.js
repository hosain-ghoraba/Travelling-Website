// ---------------------------------------------------------------------------
var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ----------------------------------------------------------------------------------- the part above is fixed

/* below is the pizza page code from vedio 1 , to get an idea of how 'get' and 'post' functions are done in the easiest scenario

 app.get('/pizza' , function(req,res){
 res.render('pizzaPage' , {ppp:"pizza"});
 });

 app.post('/pizza' , function(req , res){
   var x = req.body.user;
   var y = req.body.pass;
   console.log(x);
   console.log(y);

 });
 */

 /*
html pages classifications :-

annapurna     : destination
bali          : destination
cities        : category
hiking        : category
home          : direct page after login page
inca          : destination
islands       : category
login         : first page to be displayed
paris         : destination
registration  : shown if user clicked on 'I don't have an account ' in the login page
rome          : destination
santorini     : destination
searchresults : shown after clicking on the 'search' button exsisting in all the pages in this project
wanttogo      : shown if user clicked on  'want to go list' in the home page
s

*/

// -------------------------------------------------------------------------------------------start of our code



app.get('/' , function(req,res){
  res.render('login');
});

app.post('/search' , function(req,res){ // i think it must take a parameter (the text written in search bar)
  res.render('searchresults');
});









app.listen(3000);
