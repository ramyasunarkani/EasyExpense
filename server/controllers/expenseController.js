const { Expense, User } = require('../models');
const mongoose = require('mongoose');

const AddExpense = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { category, amount, description } = req.body;

    const newExpense = await Expense.create(
      [
        {
          category,
          amount,
          description,
          userId: req.user._id,
        },
      ],
      { session }
    );

    await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { totalExpenses: amount } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      expense: newExpense[0],
      message: 'Expense added successfully',
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error adding expense:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const DeleteExpense = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const expenseToDelete = await Expense.findOne({
      _id: id,
      userId: req.user._id,
    }).session(session);

    if (!expenseToDelete) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Expense not found' });
    }

    await Expense.deleteOne({ _id: id }).session(session);

    await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { totalExpenses: -expenseToDelete.amount } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error deleting expense:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const AllExpenses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const [expenses, totalExpenses] = await Promise.all([
      Expense.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Expense.countDocuments({ userId: req.user._id }),
    ]);

    const totalPages = Math.ceil(totalExpenses / limit);

    return res.status(200).json({
      expenses,
      totalExpenses,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return res.status(500).json({ message: 'Unable to fetch expenses' });
  }
};

const ReportExpenses = async (req, res) => {
  try {
    const { range } = req.query;
    const userId = req.user._id;

    const today = new Date();
    let startDate;

    switch (range) {
      case 'daily':
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        break;
      case 'weekly':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay()); 
        break;
      case 'monthly':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'yearly':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        return res.status(400).json({ message: 'Invalid range' });
    }

    const expenses = await Expense.aggregate([
      { $match: { userId: userId, createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          totalAmount: 1,
          count: 1,
        },
      },
    ]);

    return res.status(200).json({ range, expenses });
  } catch (error) {
    console.error('Error generating report:', error);
    return res.status(500).json({ message: 'Unable to generate report' });
  }
};

module.exports = { AddExpense, AllExpenses, DeleteExpense, ReportExpenses };
