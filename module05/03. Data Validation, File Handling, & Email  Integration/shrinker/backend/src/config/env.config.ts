import "dotenv/config";

const appName = process.env.APP_NAME || "shrinker-api";
const appPort = process.env.APP_PORT || 8000;
const appEnv = process.env.APP_ENV || "development";

const isProduction = appEnv === "production";

const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const smtpHost = process.env.SMTP_HOST || "smtp.ethereal.email";
const smtpPort = process.env.SMTP_PORT || 587;
const smtpUser = process.env.SMTP_USER || "<your_email_provider_user>";
const smtpPass = process.env.SMTP_PASS || "<your_email_provider_pass>";

export {
	appName,
	appPort,
	appEnv,
	isProduction,
	clientOrigin,
	smtpHost,
	smtpPort,
	smtpUser,
	smtpPass,
};
