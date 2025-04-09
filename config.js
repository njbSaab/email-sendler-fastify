const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = (email, subject, content, isHtml = false) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: subject || "Code Confirmation",
  };

  if (isHtml) {
    mailOptions.html = content;
  } else {
    mailOptions.text = content || "Default message";
  }

  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("Email sent to:", email, "Response:", info.response);
      return info;
    })
    .catch((error) => {
      console.error("Error sending email to:", email, "Error:", error);
      throw error;
    });
};

module.exports = sendMail;
