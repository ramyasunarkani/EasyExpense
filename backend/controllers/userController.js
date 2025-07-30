const User = require('../models/userModel');

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        message: 'Email already exists',
      });
    }

    const newUser = await User.create({
      name,
      email,
      password, 
    });

    res.status(201).json({
      message: 'User created successfully',
      userId: newUser.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to create user',
      error: err.message,
    });
  }
};

module.exports={
    signup,
}