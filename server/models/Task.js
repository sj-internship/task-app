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
const taskModel = mongoose.model('Task', taskSchema);

let Task = {
    schema: taskSchema,
    model: taskModel
}
exports.Task =  Task