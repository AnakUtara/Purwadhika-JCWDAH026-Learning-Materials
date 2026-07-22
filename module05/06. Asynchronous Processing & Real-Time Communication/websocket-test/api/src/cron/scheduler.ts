import cron from "node-cron";

export const scheduler = (interval: string, task: () => void) => {
	cron.schedule(interval, task);
};
