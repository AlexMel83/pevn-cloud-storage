const nodemailer = require("nodemailer");
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CLIENT_URL } =
  process.env;

  class MailService {
    constructor() {
      this.transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: true,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        },
      });
    }
  
    async sendActivationMail(to, link) {
      await this.transporter.sendMail({
        from: SMTP_USER,
        to,
        subject: `Активація аккаунту на ${CLIENT_URL}`,
        text: "",
        html: `<div>
                          <h1>Вітаємо Вас з успішною реєстрацією!</h1>
                          Для активації аккаунту на платформі ${CLIENT_URL} перейдить за цим посиланням:
                          <a href="${link}">${link}</a>
                      </div>`,
      });
    }
  }
  
  module.exports = new MailService();