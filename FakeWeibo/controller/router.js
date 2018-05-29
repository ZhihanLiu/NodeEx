
var db = require("../model/db.js");
var formidable = require('formidable');
var md5 = require("../model/md5.js");
var postModel = require("../model/post.js");

function logout(req,res) {
    req.session.email = "";
    req.session.login = 0;
    res.redirect("/");
}
function showIndex(req,res) {
    console.log( req.session.login);
    postModel.find({},function (err, result){
        
        res.render("index", {login : req.session.login,email :req.session.email, card: result});
    });
}
 
function login(req, res){
    res.render("login");
}

function register(req, res){
    res.render("register");
}

function postWeibo(req, res){
    if(req.session.login != 1) {
        res.redirect("login");
        return;
    }
    postModel.find({ author:req.session.email},function (err, result){
        res.render("myWeibo", {login : req.session.login,email :req.session.email, card: result});
    });
    
}
function doPost (req,res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
     console.log(fields);
     
       var p = new postModel({content:fields.content,author:req.session.email })
       console.log(p.content);
       p.save(function (err) {
        if (err) return handleError(err);
             console.log("stored");
       });
    });
}

function doRegister(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
     console.log(fields);
    

     var target = [{email: fields.email, psw:fields.psw }];
     
     console.log(target);
     //check if username exists
     db.find('test','login',{email:target[0].email},(err,result)=>{
              if(err) {
                console.log(err);
                res.send("Error 1234");

              }
              else if(result.length < 1){
                  console.log("ss");
                  target[0].psw = md5.encryption(fields.psw);
                db.insert('test','login',target, (err,result)=> {
                    if(err){
                        res.send(err);
                    }
                    else{
                        console.log("finished");
                        res.send("Success to register");   
                    }
                });
              }
              else {
                  console.log("asdasd");
                   console.log(result);
                   res.send("The email has been registerd");
              }
            }
            );
     });
}



function doLogin(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
     console.log(fields);
     var target = {email: fields.email, psw: md5.encryption(fields.psw)};
     console.log( "login psw" + target.psw);
     //check if username exists
     
     db.find('test','login',target, (err,result)=> {
         if(err){
             res.send(err);
         }
         else{
             if(result.length < 1) {
               res.send("Failed to login")
             }
             else{
                 req.session.login= 1;
                 req.session.email = fields.email;
               res.send("Success to login");

             }
         }
     });

    });
}



module.exports={postWeibo,doPost,logout, showIndex, login, register,doRegister,doLogin};