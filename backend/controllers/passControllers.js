const uuid = require('uuid');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { User, Forgotpassword } = require('../models');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const id = uuid.v4();
    await Forgotpassword.create({
      id,
      UserId: user.dataValues.id,
      active: true,
      expiresby: new Date(Date.now() + 60 * 60 * 1000) 
    });

    const resetLink = `http://localhost:3000/password/resetpassword/${id}`;

    await transporter.sendMail({
  from: `"Expense Tracker App" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Password Reset Request",
  html: `
    <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
    <p><strong>Note:</strong> This link will expire in 1 hour.</p>
    <p>If you did not request a password reset, please ignore this email.</p>
  `,
  text: `Click the link to reset your password: ${resetLink}
This link will expire in 1 hour.
If you did not request a password reset, please ignore this email.`
});


    return res.status(200).json({ message: 'Reset link sent to email' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error sending reset link' });
  }
};

const resetpassword = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Forgotpassword.findOne({ where: { id, active: true } });

    if (!request || new Date() > request.expiresby) {
      return res.status(400).send('Invalid or expired reset link.');
    }

    await request.update({ active: false });

    res.redirect(`http://localhost:5173/update-password/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing reset link.');
  }
};

const updatepassword = async (req, res) => {
  try {
    const { newpassword } = req.body;
    const { resetpasswordid } = req.params;

    const request = await Forgotpassword.findOne({ where: { id: resetpasswordid } });
    if (!request) {
      return res.status(404).json({ error: 'Invalid or expired reset request', success: false });
    }

    const user = await User.findOne({ where: { id: request.UserId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found', success: false });
    }

    const hash = await bcrypt.hash(newpassword, 10);
    await user.update({ password: hash });

    await Forgotpassword.update({ active: false }, { where: { userId: user.id } });

    return res.status(200).json({ message: 'Password updated successfully', success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error, success: false });
  }
};

module.exports = {
  forgotpassword,
  resetpassword,
  updatepassword
};
