const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: '****',
    pass: "****"  // App Password if 2FA is enabled
  }
});

async function sendEmail( subject, message) {
    const from = '';
    const recipients = ''; // to be read from CSV

  try {
    await transporter.sendMail(
      { 
        from: from, 
        to: recipients, 
        subject: subject, 
        text: message });
    return { success: true };
  } catch (err) {
    console.error('Error sending mail', err);
    return { success: false, error: err.message };
  }
}
module.exports = { sendEmail };