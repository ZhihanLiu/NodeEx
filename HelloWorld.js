console.log("Hello World!");

const http  = require("http");

http.createServer((req, res)=>{

res.end("Hello Node Js");
}).listen(3000,"localhost");