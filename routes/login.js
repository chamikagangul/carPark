var express = require('express');
var router = express.Router();
var user = require('../model/user');

//socket IO


/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('login', { title: "Login" });
});

router.post('/login', async function (req, res, next) {
    console.log(req.body);
    
    newUser = new user.user(req.body.name, req.body.pin);
    await newUser.login(function (data) {
        req.session.loggedin = data;
    } );
    console.log(req.session.loggedin);
    if (req.session.loggedin) {
        req.session.loggedin = true;
        req.session.name = req.body.name;
        res.end("logged in");
    } else {
        res.end("not logged in");
    }

});
router.post('/signIn', function (req, res, next) {
    console.log(req.body);
    newUser = new user.user(req.body.name, req.body.pin);
    newUser.signIn();
    res.end("saved");
});

module.exports = router;

