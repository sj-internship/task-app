const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(" ").length === 2) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Authentication failed!" });
            }
            req.user = user;
        });
        next();
    }
    else {
        res.status(401).json({ message: "Authentication failed!" });
    }
};