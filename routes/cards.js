var express = require('express');
var router = express.Router();
var db = require('../model/db');

router.get('/', function (req, res, next) {
    db.read(search = {},
        function (data) {
            res.render('card', { data });
        }
    );
});

router.get('/free', function (req, res, next) {
    console.log("free cards");
    db.read(search = {status:"free"},
        function (data) {
            res.render('card', { data });
        }
    );
});

router.get('/save', function (req, res, next) {
    for (var i = 0; i < 10; i++) {
        db.save({
            slotNo: i,
            status: "free",
            Name: "nobody",
            pin : ""
        });
    }
    res.end("saved");

});

router.post('/update', function (req, res, next) {
    console.log(req.body)
    ds = {
        Name: req.body.Name,
        status: req.body.status
    }
    console.log(ds);
    db.update(req.body.id, ds);
    res.send("updated");
});

module.exports = router;

