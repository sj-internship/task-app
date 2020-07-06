const taskModel= require('../model/taskModel');
const Task = require('../db/models/Task');

module.exports={
    getTasks : async()=>{
        console.log('getTasks');
        const result = await taskModel.getAll();

        return {
            data:result
        };
    },
    saveTask : async(params)=>{ 
        const result = await taskModel.save(params);
        console.log(result)
        //adding id to the parent 
        if(params.parendId !== null){
            await taskModel.updateParentArray(params.parentId, result._id);
        }
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