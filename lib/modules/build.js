const compressor = require('node-minify');
const fs = require("fs");
const fsExtra = require('fs-extra')
const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');





//https://www.npmjs.com/package/cli-progress
// const cliProgress = require('cli-progress');
// create a new progress bar instance and use shades_classic theme
// const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// start the progress bar with a total value of 200 and start value of 0
// bar1.start(200, 0);

// update the current value in your application..
// bar1.update(100);

// stop the progress bar
// bar1.stop();


const fnBuild = function (a) {
    try {
        const manifest = JSON.parse(fs.readFileSync(".microui.json").toString());
        const baseDir = manifest.name;
        var targetPath = `.microui/${baseDir}/`;
        fsExtra.removeSync(`${__dirname}/.microui/${baseDir}`);

        compressor.minify({
            compressor: 'uglifyjs',
            input: manifest.scripts,
            output: targetPath + manifest.main,
            callback: function (err, min) { }
        });

        //https://node-minify.2clics.net/compressors/clean-css.html#usage
        minify({
            compressor: cleanCSS,
            input: manifest.styles,
            output: targetPath + manifest.main.replace(".js", ".css"),
            callback: function (err, min) { }
        });

        //todo copy resource files
        // manifest.assets.forEach(filePath => {
        //     let fileName = filePath.split("/").pop();
        //     fsExtra.copySync(filePath, targetPath + fileName);
        // });
    } catch (e) {
        console.log("There are some issue in either config file or 'microui' not initialized.");
    }
};

module.exports = fnBuild;