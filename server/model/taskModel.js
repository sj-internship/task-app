const Task = require('../db/models/Task');
module.exports = {
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
            deadline:params.deadline
        });
        return newTask.save();
    },
    update: (filter, update) => {
        return Task.findByIdAndUpdate(filter, update, { new: true });
    },
    getOne: (id, user) => {
        return Task.findOne({ _id: id, createdBy: user.name });
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
    }
}