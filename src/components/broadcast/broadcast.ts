const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: '****',
    pass: "****"
  }
});

export async function sendEmail( subject:string, message:string) {
    const from = '';
    const recipients = '';

  try {
    await transporter.sendMail(
      { 
        from: from, 
        to: recipients, 
        subject: subject, 
        text: message });
    return { success: true };
  } catch (err:any) {
    console.error('Error sending mail', err);
    return { success: false, error: err.message };
  }
}
// module.exports = { sendEmail };