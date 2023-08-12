// resetPassword.js
const nodemailer = require("nodemailer");

const sendEmail = async (name, email, subject, detail) => {
    try {
      const transporter = nodemailer.createTransport({
        service:'gmail', // Change to your email service provider
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: email,
        to: process.env.CONTACT_EMAIL,
        subject: `Contact Us - ${subject}`,
        text: `
          Name: ${name}
          Email: ${email}
          
          Message:
          ${detail}
        `,
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
  
  module.exports = { sendEmail };
