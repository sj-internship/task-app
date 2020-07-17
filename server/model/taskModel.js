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
        }
    },
    getAll: (user) => {
        return Task.find({ createdBy: user.name }).exec();
    },
    save: (params) => {
        const newTask = new Task({
            createdAt: new Date(),
            updatedAt: new Date(),
            title: params.title,
            description: params.description,
            tasks: [],
            createdBy: params.createdBy,
            tags: params.tags,
            priority: params.priority

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