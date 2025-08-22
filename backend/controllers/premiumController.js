const { User, expenses } = require('../models');
const { Parser } = require('json2csv');
const AWS=require('aws-sdk');

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

const s3 = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET
});

async function uploadToS3(data, filename) {
  try {
    const params = {
      Bucket: "ramya-expense",  
      Key: filename,
      Body: data,
      ContentType: "text/csv",
      ACL: "public-read"
    };

    const response = await s3.upload(params).promise();
    console.log("Upload Success:", response);
    return response; 
  } catch (err) {
    console.error("S3 Upload Failed:", err);
    throw err;
  }
}

const GenerateReport = async (req, res) => {
  try {
    const userExpenses = await expenses.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'category', 'amount', 'description', 'createdAt']
    });

    if (!userExpenses.length) {
      return res.status(404).json({ message: "No expenses found" });
    }

    const stringfyExpenses = JSON.stringify(userExpenses);
    const filename = `expenses-${req.user.id}-${Date.now()}.CSV`; 

    const fileURL = await uploadToS3(stringfyExpenses, filename);

    return res.status(200).json({ fileURL, success: true });

  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { totalExpensesOfUsers, GenerateReport };
