
const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const userController = require('../controller/userController');
const authorizationJWT = require('../middlewares/auth')
//TODO: remove
router.get('/test', userController.test);


router.get('/api/tasks', authorizationJWT, taskController.getTasks);

router.get('/api/task/:id',authorizationJWT, taskController.getTask);

router.post('/api/task',authorizationJWT, taskController.addTask);

router.post('/api/task/:id',authorizationJWT,taskController.updateTask);

router.delete('/api/task/:id',authorizationJWT, taskController.deleteTask);

router.post('/api/register', userController.register)

router.post('/api/signIn', userController.signIn)

router.get('/api/tags',authorizationJWT, taskController.getUniqueTags)

module.exports = router;