const files = require('../model/files.js');


function showAlbumsInfo( req,res,next){
    files.readDirs('./Uploads'+req.url, (err, files) =>{
        if(err) next();
       
        res.render("index",{dirs:files});
    });
    
}

function showAlbumsImages( req,res,next){
    files.readFiles('./Uploads'+req.url, (err, files) =>{
        if(err) {
            next();
            return;
        }
        res.render("index1",{pathname: req.url,dirs:files});
    });
}
module.exports={showAlbumsInfo, showAlbumsImages};