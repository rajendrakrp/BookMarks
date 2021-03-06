/**
 * Created by nikhil on 4/16/16.
 */

const UserModel = require('../user/models').User;
const UserComment = require('../user/models').Comment;
const UserProfile = require('../user/models').Profile;
const dataValidator = require('./datavalidations');
const weburlModel = require('../weburl/models').WebUrl;
const bookmarkModel = require('../bookmarks/models').Bookmark;

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
var getUser = function (email,avoidfields) {
    return new Promise(function (resolve, reject) {
        UserModel.findOne({ email: email},avoidfields)
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
};



var createProfile = function (userprofiledata) {

    return new Promise(function (resolve, reject) {
        console.log('Saving user profile');
        var usrprofile = new UserProfile(userprofiledata);

        usrprofile.save()
            .then(function (savedProfile) {
                console.log('saved user profile...');
                console.log(JSON.stringify(savedProfile));
                resolve(savedProfile);
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

var getUserProfile = function (user,avoidfields) {
    return new Promise(function (resolve,reject) {
        UserProfile.findOne({'user':user._id},avoidfields).then(function (profileobj) {
            resolve(profileobj);
        },function (err) {
            reject(err);
        })
    })
};


var createWebUrl = function(urldata){
    return new Promise(function (resolve, reject) {
        console.log('Saving web url');
        var urlobj = new weburlModel(urldata);

        urlobj.save()
            .then(function (savedUrl) {

                console.log('saved url...');
                console.log(JSON.stringify(savedUrl));
                resolve(savedUrl);
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

var getWebUrl = function (user,avoidfields) {
    return new Promise(function (resolve,reject) {
        weburlModel.find({'author':user},avoidfields).then(function (weburls) {
            resolve(weburls);
        },function (err) {
            reject(err);
        })
    })
};


var createBookmark = function (bookmarkdata) {

    return new Promise(function (resolve, reject) {
        console.log('Saving bookmark data');
        var bookmark = new bookmarkModel(bookmarkdata);

        bookmark.save()
            .then(function (savedbookmark) {
                console.log(JSON.stringify(savedbookmark));
                resolve(savedbookmark);
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

var getBookmark = function (user,avoidfields) {
    return new Promise(function (resolve,reject) {
        bookmarkModel.find({'markedby':user},avoidfields).then(function (weburls) {
            console.log('found bookmarks '+weburls);
            resolve(weburls);
        },function (err) {
            reject(err);
        })
    })
};

var validateUser = function (username,password) {
    return new Promise(function (resolve, reject) {
        UserModel.findOne({ email: username})
            .then(function (userobj) {
                //savedPerson will be an array.
                //The first element is the saved instance of person
                //The second element is the number 1
                if(userobj) {
                    console.log('is user ' + userobj.password);
                    if (dataValidator.password(password) == userobj.password) {

                        resolve(true);
                    }
                    else {
                        reject('Invalid password');
                    }
                }
                else{
                    reject(false);
                }
            }, function (err) {
                console.log(err);
                reject('invalid username or password');
            })
            .catch(function (err) {
                console.log("There was an error in user......" + err);
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


module.exports = {createuser :createUser ,
                  createusercomment : createUserComment,
                  getuser: getUser ,
                  isuser : validateUser ,
                  getprofile: getUserProfile,
                  createprofile:createProfile,
                  createweburl:createWebUrl,
                   getweburl:getWebUrl,
                  createbookmark:createBookmark,
                  getbookmark:getBookmark  };