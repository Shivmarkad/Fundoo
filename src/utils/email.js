const nodemailer = require('nodemailer');
import dotenv from 'dotenv';
dotenv.config();

export function sendNewMail(token, email) {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_EMAIL
    }
  });

  let details = {
    from: process.env.EMAIL,
    to: email,
    subject: 'testing the mail for nodemail',
    html: `
    <h1>Here is the link to change password</h1>
    <a href="http://localhost:3000/api/v1/users/reset/${token}">click to change password</a>
  `
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      return new Error(`error has occured ${err}`);
    } else {
      return 'email has sent';
    }
  });
}
