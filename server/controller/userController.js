const userService = require('../service/userService');
module.exports = {
    test: (req, res) => {
        userService.test()
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    register: (req, res) => {
        userService.register(req.body)
            .then(result => {
                res.status(200).send();
            })
            .catch(err => {
                res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    signIn: (req, res) => {
        userService.signIn(req.body)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.status(500).json({ message: 'Something went wrong.' });
            })
    }
}