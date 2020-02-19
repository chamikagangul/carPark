var bodyPaser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chamika:123qwe@cluster0-yxcdg.mongodb.net/carPark?retryWrites=true&w=majority', { useNewUrlParser: true });

var bluePrint = new mongoose.Schema({
    slotNo: String,
    status: String,
    Name: String,
    pin : String
});

var CarPark = mongoose.model('slot', bluePrint);


//var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'some coding' }]
var urlEncodedParser = bodyPaser.urlencoded({ extended: false });

var read = (search = {},callBack) => {
    CarPark.find(search, function (err, data) {
        if (err) throw err;
        callBack(data)
    });
}

var save = (DATA) => {
    CarPark(DATA).save(function (err, data) {
        if (err) throw err;
        console.log("Saved");
    });
}

var del = (slotNo) => {
    CarPark.find({ id: slotNo.replace(/\-/g, " ") }).remove(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
}
var update = (slot,data) => {
    var myquery = { slotNo: slot };
    var newvalues = {
        $set: data
    };
    CarPark.updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
}



module.exports.save = save;
module.exports.read = read;
module.exports.delete = del;
module.exports.update = update;


