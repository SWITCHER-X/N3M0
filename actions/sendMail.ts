"use server";
import nodemailer from "nodemailer";

const sendMail = async (userMessage: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const { name, email, subject, message } = userMessage;
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    return { success: false };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject: `[Portfolio] - ${subject}`,
      text: `From ${name} <${email}>\n\n${message}`,
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export default sendMail;
