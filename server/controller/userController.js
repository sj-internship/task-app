const userService = require('../service/userService');
module.exports = {
    test: (req, res) => {
        userService.test()
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.handleError(err, res);
            })
    },
    register: (req, res) => {
        userService.register(req.body)
            .then(result => {
                res.status(200).send();
            })
            .catch(err => {
                res.handleError(err, res);
            })
    },
    signIn: (req, res) => {
        userService.signIn(req.body)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.handleError(err, res);
            })
    }
}