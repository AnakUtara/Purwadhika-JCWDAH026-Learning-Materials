import "dotenv/config";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access-secret";
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "10m";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh-secret";
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

if (!ACCESS_SECRET || !REFRESH_SECRET) {
	console.warn(
		"JWT_ACCESS_SECRET or JWT_REFRESH_SECRET is not set in environment variables.",
	);
}

export { ACCESS_SECRET, ACCESS_EXPIRES_IN, REFRESH_SECRET, REFRESH_EXPIRES_IN };
