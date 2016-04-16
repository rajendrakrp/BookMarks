/**
 * Created by nikhil on 4/16/16.
 */
const crypto = require('crypto');


const secret = 'm0n9b8v7';
const encrypter = crypto.createHmac('sha256', secret);


function validateEmail() {
    var re = /\S+@\S+\.\S+/;
    return re;
}


function passsword(passwordstring) {

    var hash = encrypter.update(passwordstring).digest('hex');

    return hash;
}


var validator = {email : validateEmail() ,password : passsword};




module.exports = validator;