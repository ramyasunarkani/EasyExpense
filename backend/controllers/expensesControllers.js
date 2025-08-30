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

const { Op, fn, col } = require("sequelize");

const ReportExpenses = async (req, res) => {
  try {
    const { range } = req.query; 
    const userId = req.user.id;

    const today = new Date();
    let startDate;

    switch (range) {
      case "daily":
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        break;
      case "weekly":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay()); // Sunday as start
        break;
      case "monthly":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "yearly":
        startDate = new Date(today.getFullYear(), 0, 1); // Jan 1st
        break;
      default:
        return res.status(400).json({ message: "Invalid range" });
    }

    const expenses = await expenseModel.findAll({
      attributes: [
        "category",
        [fn("SUM", col("amount")), "totalAmount"],
        [fn("COUNT", col("id")), "count"]
      ],
      where: {
        UserId: userId,
        createdAt: {
          [Op.gte]: startDate
        }
      },
      group: ["category"]
    });

    return res.status(200).json({ range, expenses });
  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ message: "Unable to generate report" });
  }
};

module.exports = { AddExpense, AllExpenses, DeleteExpense, ReportExpenses };
