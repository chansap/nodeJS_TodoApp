const globalErrorMiddleware = (err, req, res, next) => {

    err.message = err.message || "Internal error"
    err.statusCode = err.statusCode || 500

    res.status(err.statusCode).json({
        status: err.statusCode,
        success: false,
        message: err.message
    })
}

module.exports = globalErrorMiddleware