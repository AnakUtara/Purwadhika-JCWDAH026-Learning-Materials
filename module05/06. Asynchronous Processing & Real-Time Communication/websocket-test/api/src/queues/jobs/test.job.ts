// Job ini adalah function yang akan dipanggil di worker untuk memproses job yang ada.
// Misal mau panggil layer service-nya langsung di worker juga ga masalah.
// Ini pola rapih-nya aja. Parameter data itu nanti akan tangkap data dari job.data yang ada di worker.
// Jadi ya antara panggil service layer-nya di sini atau di worker langsung, sama saja.

const testJob = async (data: { email: string }) => {
	console.log(`Processing job for ${data.email}`);

	await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate email sending delay

	console.log(`Email sent to ${data.email}`);
};

export default testJob;
