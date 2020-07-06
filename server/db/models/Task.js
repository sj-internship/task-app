const  mongoose = require('mongoose')
const taskSchema = new mongoose.Schema(
    {
        createdAt:Date,
        updatedAt : Date,
        title:String,
        description:String,
        tasks:[String],
        createdBy:String
    }
)
module.exports =  mongoose.model('task', taskSchema);