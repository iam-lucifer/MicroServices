const express = require('express');

const router = express.Router();
const feedbackController = require('./feedback.controller');

// get All Feedback List
router.get('/' , feedbackController.getFeedbackList);

// create Feedback
router.post('/', feedbackController.createNewFeedback);

// get feedback with mark 1
router.get('/mark' , feedbackController.getFeedbackByMark);

// update feedback
router.put('/:id' , feedbackController.updateFeedback);

module.exports = router;