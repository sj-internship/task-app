const User = require('../db/models/User');
module.exports = {
    //TODO:remove
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