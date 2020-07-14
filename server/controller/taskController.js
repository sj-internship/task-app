const taskService = require('../service/taskService');

const taskController = {
    getTasks: (req, res) => {
        taskService.getTasks(req.user)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    getTask: (req, res) => {
        taskService.getTask(req.params.id, req.user)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    addTask: (req, res) => {
        taskService.saveTask(req.body)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    updateTask: (req, res) => {
        const id = req.params.id
        taskService.updateTask(id, req.body)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    deleteTask: (req, res) => {
        taskService.deleteTask(req.params.id, req.user)
            .then(result => {
                res.status(200).send();
            })
            .catch(err => {
                res.status(500).json({ message: 'Something went wrong.' });
            })
    },
    getUniqueTags: (req, res) => {
        taskService.getUniqueTags(req.user)
            .then(result => {
                res.status(200).send(result);
            })
            .catch(err => {
                res.status(500).json({ message: 'Something went wrong.' });
            })
    }
};
module.exports = taskController;