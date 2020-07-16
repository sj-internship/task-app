const {
    NotFoundError,
    UnauthorizedError,
    AuthenticationError,
    UnavailableServiceError,
    BadRequestError } = require('../errorTypes/errorTypes')

module.exports = handleError = (req, res, next) => {
    res.handleError = (err, res)=>{
        switch (err.constructor) {
            case NotFoundError:
                return res.status(404).json({
                    message:err.message
                })
            case UnauthorizedError:
                return res.status(401).json({
                    message:err.message
                })
            case AuthenticationError:
                console.log('auth failed')
                return res.status(403).json({
                    message:err.message
                })
            case UnavailableServiceError:
                return res.status(503).json({
                    message:err.message
                })
            case BadRequestError:
                return res.status(400).json({
                    message:err.message
                })
        }
    };
    next();
}
