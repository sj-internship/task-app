const User = require('../db/models/User');
module.exports = {
    attributes: {
        name: {
            type: 'String',
            required: true
        },
        password: {
            type: 'String',
            required: true,
            minLength: 8,
            hasOneDigit: true,
            hasOneCapitalLetter: true
        }
    },
    test: (params) => {
        return User.find({}).exec();
    },
    save: (credentials) => {
        const newUser = new User({
            name: credentials.name,
            password: credentials.password
        });
        return newUser.save();
    },
    getByName: (name) => {
        return User.findOne({ name: name });
    }
}