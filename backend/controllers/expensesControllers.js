const expenseModel = require('../models/expenseModel');
const { User } = require('../models');
const db=require('../util/db-connection');
const AddExpense = async (req, res) => {
  const transaction=await db.transaction();

  try {
    const { category, amount, description } = req.body;
    const newExpense = await expenseModel.create({
      category,
      amount,
      description,
      UserId:req.user.id
    },{transaction});
    await User.increment('totalExpenses',{
      by:amount,
      where:{id:req.user.id},
      transaction
    })
        await transaction.commit();

    return res.status(200).json({
      expense: newExpense,
      message: "success"
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteExpense = async (req, res) => {
    const transaction=await db.transaction();

  try {
    const { id } = req.params;
    const expenseToDelete = await expenseModel.findOne({
      where: { id, UserId: req.user.id },
      transaction
    });

    if (!expenseToDelete) {
      await transaction.rollback();

      return res.status(404).json({ message: "Expense not found" });
    }

    await expenseModel.destroy({
      where: { id, UserId: req.user.id },
      transaction
    });

    await User.decrement('totalExpenses', {
      by: expenseToDelete.amount,
      where: { id: req.user.id },
      transaction
    });

    await transaction.commit();

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

 
const AllExpenses=async(req,res)=>{
  try {
    const allExpenses=await expenseModel.findAll({where:{userId:req.user.id}});
  return res.status(200).json(allExpenses);
  } catch (error) {
    return res.status(500).send('unable to fetch')
    
  }

}

module.exports = { AddExpense,AllExpenses,DeleteExpense };
