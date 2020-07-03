const Task = require('../db/models/Task');
module.exports={
    getAll:()=>{
        return Task.find({}).exec();
    },
    save:(task)=>{
        return task.save();
    },
    update:(filter, update)=>{
        return Task.findByIdAndUpdate(filter, update, {new:true});
    },
    getOne:(id)=>{
        return Task.findById(id);
    },
    updateParentArray:(parentId, childId)=>{
        return Task.updateOne(
            {parentId}, 
            {$addToSet:{
                tasks:[childId]
            }}
        );
    },
    deleteOne:(filter)=>{
        return Task.findOneAndRemove(filter);
    }
}