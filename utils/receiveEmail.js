const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const catchAsync = require("./../utils/catchAsync");
// const pug = require("pug");
// const htmlToText = require("html-to-text");

const auth = {
  auth: {
    api_key: "key-7513a46db0abe10981d8bf748aa54448",
    domain: "sandbox35eff3e71d84431ca8d35db2cf651f2c.mailgun.org",
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = async (params) => {
  const mailOptions = {
    sender: params.firstName,
    from: params.email,
    to: `budgetify-webApp@outlook.com`,
    text: params.message,
  };
  await transporter.sendMail(mailOptions);
};

//Exporting the sendmail
module.exports = sendMail;

// module.exports = class receiveEmail {
//   constructor(params) {
//     this.to = `Budgetify-WebApp@outlook.com`;
//     (this.message = params.message),
//       (this.from = `${params.firstName} ${params.lastname} <${params.email}>`);
//   }

//   createNewTransport() {
//     if (process.env.NODE_ENV === "development") {
//       return nodemailer.createTransport({
//         host: process.env.SENDMAIL_HOST,
//         port: process.env.SENDMAIL_PORT,
//         auth: {
//           user: process.env.SENDMAIL_USER,
//           pass: process.env.SENDMAIL_PASSWORD,
//         },
//       });
//     }
//     nodemailer.createTransport({
//       host: process.env.SENDBLUE_SERVER,
//       port: process.env.SENDBLUE_PORT,
//       auth: {
//         user: process.env.SENDBLUE_USER,
//         pass: process.env.SENDBLUE_PASS,
//       },
//     });
//   }

//   //3) Create a transport and send mail
//   sendContactMsg() {
//     this.createNewTransport().sendMail({
//       from: this.from,
//       to: this.to,
//       text: this.message,
//     });
//   }
// };
// //Send the actual mail
// // //1)Render HTML based on a pug template
// // const html = pug.renderFile(
// //   `${__dirname}/../views/emails/${template}.pug`,
// //   {
// //     firstName: this.firstName,
// //     lastName: this.lastName,
// //     subject,
// //   }
// // );
