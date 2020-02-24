const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant("student")
        .readOwn("profile")
        .updateOwn("profile")

    ac.grant("coach")
        .extend("student")
        .readAny("profile")

    ac.grant("academy")
        .extend("student")
        .extend("coach")
        .updateAny("profile")
        .deleteAny("profile")

    return ac;
})();