// ---------------------------------------------------------------------------
var express = require('express');
var path = require('path');
var fs = require('fs');
const { json } = require('express');
var alert=require('alert'); // new 
var session = require("express-session"); // new
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ // new 
    secret:'secret key',
    resave:false,
    saveUninitialized:false
  })
  );

// new for depolyment
const port = process.env.PORT || 3000;

// ----------------------------------------------------------------------------------- login and registeration

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

-------------------------------------------------------------------------- login and registeration
*/

  const MongoClient = require('mongodb').MongoClient;
  let db;
  const client = new MongoClient('mongodb://0.0.0.0:27017');
  client.connect((err) => {
    if (err) throw err;
    console.log('Successfully connected to MongoDB server');
    db = client.db('myDB');
  });
  
  app.get('/',function(req,res) {
  res.render('login');
  })
  app.post('/',async(req,res)=>{
  let username= req.body.username;
  let password=req.body.password;
  if(username == 'admin' && password == 'admin')
      {
        session=req.session;
        session.username=username;
        return res.redirect('home');      
    
      }
  var user =await db.collection("myCollection").findOne({username:username});
  if(user){
    if(password==user.password){
      session=req.session;
      session.username=username;
      res.render('home');
    }else{
      alert("wrong password");
      res.redirect('/');
    }
  }else{
    alert("wrong username");
    res.redirect('/');
  }
  });
  app.get('/registration',function(req,res){
  
  res.render('registration');
  
  });    
  app.post('/register', function(req, res)  {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.redirect('registration');
    }
  
    db.collection('myCollection').countDocuments({ username }, (err, count) => {
      if (err) {
        throw(err);
      } else if (count > 0) {
        alert("username already found");
        res.redirect('registration');
      } else {
        db.collection('myCollection').insertOne({ username, password, wantToGo: [] });
        res.redirect('/');
      }
    });
  });
 
//------------------------------------------------------------------------- want to go  
app.get('/wanttogo',async(req,res)=>{
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else{
  var user =  await db.collection('myCollection').findOne({username:req.session.username})
  var passed_Array_From_Get_Function = user.wantToGo
  res.render('wanttogo',{passed_Array_From_Get_Function: passed_Array_From_Get_Function})
  }
})
   app.post('/add',async function(req,res){
    var city = req.body.button;
    var user=await db.collection("myCollection").findOne({username:req.session.username});
    var cities=user.wantToGo;
    if(cities.includes(city)){
      alert("already added");
    }else{
      db.collection("myCollection").updateOne({username: req.session.username},{$push: { wantToGo: city }});
    }  
    res.redirect(city);
});
// ------------------------------------------------- -------------------------search
app.get('/search',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else{
    res.render('searchresults',{toShow: [] , Msg: ""});
  }
});
app.post('/search' , function(req,res){ 
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

// ------------------------------------------ all other simple get functions 

app.get('/home',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else{
    res.render('home');
  }
});
app.get('/hiking',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else{

  
    res.render('hiking'); 
  }
});
app.get('/inca',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else
  {
    res.render('inca');     
  }
});
app.get('/annapurna',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else
  {
    res.render('annapurna');    
  }
});
app.get('/cities',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else{
    res.render('cities');    
  }
});    
app.get('/paris',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else
  {
    res.render('paris');
  }
});           
app.get('/rome',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else{
    res.render('rome');
  }
}); 
app.get('/islands',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else{

  
    res.render('islands');
  }
});
app.get('/santorini',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else
  {
    res.render('santorini');
  }
}); 
app.get('/bali',function(req,res){
  if(session.username == null)
  {
    return res.redirect('/');
  }
  else
  {
    res.render('bali');
  }
});  
//-----------------------------------------------------------------------------------------
app.listen(port);
