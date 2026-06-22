import { Pool } from "pg";
import { PGDB, PGHOST, PGPASS, PGPORT, PGUSER } from "../configs/env.config.js";

const pg = new Pool({
	host: PGHOST,
	user: PGUSER,
	password: PGPASS,
	port: PGPORT as number,
	database: PGDB,
});

export default pg;
