const logger = (message: string): void => {
	console.log(`[${new Date().toISOString()}] ${message}`);
};

export const plainLogger = (message: string): void => {
	console.log(message);
};

export default logger;
