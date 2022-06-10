const express = require('express');
const router = express.Router();
const commentsController = require('./comment.controller');
// // get all department
router.get('/', commentsController.getcommentList);
router.get('/com/:ticket_id', commentsController.getcomment);
router.post('/', commentsController.createNewComment);

module.exports = router;
