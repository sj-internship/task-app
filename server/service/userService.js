const userModel = require('../model/userModel');
const { config } = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validatrService = require('./validator');
const userValidatorService = require('../middlewares/userValidator');
module.exports = {
    //TODO:remove
    test: async () => {
        const result = await userModel.test();
        return {
            data: result
        };
    },
    register: async (credentials) => {
        validatorService.validateAttributes(userModel.attributes, credentials);
        await userValidatorService.validateUniqueName(credentials.name);
        const hashedPass = await bcrypt.hash(credentials.password, config.bcrypt.saltRounds);
        await userModel.save({
            name: credentials.name,
            password: hashedPass
        }
        );
        return {
            data: null
        };
    },
    signIn: async (credentials) => {
        validatorService.validateAttributes(userModel.attributes, credentials);
        const user = await userModel.getByName(credentials.name)
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        const jwtToken = jwt.sign({
            name: user.name,
            userId: user._id
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
        });
        return {
            data: {
                token: jwtToken,
                userName: user.name
            }
        }
    }
}
