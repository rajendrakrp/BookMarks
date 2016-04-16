var mongoose = require("mongoose");
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

var dataValidator = require('../utils/datavalidations.js');
var Schema = mongoose.Schema;

module.exports.init = function() {
    var UserSchema = new Schema({
        'name': {type: String, required: true},
        'email': {type: String, required: true, unique: true , match : dataValidator.email},
        'password' : {type: String , required: true , set: dataValidator.password }
    });


    User = mongoose.model("User", UserSchema);


    module.exports.schema = UserSchema;
    module.exports.User = User;
};