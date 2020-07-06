
const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const userController = require('../controller/userController');

//TODO: remove
router.get('/test', userController.test);


router.get('/api/tasks', taskController.getTasks);

router.get('/api/task/:id', taskController.getTask);

router.post('/api/task', taskController.addTask);

router.post('/api/task/:id',taskController.updateTask);

router.delete('/api/task/:id', taskController.deleteTask);

module.exports = router;