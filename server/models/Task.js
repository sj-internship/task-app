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
exports.Task =  mongoose.model('task', taskSchema);