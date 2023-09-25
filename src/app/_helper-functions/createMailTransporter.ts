import nodemailer from 'nodemailer';

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      // todo: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'daryllreillo@outlook.com',
      pass: process.env.NEXT_PUBLIC_OUTLOOK_PW,
    },
  });

  return transporter;
};

export default createMailTransporter;
