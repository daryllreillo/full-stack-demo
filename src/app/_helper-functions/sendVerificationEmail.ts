import createMailTransporter from './createMailTransporter';

const sendVerificationEmail = (user: { email: string; name: string; emailtoken: string }) => {
  const transporter = createMailTransporter();

  const mailOptions = {
    from: '"Verifier No Reply" <daryllreillo@outlook.com>',
    to: user.email,
    subject: 'Email Verification (full-stack-demo-by-daryll-reillo.vercel.app)',
    html: `
            <p>Hello ${user.name},</p>
            <p>Please verify your email by clicking on the link below </p>
            <div>
                <a href='${process.env.NEXT_PUBLIC_DOMAIN}/verify-email?emailtoken=${user.emailtoken}&email=${user.email}'}>Verify Email</a>
            </div>
            <div>
                <p>Or copy and paste the Url below to any web browser.</p>
                <span>${process.env.NEXT_PUBLIC_DOMAIN}/verify-email?emailtoken=${user.emailtoken}&email=${user.email}</span>
            </div>
            <p>If you did NOT register this email address, please don't click on the link nor access the URL!</p>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Verification email sent');
    }
  });
};

export default sendVerificationEmail;
