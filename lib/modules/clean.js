const rimraf = require("rimraf");

const fn = function (command, args) {
    try {
        rimraf.sync(`.microui/*`);
        console.log("Cleanup Done...!");
    } catch (e) {
        console.error(e);
    }
};

module.exports = fn;