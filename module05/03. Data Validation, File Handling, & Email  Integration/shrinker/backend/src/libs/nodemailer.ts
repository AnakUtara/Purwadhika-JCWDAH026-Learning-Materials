import nodemailer from "nodemailer";
import AppError from "../errors/app.error.js";
import {
	isProduction,
	smtpHost,
	smtpPass,
	smtpUser,
	smtpPort,
} from "../config/env.config.js";

const testAccount = await nodemailer.createTestAccount();

if (!testAccount) {
	throw new AppError(
		"Failed to create a testing account. Please check your connection and try again.",
		500,
	);
}

if (!isProduction) {
	console.log("Ethereal test account:");
	console.log("User:", testAccount.user);
	console.log("Pass:", testAccount.pass);
	console.log("Login at: https://ethereal.email/login");
}

const transporter = isProduction
	? nodemailer.createTransport({
			host: smtpHost,
			port: Number(smtpPort),
			auth: {
				user: smtpUser,
				pass: smtpPass,
			},
		})
	: nodemailer.createTransport({
			host: smtpHost,
			port: Number(smtpPort),
			auth: {
				user: testAccount.user,
				pass: testAccount.pass,
			},
		});

export default transporter;
