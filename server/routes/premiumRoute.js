const express=require('express');
const router=express.Router();
const premiumController=require('../controllers/premiumController');
const Authenticate=require('../middlewares/auth');


router.get('/leaderboard',premiumController.totalExpensesOfUsers);
router.get('/report', Authenticate, premiumController.GenerateReport); 


module.exports=router;