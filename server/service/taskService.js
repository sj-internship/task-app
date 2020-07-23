const taskModel = require('../model/taskModel');
const validatorService = require('../service/validator');

const defaultParams = {
    skip: 0,
    limit: 10
}
module.exports = {
    getTasks: async (user, params) => {
        console.log(params)
        const filter = {};
        filter.createdBy = user.name;
        if (params.tags) {
            console.log(params.tags)
            filter.tags = {
                $all: params.tags.split(',')
            };
        }
        if (params.title) {
            filter.title = params.title;
        }
        if (params.fromDeadline && params.toDeadline) {
            filter.deadline = {
                $gte: params.fromDeadline,
                $lte: params.toDeadline
            }
        }
        const options = {
            skip: Number(params.skip),
            limit: Number(params.limit),
            sort: params.sort
        }
        const result = await taskModel.getAll(filter, options);
        return {
            data: result
        };
    },
    saveTask: async (params) => {
        validatorService.validateAttributes(taskModel.attributes, params);
        const result = await taskModel.save(params);
        //adding id to the parent 
        if (params.parendId !== null) {
            await taskModel.updateParentArray(params.parentId, result._id);
        }
        return {
            data: result
        };
    },
    getTask: async (id) => {
        const result = await taskModel.getOne(id);
        return {
            data: result
        };

    },
    updateTask: async (id, params) => {
        validatorService.validateAttributes(taskModel.attributes, params);
        const filter = { _id: id };
        const result = await taskModel.update(filter, params);
        return {
            data: result
        };
    },
    deleteTask: async (id) => {
        const filter = { _id: id };
        await taskModel.deleteOne(filter);
        return;
    },
    getUniqueTags: async (user) => {
        const userTasks = await taskModel.getAll(
            { createdBy: user.name }, 
            { limit: 0, skip: 0 });
        const uniqueTags = [];
        userTasks.forEach(task => {
            task.tags.forEach(tag => {
                if (!uniqueTags.includes(tag)) {
                    uniqueTags.push(tag);
                };
            });
        });
        return uniqueTags;
    },

}
