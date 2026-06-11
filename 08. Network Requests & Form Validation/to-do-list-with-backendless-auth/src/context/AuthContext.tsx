import Backendless from "backendless";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface IAuthContext {
	user: Backendless.User | null;
	signUp: (
		email: string,
		password: string,
		onSuccess?: () => void,
		onError?: () => void,
	) => void;
	signIn: (
		email: string,
		password: string,
		onSuccess?: () => void,
		onError?: () => void,
	) => void;
	signOut: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

type Props = {
	children: ReactNode;
};

// Seluruh logika autentikasi dan manajemen user ditempatkan di dalam AuthProvider
// jadinya nanti mudah untuk mengelola state user dan fungsi-fungsi autentikasi di satu tempat saja
// tidak perlu menyebar logika autentikasi di banyak komponen,
// cukup gunakan context untuk akses data dan fungsi autentikasi di mana saja dalam aplikasi
// Pola ini umum digunakan untuk manajemen global state
// seperti autentikasi, tema, bahasa, dll. yang perlu diakses di banyak komponen

const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<Backendless.User | null>(null);

	const nav = useNavigate();

	// Karena sekarang kita menggunakan backend, otomatis semua operasi auth
	// harus async dan menggunakan try-catch untuk error handling
	// karena data dari luar front end bisa saja tidak valid atau terjadi error jaringan, dll.
	// Maka dari itu biasanya data dari backend pasti return-nya berupa tipe data Promise
	// sehingga kita harus menggunakan async-await untuk menanganinya
	const signUp = async (
		email: string,
		password: string,
		onSuccess?: () => void,
		onError?: () => void,
	) => {
		try {
			// handling promise resolve atau data berhasil didapatkan dengan try block
			await Backendless.UserService.register({
				email,
				password,
			});
			onSuccess?.();
			toast.success("User registered successfully! Please login to continue.");
			nav("/sign-in");
		} catch (error) {
			// handling promise reject atau error dengan catch block
			onError?.();
			toast.error("Failed to register user!");
			console.error(error);
		}
	};

	const signIn = async (
		email: string,
		password: string,
		onSuccess?: () => void,
		onError?: () => void,
	) => {
		try {
			const authUser = await Backendless.UserService.login(
				email,
				password,
				true,
			);
			setUser(authUser);
			onSuccess?.();
			toast.success("Logged in successfully!");
			nav("/");
		} catch (error) {
			onError?.();
			toast.error("Failed to login! Please check your email and password.");
			console.error(error);
			setUser(null);
		}
	};

	const signOut = async () => {
		try {
			await Backendless.UserService.logout();
			setUser(null);
			toast.success("Logged out successfully!");
			nav("/sign-in");
		} catch (error) {
			toast.error("Failed to logout!");
			console.error(error);
		}
	};

	const refreshUser = async () => {
		try {
			const currentUser = await Backendless.UserService.getCurrentUser();
			setUser(currentUser);
		} catch (error) {
			console.error("Failed to refresh user:", error);
		}
	};

	const checkAuth = async () => {
		try {
			const isValid = await Backendless.UserService.isValidLogin();
			if (isValid) {
				refreshUser();
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error("Failed to check auth:", error);
			toast.error("Failed to check authentication status!");
			setUser(null);
		}
	};

	// useEffect tidak bisa menerima fungsi async secara langsung di callback-nya
	// karena useEffect mengharapkan fungsi sinkron yang mengembalikan void atau fungsi cleanup
	// maka dari itu kita buat fungsi async terpisah (checkAuth) yang akan dipanggil di dalam useEffect
	// untuk mengecek apakah user sudah login atau belum berdasarkan session yang tersimpan di backend
	// setiap kali aplikasi di-refresh atau user berpindah halaman, kita akan cek status login-nya
	// Fungsi2 async juga bisa didefinisikan di dalam useEffect,
	// tergantung kebutuhan dan preferensi penulisan kode masing-masing.
	// Namun, untuk menjaga kebersihan dan keterbacaan kode,
	// biasanya kita buat fungsi async terpisah di luar useEffect seperti contoh di atas.

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		checkAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				signUp,
				signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth };
