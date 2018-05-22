const express = require("express");
var app = express();
const router = require("./controller/router.js");
const ejs = require("ejs");

app.set("view engine","ejs");


app.get("/", (req,res) => {
    res.render("index");
});


app.get("/register", (req,res) => {

    res.render("register");
});

app.get("/login", (req,res) => {

    res.render("login");
});



app.post('/doRegister', router.doRegister);

app.post('/doLogin', router.doLogin);

app.listen(3000);