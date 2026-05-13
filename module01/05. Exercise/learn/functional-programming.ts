// Callback Function

//forEach mempunyai callback yang 3 parameter berisikan: value, index, array

const arrayMap = (
	callback: (value: any, index: number, array: any[]) => any,
	...arr: any[]
): any[] => {
	const copy = [...arr];
	let result: any[] = [];

	for (let value of copy) {
		result.push(callback(value, copy.indexOf(value), copy));
	}

	return result;
};

// Example usage:
const numbers: number[] = [1, 2, 3, 4, 5];
const mapToTen = (value: number) => value * 10;
const mapToString = (value: number) => `Number: ${value}`;

console.log("Map buatan sendiri: ", arrayMap(mapToTen, ...numbers));
console.log("Map buatan sendiri: ", arrayMap(mapToString, ...numbers));
console.log(
	"Map buatan sendiri: ",
	arrayMap((value) => value ** 2, ...numbers),
);

// Kesamaan dengan built-in map

console.log("Map bawaan: ", numbers.map(mapToTen));

// Filter

const filteredOdd = numbers.filter((n) => n % 2 !== 0);
console.log("Filter: ", filteredOdd);
console.log("Filter tidak merubah array asli: ", numbers);

// Reduce
// memiliki 2 parameter, yaitu callback dan initial value
// callback memiliki 4 parameter, yaitu accumulator/previousValue, currentValue, currentIndex, sourceArray

const sum = numbers.reduce((prev: number, curr: number) => {
	return (prev += curr);
}, 0);

console.log("Reduce: ", sum);

// Sort

const alphabet: string[] = ["d", "a", "c", "b"];
const randomNumbers: number[] = [
	3, 1, 4, 2, 10, 11, 5, 6, 9, 8, 7, 15, 12, 14, 13,
];

console.log("Sort alphabet: ", alphabet.sort());
console.log(
	"Sort numbers descending: ",
	randomNumbers.toSorted((a, b) => b - a),
); // Descending
console.log(
	"Sort numbers ascending: ",
	randomNumbers.toSorted((a, b) => a - b),
); // Ascending

// Push, Unshift menggunakan Spread Operator

const registeredUsers: string[] = ["John", "Jane", "Doe"];

// Push menggunakan spread operator
const updatedUsersPush = [...registeredUsers, "Alice"];

// Unshift menggunakan spread operator
const updatedUsersUnshift = ["Bob", ...registeredUsers];

console.log("Updated Users (Push): ", updatedUsersPush);
console.log("Updated Users (Unshift): ", updatedUsersUnshift);
console.log("Registered Users Asli: ", registeredUsers);

// Destructuring Array

// const nama1 = registeredUsers[0];
// const nama2 = registeredUsers[1];
// const nama3 = registeredUsers[2];

const [nama1, nama2, nama3, nama4] = registeredUsers;

console.log(
	`User yang ter-registrasi: ${nama1}, ${nama2}, ${nama3}, ${nama4 || "Nama ke-4 tidak ditemukan"}`,
);

// Unshift menggunakan destructuring array

const [firstUser, ...users] = registeredUsers;

console.log("User sisa: ", users, "| User pertama: ", firstUser);

// Pop menggunakan destructuring array

const [...usersCopy] = registeredUsers;
const lastUser = usersCopy.pop();

console.log(
	"User sisa setelah pop: ",
	usersCopy,
	"| User terakhir: ",
	lastUser,
);
console.log("Registered Users Asli: ", registeredUsers);

// Closure
// Sebuah function yang memiliki akses ke variabel di luar scope-nya,
// bahkan setelah function tersebut dieksekusi
// dan return sebuah function yang dapat mengakses variabel tersebut

const greeting = (name: string) => {
	const greet: string = `Hello`;
	return () => {
		return `${greet}, ${name}!`;
	};
};

console.log(greeting("Gallant")());

const getBMIClosure = (w: number, h: number) => {
	const bmi: number = w / h ** 2;
	return () => {
		if (bmi < 18.5) {
			return "Underweight";
		} else if (bmi >= 18.5 && bmi < 24.9) {
			return "Ideal weight";
		} else if (bmi >= 25 && bmi < 29.9) {
			return "Overweight";
		} else if (bmi >= 30 && bmi < 34.9) {
			return "Very Overweight";
		} else {
			return "Obesity";
		}
	};
};

const bmiResult = getBMIClosure(70, 1.75);
console.log("BMI Result: ", bmiResult());

// Currying
// Teknik functional programming di mana sebuah function return function lain dengan parameter lain

const arrayFilter = (...arr: any[]): CallableFunction => {
	return (
		callback: (value: any, index: number, array: any[]) => boolean,
	): any[] => {
		let result: any[] = [];
		for (let value of arr) {
			if (callback(value, arr.indexOf(value), arr)) {
				result.push(value);
			}
		}
		return result;
	};
};

const filterEven = arrayFilter(...numbers);
console.log(
	"Curry'd filter: ",
	filterEven((n: number) => n % 2 === 0),
);

// Nested Function
// Function yang di dalamnya ada deklarasi function lain

const getMessage = (firstName: string): string => {
	const sayHello = (): string => {
		return `Hello ${firstName}`;
	};

	const welcomeMessage = (): string => {
		return "Welcome to the world of functional programming!";
	};

	return `${sayHello()}! ${welcomeMessage()}`;
};

console.log(getMessage("Yulius"));

// Recursion
// Teknik pemrograman di mana sebuah function memanggil dirinya sendiri untuk menyelesaikan suatu masalah
// Butuh base case untuk menghentikan rekursi agar tidak terjadi infinite loop

const factorial = (n: number): number => {
	if (n === 0) {
		return 1;
	}
	return n * factorial(n - 1);
};

console.log("Hasil factorial recursion: ", factorial(5));

// Behind the scene dari recursion
// Di pemanggilan pertama, n = 5, maka akan memanggil factorial(4)
// Di pemanggilan kedua, n = 4, maka akan memanggil factorial(3)
// Di pemanggilan ketiga, n = 3, maka akan memanggil factorial(2)
// Di pemanggilan keempat, n = 2, maka akan memanggil factorial(1)
// Di pemanggilan kelima, n = 1, maka akan memanggil factorial(0)
// Di pemanggilan keenam, n = 0, maka akan return 1
// Kemudian hasilnya akan dikalikan dengan n pada setiap pemanggilan sebelumnya
// Sehingga hasil akhirnya adalah 5 * 4 * 3 * 2 * 1 * 1 = 120
