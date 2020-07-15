const taskService = require('../service/taskService');

const taskController = {
    getTasks: (req, res, next) => {
        taskService.getTasks(req.user)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                //res.status(500).json({ message: 'Something went wrong.' });
                next(err)
            })
    },
    getTask: (req, res, next) => {
        taskService.getTask(req.params.id, req.user)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                next(err);
                //res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    addTask: (req, res, next) => {
        taskService.saveTask(req.body)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                next(err)
                //res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    updateTask: (req, res, next) => {
        const id = req.params.id
        taskService.updateTask(id, req.body)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                next(err);
                //res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    deleteTask: (req, res, next) => {
        taskService.deleteTask(req.params.id, req.user)
            .then(result => {
                res.status(200).send();
            })
            .catch(err => {
                next(err);
                //res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    getUniqueTags: (req, res, next) => {
        taskService.getUniqueTags(req.user)
            .then(result => {
                res.status(200).send(result);
            })
            .catch(err => {
                next(err);
                //res.status(500).json({ message: 'Something went wrong.' });
            })
    }
};
module.exports = taskController;