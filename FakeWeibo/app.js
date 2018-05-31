const express = require("express");
var app = express();
const router = require("./controller/router.js");
const ejs = require("ejs");
var session = require('express-session');
var server = require('http').Server(app);
var io = require('socket.io')(server);



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
app.get('/chatroom',router.getChatRoom);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log("asdasd");
    io.emit('chat message', msg);
  });
});
    

server.listen(3000);