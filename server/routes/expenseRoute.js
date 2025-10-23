const express=require('express');
const router=express.Router();
const expensesControllers=require('../controllers/expenseController');
const Authenticate=require('../middlewares/auth');

router.post('/addexpense',Authenticate,expensesControllers.AddExpense);
router.get('/all',Authenticate,expensesControllers.AllExpenses);
router.delete('/delete/:id',Authenticate,expensesControllers.DeleteExpense);
router.get("/report", Authenticate, expensesControllers.ReportExpenses);


module.exports=router;