const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_API_KEY }
});

const sendBudgetAlert = async (totalExpenses, budgetLimit) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: '⚠️ Budget Alert - Limit Exceeded',
      html: `<h2>Budget Alert</h2><p>Total: $${totalExpenses.toFixed(2)}</p><p>Limit: $${budgetLimit.toFixed(2)}</p><p>Over by: $${(totalExpenses - budgetLimit).toFixed(2)}</p>`
    });
    console.log('✅ Email sent');
    return { success: true };
  } catch (error) {
    console.error('❌ Email error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendBudgetAlert };