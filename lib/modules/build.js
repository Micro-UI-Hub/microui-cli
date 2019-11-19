const fs = require("fs");
const fsExtra = require('fs-extra');
const ncp = require('ncp');
const glob = require("glob");
const merger = require('./merge_file');

const fnCreateManifestFile = function (currentManifest) {

}

const fnBuild = function (a) {
    try {
        const manifest = JSON.parse(fs.readFileSync(".microui.json").toString());
        const baseDir = manifest.name;
        var targetPath = `.microui/${baseDir}/`;
        fsExtra.removeSync(`.microui/${baseDir}`);
        try {
            fsExtra.mkdirSync(targetPath);
        } catch (e) { }

        //merge JS files
        if (manifest.scripts && manifest.scripts.length) {
            merger(manifest.scripts, targetPath + 'library-preload.js');
        }

        //merge CSS file
        // if (manifest.styles && manifest.styles.length) {
            merger(manifest.styles, targetPath + 'library.css');
        // }

        //Copy assets files
        if (manifest.assets && manifest.assets.length) {

            manifest.assets.forEach(item => {
                glob(item, {}, function (er, files) {
                    if (!er) {
                        files.forEach(filePath => {
                            let arrM = filePath.split("/");
                            arrM.shift();
                            let tPath = arrM.join("/");
                            ncp(filePath, targetPath + tPath, function (err) {
                                if (err) {
                                    return console.error(err);
                                } else {
                                    console.log(`File ${filePath} copied.`);
                                }
                            });
                        });
                    }
                });
            });
        }



    } catch (e) {
        console.error("There are some issue in either config file or 'microui' not initialized.", e);
    }
};

module.exports = fnBuild;