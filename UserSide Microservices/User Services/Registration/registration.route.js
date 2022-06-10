const express = require('express');
const router = express.Router();

const registrationController = require('./registration.controller');

router.post('/', registrationController.Register);

module.exports = router;