const fn = function (p1) {
    console.log(
        `
Usage: microui <command>

<Command>:

init\t\t\tinitialize microui setup for developer project.\n
build\t\t\tto build process which can be published.\n
publish\t\t\tpublish module to registry available to public access.\n
unpublish\t\tunpublish module from registry.\n
login\t\t\tlogin to microui registry.\n
logout\t\t\tlogout from microui registry.\n
signup\t\t\tinline signup to microui registry.\n
clean\t\t\tclean-up build folders and cache.\n
uninstall\t\tremove offline loaded module.\n
install\t\t\tload modules locally to use offline(non-CDN).    
    [options]: module name
    e.g. 'microui install exlsui'

for more help and documentation, got to microuihub.com/doc
`
        );
};

module.exports = fn;