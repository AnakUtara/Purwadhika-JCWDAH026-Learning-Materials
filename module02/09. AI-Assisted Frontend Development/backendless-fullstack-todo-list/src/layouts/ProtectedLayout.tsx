import { useAuth } from "@/context/AuthContext";
import LoadingPage from "@/pages/LoadingPage";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
	const { user, isAuthenticating } = useAuth();

	// Jika sedang memeriksa status autentikasi (misalnya saat aplikasi baru di-load atau saat refresh halaman),
	// kita bisa menampilkan halaman loading untuk memberikan feedback
	// kepada user bahwa aplikasi sedang memproses sesuatu.
	if (isAuthenticating) {
		return <LoadingPage />;
	}

	if (!user) {
		return <Navigate to="/sign-in" replace />;
	}

	return <Outlet />;
};
export default ProtectedLayout;
