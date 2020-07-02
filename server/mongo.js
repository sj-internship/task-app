const mongoose = require('mongoose');
const {config} = require ('./config')

const mongo = {
    connect: async ()=>{
        return mongoose.connect(config.db.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(async res=>{
            require('./models/User');
            require('./models/Task');
        })
    }
}
 
exports.mongo = mongo;
