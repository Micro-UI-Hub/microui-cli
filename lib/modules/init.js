const fs = require('fs');

const fnCheckManifestFile = function () {
    const file = ".microui.json";
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, `{
    "name": "app",
    "version": "1.0",
    "parent-version": "1.0",
    "main": "main.js",
    "tags": [
        {
            "tag": "app-tag",
            "hasTemplate":false,
            "doc": "",
            "bowser": "",
            "attributes":{},
            "events":{}
        }
    ],
    "scripts": [
        "src/main.js"
    ],
    "styles": [],
    "assets": []
}`);

        fs.mkdirSync(".microui");
    }

    
}


const fnInit = function (a) {
    fnCheckManifestFile();
};

module.exports = fnInit;