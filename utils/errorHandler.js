const HTTP_ERRORS = require("../constants/HTTP_ERRORS");

module.exports = (res, msg, code) => {
    res.status(code).json({
        code: HTTP_ERRORS[code] || "Unknown error",
        message: msg,
    });
}
