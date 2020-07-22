
const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const userController = require('../controller/userController');
//TODO: remove
router.get('/test', userController.test);


router.get('/api/tasks',  taskController.getTasks);

router.get('/api/task/:id', taskController.getTask);

router.post('/api/task', taskController.addTask);

router.put('/api/task/:id', taskController.updateTask);

router.delete('/api/task/:id', taskController.deleteTask);

router.post('/api/register', userController.register);

router.post('/api/signIn', userController.signIn);

router.get('/api/tags', taskController.getUniqueTags);

router.get('/api/allTasks', taskController.getAllTasks);

module.exports = router;