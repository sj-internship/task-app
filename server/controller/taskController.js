const {Task} = require('../models/Task');
const {User} = require('../models/User');

const taskController={
    getTasks: async ()=>{
        Task.find({}).exec().then(res=>{
            console.log(res)
        })
    }
}
exports.taskController = taskController