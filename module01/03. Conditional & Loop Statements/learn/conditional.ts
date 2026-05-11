const age: number = 16;

if (age >= 17) {
	console.log("Kamu sudah gede, boleh punya KTP");
} else {
	console.log("Kamu masih kecil, belum boleh punya KTP");
}

age >= 17
	? console.log("Udah boleh punya KTP")
	: console.log("Belum boleh punya KTP");

const grade: string = "A";

// if (grade === "A") {
// 	console.log("Excellent Score!");
// } else if (grade === "B") {
// 	console.log("Good Score!");
// } else if (grade === "C") {
// 	console.log("Fair Score!");
// } else if (grade === "D") {
// 	console.log("Poor Score!");
// } else {
// 	console.log("Invalid Score!");
// }

grade === "A"
	? console.log("Excellent Score!")
	: grade === "B"
		? console.log("Good Score!")
		: grade === "C"
			? console.log("Fair Score!")
			: grade === "D"
				? console.log("Poor Score!")
				: console.log("Invalid Score!");

let username: string = "";
let password: string = "";

let registeredUsername: string = "admin";
let registeredPassword: string = "admin123";

if (!username || !password) {
	console.log("Invalid credentials!");
}

if (username) {
	console.log("Username di-isi oleh user.");
} else {
	console.log("Username tidak di-isi oleh user.");
}

if (username === registeredUsername) {
	console.log("Username ditemukan!");
} else {
	console.log("Username tidak ditemukan!");
}

// SWITCH CASE

// switch (grade) {
// 	case "A":
// 		console.log("Excellent Score!");
// 		break;
// 	case "B":
// 		console.log("Good Score!");
// 		break;
// 	case "C":
// 		console.log("Fair Score!");
// 		break;
// 	case "D":
// 		console.log("Poor Score!");
// 		break;
// 	default:
// 		console.log("Invalid Score!");
// }

// Truthy and Falsy Values

const value1: any = 0;
const value2: any = " ";

console.log(Boolean(value1));
console.log(Boolean(value2));

// Short Circuit Evaluation

console.log(true && "Hello");
console.log(false && "Hello");

console.log(true || "Hi");
console.log(false || "Hi");

// Variable Boolean

let numberToCheck: number = 12;
let isEven: boolean = numberToCheck % 2 === 0;
let message: string = isEven ? "Bilangan genap" : "Bilangan ganjil";
console.log("Apakah genap? ", isEven);
console.log(`${numberToCheck} adalah ${message}`);
