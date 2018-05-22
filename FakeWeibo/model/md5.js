const crypto = require('crypto');
const hash = crypto.createHash('md5');


function encryption(str){
    for (let i = 0; i < 5; i++) {
        const hash = crypto.createHash('sha256');
        hash.update(str + i);
        console.log(hash.digest('hex'));
    }
    return hash.digest('hex');
}

module.exports={encryption};