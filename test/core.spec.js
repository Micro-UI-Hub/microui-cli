var expect = require("chai").expect;
var CoreJs = require("../lib/core");

describe("Core file coverage", function () {
    it("checking inner instance", function () {
        var codeMod = CoreJs;

        expect(Object.keys(codeMod).length).to.equal(11);
        expect(codeMod.init).to.equal(require('../lib/modules/init'));
        expect(codeMod.help).to.equal(require("../lib/modules/help"));
        expect(codeMod.login).to.equal(require("../lib/modules/login"));
        expect(codeMod.logout).to.equal(require("../lib/modules/logout"));
        expect(codeMod.signup).to.equal(require("../lib/modules/signup"));
        expect(codeMod.build).to.equal(require("../lib/modules/build"));
        expect(codeMod.publish).to.equal(require("../lib/modules/publish"));
        expect(codeMod.unpublish).to.equal(require("../lib/modules/unpublish"));
        expect(codeMod.clean).to.equal(require("../lib/modules/clean"));
        expect(codeMod.install).to.equal(require("../lib/modules/install"));
        expect(codeMod.uninstall).to.equal(require("../lib/modules/uninstall"));
    });
});