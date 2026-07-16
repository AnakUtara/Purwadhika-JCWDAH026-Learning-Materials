import "dotenv/config";

const APP_NAME = process.env.APP_NAME || "shrinker-api";
const APP_PORT = process.env.APP_PORT || 8000;
const APP_ENV = process.env.APP_ENV || "development";

const IS_PROD = APP_ENV === "production";

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.ethereal.email";
const SMTP_PORT = process.env.SMTP_PORT || 587;
const SMTP_USER = process.env.SMTP_USER || "<your_email_provider_user>";
const SMTP_PASS = process.env.SMTP_PASS || "<your_email_provider_pass>";

export {
	APP_NAME,
	APP_PORT,
	APP_ENV,
	IS_PROD,
	CLIENT_ORIGIN,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASS,
};
