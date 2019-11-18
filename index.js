#! /usr/bin/env node
const [, , command, ...args] = process.argv;
const core = require("./lib/core");
(core[command]||core.help)(...args);

//https://www.npmjs.com/settings/microui/packages