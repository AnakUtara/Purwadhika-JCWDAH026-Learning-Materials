import Backendless from "backendless";

// File konfigurasi tersentralisasi untuk Backendless

const BACKENDLESS_API_URL = import.meta.env.VITE_BACKENDLESS_API_URL;
const BACKENDLESS_APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID;
const BACKENDLESS_API_KEY = import.meta.env.VITE_BACKENDLESS_API_KEY;

// Praktik baik: Inisialisasi Backendless di satu tempat untuk menghindari duplikasi kode
// Panggil fungsi ini sekali di baris paling pertama (entry point) aplikasi (misalnya di main.tsx)
// sebelum menggunakan layanan Backendless SDK secara utuh

const initBackendless = () =>
	Backendless.initApp(BACKENDLESS_APP_ID, BACKENDLESS_API_KEY);

export {
	BACKENDLESS_API_URL,
	BACKENDLESS_APP_ID,
	BACKENDLESS_API_KEY,
	initBackendless,
};
