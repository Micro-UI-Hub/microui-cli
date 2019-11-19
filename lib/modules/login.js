const inquirer = require('inquirer');

const fnCheckSession = function () {
    return false;
}

const checkUsername = async (input) => {
    if (!input) {
        return 'Incorrect username';
    }
    return true;
};

const fnLogin = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'user',
                message: 'What is the microuihub.com username?',
                validate: checkUsername
            },
            {
                type: 'password',
                name: 'secret',
                message: 'Password?',
            }
        ])
        .then((result) => {

        });
}



const fn = function (command, args) {
    if (!fnCheckSession()) {
        fnLogin();
    }
};

module.exports = fn;