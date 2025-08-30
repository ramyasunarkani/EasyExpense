const express=require('express');
const router=express.Router();
const expensesControllers=require('../controllers/expensesControllers');
const Authenticate=require('../middlewares/auth');

router.post('/addexpense',Authenticate.Authenticate,expensesControllers.AddExpense);
router.get('/all',Authenticate.Authenticate,expensesControllers.AllExpenses);
router.delete('/delete/:id',Authenticate.Authenticate,expensesControllers.DeleteExpense);
router.get("/report", Authenticate.Authenticate, expensesControllers.ReportExpenses);


module.exports=router;