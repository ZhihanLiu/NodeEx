const crypto = require('crypto');



function encryption(str){
    const hash = crypto.createHash('md5');
  
     var ps =   hash.update(str).digest('hex');
    
    return ps;
}

module.exports={encryption};