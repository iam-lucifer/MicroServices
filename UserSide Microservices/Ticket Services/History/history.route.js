const express = require('express');
const router = express.Router();
const historiesController = require('./history.controller');
// // get all department
router.get('/', historiesController.gethistoriesList);

// // get department by ID
router.get('/:id', historiesController.gethistoriesByID);

// // create new history
router.post('/', historiesController.createNewHistories);

// // update user
router.put('/:id', historiesController.updateHistories);

router.get('/his/:ticket_id', historiesController.gethistories);

module.exports = router;