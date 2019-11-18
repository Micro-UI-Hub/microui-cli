module.exports = {
    init: require("./modules/init"),
    help: require("./modules/help"),
    login: require("./modules/login"),
    logout: () => { },
    signup: () => { },
    build: require("./modules/build"),
    publish: require("./modules/publish"),
    unpublish: () => { },
    clean: () => { },
    install: () => { },
    uninstall: () => { }
};