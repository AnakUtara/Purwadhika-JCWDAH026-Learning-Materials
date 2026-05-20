function createTriangle(height: number) {
	let lastValue: number = 1;
	let result: string = "";
	// for loop luar untuk mengatur jumlah baris sesuai dengan height
	for (let i = 1; i <= height; i++) {
		// jika i adalah 1, maka hanya cetak 1 angka saja, yaitu 01
		if (i === 1) {
			result += `0${i}\n`;
			lastValue++;
		} else {
			// for loop dalam untuk mencetak angka di setiap baris,
			// loop ini menggunakan i sebagai batas jumlah angka. Supaya setiap pengulangan
			// jumlah angka yang dicetak per barisnya bertambah sesuai dengan naiknya nilai dari i
			for (let j = 1; j <= i; j++) {
				// ini bisa juga ditulis dengan `0${lastValue}`
				// mau kasih lihat cara lain untuk menambahkan string "0" di depan angka,
				// yaitu dengan menggunakan method bernama padStart
				// Karena padStart itu untuk string, maka lastValue harus diubah dulu menjadi string dengan toString()
				result += `${lastValue.toString().padStart(2, "0")} `;
				// setiap angka yang dicetak akan bertambah 1,
				// jadi lastValue harus ditambah 1 setiap kali mencetak angka
				lastValue++;
			}
			// setelah mencetak semua angka di satu baris, buat baris baru dengan menambahkan \n
			result += `\n`;
		}
	}
	return result;
}

console.log(createTriangle(5));

// FizzBuzz
// FizzBuzz adalah sebuah permainan yang sering digunakan untuk menguji kemampuan pemrograman seseorang.
// Aturan mainnya adalah sebagai berikut:
// - Jika angka tersebut habis dibagi 3, cetak "Fizz"
// - Jika angka tersebut habis dibagi 5, cetak "Buzz"
// - Jika angka tersebut habis dibagi 3 dan 5, cetak "FizzBuzz"
// - Jika angka tersebut tidak habis dibagi 3 maupun 5, cetak angkanya sendiri

const fizzBuzz = (n: number): void => {
	for (let i = 1; i <= n; i++) {
		if (i % 3 === 0 && i % 5 === 0) {
			console.log("FizzBuzz");
		} else if (i % 3 === 0) {
			console.log("Fizz");
		} else if (i % 5 === 0) {
			console.log("Buzz");
		} else {
			console.log(i);
		}
	}
};

fizzBuzz(6);
fizzBuzz(15);

// Get BMI (Body Mass Index)
// BMI adalah sebuah angka yang dihitung berdasarkan berat badan dan tinggi badan seseorang,
// yang digunakan untuk menentukan apakah seseorang memiliki berat badan yang sehat atau tidak.
// Rumus BMI adalah: BMI = berat badan (kg) / (tinggi badan (m) * tinggi badan (m))

const getBMI = (weight: number, height: number): string => {
	const bmi: number = weight / height ** 2;
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

console.log(getBMI(70, 1.75));
console.log(getBMI(50, 1.6));
console.log(getBMI(90, 1.8));
console.log(getBMI(110, 1.7));

// Filter Even Numbers

const getEvenNumbers = (arr: number[]): number[] => {
	let result: number[] = [];
	for (let number of arr) {
		if (number % 2 === 0) {
			result.push(number);
		}
	}
	return result;
};

console.log(getEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(getEvenNumbers([11, 13, 15, 17]));
console.log(getEvenNumbers([2, 4, 6, 8, 10]));

const stringSplitter = (str: string, delimiter: string = " "): string[] => {
	return str.split(delimiter);
};

console.log(stringSplitter("Hello World! This is TypeScript."));
console.log(stringSplitter("Hello World! This is TypeScript.", ""));
console.log(stringSplitter("apple,banana,cherry", ","));
console.log(stringSplitter("one-two-three-four", "-"));
