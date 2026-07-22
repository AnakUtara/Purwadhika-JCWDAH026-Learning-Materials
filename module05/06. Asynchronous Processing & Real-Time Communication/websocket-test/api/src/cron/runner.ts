import { scheduledTasksNotification } from "./jobs/notification.js";

const cronRunner = () => {
	scheduledTasksNotification();
};

export default cronRunner;
