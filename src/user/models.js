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

    
    var Commentschema = new Schema({
        'user': {type: Schema.ObjectId, ref: 'User' ,required: true },
        'comment': {type: String, required: true},
        'date': {type:Date}
    });



    Comment  = mongoose.model("Comments", Commentschema);
    module.exports.Schema = Commentschema;
    module.exports.Comment = Comment;


    var UserProfileSchema = new Schema({
        'user': {type: Schema.ObjectId, ref: 'User' ,required: true },
        'first name':{type:String},
        'last name':{type:String},
        'Area':{ 'name':{type:String},
                 'lat':{type:Number},
                 'long':{type:Number}
               },
        'city':{type:String},
        'work':{type:String}
    });

    Profile  = mongoose.model("Profile", UserProfileSchema);
    module.exports.Profile = Profile;

};
