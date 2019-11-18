var request = require('request');

const fnZip = function () {
    //https://www.npmjs.com/package/tmp
    //var tmp = require('tmp');
    // var tmpobj = tmp.dirSync();
    // console.log('Dir: ', tmpobj.name);
    // // Manual cleanup
    // tmpobj.removeCallback();



    // https://stackoverflow.com/questions/15641243/need-to-zip-an-entire-directory-using-node-js
    // var file_system = require('fs');
    // var archiver = require('archiver');

    // var output = file_system.createWriteStream('target.zip');
    // var archive = archiver('zip');

    // output.on('close', function () {
    //     console.log(archive.pointer() + ' total bytes');
    //     console.log('archiver has been finalized and the output file descriptor has closed.');
    // });

    // archive.on('error', function (err) {
    //     throw err;
    // });

    // archive.pipe(output);
    // archive.bulk([
    //     { expand: true, cwd: 'source', src: ['**'], dest: 'source' }
    // ]);
    // archive.finalize();
};

const fnUpload = function () {
    //https://stackoverflow.com/questions/31150447/how-to-upload-a-file-using-a-rest-client-for-node
    //Upload to server
    // request({
    //     method: 'PUT',
    //     preambleCRLF: true,
    //     postambleCRLF: true,
    //     uri: 'http://yourdomain/file',
    //     multipart: [
    //       {
    //         'content-type': 'application/pdf',
    //         body: fs.createReadStream('image.png') 
    //       }
    //     ]    
    //   },
    //   function (error, response, body) {
    //     if (error) {
    //       return console.error('upload failed:', error);
    //     }
    //     console.log('Upload successful!  Server responded with:', body);
    //   });
}

const fnUpdate = function () {

}


const fnCheckSession = function () {
    return false;
}


const fn = function (type) {
    if (fnCheckSession()) {
        fnZip();
        fnUpload();
        fnUpdate();
    } else {
        console.error("First need to login using 'microui login'.");
    }
};

module.exports = fn;