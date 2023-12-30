import nodemailer from "nodemailer";

export default async function sendEmail(to, subject, text) {
  try {
    const transport = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to,
      subject,
      text,
    };

    const response = await transport.sendMail(mailOptions);

    if (response?.messageId != null) return true;

    return false;
  } catch (error) {
    return false;
  }
}
