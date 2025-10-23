const mongoose = require('mongoose');

const connectDB = async () => {
  try {
     await mongoose.connect(`${process.env.MONGO_URI}/expenses`);

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

module.exports = connectDB;
