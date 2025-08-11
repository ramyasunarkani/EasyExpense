const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY; 
const transEmailApi = new Sib.TransactionalEmailsApi();

const sendForgotPasswordEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const sender = {
      email: 'ramyakrishnasunarkani@gmail.com', // Must be a verified Brevo sender
      name: 'Expense Tracker App'
    };

    const receivers = [{ email }];

    const resetLink = `http://localhost:3000/reset-password?email=${encodeURIComponent(email)}`;

    const result = await transEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Password Reset Request',
      htmlContent: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      textContent: `Click the link to reset your password: ${resetLink}`
    });

    console.log('Email sent:', result);
    res.status(200).json({ message: 'Reset email sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error.response?.body || error.message);
    res.status(500).json({ message: 'Error sending email' });
  }
};

module.exports = { sendForgotPasswordEmail };
