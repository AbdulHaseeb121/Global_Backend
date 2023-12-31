const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // `true` for port 465, `false` for all other ports
  auth: {
    user: "haseebharoon147@gmail.com",
    pass: "ytzxskhcxpnbmayh",
  },
  tls:{
    rejectUnauthorized:false
  }
});


async function info() {
    await transporter.sendMail({
    from: 'haseebharoon147@gmail.com', // sender address
    to: "haseebmemo305@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
}


module.exports = info
