var mongoose = require("mongoose");
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);



mongoose.connect('mongodb://localhost/bookmark_db_dev');



process.on('exit',function (code) {

    console.log('hello nikhil Process exiting '+code)
});





var models = ['./src/models/user','./src/models/usercomment.js','./src/models/weburl.js','./src/models/bookmarks.js' ];

var initialize = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i]).init();
    }
};


initialize();
process.exit(0);



// var user_data = {name: "Nikhil", email: 'nikhil.navin999@gmail.com' ,password:'nik'};
//
//
// createuser  = require('./src/utils/userutility').createuser;
// createusercomment  = require('./src/utils/userutility').createusercomment;
//
// createuser(user_data).then(
//     function (user) {
//     console.log('Done!!!!!!!!!!!!!!!');
//     createusercomment(user,'first comment').then(function (comment) {
//         console.log(comment);
//         process.exit(0);
//
//     })
//
// },function (err) {
//
//     console.log('NO!!!!!!!!!!!!!')
//     console.log(err.toJSON())
//     process.exit(0);
// });



















