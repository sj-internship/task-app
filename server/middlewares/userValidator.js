const {AuthenticationError} = require('../errorTypes/errorTypes')
const userModel = require('../model/userModel');
module.exports = {
    validateUniqueName: async (req, res, next) => {
        const name = req.body.name;
        const user = await userModel.getByName(name);
        if (user != null) {
            const error = new AuthenticationError(`Username ${name} is already taken`);
            res.handleError(error, res);
        }
        else{
            next();
        }
    }
}
