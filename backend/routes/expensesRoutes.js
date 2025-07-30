const express=require('express');
const router=express.Router();
const expensesControllers=require('../controllers/expensesControllers');

router.post('/addexpense',expensesControllers.AddExpense);

module.exports=router;