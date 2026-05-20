import logger, { plainLogger } from "./logger.ts";
// const {add, subtract} = require("./math.ts"); // commonjs import
import { add, subtract } from "./math.ts"; // es module import

const main = () => {
	console.log("add: ", add(2, 3));
	console.log("subtract: ", subtract(5, 2));
	console.log(logger("This is a log message with timestamp."));
	console.log(plainLogger("This is a plain log message."));
};

main();
