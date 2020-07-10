const mongoose = require('mongoose');
const {config} = require('../config')

const mongo = {
    connect: async ()=>{
        return mongoose.connect(config.db.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(async res=>{
            mongoose.set('useCreateIndex', true);
            require('./models/User');
            require('./models/Task');
        })
    }
}
 
module.exports = mongo;
