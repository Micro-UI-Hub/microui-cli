const fs = require('fs');
const fn = function (command, args) {
    try {
        fs.unlink('.microui/.nmuic', function (err, done) {
            console.log("loged out..!")
        });
    } catch (e) {

    }
};

module.exports = fn;