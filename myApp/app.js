// ---------------------------------------------------------------------------
var express = require('express');
var path = require('path');
var fs = require('fs');
const { json } = require('express');
// const { MongoClient } = require('mongodb');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// new for depolyment
const port = process.env.PORT || 3000;

// ----------------------------------------------------------------------------------- the part above is fixed

 /*


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
// these lines lines should be written whenever inserting or getting any thing from the database ( which will happen in some get and post methods)
// MongoClient.connect("mongodb://127.0.0.1:27017" , function(err,client){ // the 127.0.0.1:27017 is from the email sent by dr amr
// if(err) throw err;
// var db = client.db('myDB');
// // inserting records 
// db.collection('myCollection').insertOne({username: "ali" , password: "abc"});
// // getting a certain record
// });
//------------------------------------------------- get and post in guc

app.get('/search',function(req,res){
    res.render('searchresults',{toShow: [] , Msg: ""});
});
app.post('/search' , function(req,res){ // i think it must take a parameter (the text written in search bar)
    const word = req.body.Search
    const all_destinations = ["inca","annapurna","paris","rome","santorini","bali"];
    const returned_destinations = [];
    var errorMsg = ""
    for(const destination of all_destinations)
    {       
        if(destination.includes(word))
        {           
            returned_destinations.push(destination);            
        }
    }
  
   if(returned_destinations.length == 0)
       errorMsg = "any thing to make lenth != 0 "
   res.render('searchresults',{toShow: returned_destinations , Msg: errorMsg});   
    
});

app.get('/' , function(req,res){
    res.render('home');
});


app.get('/registration',function(req,res){
    res.render('registration');
});
app.get('/home',function(req,res){
    res.render('home');
});
app.get('/hiking',function(req,res){
    res.render('hiking'); 
});
app.get('/inca',function(req,res){
    res.render('inca');     
});
app.get('/annapurna',function(req,res){
    res.render('annapurna');    
});
app.get('/cities',function(req,res){
    res.render('cities');    
});    
app.get('/paris',function(req,res){
    res.render('paris');
});           
app.get('/rome',function(req,res){
    res.render('rome');
}); 
app.get('/islands',function(req,res){
    res.render('islands');
});
app.get('/santorini',function(req,res){
    res.render('santorini');
}); 
app.get('/bali',function(req,res){
    res.render('bali');
});  
//-----------------------------------------------------------------------------------------






app.listen(port);


/*  button to lead to a page


/*

if(!("inca".includes(word))){
            document.getElementById('inca').style.visibility = 'hidden';
        }
        if(!("annapurna".includes(word))){
            document.getElementById('annapurna').style.visibility = 'hidden';
        }
        if(!("paris".includes(word))){
            document.getElementById('paris').style.visibility = 'hidden';
        }
        if(!("rome".includes(word))){
            document.getElementById('rome').style.visibility = 'hidden';
        }
        if(!("bali".includes(word))){
            document.getElementById('bali').style.visibility = 'hidden';
        }
        if(!("santorini".includes(word))){
            document.getElementById('santorini').style.visibility = 'hidden';
        }
*/