var sqlite3 = require('sqlite3').verbose();

var create = () => {
    var db = new sqlite3.Database('db');
    db.serialize(function () {
        db.run("CREATE TABLE lorem (info TEXT)");

        var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
            console.log(row.id + ": " + row.info);
        });
    });
    db.close();
}

var fetch = (callBack) => {
    var db = new sqlite3.Database('db');
    db.all("SELECT rowid AS id, info FROM lorem", function (err, all) {
        db.close();
        callBack(all);
    });
    
}

module.exports.create = create;
module.exports.fetch = fetch;