const fs = require("fs");
const fsExtra = require('fs-extra');
const ncp = require('ncp');
const glob = require("glob");
const merger = require('./merge_file');
const Validator = require('jsonschema').Validator;

const manifestSchema = {
    "$id": "/manifest",
    "type": "object",
    "name": { type: "string", "required": true },
    version: { type: "string", "required": true },
    readme: { type: "string" },
    components: {
        type: "array",
        required: true,
        items: [
            {
                type: "object",
                "properties": {
                    "tag": {
                        "required": true
                    },
                    "doc": {
                        "required": true
                    }
                }
            }
        ]
    },
    scripts: {
        type: "array",
        required: true,
        items: [
            {
                type: "string"
            }
        ]
    },
    styles: {
        type: "array",
        items: [
            {
                type: "string"
            }
        ]
    },
    assets: {
        type: "array",
        items: [
            {
                type: "string"
            }
        ]
    },
    keywords: {
        type: "array",
        items: [
            {
                type: "string"
            }
        ]
    },
}

const cache = {
    files: []
}

const fnCreateManifestFile = function (currentManifest) {
    try {
        console.log("Creating manifest file to upload.");
        const baseDir = currentManifest.name;
        var targetPath = `.microui/manifest.json`;
        // cache.files.push(targetPath);
        fs.writeFileSync(targetPath, JSON.stringify(currentManifest));
    } catch (e) {
        console.log(e)
    }
}


const fnCreateCacheFile = function () {
    try {
        console.log("Finalizing build.");
        var targetPath = `.microui/.cache`;
        fs.writeFileSync(targetPath, cache.files.join("\n"));
    } catch (e) {
        console.log(e)
    }
}


const collectReadmeFiles = function (filePath, targetPath) {
    let tPath = filePath;
    if (filePath.indexOf("/") > -1) {
        let arrM = filePath.split("/");
        arrM.shift();
        tPath = arrM.join("/");
    }
    cache.files.push(targetPath + tPath);
    ncp(filePath, targetPath + tPath, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log(`Resource file ${filePath} copied.`);
        }
    });
};





const validateManifestFile = function () {
    var manifest;
    try {
        manifest = JSON.parse(fs.readFileSync(".microui.json").toString());
    } catch (e) {
        console.log("'microui' not initialized correctly.\nUse command 'microui init'");
        return;
    }
    var v = new Validator();
    let result = v.validate(manifest, manifestSchema);
    if (result.errors && result.errors.length) {
        console.error("Invalid .microui.json format.");
        console.error(result.errors.join("\n"));
        return;
    }
    return manifest;
}

const fnBuild = function (a) {
    var manifest;
    if (!(manifest = validateManifestFile())) {
        return;
    }
    try {
        const baseDir = manifest.name;
        var targetPath = `.microui/${baseDir}/`;
        fsExtra.removeSync(`.microui/${baseDir}`);
        try {
            fsExtra.mkdirSync(targetPath);
        } catch (e) { }


        //merge JS files
        if (manifest.scripts && manifest.scripts.length) {
            merger(manifest.scripts, targetPath + 'library-preload.js');
            cache.files.push(targetPath + 'library-preload.js');
        } else {
            console.error("Atleast one valid built JS required to create a module.");
            return;
        }

        //merge CSS file
        merger(manifest.styles, targetPath + 'library.css');
        cache.files.push(targetPath + 'library.css');

        //Copy assets files
        if (manifest.assets && manifest.assets.length) {
            console.log(`Collecting ${manifest.assets.length} asset files.`)

            manifest.assets.forEach(item => {
                glob(item, {}, function (er, files) {
                    if (!er) {
                        files.forEach(filePath => {
                            collectReadmeFiles(filePath, targetPath);
                        });
                    }
                });
            });
        }


        fnCreateManifestFile(manifest);

        //check for readme file
        if (manifest.readme) {
            console.log("Coping readme files.")
            collectReadmeFiles(manifest.readme, targetPath);
        }

        if (manifest.components && manifest.components.length) {
            manifest.components.forEach(item => {
                collectReadmeFiles(item.doc, targetPath);
            });
        }

        fnCreateCacheFile();

    } catch (e) {
        console.error("There are some issue in either config file.\nPlease check https://microuihub.com/doc for reference.", e);
    }
};

module.exports = fnBuild;