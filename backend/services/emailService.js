const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Function to send expense notification
const sendExpenseNotification = async (expense) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: 'New Expense Added',
            html: `
                <h1>New Expense Details</h1>
                <p><strong>Description:</strong> ${expense.description}</p>
                <p><strong>Amount:</strong> $${expense.amount}</p>
                <p><strong>Date:</strong> ${expense.date}</p>
            `
        });
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {
    sendExpenseNotification
};