/**
 * Created by nikhil on 4/17/16.
 */

//require express module
var express = require('express');


//require request middleware modules
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//require application views
var userview = require('./user/views');


//create the app object
var app = express();

//register request middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function (req, res, next) {
    res.promise = function (promise) {
        promise.then(function (data) {
            console.log(data);
            res.send(data)
        }, function (err) {
            console.log(err);
            res.send(err);
        })
    };
    next();
});




//register views
app.use('/api/user/', userview);


var start = function () {
    app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
}
Main = {start : start}

module.exports = Main;

