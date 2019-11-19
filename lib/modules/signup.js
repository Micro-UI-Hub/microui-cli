const inquirer = require('inquirer');
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
                name: "password",
                message: "Password:"
            },
            {
                type: "password",
                name: "repassword",
                message: "Confirm Password:",
                // validate: function (v) {
                //     let done = this.async();
                //     done(null, this.password === v);
                // }
            },
            {
                type: "input",
                name: "org",
                message: "Organization?"
            },
            {
                type: "list",
                name: "type",
                message: "Use microui as?",
                choices: ["consumer", "developer", "experiment"]
            }
        ]).then((result) => {
            console.log(JSON.stringify(result));
        });
};

module.exports = fn;