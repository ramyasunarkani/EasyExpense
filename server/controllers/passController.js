const uuid = require('uuid');
const bcrypt = require('bcrypt');
const Sib = require('sib-api-v3-sdk');
const { User, ForgotPassword } = require('../models'); 
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;
const transEmailApi = new Sib.TransactionalEmailsApi();


const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    console.log(user, 'found user');

    const forgotRequest = await ForgotPassword.create({
      userId: user._id,
      expiresBy: new Date(Date.now() + 60 * 60 * 1000),
    });

    const resetLink = `${process.env.FORGOT_PASS}/password/resetpassword/${forgotRequest._id}`;

    await transEmailApi.sendTransacEmail({
      sender: { email: 'ramyakrishnasunarkani@gmail.com', name: 'Expense Tracker App' },
      to: [{ email }],
      subject: 'Password Reset Request',
      htmlContent: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      textContent: `Click the link to reset your password: ${resetLink}`,
    });

    return res.status(200).json({ message: 'Reset link sent to email' });
  } catch (error) {
    console.error('Error in forgotpassword:', error);
    return res.status(500).json({ message: 'Error sending reset link' });
  }
};

const resetpassword = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await ForgotPassword.findOne({ _id: id, active: true });

    if (!request || new Date() > request.expiresBy) {
      return res.status(400).send('Invalid or expired reset link.');
    }

    request.active = false;
    await request.save();

    res.redirect(`${process.env.FRONTEND_URL}/update-password/${id}`);
  } catch (error) {
    console.error('Error in resetpassword:', error);
    res.status(500).send('Error processing reset link.');
  }
};

const updatepassword = async (req, res) => {
  try {
    const { newpassword } = req.body;
    const { resetpasswordid } = req.params;

    const request = await ForgotPassword.findOne({ _id: resetpasswordid });
    if (!request) return res.status(404).json({ error: 'Invalid or expired reset request', success: false });

    const user = await User.findById(request.userId);
    if (!user) return res.status(404).json({ error: 'User not found', success: false });

    const hash = await bcrypt.hash(newpassword, 10);
    user.password = hash;
    await user.save();

    await ForgotPassword.updateMany({ userId: user._id }, { $set: { active: false } });

    return res.status(200).json({ message: 'Password updated successfully', success: true });
  } catch (error) {
    console.error('Error in updatepassword:', error);
    return res.status(500).json({ error: 'Internal server error', success: false });
  }
};

module.exports = {
  forgotpassword,
  resetpassword,
  updatepassword,
};
