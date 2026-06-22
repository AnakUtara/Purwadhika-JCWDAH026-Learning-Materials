import "dotenv/config";

const APP_NAME = process.env.APP_NAME || "API Name";
const APP_PORT = process.env.APP_PORT || 3000;

// Database connection env
const PGHOST = process.env.PGHOST || "localhost";
const PGDB = process.env.PGDATABASE || "postgres";
const PGUSER = process.env.PGUSER || "root";
const PGPASS = process.env.PGPASSWORD || "password";
const PGPORT = process.env.PGPORT || 5432;

export { APP_NAME, APP_PORT, PGHOST, PGDB, PGUSER, PGPASS, PGPORT };
