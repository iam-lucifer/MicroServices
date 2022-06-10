const express = require('express');
const router = express.Router();
const ticketController = require('./ticket.controller');

// get all users
router.get('/', ticketController.getTicketList);

router.get('/dept', ticketController.getDept);
// router.get('/', ticketController.getUserList);

// // get user by ID
router.get('/:id', ticketController.getTicketByID);

router.get('/dept/:id', ticketController.getDeptById);

// create new user
router.post('/', ticketController.createNewTicket);

// update user
router.put('/:id', ticketController.updateTicket);

// delete ticket
router.delete('/dept/:id', ticketController.deleteTicket)

module.exports = router;