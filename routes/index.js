var express = require('express');
var router = express.Router();
var db = require('../model/db');

//socket IO


/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Car Park management System' });
});

module.exports = router;

