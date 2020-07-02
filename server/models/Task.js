import mongoose from 'mongoose'
const taskSchema = new mongoose.Schema(
    {
        createdAt:Date,
        updatedAt : Date,
        title:String,
        description:String,
        tasks:[{ type : mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        createdBy:{type :  mongoose.Schema.Types.ObjectId, ref: 'User'}
    }
)
const Task = mongoose.model('Task', taskSchema);
export default Task