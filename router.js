const http = require("http");
const url = require("url");
const path = require('path');

var server = http.createServer((req, res) => {
      
    var pathname =  req.url.split("/");
      // var pathname =  req.url.split(path.delimiter);

      if(pathname[1] =="student") {
         if(  /^\d{10}$/.test(pathname[2])){
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(" check student id");
         }
         else{
          res.end('Please check your ulr');
         }
           
      }
      else{
     res.writeHead(404, {"Content-Type": "text/plain"});
     res.write("404 Not Found\n");
      }
       console.log(pathname[1]);
        res.end();
});

server.listen( 3000,"localhost");