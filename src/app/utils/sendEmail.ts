import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string,
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: 'mrshakilhossainofficial@gmail.com',
      pass: 'eedv gvjr pnac royp',
    },
  });
  await transporter.sendMail({
    from: 'mrshakilhossainofficial@gmail.com',
    to,
    subject,
    text,
    html,
  });
};
