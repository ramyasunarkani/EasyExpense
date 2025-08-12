const { User, expenses } = require('../models');
const { Parser } = require('json2csv');

// leaderboard
const totalExpensesOfUsers = async (req, res) => {
  try {
    const results = await User.findAll({
      attributes: ['id', 'name', 'totalExpenses'],
      order: [['totalExpenses', 'DESC']]
    });
    res.json(results);
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    res.status(500).json({ error: "Failed to fetch total expenses" });
  }
};

// report
const GenerateReport = async (req, res) => {
  try {
    const userExpenses = await expenses.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'category', 'amount', 'description', 'createdAt']
    });

    if (!userExpenses.length) {
      return res.status(404).json({ message: "No expenses found" });
    }

    const plainExpenses = userExpenses.map(exp => exp.get({ plain: true }));
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(plainExpenses);

    res.header('Content-Type', 'text/csv');
    res.attachment('expenses_report.csv');
    return res.send(csv);
  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { totalExpensesOfUsers, GenerateReport };
