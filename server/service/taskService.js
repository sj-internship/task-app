const taskModel = require('../model/taskModel');
const validatorService = require('../service/validator');
module.exports = {
    getTasks: async (user, params) => {
        //Do i need to validate that params are available in the schema like we did with posting attributes?
        const filter = {};
        filter.createdBy = user.name;
        if (params.tags) {
            filter.tags = {
                $all: JSON.parse(params.tags)
            };
        }
        if (params.title) {
            filter.title = params.title;
        }
        const skip = params.skip ? Number(params.skip) : 0;
        const limit = params.limit ? Number(params.limit) : 0;
        const sort = params.sort ? params.sort : '';
        const orderSign = params.order? params.order === 'ASC'? '-' : '' : '';
        const result = await taskModel.getAll(filter, skip, limit, sort, orderSign);
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
        const userTasks = await taskModel.getAll(user);
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
