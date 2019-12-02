const fs = require('fs');
const request = require('request');
const BASE_URL = 'https://microuihub.com';
const mime = require('mime');

module.exports = serviceController = {
    checkSession: function (callback) {
        try {
            if (!fs.existsSync('.microui')) {
                fs.mkdirSync('.microui');
            }
            let token = fs.readFileSync('.microui/.nmuic').toString();
            request.get({
                url: `${BASE_URL}/dev/me`,
                headers: {
                    'Authorization': 'jwt ' + token
                }
            }, function (err, httpResponse, body) {
                if (err) {
                    throw new Error(err);
                    return;
                }
                body = JSON.parse(body);
                if (body.success) {
                    callback(true, body.message.first_name);
                } else {
                    callback(false);
                }
            });
        } catch (e) {
            callback(false);
        }
    },
    createSession: function (token) {
        fs.writeFileSync('.microui/.nmuic', token);
    },
    login: function (input) {
        request.post({ url: `${BASE_URL}/dev/login`, form: input }, function (err, httpResponse, body) {
            body = JSON.parse(body);
            if (body.success) {
                console.log('\x1b[32m', 'SUCCESS !!', '\x1b[0m');
            } else {
                console.log('\x1b[31m', 'FAILED !!', '\x1b[0m');
            }
            console.log(body.message);
            serviceController.createSession(body.token);
        });
    },
    signup: function (data) {
        request.post({ url: `${BASE_URL}/dev/signup`, form: data }, function (err, httpResponse, body) {
            body = JSON.parse(body);
            if (body.success) {
                console.log('\x1b[32m', 'SUCCESS !!', '\x1b[0m');
            } else {
                console.log('\x1b[31m', 'FAILED !!', '\x1b[0m');
            }
            console.log(body.message);
        });
    },
    signup: function (data) {
        request.post({ url: `${BASE_URL}/dev/signup`, json: data }, function (err, httpResponse, body) {
            if (body.success) {
                console.log('\x1b[32m', 'SUCCESS !!', '\x1b[0m');
            } else {
                console.log('\x1b[31m', 'FAILED !!', '\x1b[0m');
            }
            console.log(body.message);
        });
    },
    prePublish: function (manifest, callback) {
        try {
            let token = fs.readFileSync('.microui/.nmuic').toString();
            request.post({
                url: `${BASE_URL}/dev/prepublish`,
                json: manifest,
                headers: {
                    'Authorization': 'JWT ' + token
                }
            }, function (err, httpResponse, body) {
                if (err) {
                    throw new Error(err);
                    return;
                }
                if (body.success) {
                    callback(true, body);
                } else {
                    callback(false, body);
                }
            });
        } catch (e) {
            console.log(e)
            callback(false);
        }
    },
    uploadFile: function (path, modId, basePath, callback) {
        if (!path)
            return;

        let fileName = path.replace(/^.*[\\\/]/, '')
        let token = fs.readFileSync('.microui/.nmuic').toString();
        request({
            method: 'POST',
            preambleCRLF: true,
            postambleCRLF: true,
            url: `${BASE_URL}/dev/publish/${modId}`,
            headers: {
                'Authorization': 'jwt ' + token
            },
            formData: {
                path: path.replace(basePath, '').replace(fileName, ''),
                appfile: {
                    value: fs.createReadStream(path),
                    options: {
                        filename: fileName,
                        contentType: mime.getType(path)
                    }
                }
            }
        },
            function (error, response, body) {
                try {
                    callback(error, JSON.parse(body));
                } catch (e) {
                    console.error(e);
                    callback(error || e, {});
                }
            });
    },
    unpublish: function (manifest) {
        let token = fs.readFileSync('.microui/.nmuic').toString();
        request.post({
            url: `${BASE_URL}/dev/unpublish`,
            headers: {
                'Authorization': 'JWT ' + token
            },
            json: manifest
        }, function (err, httpResponse, body) {

            // body = JSON.parse(body);
            if (body.success) {
                console.log('\x1b[32m', 'SUCCESS !!', '\x1b[0m');
            } else {
                console.log('\x1b[31m', 'FAILED !!', '\x1b[0m');
            }
            console.log(body.message);
        });
    }
}