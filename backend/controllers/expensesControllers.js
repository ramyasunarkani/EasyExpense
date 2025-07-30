const expenses = require('./expensesControllers');

const AddExpense = async (req, res) => {
  const { expense, description, category } = req.body;
  try {
    const newExpense = await expenses.create({
      expense,
      description,
      category,
    });
    return res.status(200).json({
      expense: newExpense,
      message: "New expense added successfully"
    });
  } catch (error) {
    console.error('Failed to add expense:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { AddExpense };
