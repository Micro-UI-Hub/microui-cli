const inquirer = require('inquirer');
const service = require('./service');


const fn = function (command, args) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "username",
                message: "Username:"
            },
            {
                type: "input",
                name: "email",
                message: "What is your email?:",
                validate: function (value) {
                    let done = this.async();
                    done(null, (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)))
                }
            },
            {
                type: "password",
                name: "secret",
                message: "Password:"
            },
            {
                type: "input",
                name: "org",
                message: "Organization?"
            },
            {
                type: "list",
                name: "provider",
                message: "Use microui as?",
                choices: ["consumer", "developer", "experiment"]
            }
        ]).then((result) => {
            service.signup(result);
        });
};

module.exports = fn;