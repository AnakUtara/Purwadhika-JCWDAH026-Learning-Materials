import transporter from "../libs/nodemailer.js";

class EmailService {
	sendMail(to: string, subject: string, html: string) {
		transporter.sendMail({
			to,
			subject,
			html,
		});
	}

	sendMailWithAttachment(
		to: string,
		subject: string,
		html: string,
		attachments: Array<{ filename: string; content: Buffer }>,
	) {
		transporter.sendMail({
			to,
			subject,
			html,
			attachments,
		});
	}
}

export default EmailService;
