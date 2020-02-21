var express = require('express');
var router = express.Router();
var db = require('../model/db');

//socket IO


/* GET home page. */

router.get('/admin', function (req, res, next) {
  res.render('controlPanel', { title: 'Car Park management System' });
});
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Car Park management System' });
});


router.get('/slot', function (req, res, next) {
  db.read(search = {},
    function (data) {
      console.log(data[0]);
      res.render('slot', { title: 'slot', e: data });
    }
  );
});


router.get('/test', function (req, res, next) {
  res.render('test', { title: 'test', slot: "free" });
});

router.get('/sampath', function (req, res, next) {
  console.log(req.body.slotNo);
  res.json(req.body)
  
});


module.exports = router;

