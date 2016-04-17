/**
 * Created by nikhil on 4/11/16.
 */

var mongoose = require("mongoose");
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);


var Schema = mongoose.Schema;


module.exports.init = function() {
    var WebUrlSchema = new Schema({
        'url': {type: String,required: true },
        'authorname': {type: String},
        'author':{type :Schema.ObjectId,ref : 'User'},
        'tags':[{type : String}]
    });


    WebUrl  = mongoose.model("WebUrl", WebUrlSchema);


    module.exports.Schema = WebUrlSchema;
    module.exports.WebUrl = WebUrl;
};








