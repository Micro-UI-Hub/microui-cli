const service = require('./service');
const fs = require('fs');

const verifyFileSize = function (fileList) {
    let total = 0;
    fileList.forEach(f => {
        let stats = fs.statSync(f)
        let { size } = stats;
        console.log(`Processing file [${f}]\t\t\t\size: ${size / 1000000.0} mb`)
        total += size;
    });
    total = total / 1000000;
    console.log(`Total size ${total} mb,\tSize budget: 5 mb.`)
    return total < 5.0;
}

const fnUpload = function (modId, basePath) {
    fs.readFile(".microui/.cache", function (err, data) {
        if (err) {
            console.log("Something went wrong. .cache file missing.");
            return;
        }
        const fileList = data.toString().split("\n");
        if (!verifyFileSize(fileList)) {
            console.error("\n\nTotal size exceeded the maximum size allowed (5mb).\nCan't publish.")
            return;
        }
        const uploader = function () {
            service.uploadFile(fileList.pop(), modId, basePath, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`File ${data.message.file} uploaded.`);
                    uploader();
                }

            });
        };
        uploader();
    });
}

const fnGetInfo = function () {
    let manifest = JSON.parse(fs.readFileSync(".microui/manifest.json").toString());
    let basePath = `.microui/${manifest.name}/`;
    service.prePublish(manifest, function (fine, result) {
        if (fine) {
            fnUpload(result.data._id, basePath);
        } else {
            console.log(result.message);
        }
    });
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