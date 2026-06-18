import "dotenv/config";

const APP_NAME = process.env.APP_NAME || "API Name";
const APP_PORT = process.env.APP_PORT || 3000;

export { APP_NAME, APP_PORT };
