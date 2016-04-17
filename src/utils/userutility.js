/**
 * Created by nikhil on 4/16/16.
 */

const UserModel = require('../user/user').User;
const UserComment = require('../user/usercomment').Comment;

var createUser = function (userdata) {

    return new Promise(function (resolve, reject) {
        console.log('Saving user data');
        console.log(usr);
        var usr = new UserModel(userdata);

        usr.save()
            .then(function (savedPerson) {
                //savedPerson will be an array.
                //The first element is the saved instance of person
                //The second element is the number 1
                console.log('saved user...');
                console.log(JSON.stringify(savedPerson));
                resolve(savedPerson);
            }, function (err) {
                console.log(err);
                reject(err);
            })
            .catch(function (err) {
                console.log("There was an error" + err.errmsg);
                reject(err);
            })
    });

}

//get user returns a single user hence it accepts email as param  as it is unique on model
var getUser = function (email) {
    return new Promise(function (resolve, reject) {
        UserModel.findOne({ email: email},{ password: 0})
            .then(function (userobj) {
                //savedPerson will be an array.
                //The first element is the saved instance of person
                //The second element is the number 1
                console.log('Got user...');
                console.log(JSON.stringify(userobj));
                resolve(userobj);
            }, function (err) {
                console.log(err);
                reject(err);
            })
            .catch(function (err) {
                console.log("There was an error" + err.errmsg);
                reject(err);
            })
    });
}


var createUserComment = function (user,comment) {

    return new Promise(function (resolve, reject) {
        console.log('Saving user comment');
        data = {user : user._id,comment:comment,date : Date.now()};
        var ucomment = new UserComment(data);

        ucomment.save()
            .then(function (savedcomment) {
                //savedPerson will be an array.
                //The first element is the saved instance of person
                //The second element is the number 1
                console.log('saved user comment...');
                console.log(JSON.stringify(savedcomment));
                resolve(savedcomment);
            }, function (err) {
                console.log(err);
                reject(err);
            })
            .catch(function (err) {
                console.log("There was an error" + err.errmsg);
                reject(err);
            })
    });

}


module.exports = {createuser :createUser ,createusercomment : createUserComment, getuser: getUser};