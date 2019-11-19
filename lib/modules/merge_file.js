const fs = require('fs');
const Promise = require('promise');
const promises = [];

const readFile = function (file) {
    console.log(`Processing file ${file}...`);
    return new Promise(function (resolve, reject) {
        fs.readFile(file, function (err, result) {
            if (err) {
                return reject(err);
            }
            resolve(result.toString());
        });
    });
};

const writeFile = function (data, targetFile) {
    try {
        fs.unlinkSync(targetFile);
    } catch (e) { }
    return new Promise(function (resolve, reject) {
        fs.appendFile(targetFile, data.join("\n"), function (err) {
            if (err) {
                reject(err);
            } else {
                resolve('File processed ... done !');
            }
        });
    });
};

module.exports = function (files, targetFile) {
    if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
            promises.push(readFile(files[i]));

            if (i == (files.length - 1)) {
                var results = Promise.all(promises);
                results.then(data => writeFile(data, targetFile))
                    .then(function (data) {
                        console.log(data)
                    }).catch(function (err) {
                        console.error(err)
                    });
            }
        }
    } else {
        writeFile([''], targetFile)
            .then(function (data) {
                console.log(data)
            }).catch(function (err) {
                console.error(err)
            });
    }
}