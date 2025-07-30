const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hash,
    });

    return res.status(201).json({
      message: 'User created successfully',
      userId: newUser.id,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Failed to create user',
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (isMatch) {
      return res.status(200).json({ message: 'Login successfully' });
    } else {
      return res.status(400).json({ message: 'Incorrect password' });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = {
  signup,
  login,
};
