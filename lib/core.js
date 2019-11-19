const core = {
    init: require("./modules/init"),
    help: require("./modules/help"),
    login: require("./modules/login"),
    logout: require("./modules/logout"),
    signup: require("./modules/signup"),
    build: require("./modules/build"),
    publish: require("./modules/publish"),
    unpublish: require("./modules/unpublish"),
    clean: require("./modules/clean"),
    install: require("./modules/install"),
    uninstall: require("./modules/uninstall")
};
module.exports = core;