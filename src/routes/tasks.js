const express = require('express');
const validateTask = require('../validation/task');

const router = express.Router();
const Task = require('../models/Task');

// @route GET api/tasks
// @desc get list of all tasks
// @access Private
router.get('/', (req, res) => {
  Task.find({ user_id: req.id })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json(err));
});

// @route POST api/tasks
// @desc create new task
// @access Private
router.post('/', (req, res) => {
  const { errors, isValid } = validateTask(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Task.create({
    user_id: req.id,
    text: req.body.text,
    type: req.body.type,
  })
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json(err));
});

// @route PUT api/tasks/(taskId)
// @desc update task data by id
// @access Private
router.put('^/:taskId([A-Za-z0-9]+)', (req, res) => {
  const { errors, isValid } = validateTask(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Task.findByIdAndUpdate(
    req.params.taskId,
    {
      $set: {
        text: req.body.text,
        type: req.body.type,
      },
    },
    { new: true },
  )
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json(err));
});

// @route DELETE api/tasks/(taskId)
// @desc delete the task by id
// @access Private
router.delete('^/:taskId([A-Za-z0-9]+)', (req, res) => {
  Task.findByIdAndDelete(req.params.taskId)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
