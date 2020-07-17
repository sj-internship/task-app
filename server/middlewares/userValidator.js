const userModel = require('../model/userModel');
module.exports = {
    validateUniqueName: async (name) => {
        const user = await userModel.getByName(name);
        if(user != null){
            throw new Error(`Username ${name} is already taken`);
        }
    }
}
