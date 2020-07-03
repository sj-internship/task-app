const userModel= require('../model/userModel');

module.exports={
    //TODO:remove
    test:async()=>{
        const result = await userModel.test();
        return {
            data:result
        };
    }
}