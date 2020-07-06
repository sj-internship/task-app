const taskService = require('../service/taskService');

const taskController={
    getTasks: async (req, res)=>{
        taskService.getTasks()
            .then(result=>{
                res.status(200).json({result});
            })
            .catch(err=>{
                res.status(500).json({message:'Something went wrong.'});
            })
    },
    getTask:async(req,res)=>{
        taskService.getTask(req.params.id)
            .then(result=>{
                res.status(200).json({result});
            })
            .catch(err=>{
                res.status(500).json({message:'Something went wrong.'});
            })
    },
    addTask: async(req, res)=>{
        taskService.saveTask(req.body)
            .then(result=>{
                res.status(200).json({result});
            })
            .catch(err=>{
                res.status(500).json({message:'Something went wrong.'});
            })
    },
    updateTask:async(req, res)=>{
        const id = req.params.id
        taskService.updateTask(id, req.body)
            .then(result=>{
                res.status(200).json({result});
            })
            .catch(err=>{
                res.status(500).json({message:'Something went wrong.'});
            })
    },
    deleteTask:async(req, res)=>{
        taskService.deleteTask(req.params.id)
            .then(result=>{
                res.status(200);
            })
            .catch(err=>{
                res.status(500).json({message:'Something went wrong.'});
            })
    }
};
module.exports = taskController;