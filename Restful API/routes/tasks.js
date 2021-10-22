const router = require('express').Router();
let Task = require('../models/taskModel');
const auth = require("../middleware/auth");

router.route('/').get(auth,(req, res) => {
    Task.find()
      .then(tasks => res.json(tasks))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/add').post(auth, (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
  //  const date = Date.parse(req.body.date);
  
    const newTask = new Task({
      title,
      description
    });
  
    newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').get(auth, (req, res) => {
    Task.findById(req.params.id)
      .then(task => res.json(task))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete(auth, (req, res) => {
    Task.findByIdAndDelete(req.params.id)
      .then(() => res.json('Task deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post(auth, (req, res) => {
    Task.findById(req.params.id)
      .then(task => {
        task.title = req.body.title;
        task.description = req.body.description;
        //task.date = Date.parse(req.body.date);
  
        task.save()
          .then(() => res.json('Task updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;