const Task = require('../db/models/Task');
const TaskModel = {
    attributes: {
        createdAt: {
            type: 'date'
        },
        updatedAt: {
            type: 'date'
        },
        title: {
            required:true,
            type: 'string',
            maxLength:30
        },
        description: {
            required:true,
            type: 'string',
            maxLength:300
        },
        tasks: {
            type: 'array'
        },
        createdBy:{
            type : 'string'
        },
        tags: {
            type: 'array',
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
            tags: params.tags

        });
        return newTask.save();
    },
    update: (filter, update) => {
        // if(validate(update)){
        //     console.log()
        // }
        //lista kolumn
        //omit tego czego nie ma
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
    },
    validateAttributes: (attributes) => {
        //TaskModel.attributes
        //todo 
        //filter attributes in schema
        //require
        //check types
        //await validateService.validateAttributes(TaskModel.attributes, attributes) return / throw Error
        
    }
}
module.exports= TaskModel;