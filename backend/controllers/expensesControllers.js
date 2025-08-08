const { where } = require('sequelize');
const expenseModel = require('../models/expenseModel');

const AddExpense = async (req, res) => {
  const { category, amount, description } = req.body;
  try {
    const newExpense = await expenseModel.create({
      category,
      amount,
      description,
      UserId:req.user.id
    });
    return res.status(200).json({
      expense: newExpense,
      message: "success"
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await expenseModel.destroy({
      where: { id,UserId:req.user.id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
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
