const express = require('express');
const router = express.Router();

const LoginController = require('./login.controller');
router.post("/", LoginController.login_user);

router.post("/ResetPasswords",  LoginController.resetPassword)

router.post('/UpdatePasswords/:token' ,LoginController.updatePassword)

router.post('/CheckOtps/', LoginController.getOtp);

module.exports = router;
 