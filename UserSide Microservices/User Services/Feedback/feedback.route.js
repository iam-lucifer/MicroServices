const express = require('express');

const router = express.Router();
const feedbackController = require('./feedback.controller');

// get All Feedback List
router.get('/' , feedbackController.getFeedbackList);

// get feedback with mark 1
router.get('/mark' , feedbackController.getFeedbackByMark);

// create Feedback
router.post('/', feedbackController.createNewFeedback);

// update feedback
router.put('/:id' , feedbackController.updateFeedback);

module.exports = router;