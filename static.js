

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const server = http.createServer( (req, res)=> {
    var myUrl = url.parse(req.url);
    var pathname = myUrl.pathname;
    if (pathname == "/") {
        pathname += "index.html";
    }
     console.log(pathname);
    fs.readFile('./static/'+pathname,(err,data)=>{
        console.log('./static/'+pathname);
        if(err) {
            /*fs.readFile("./static/404.html",(err,data)=>{
                
                if(err){
                    throw err;
                console.log(err);
                }
                else{
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return;
               / }
            });*/

            fs.readFile("./static/404.html",function(err,data){
                if(err) throw err;
				res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
                res.write(data);
                res.end();
               
			});
		       return;
        } 
        else {
             var extname = path.extname('./static/'+pathname);
             console.log("asdasd"+extname);
             var mimeType = getMime(extname);
            console.log("mimetype is " + mimeType);
            console.log(`mimetype is   ${mimeType}`);
            res.writeHead(200, { 'Content-Type': mimeType });
            res.write(data);
        }
        res.end();
    });
});

function getMime(ext) {
  
   var text = fs.readFileSync("./mime.json");
  
  var temp = JSON.parse(text);
    
  return temp[ext];
    

}

server.listen(3000,"localhost");