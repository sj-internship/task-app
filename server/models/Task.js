import mongoose from 'mongoose'
const taskSchema = new mongoose.Schema(
    {
        createdAt:Date,
        updatedAt : Date,
        title:String,
        description:String,
        tasks:[{ type : ObjectId, ref: 'Task' }],
        createdBy:{type : ObjectId, ref: 'User'}
    }
)
const Task = mongoose.model('User', userSchema);
export default Task