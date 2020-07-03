
const express = require('express');
const router = express.Router();
const {taskController} = require('../controller/taskController');
const userController = require('../controller/userController');
const { Task } = require('../models/Task');

//TODO: remove
router.get('/test', function (req, res) {

    taskController.getTasks()
    res.status(200).json({ data: 'test' });
});


router.get('/api/tasks', (req, res)=>{
    
})

router.get('/api/task/:id', (req, res)=>{
    //TODO
})

router.post('/api/task',(req, res)=>{
    console.log('here!')
    let task = new Task({
        createdAt:new Date(),
        updatedAt:new Date(),
        title:'title',
        description: 'hello',
        tasks:[],
        createdBy:'John'
    })
    task.save(function (err, task) {
        if (err) { return next(err) }
        res.json(201, task)
      })
})

router.put('/api/task/:id', (req, res)=>{
    //TODO
})

router.delete('api/task/:id', (req,res)=>{
    //TODO
})

module.exports = router