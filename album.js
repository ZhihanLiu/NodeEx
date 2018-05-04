
const formidable = require('formidable');
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const server = http.createServer( (req, res)=> {
    var myUrl = url.parse(req.url);
    var pathname = myUrl.pathname;
    var dir = [];
    var file = [];
    var paths = [];

    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir="./album";
        form.parse(req, function(err, fields, files) {
          res.writeHead(200, {'content-type': 'text/plain'});
          res.write('received upload:\n\n');
       
          res.end();

        });
     
        return;

      }
      else if (pathname == "/") {
        
        //todo read album directory
        console.log(readFileDir(__dirname+"/album", (err, dirs) =>{
            dir = dirs;
            console.log(dirs);
            fs.readFile(__dirname+"/index.ejs",(err, data) => {
                if(err) res.end("ERROR");
               var templete = data.toString();
               
        
               res.end(ejs.render(templete,{dirs:dir} ));
            });
        }));
       
     
    }
    else if (pathname =="/admin"){
        fs.readFile(__dirname+'/admin.html',(err,data)=>{
        
            if(err) {
               
    
                    res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
                    res.end("404 not found");
                   
                   return;
            } 
            else {
            
              
                res.writeHead(200, { 'Content-Type':'text/html' });
                res.write(data);
            }
            res.end();
        });
    }
    else{
     console.log(pathname);
     fs.stat(__dirname+'/album/'+pathname,(err,stats)=>{


        if(err){
             res.end("404 can not find the file");
              return;
            }
        if(pathname.indexOf(".") == -1) {
        
            readFileDir2(__dirname+'/album/'+pathname,(err,files)=>{
                if(err) res.end("ERROR");
                file = files;
              
                 // console.log("apth"+ files);
                fs.readFile(__dirname+"/index1.ejs",(err, data) => {
                    for(var i = 0; i < files.length; i++) {
                        var temppath = pathname +"/"+ files[i];
                        console.log("temppath " +temppath);
                        paths.push(temppath);
                     }
                    if(err) res.end("ERROR");
                   var templete = data.toString();
                    
                   
                   res.end(ejs.render(templete,{dirs:file,paths:paths} ));
                });
            });
    
           return;
         }
        fs.readFile(__dirname+'/album/'+pathname,(err,data)=>{

            console.log('./album/'+pathname);
            if(err) {
               
    
                    res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
                    res.end("404 not found");
                   
                   return;
            } 
            else {
                 var extname = path.extname('./album/'+pathname);
               
                 var mimeType = getMime(extname);
              
                res.writeHead(200, { 'Content-Type': mimeType });
                res.write(data);
            }
            res.end();
        });
        
     });
   
 
}
});

function readFileDir ( path,callback) {
    var dirs =[];
    
   fs.readdir(path,(err,files)=>{
    console.log(files);
      files.forEach(file => {
          console.log(path+"/"+file);
        if( fs.statSync(path+"/"+file).isDirectory()){
            dirs.push(file);
          }
      });
    });
 callback("",dirs);
}


function readFileDir2 ( path,callback) {
    var dirs =[];
    
   fs.readdir(path,(err,files)=>{
    
    console.log(files);
      files.forEach(file => {
          console.log(path+"/"+file);
        if( !fs.statSync(path+"/"+file).isDirectory()){
            dirs.push(file);
          }
      });
    });
 callback("",dirs);
}
function getMime(ext) {
  
   var text = fs.readFileSync("./mime.json");
  
  var temp = JSON.parse(text);
    
  return temp[ext];
    

}

server.listen(3000,"localhost");