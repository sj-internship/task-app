const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task') ;
const {config} = require ('./config')

const mongo = {
    connect: async ()=>{
        return mongoose.connect(config.db.DATABASE_URL)
    }
}
 
exports.mongo = mongo
