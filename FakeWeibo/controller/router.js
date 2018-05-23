
var db = require("../model/db.js");
var formidable = require('formidable');
var md5 = require("../model/md5.js");



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
                  target[0].psw = md5.encryption(fields.psw);
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
     console.log( "login psw" + target.psw);
     //check if username exists