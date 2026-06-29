import "dotenv/config";

const APP_NAME = process.env.APP_NAME || "API Name";
const APP_PORT = process.env.APP_PORT || 3000;

// Database connection env
const DB_URL = process.env.DATABASE_URL || "";
const DIRECT_URL = process.env.DIRECT_URL || "";

export { APP_NAME, APP_PORT, DB_URL, DIRECT_URL };
