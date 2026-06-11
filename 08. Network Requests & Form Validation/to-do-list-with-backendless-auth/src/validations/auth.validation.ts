import Yup from "@/lib/yup";

// Jika ada bentuk validasi yang sama di beberapa form,
// kita bisa buat common schema untuk menyimpan validasi yang sama
// Jadi tidak perlu tulis ulang validasi yang sama di setiap schema baru,
// cukup spread saja common schema-nya di dalam schema baru yang ingin dibuat

const commonSchema = {
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
};

const signInSchema = Yup.object().shape(commonSchema);

const signUpSchema = Yup.object().shape({
	...commonSchema,
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Confirm Password is required"),
});

export { signInSchema, signUpSchema };
