import { app } from "./src/app.js";
import { APP_PORT } from "./src/configs/env.config.js";

app.listen(APP_PORT, () => {
	console.log(`Server is running on port ${APP_PORT}`);
});
