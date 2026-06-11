import type { IUser } from "@/models/user.model";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Step mendefinisikan context:
// 1. Buat interface untuk mendefinisikan tipe data yang akan disimpan di context
// 2. Buat context dengan createContext dan berikan tipe data interface yang sudah dibuat
// 3. Buat provider component yang akan membungkus komponen lain dan menyediakan nilai context
// 4. State yang digunakan sebagai global state adalah useState yang didefinisikan di dalam provider component
// 5. Buat fungsi untuk mengubah state global (misalnya signUp, signIn, signOut) di dalam provider component
// 7. Karena Provider adalah component, maka kita bisa menggunakan useEffect untuk melakukan side effect seperti mengecek status autentikasi saat komponen pertama kali di-render
// 8. Buat custom hook (useAuth) untuk memudahkan akses ke context di komponen lain

interface IAuthContext {
	user: IUser | null;
	signUp: (email: string, password: string) => void;
	signIn: (email: string, password: string) => void;
	signOut: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

type Props = {
	children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<IUser | null>(null);

	const nav = useNavigate();

	const signUp = (email: string, password: string) => {
		const newUser: IUser = { email, password };
		const existingUser = localStorage.getItem("user");
		const parsedExistingUser: IUser | null = existingUser
			? JSON.parse(existingUser)
			: null;
		if (parsedExistingUser && parsedExistingUser.email === email) {
			toast.error("An account with this email already exists!");
			return;
		}
		localStorage.setItem(
			"user",
			JSON.stringify({ ...newUser, authenticated: false }),
		);
		setUser({ ...newUser, authenticated: false });
		toast.success("Account created successfully!");
		nav("/sign-in");
	};

	const signIn = (email: string, password: string) => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			const parsedUser: IUser = JSON.parse(storedUser);
			if (parsedUser.email === email && parsedUser.password === password) {
				localStorage.setItem(
					"user",
					JSON.stringify({ ...parsedUser, authenticated: true }),
				);
				setUser({ ...parsedUser, authenticated: true });
				toast.success("Logged in successfully!");
				nav("/");
				return;
			}
		}
		toast.error("Invalid email or password!");
	};

	const signOut = () => {
		localStorage.setItem(
			"user",
			JSON.stringify({ ...user, authenticated: false }),
		);
		setUser(null);
		toast.success("Logged out successfully!");
		nav("/sign-in");
	};

	// Panggil useEffect sekali setiap refresh page atau pergantian browser url input
	// untuk mengecek apakah user sudah login atau belum berdasarkan informasi authenticated
	// yang disimpan di localStorage
	// Pattern AuthContext ini persis juga dilakukan pada implementasi nyata sistem autentikasi,
	// dengan moda pengecekan berbeda dan metode penyimpanan berbeda.
	// Namun alur/pola utamanya sama saja.
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		const parsedUser: IUser | null = storedUser ? JSON.parse(storedUser) : null;
		if (!parsedUser || !parsedUser.authenticated) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setUser(null);
			return;
		}
		setUser(parsedUser?.authenticated ? parsedUser : null);
	}, []);

	return (
		// Setiap state dan fungsi yang ingin diakses secara global harus disimpan di dalam value dari Providers
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
	// Jangan lupa untuk memakai useContext untuk mengakses context hasil createContext sebelum di return
	// Custom hook ini akan menjadi sumber kebenaran untuk akses context di seluruh komponen yang ada di dalam aplikasi
	// Dengan custom hook ini kita tidak perlu lagi memanggil useContext & export context hasil createContext
	// dan import context-nya di setiap komponen yang membutuhkan akses ke context
	// Cukup panggil saja nama custom hook ini (useAuth) di komponen manapun yang membutuhkan akses ke context,
	// maka kita sudah bisa mendapatkan nilai context yang diinginkan
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth };
