const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if(err){
                return res.status(401).json({ message: "Authentication failed!" });
            }
            req.user = user;
            console.log(user)
        });
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};