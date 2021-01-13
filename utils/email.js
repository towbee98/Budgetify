const nodemailer = require("nodemailer");
//const mailGun = require("nodemailer-mailgun-transport");
const pug = require("pug");
const htmlToText = require("html-to-text");

// const auth = {
//   auth: {
//     api_key: "705e774d05fc863e40b3fa90c42027cf-07e45e2a-8670be1b",
//     domain: "sandbox35eff3e71d84431ca8d35db2cf651f2c.mailgun.org",
//   },
// };
module.exports = class Email {
  constructor(user, url) {
    (this.to = user.email),
      (this.firstName = user.firstName),
      (this.lastName = user.lastName),
      (this.url = url),
      (this.from = `tobi oladele <tobiemma200@protonmail.com>`);
  }

  createNewTransport() {
    if (process.env.NODE_ENV === "development") {
      return nodemailer.createTransport({
        host: process.env.SENDMAIL_HOST,
        port: process.env.SENDMAIL_PORT,
        auth: {
          user: process.env.SENDMAIL_USER,
          pass: process.env.SENDMAIL_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.SENDBLUE_SERVER,
      port: process.env.SENDBLUE_PORT,
      auth: {
        user: process.env.SENDBLUE_USER,
        pass: process.env.SENDBLUE_PASS,
      },
    });
  }
  //Send the actual mail
  async send(template, subject) {
    //1)Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        lastName: this.lastName,
        url: this.url,
        subject,
      }
    );

    //2)Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    //3) Create a transport and send mail
    await this.createNewTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send("welcome", "Welcome to the budgetify App");
  }
  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your Password reset token(valid for 10 minutes)"
    );
  }
};
