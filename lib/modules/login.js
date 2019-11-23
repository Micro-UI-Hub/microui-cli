const inquirer = require('inquirer');
const service = require('./service');

const fnLogin = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'email',
                message: 'What is the microuihub.com username?'
            },
            {
                type: 'password',
                name: 'secret',
                message: 'Password?',
            }
        ])
        .then((result) => {
            service.login(result);
        });
}

const fn = function (command, args) {
    service.checkSession(function (value, name) {
        if (value) {
            console.log(`Hello ${name}`);
        } else {
            fnLogin();
        }
    });
};

module.exports = fn;