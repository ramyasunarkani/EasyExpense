const exppress=require('express');
const { sendForgotPasswordEmail } = require('../controllers/passControllers');

const router=exppress.Router();
router.post('/forgotpassword',sendForgotPasswordEmail);

module.exports=router;