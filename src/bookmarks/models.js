/**
 * Created by nikhil on 4/11/16.
 */

var mongoose = require("mongoose");
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);


var Schema = mongoose.Schema;


module.exports.init = function() {
    var BookMarkSchema = new Schema({
        'markedby':{type :Schema.ObjectId,ref : 'Profile'},
        'url': {type: String, ref: 'WebUrl' ,required: true },
        'notes': {type: String},
        'date': {type:Date},
        'tags':[{type : String}]
    });


    Bookmark  = mongoose.model("Bookmark", BookMarkSchema);


    module.exports.Schema = BookMarkSchema;
    module.exports.Bookmark = Bookmark;

    console.log('initialized bookmarks');
};








