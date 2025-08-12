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

 
const AllExpenses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows } = await expenseModel.findAndCountAll({
      where: { UserId: req.user.id },
      offset,
      limit,
      order: [['createdAt', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      expenses: rows,
      totalExpenses: count,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ message: "Unable to fetch expenses" });
  }
};

module.exports = { AddExpense,AllExpenses,DeleteExpense };
