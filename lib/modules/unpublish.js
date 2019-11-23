const service = require('./service');
const fs = require('fs');

const fnGetInfo = function () {
    try {
        let manifest = JSON.parse(fs.readFileSync(".microui/manifest.json").toString());
        let basePath = `.microui/${manifest.name}/`;
        service.unpublish(manifest, function (fine, result) {
            if (fine) {
                fnUpload(result.data._id, basePath);
            } else {
                console.log(result.message);
            }
        });
    } catch (e) {
        console.log(e);
    }
}


const fn = function (type) {
    service.checkSession(function (valid) {
        if (valid) {
            fnGetInfo();
        } else {
            console.error("Unable to find valid user session.\n\nPlease use command `microui login`.")
        }
    });
};

module.exports = fn;