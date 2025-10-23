require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./models')
const connectDB = require('./util/db-connection');

const userRoutes=require('./routes/userRoute');
const expenseRoutes=require('./routes/expenseRoute')
const pasRoutes=require('./routes/passRoute')
const paymentRoutes = require('./routes/paymentRoute'); 
const premiumRoutes=require('./routes/premiumRoute');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is Working");
});

app.use('/user',userRoutes);
app.use('/expenses',expenseRoutes);
app.use('/password',pasRoutes);
app.use('/payment', paymentRoutes);
app.use('/premium',premiumRoutes);




(async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server started running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
})();




module.exports = app;
