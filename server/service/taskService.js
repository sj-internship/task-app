const taskModel= require('../model/taskModel');
const Task = require('../db/models/Task');
const taskController = require('../controller/taskController');

module.exports={
    getTasks : async()=>{
        console.log('getTasks');
        const result = await taskModel.getAll();
        console.log(result);

        return {
            data:result
        };
    },
    saveTask : async(params)=>{
        const newTask = new Task({
            createdAt:new Date(),
            updatedAt:new Date(),
            title:params.title,
            description: params.description,
            tasks:[],
            createdBy:params.createdBy
        });
        //adding id to the parent 
        const result = await taskModel.save(newTask);
        const parent = await taskModel.updateParentArray(params.parentId, result._id);
        return{
            data:result
        };
    },
    getTask: async(id)=>{
        const result = await taskModel.getOne(id);
        return{
            data:result
        };

    },
    updateTask: async(id, params)=>{
        const filter = {_id:id};
        const result = await taskModel.update(filter, params);
        return {
            data:result
        };
    },
    deleteTask:async(id)=>{
        const filter = {_id:id};
        const result =  await taskModel.deleteOne(filter);
        return {
            data:result
        };
    }
}