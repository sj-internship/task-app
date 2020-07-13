const User = require('../db/models/User');
module.exports={
    attributes:{
        name:{
            type:'string',
            required:true
        },
        password:{
            type:'string',
            required:true
        }
    },
    test:(params)=>{
        return User.find({}).exec();
    },
    save:(credentials)=>{
        const newUser = new User({
            name: credentials.name,
            password:credentials.password
        });
        return newUser.save();
    },
    getByName:(name)=>{
        return User.findOne({name:name});
    }
}