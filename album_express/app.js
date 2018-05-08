var express = require('express');
var app = express();
var router = require('./controller/router.js')
var ejs = require("ejs");

app.set('view engine','ejs');
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/uploads'));

app.get('/',router.showAlbumsInfo );
app.get('/:album',router.showAlbumsImages);
app.use( (req, res)=>{
   res.send( "Page not found!");
})


app.listen(3000);