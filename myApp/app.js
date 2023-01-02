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

app.get('/wanttogo',function(req,res){
  var v4 = fs.readFileSync('usernames.mongodb')
  var v41= mongodb.parse(v4)
  var wl = []
  for(let i=0;i<v41.length;i++){
   if(v41[i].username==req.session.username){
       wl = v41[i].wanttogo
       res.render('wanttogo',{
       tasks : wl
   })
   }
   }
})
app.post('/add',function(req,res){
  var v3 = fs.readFileSync('usernames.mongodb')
  var Bool3  = checkwanttogo(req.session.username,mongodb.parse(v3),req.body.addtowanttogo)
  if(Bool3){
      res.send('<p> Wanttogo already contains this city <p>')
  }
  else{
     v31 = mongodb.parse(v3)
     for(let i=0;i<v31.length;i++){
      if(v31[i].username==req.session.username){
          v31[i].wanttogo.push(req.body.addtowanttogo)
          fs.writeFileSync('usernames.mongodb')
          var v4 = fs.readFileSync('usernames.mongodb')
          var v41= mongodb.parse(v4)
          var wl = []
          for(let i=0;i<v41.length;i++){
           if(v41[i].username==req.session.username){
               wl = v41[i].wanttogo
               res.render('wanttogo',{
               tasks : wl
           })
           }
           }
      }
     }
  }
})

// ------------------------------------------------- -------------------------search

app.get('/search',function(req,res){
    res.render('searchresults',{toShow: [] , Msg: ""});
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
