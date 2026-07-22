import { scheduler } from "../scheduler.js";

export const scheduledTasksNotification = async () => {
	// "*/15 * * * *" artinya setiap 15 menit. * pertama itu menit. Bisa ke cron.guru untuk cek format cron.
	scheduler("*/15 * * * *", async () => {
		console.log("Trying to send task notification per 15 minutes");
		// Bisa panggil service layer yang tidak butuh parameter apa-apa,
		// misal untuk cek task yang sudah lewat deadline, dll.
		/*
			eventService.sendPromotionalEmail();
			eventService.updateManyEventsStatus();
		 */
	});
};

/*
export const voucherExpirationScheduler = async () => {
	scheduler("0 0 * * *", async ()  => {
		voucherService.updateManyExpiredVouchers();
	})
}
*/
