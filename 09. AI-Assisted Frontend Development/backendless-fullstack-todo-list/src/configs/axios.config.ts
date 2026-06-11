import axios from "axios";
import { BACKENDLESS_API_URL } from "./backendless.config";

// Dengan membuat instance axios khusus untuk backendlessApi,
// kita bisa mengatur baseURL dan konfigurasi lainnya di satu tempat saja
// kegunaan dari pattern ini nanti kemungkinan akan lebih jelas saat masuk module backend.

const backendlessApi = axios.create({
	baseURL: `${BACKENDLESS_API_URL}/data`,
});

export default backendlessApi;
