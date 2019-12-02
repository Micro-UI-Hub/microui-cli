const fs = require('fs');
const inquirer = require('inquirer');
const download = require('download-git-repo');

const fnCheckManifestFile = function (name) {
    const file = ".microui.json";
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file,
            `{
    "name": "${name}",
    "version": "1.0.0",
    "repository":"",
    "description":"explain module here",
    "components": [
        {
            "name": "${name}-tag",
            "doc": "",
            "description":"short details for this element",
            "attributes":["name"],
            "events":["onpress"]
        }
    ],
    "scripts": [
        "src/main.js"
    ],
    "readme":"",
    "styles": [],
    "assets": [],
    "keywords":[]
}`);

        fs.mkdirSync(".microui");
    }
}

const fnInit = function (sample) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the module name?"
            },
            {
                type: "list",
                name: "sample",
                message: "Use template to do initial setup? (select 'none' for existing project)",
                choices: ["none", "react", "angular", "vue", "ui5", "js"]
            }
        ]).then((result) => {
            if (result) {
                fnCheckManifestFile(result.name);
                sample = sample || result.sample || "";
                if (sample) {
                    console.log(`Downloading ${sample} project setup. Please wait.`);
                    let path = 'Micro-UI-Hub/sample';
                    switch (sample) {
                        case "react":
                            path = 'Micro-UI-Hub/react-sample';
                            break;
                        case "angular":
                            path = 'Micro-UI-Hub/angular-sample';
                            break;
                        case "vue":
                            path = 'Micro-UI-Hub/vue-sample';
                            break;
                        case "ui5":
                            path = 'Micro-UI-Hub/ui5-sample';
                            break;
                        case "none":
                            path = null;
                            break;
                        case "js":
                        default:
                            path = 'Micro-UI-Hub/sample';
                            break;

                    }
                    if (path) {
                        download(path, '', function (err) {
                            if (!err) {
                                console.log('Done ... !');
                            } else {
                                console.error('Error ... !');
                            }

                        });
                    }

                }
            }
        });
};
module.exports = fnInit;