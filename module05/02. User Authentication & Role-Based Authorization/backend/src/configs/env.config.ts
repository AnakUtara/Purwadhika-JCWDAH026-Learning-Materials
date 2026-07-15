import "dotenv/config";

const APP_NAME = process.env.APP_NAME || "API";
const APP_PORT = process.env.APP_PORT || 8000;
const APP_ENV = process.env.APP_ENV || "development";

const IS_PROD = APP_ENV === "production";

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const DB_URL = process.env.DATABASE_URL || "";
const DIRECT_DB_URL = process.env.DIRECT_URL || "";

if (!DB_URL || !DIRECT_DB_URL) {
	console.warn(
		"DATABASE_URL or DIRECT_URL is not set. Please set them in your environment.",
	);
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID || "";

if (!GOOGLE_CLIENT_ID) {
	console.warn("GOOGLE_AUTH_CLIENT_ID is not set. Google login will not work.");
}

const REDIS_HOST: string = process.env.REDIS_HOST || "localhost";
const REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379;
const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || "";
const REDIS_DB: number = Number(process.env.REDIS_DB) || 0;

if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASSWORD) {
	console.warn(
		"REDIS_HOST, REDIS_PORT, or REDIS_PASSWORD is not set. Redis will not work.",
	);
}

const REDIS_PROVIDER: "ioredis" | "upstash" =
	(process.env.REDIS_PROVIDER as "ioredis" | "upstash") || "ioredis";

const UPSTASH_REDIS_URL: string = process.env.UPSTASH_REDIS_URL || "";
const UPSTASH_REDIS_TOKEN: string = process.env.UPSTASH_REDIS_TOKEN || "";

if (
	REDIS_PROVIDER === "upstash" &&
	(!UPSTASH_REDIS_URL || !UPSTASH_REDIS_TOKEN)
) {
	console.warn(
		"UPSTASH_REDIS_URL or UPSTASH_REDIS_TOKEN is not set. Upstash Redis will not work.",
	);
}

export {
	APP_NAME,
	APP_PORT,
	APP_ENV,
	DB_URL,
	IS_PROD,
	CLIENT_ORIGIN,
	GOOGLE_CLIENT_ID,
	REDIS_PROVIDER,
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASSWORD,
	REDIS_DB,
	UPSTASH_REDIS_URL,
	UPSTASH_REDIS_TOKEN,
};
