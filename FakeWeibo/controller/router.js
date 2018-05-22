
var db = require("../model/db.js");
var formidable = require('formidable');
var md5 = require("../model/md5.js");



function doRegister(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
     console.log(fields);
     var target = [{email: fields.email, psw: md5.encryption(fields.psw)}];
     
     console.log(target);
     //check if username exists
     db.find('test','login',{email:target[0].email},(err,result)=>{
              if(err) {
                console.log(err);

              }
              else if(result.length < 1){
                db.insert('test','login',target, (err,result)=> {
                    if(err){
                        res.send(err);
                    }
                    else{
                        res.send("Success to register");   
                    }
                });
              }
              else {
                   console.log(result);
                  res.send("The email has been registered!");
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
               res.send("Success to login");
             }
         }
     });

    });
}



module.exports={doRegister,doLogin};