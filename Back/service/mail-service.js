const nodemailer = require("nodemailer");

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
			// host: process.env.SMTP_HOST,
			// port: process.env.SMTP_PORT,
			// secure: true,
			// auth: {
			// 	user: process.env.SMTP_USER,
			// 	pass: process.env.SMTP_PASSWORD,
			// },
		});
	}

	async sendActivationEmail(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: "Активация аккаунта на " + process.env.API_URL,
			text: "",
			html: `
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</h1>
          </div>
        `,
		});
	}
}

module.exports = new MailService();

// testpostnick@gmail.com
// qweASDzxc123
// mikalayzh17@yandex.by
