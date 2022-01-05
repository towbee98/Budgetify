const nodemailer = require("nodemailer");
//const mailGun = require("nodemailer-mailgun-transport");
const pug = require("pug");
const htmlToText = require("html-to-text");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports = class Email {
  constructor(user, url) {
    (this.to = user.email),
      (this.firstName = user.firstName),
      (this.lastName = user.lastName),
      (this.url = url),
      (this.from = `tobi oladele <Budgetify-WebApp@outlook.com>`);
  }

  createNewTransport() {
    if (process.env.NODE_ENV === "production") {
      //Set up the OAUTH2 CLIENT
      const oauth2Client = new OAuth2(
        process.env.client_id,
        process.env.client_secret,
        process.env.redirect_uris
      );

      //SET THE REFRESH TOKEN
      oauth2Client.setCredentials({
        refresh_token: process.env.refresh_token,
      });

      //GET THE ACCESS TOKEN
      const accessToken = oauth2Client.getAccessToken((err, token) => {
        if (err) {
          return err;
        }
        return token;
      });
      //DESCRIBE HOW TO SEND THE MAIL
      return nodemailer.createTransport({
        service: "Gmail",
        auth: {
          type: "OAuth2",
          user: process.env.Gmail_user,
          clientId: process.env.client_id,
          clientSecret: process.env.client_secret,
          refreshToken: process.env.refresh_token,
          accessToken,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.SENDMAIL_HOST,
      port: process.env.SENDMAIL_PORT,
      auth: {
        user: process.env.SENDMAIL_USER,
        pass: process.env.SENDMAIL_PASSWORD,
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
