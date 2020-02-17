var bodyPaser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chamika:123qwe@cluster0-yxcdg.mongodb.net/carPark?retryWrites=true&w=majority', { useNewUrlParser: true });

var todoSchema = new mongoose.Schema({
    slotNo: String,
    status: String
});

var Todo = mongoose.model('slot', todoSchema);


//var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'some coding' }]
var urlEncodedParser = bodyPaser.urlencoded({ extended: false });

var read = () => {
    console.log("inside read");
    Todo.find({}, function (err, data) {
        if (err) throw err;
        console.log(data);
    });
}

var save = (DATA) => {
    DATA = {1:2}
    Todo(DATA).save(function (err, data) {
        if (err) throw err;
        console.log("Saved");
    });
}
var del = null;

module.exports.save = save;
module.exports.read = read;
module.exports.delete = del;
