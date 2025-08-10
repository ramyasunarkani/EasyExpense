const db = require('../util/db-connection');
const { User, expenses } = require('../models');

const totalExpensesOfUsers = async (req, res) => {
  try {
    const results = await User.findAll({
      attributes: [
        'id',
        'name',
        'totalExpenses'
      ],
      order:[['totalExpenses','DESC']]
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    res.status(500).json({ error: "Failed to fetch total expenses" });
  }
};

module.exports = { totalExpensesOfUsers };
