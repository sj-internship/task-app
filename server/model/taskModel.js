const Task = require('../db/models/Task');
const TaskModel = {
    attributes: {
        createdAt: {
            type: 'Date'
        },
        updatedAt: {
            type: 'Date'
        },
        title: {
            required: true,
            type: 'String',
            maxLength: 30,
        },
        description: {
            required: true,
            type: 'String',
            maxLength: 300
        },
        tasks: {
            type: 'Array'
        },
        createdBy: {
            type: 'String'
        },
        tags: {
            type: 'Array',
        },
        priority: {
            type: 'String',
            in: ['high', 'middle', 'low']
        },
        deadline:{
            type:'String'
        }
    },
    getAll: (filter, skip, limit, sortField, orderSign) => {

        return Task.find(filter).skip(skip).limit(limit).sort(orderSign + sortField).exec();
    },
    save: (params) => {
        const newTask = new Task({
            createdAt: new Date(),
            updatedAt: new Date(),
            title: params.title,
            description: params.description,
            tasks: [],
            createdBy: params.createdBy,
            tags: params.tags !== null? params.tags : [],
            deadline:params.deadline
        });
        return newTask.save();
    },
    update: (filter, update) => {
        return Task.findByIdAndUpdate(filter, update, { new: true });
    },
    getOne: (id) => {
        return Task.findOne({ _id: id });
    },
    updateParentArray: (parentId, childId) => {
        return Task.updateOne(
            { parentId },
            {
                $addToSet: {
                    tasks: [childId]
                }
            }
        );
    },
    deleteOne: (filter) => {
        return Task.findOneAndRemove(filter);
    },
}
module.exports = TaskModel;