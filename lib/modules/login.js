const prompt = require('prompt');

const fnCheckSession = function () {
    return false;
}

const fnLogin = function () {
    //https://www.npmjs.com/package/prompt
    var schema = {
        properties: {
            username: {
                pattern: /^[a-zA-Z0-9\-]+$/,
                message: 'Name must be only letters, number, or dashes',
                required: true
            },
            password: {
                hidden: true
            }
        }
    };
    prompt.start();
    prompt.get(schema, function (err, result) {
        console.log('Command-line input received:');
        console.log('  name: ' + result.name);
        console.log('  password: ' + result.password);
    });
}



const fn = function (command, args) {
    if(!fnCheckSession()){
        fnLogin();
    }
};

module.exports = fn;