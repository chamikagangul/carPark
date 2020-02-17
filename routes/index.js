var express = require('express');
var router = express.Router();
var db = require('../model/db');

//socket IO


/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/create', function (req, res, next) {
  db.create();
  console.log("created");
  res.send("created");
});

router.get('/fetch', function (req, res, next) {
  var ds = db.fetch(
    function (response) {
      // Here you have access to your variable
      ds = response
      console.log(ds);
      //res.send(ds);
      res.render('data', { title: 'Data' ,ds:ds});
    });

});

module.exports = router;

