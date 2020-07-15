const userService = require('../service/userService');
module.exports = {
    test: (req, res, next) => {
        userService.test()
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                next(err)
                //res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    register: (req, res, next) => {
        userService.register(req.body)
            .then(result => {
                res.status(200).send();
            })
            .catch(err => {
                next(err);
                //res.status(500).json({message:err.message});
            })
    },
    signIn: (req, res, next) => {
        userService.signIn(req.body)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                next(err);
                //res.status(500).json({message:err.message});
            })
    }
}