var bodyPaser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chamika:123qwe@cluster0-yxcdg.mongodb.net/carPark?retryWrites=true&w=majority', { useNewUrlParser: true });

function user(name, pin) {
    this.name = name;
    this.pin = pin;
}

user.prototype.signIn = function () {
    signIn({ Name: this.name, pin: this.pin });
};

user.prototype.getName = function () {
    return this.name;
};

user.prototype.login = async function (callBack) {

    Name = this.name;
    pin= this.pin;
    loginData = { Name: Name };
    await user.find(loginData, function (err, data) {
        if (err) throw err;
        if (data[0].pin == pin) {
            callBack(true);
        } else {
            callBack(false);
        }

    });
};

module.exports.user = user;



var userBluePrint = new mongoose.Schema({
    Name: String,
    pin: String
});

var user = mongoose.model('user', userBluePrint);


var signIn = (DATA) => {
    user(DATA).save(function (err, data) {
        if (err) throw err;
        console.log("");
    });
}

