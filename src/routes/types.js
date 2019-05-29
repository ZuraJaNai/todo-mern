const express = require('express');

const router = express.Router();
const Task = require('../models/Type');

// @route GET api/types
// @desc get list of all types
// @access Private
router.get('/', (req, res) => {
  Task.find({ user_id: req.id })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json(err));
});

// @route POST api/types
// @desc create new type
// @access Private
router.post('/', (req, res) => {
  Task.create({
    user_id: req.id,
    title: req.body.title,
    color: req.body.color,
  })
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json(err));
});

// @route DELETE api/types/(typeId)
// @desc delete a type
// @access Private
router.delete('^/:typeId([A-Za-z0-9]+)', (req, res) => {
  Task.findByIdAndDelete(req.params.typeId)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
