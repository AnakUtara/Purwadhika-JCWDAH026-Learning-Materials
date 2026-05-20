// Function declaration
// bisa diakses sebelum dideklarasikan karena adanya function hoisting

// Function hoisting
addNoReturn(5, 3);

function addNoReturn(a: number, b: number): void {
	const result = a + b;
	console.log(result);
}

function diff(a: number, b: number): number {
	return a - b;
}

const hasil: number = diff(10, 4);

console.log(hasil);

// Function expression
// punya TDZ (Temporal Dead Zone) karena tidak bisa diakses sebelum dideklarasikan

const multiply = (a: number, b: number): number => a * b;

// Function dengan default parameter
const divide = (a: number = 0, b: number = 0): number => {
	if (!a || !b) return 0;
	return a / b;
};

console.log(multiply(6, 7));
console.log(divide(20, 4));
console.log(divide());

// Parameter vs Argument
// Parameter adalah variabel yang dideklarasikan dalam definisi fungsi,
// sedangkan argument adalah nilai yang diberikan saat memanggil fungsi.

const fibonacci = (n: number): number => {
	let a: number = 0;
	let b: number = 1;
	let result: number = 0;

	for (let i = 0; i <= n; i++) {
		if (i === 0) {
			continue;
		} else if (i === 1) {
			continue;
		}
		result = a + b;
		a = b;
		b = result;
	}

	return result;
};

console.log(
	"Hasil berfibo: ",
	fibonacci(15),
	"hasil berfibo2: ",
	fibonacci(20),
);

// rest parameter
// rest parameter memungkinkan kita untuk menerima sejumlah argumen yang tidak terbatas sebagai array
// rest parameter harus diletakkan di akhir parameter fungsi

const sum = (...numbers: number[]): number => {
	console.log(numbers);

	let result: number = 0;
	for (let number of numbers) {
		result += number;
	}
	return result;
};

console.log(
	"Hasil sum: ",
	sum(50, 25, 70, 80, 100, 90, 76, 80, 1, 2, 3, 4, 5, 6),
);
