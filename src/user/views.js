/**
 * Created by nikhil on 4/17/16.
 */
var express = require('express');
var router = express.Router();
var userobjects = require('./models');
var userutils = require('../utils/userutility');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.use(function setuser(req, res, next) {
    if(req.cookies.isuser) {

        console.log('got logged i user.....'+req.cookies.isuser);
        res.cookie('isuser', 'true', {httpOnly: false , secure : false, maxAge: 60000});
    }
    next();
});





router.get('/:username/profile', function (req, res) {

    res.promise(new Promise(function (resolve,reject){

        if(req.cookies.isuser){

            userutils.getprofile(req.user).then(
                function (profile) {
                    resolve(profile);
                },
                function (error) {
                reject({'error': error.message})
            });
        }
        else {
            reject({'error':'User not logged in'})
        }
    }));

});



router.post('/:username/profile/',function (req,res) {

    var email = req.body.email;
    var pass = req.body.password;

    res.promise(new Promise(function(resolve,reject){

       userutils.getuser(email).then(function(user){
       if(user){
           profiledata =    {
                        'user': user._id,
                        'first name':req.body.firstname,
                        'last name':req.body.lastname,
                        'Area':{ 'name':req.body.area.name,
                            'lat':req.body.area.lat,
                            'long':req.body.area.long
                                },
                        'city':req.body.city
                        }
           userutils.createprofile(profiledata).then(function(profileobj){
               resolve(profileobj);
           },function(err){
               reject(err);
           });
       }
        reject(null);
    }, function (err) {reject(err.message);});

    }));




});



router.post('/login/', function (req, res) {

    var email = req.body.username;
    var password = req.body.password;

    res.promise(new Promise(function(resolve,reject){

            userutils.isuser(email, password).then(function (user) {

        if (user) {
            console.log('logged in user:'+email);
            res.cookie('isuser', 'true', {httpOnly: false , secure : false, maxAge: 120000});
            resolve( {'user':user});
        }
        else {

            reject( {'user':'not a user'});
        }
    }, function (err) {
             console.log('login error '+email+'  '+err.message);
              reject('error'+err.message);
    })

    }));



});


router.post('/signup/',function (req,res) {
    userdata = {name:req.body.name,email:req.body.email,password:req.body.password};
    res.promise(userutils.createuser(userdata).then(function (user) {
        return {'username :':user.email};
    },function (err) {
        return {'error':err.message};
    }))
});




module.exports = router;