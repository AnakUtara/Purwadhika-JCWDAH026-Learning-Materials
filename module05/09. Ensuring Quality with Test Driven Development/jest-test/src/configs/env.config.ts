import "dotenv/config";

const APP_ENV: string = process.env.APP_ENV || "development";
const IS_PRODUCTION: boolean = APP_ENV === "production";
const DB_URL: string = process.env.DATABASE_URL || "";
const DIRECT_URL: string = process.env.DIRECT_URL || "";

export { APP_ENV, IS_PRODUCTION, DB_URL, DIRECT_URL };
