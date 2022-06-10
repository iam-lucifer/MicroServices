const express = require('express');
const router = express.Router();

const LoginController = require('./login.controller');
router.post("/", LoginController.get_login);

router.post("/resetPassword",  LoginController.resetPassword)

router.post('/updatePassword/:token' ,LoginController.updatePassword)

router.post('/checkOtp/', LoginController.getOtp);

module.exports = router;


