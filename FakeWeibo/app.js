const express = require("express");
var app = express();
const router = require("./controller/router.js");
const ejs = require("ejs");
var session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

  }))

app.set("view engine","ejs");


app.get("/", router.showIndex);


app.get("/myWeibo",router.postWeibo);
app.get("/register", router.register);

app.get("/login", router.login);

app.get("/logout",router.logout);

app.post('/doRegister', router.doRegister);

app.post('/doLogin', router.doLogin);
app.post('/doPost', router.doPost);

app.listen(3000);