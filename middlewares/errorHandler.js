const { constants } = require("../constants")

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Not Found",
                message: error.message
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Validation Failed",
                message: error.message
            })
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: error.message
            })
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: error.message
            })
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: error.message
            })
        default:
            break;
    }
}

module.exports = errorHandler