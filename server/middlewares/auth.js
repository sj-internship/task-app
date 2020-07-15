const jwt = require("jsonwebtoken");
const {AuthenticationError} = require('../errorTypes/errorTypes')
module.exports = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(" ").length === 2) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                const error = new AuthenticationError("Authentication failed!");
                next(error)
            }
            req.user = user;
        });
        next();
    }
    else {
        //res.status(401).json({ message: "Authentication failed!" });
        const error = new AuthenticationError("Authentication failed!");
            next(error)
    }
};