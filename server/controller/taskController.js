const taskService = require('../service/taskService');

const taskController = {
    getTasks: (req, res) => {
        taskService.getTasks(req.user)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.handleError(err, res);
            })
    },
    getTask: (req, res) => {
        taskService.getTask(req.params.id, req.user)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.handleError(err, res);
            })
    },
    addTask: (req, res) => {
        taskService.saveTask(req.body)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.handleError(err, res);
            })
    },
    updateTask: (req, res) => {
        const id = req.params.id
        taskService.updateTask(id, req.body, req.user)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.handleError(err, res);
            })
    },
    deleteTask: (req, res) => {
        taskService.deleteTask(req.params.id, req.user)
            .then(result => {
                res.status(200).send();
            })
            .catch(err => {
                res.handleError(err, res);
            })
    },
    getUniqueTags: (req, res) => {
        taskService.getUniqueTags(req.user)
            .then(result => {
                res.status(200).send(result);
            })
            .catch(err => {
                res.handleError(err, res);
            })
    }
};
module.exports = taskController;