const AWS = require("aws-sdk");
const {Expense,User} = require("../models"); 
const totalExpensesOfUsers = async (req, res) => {
  try {
    const results = await User.find({}, "name totalExpenses")
      .sort({ totalExpenses: -1 })
      .lean();

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    res.status(500).json({ error: "Failed to fetch total expenses" });
  }
};


const s3 = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
});

async function uploadToS3(data, filename) {
  try {
    const params = {
      Bucket: "ramya-expense",
      Key: filename,
      Body: data,
      ContentType: "text/csv",
      ACL: "public-read",
    };

    const response = await s3.upload(params).promise();
    console.log("Upload Success:", response.Location);
    return response.Location; 
  } catch (err) {
    console.error("S3 Upload Failed:", err);
    throw err;
  }
}


const GenerateReport = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const userExpenses = await Expense.find({ userId })
      .select("category amount description createdAt -_id")
      .lean();

    if (!userExpenses.length) {
      return res.status(404).json({ message: "No expenses found" });
    }

    const csvHeader = "Category,Amount,Description,Created At\n";
    const csvData = userExpenses
      .map(
        (exp) =>
          `${exp.category},${exp.amount},${exp.description},${new Date(exp.createdAt).toLocaleString()}`
      )
      .join("\n");

    const csvFile = csvHeader + csvData;
    const filename = `expenses-${userId}-${Date.now()}.csv`;

    const fileURL = await uploadToS3(csvFile, filename);

    return res.status(200).json({ fileURL, success: true });
  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { totalExpensesOfUsers, GenerateReport };
