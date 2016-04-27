var mongoose = require("mongoose");
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);



mongoose.connect('mongodb://localhost:27017/bookmark_db_dev');



process.on('exit',function (code) {

    console.log('hello nikhil Process exiting '+code)
});





var models = ['./src/user/models.js','./src/weburl/models.js','./src/bookmarks/models.js' ];

var initialize = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i]).init();
    }
};


initialize();


var app = require('./src//MainApp');


var utils = require('./src/utils/userutility');


utils.createuser({name: "Nikhil", email: 'nikhil.navin999@gmail.com' ,password:'nik'}).then(function (userobj) {

    var data = {
        'user': userobj._id,
        'first name':'nikhil',
        'last name': 'navin',
        'Area':{ 'name':'isro',
                 'lat':10,
                 'long':10
               },
        'city':'bangalore'
    };

    utils.createprofile(data).then(function (profileobj) {
        console.log(profileobj);
        utils.getuser('nikhil.navin999@gmail.com').then(function (user) {
    console.log('getting profile for'+user.email);
    utils.getprofile(user).then(function (profileobj) {
        console.log(profileobj);
        var weburldata = {
        'url': 'www.google.com',
        'authorname': 'nikhil',
        'author':profileobj._id,
        'tags':['search']
    };
        utils.createweburl(weburldata).then(function (weburl) {
            console.log(weburl);
            weburldata.url='www.nikhilllll.com';
            utils.createweburl(weburldata).then(function (weburl) {
            console.log(weburl);
            utils.getweburl(profileobj).then(function (listofurls) {

               console.log(listofurls);
                for(var i =0 ;i < listofurls.length;i++){
                    var bookmarkdata = {    'markedby':profileobj._id,
                                            'url': listofurls[i],
                                            'notes': 'my note '+i,
                                            'date': Date.now(),
                                            'tags':['tag'+i]
                                        };
                    utils.createbookmark(bookmarkdata).then(function (bookmark) {
                        console.log(bookmark)
                        utils.getbookmark(profileobj).then(function (listofbookmarks) {
                            console.log(listofbookmarks);
                        },function (error) {
                            console.log(error.message);
                        })
                    },function (error) {
                        console.log(error.message);
                    })
                }

            },function (error) {
                console.log(error);
            });


        },function (error) {
            console.log(error.message);
        })

        },function (error) {
            console.log(error.message);
        })

    },function (error) {
        console.log(error.message);
    })
},function (error) {
    console.log(error.message)
});
    },function (error) {
        console.log(error.message)
    })
},function (error) {
    console.log(error.message)
});




// app.start();
// getuser  = require('./src/utils/userutility').getuser;
//
//
// getuser('nikhil.navin999@gmail.com').then(function (user) {
//
//     console.log(' Found usser')
//     console.log(user);
//     process.exit(0);
//
// },function (err) {
//     console.log(err);
//     process.exit(0)
// });



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



















