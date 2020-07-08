const userModel = require('../model/userModel');
const { config } = require('../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {
    //TODO:remove
    test: async () => {
        const result = await userModel.test();
        return {
            data: result
        };
    },
    register: async (credentials) => {
        const hashedPass = await bcrypt.hash(credentials.password, config.bcrypt.saltRounds);
        const result = await userModel.save({
            name: credentials.name,
            password: hashedPass
        }
        );
        return {
            data: result
        };
    },//change to status 200 only 
    signIn: async (credentials) => {
        const user = await userModel.getByName(credentials.name)
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
            throw new Error();
        }

        let jwtToken = jwt.sign({
            name: user.name,
            userId: user._id
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
        });
        console.log(jwtToken)
        return {
            data: {
                name: credentials.name,
                password: credentials.password,
                token: jwtToken
            }
        }


    }
}