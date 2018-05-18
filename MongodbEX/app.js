
var session = require('express-session')
const db = require("./models/db.js");
/*
var target = [{asd:"111"},{ss:1}];
db.insert("test1",target,(err,result)=>{

  console.log(result);
});
target = {asd:'111'};


db.find("test",target,(err,docs)=>{
  if(err) {
    console.log(err);
    return;
  }
console.log("--------------------------------");
console.log(docs);
});
db.find("test1",(err,docs)=>{
if(err) {
  console.log(err);
  return;
}
console.log("--------------------------------");
console.log(docs);
});
*/
let ejs = require('ejs')
var express = require('express')
var app = express()

app.set('view engine','ejs');
app.use(express.static(__dirname +'/public'));


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

app.get('/',(req, res)=> {
if(req.session.login) {
  res.send("Welcome back");
  return;
}
 res.render('index');
}) ;

app.get('/check',(req, res)=> {

 console.log(req.query);
 

 var target = {username : req.query.uname};
 db.find("test","login",target,(err, result)=>{
   if(err || result == null || result[0].psw != req.query.psw ) {
    console.log(result);
     console.log(result.psw );
     console.log(req.query.psw);
     res.send(err||"Failed");
     
   }
   else{
     console.log("ffinish");
     req.session.login = true;
    res.send("Welcome");
   }
 });


 }) ;

app.listen(3000);
