
var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



// app.get('/pizza' , function(req,res){
// res.render('pizzaPage' , {ppp:"pizza"});
// });
// app.post('/pizza' , function(req , res){
//   var x = req.body.user;
//   var y = req.body.pass;
//   console.log(x);
//   console.log(y);

// });

app.get('/' , function(req,res){
  res.render('login');
});

app.post('/' , function(req,res){ // must first check if creditials are in the database
  res.render('home');
});

// app.get('/home',function(req,res){
// res.render('/home');
// });

// haha
// batika
// coco
// haha








app.listen(3000);
