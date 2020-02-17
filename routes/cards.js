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

router.get('/save', function (req, res, next) {

    db.save({
        slotNo: "3",
        status: "danger",
        Name: "gangul"
    }
    );
    res.end("saved");

});

module.exports = router;

