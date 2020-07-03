const User = require('../db/models/User');
module.exports={
    //TODO:remove
    test:(params)=>{
        return User.find({}).exec();
    }
}