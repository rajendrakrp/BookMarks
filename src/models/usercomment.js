/**
 * Created by nikhil on 4/11/16.
 */

/**
 * Created by nikhil on 4/11/16.
 */
var mongoose = require("mongoose");
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);


var Schema = mongoose.Schema;

module.exports.init = function() {
    var Commentschema = new Schema({
        'user': {type: Schema.ObjectId, ref: 'User' ,required: true },
        'comment': {type: String, required: true},
        'date': {type:Date}
    });


    Comment  = mongoose.model("Comments", Commentschema);


    module.exports.Schema = Commentschema;
    module.exports.Comment = Comment;
};