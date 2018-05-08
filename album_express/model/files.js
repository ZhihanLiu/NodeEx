const fs = require("fs");

function readDirs ( path,callback) {
    var dirs =[];
    
   fs.readdir(path,(err,files)=>{
    if(err) callback("not found","");
    console.log(files);
      files.forEach(file => {
          console.log(path+"/"+file);
        if( fs.statSync(path+"/"+file).isDirectory()){
            dirs.push(file);
          }
      });
      callback("",dirs);
    });

}


function readFiles ( path,callback) {
    var dirs =[];
    
   fs.readdir(path,(err,files)=>{
    if(err) {
        callback("not found","");
        return;
    }
    console.log(files);
      files.forEach(file => {
          console.log(path+"/"+file);
        if( !fs.statSync(path+"/"+file).isDirectory()){
            dirs.push(file);
          }
      });
      callback("",dirs);
    });

}
module.exports={readDirs,readFiles};