const express = require('express');
const resetpasswordController = require('../controllers/passController');

const router = express.Router();

router.post('/updatepassword/:resetpasswordid', resetpasswordController.updatepassword);

router.get('/resetpassword/:id', resetpasswordController.resetpassword);

router.post('/forgotpassword', resetpasswordController.forgotpassword);

module.exports = router;
