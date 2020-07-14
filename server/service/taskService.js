const taskModel = require('../model/taskModel');
const Task = require('../db/models/Task');
const validatorService = require('../service/validator')

module.exports = {
    getTasks: async (user) => {
        const result = await taskModel.getAll(user);

        return {
            data: result
        };
    },
    saveTask: async (params) => {
        validatorService.validateAttributes(taskModel.attributes, params)
        const result = await taskModel.save(params);
        //priority in 
        //adding id to the parent 
        if (params.parendId !== null) {
            await taskModel.updateParentArray(params.parentId, result._id);
        }
        return {
            data: result
        };
    },
    getTask: async (id, user) => {
        const result = await taskModel.getOne(id, user);
        return {
            data: result
        };

    },
    updateTask: async (id, params) => {
        //walidacja
        //priority in 

        validatorService.validateAttributes(taskModel.attributes, params);
        const filter = { _id: id };
        const result = await taskModel.update(filter, params);
        return {
            data: result
        };
    },
    deleteTask: async (id, user) => {
        const filter = { _id: id, createdBy: user.name };
        const result = await taskModel.deleteOne(filter);
        return {
            data: result
        };
    },
    getUniqueTags: async (user) => {
        const userTasks = await taskModel.getAll(user);
        let uniqueTags = [];
        userTasks.forEach(task => {
            task.tags.forEach(tag => {
                let repeating = false;
                uniqueTags.forEach(item => {
                    if (item == tag) {
                        repeating = true;
                    }
                })
                if (!repeating) {
                    uniqueTags.push(tag);
                }
            })
        })
        return {
            data: uniqueTags
        }
    }
}