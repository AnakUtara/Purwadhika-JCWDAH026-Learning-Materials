/*
Create a function to convert Excel sheet column title to its corresponding column number.
*/

const titleToNumber = (columnTitle: string): number => {
	// charCodeAt digunakan untuk mendapatkan kode karakter dari sebuah karakter tertentu
	// misalnya charCodeAt dari 'A' adalah 65, charCodeAt dari 'B' adalah 66, dan seterusnya
	// dengan mengurangi charCodeAt dari input dengan charCodeAt dari 'A', kita bisa mendapatkan nilai numerik yang sesuai dengan posisi huruf dalam alfabet
	// misalnya jika input adalah 'A', maka charValue akan menjadi 0, jika input adalah 'B', maka charValue akan menjadi 1, dan seterusnya
	const A_CHAR_CODE = "A".charCodeAt(0); // Mendapatkan kode karakter untuk 'A'
	let result = 0;

	for (let i = 0; i < columnTitle.length; i++) {
		// Jika charCodeAt dari input sama dengan charCodeAt dari 'A',
		// maka charValue akan bernilai 1,
		// jika charCodeAt dari input sama dengan charCodeAt dari 'B',
		// maka charValue akan bernilai 2, dan seterusnya
		const charValue = columnTitle.charCodeAt(i) - A_CHAR_CODE + 1;
		// Menghitung nilai numerik dari karakter saat ini
		result = result * 26 + charValue;
		// Mengalikan hasil sebelumnya dengan 26 (jumlah huruf dalam alfabet) dan menambahkan nilai karakter saat ini
	}

	return result;
};

console.log("Excel Column A: ", titleToNumber("A")); // Output: 1
console.log("Excel Column Z: ", titleToNumber("Z")); // Output: 26
console.log("Excel Column AA: ", titleToNumber("AA")); // Output: 27
console.log("Excel Column AB: ", titleToNumber("AB")); // Output: 28

/*
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
*/

const singleNumber = (nums: number[]): number => {
	let result = 0;
	for (const num of nums) {
		let duplicate = 0;
		for (const otherNum of nums) {
			if (num === otherNum) {
				duplicate++;
			}
		}
		if (duplicate === 1) {
			result = num; // Jika hanya ada satu duplikat, berarti ini adalah angka yang muncul sekali
			break; // Keluar dari loop setelah menemukan angka yang muncul sekali
		}
	}
	return result; // Setelah iterasi selesai, result akan berisi angka yang hanya muncul sekali
};

console.log("Single Number [2, 2, 1]: ", singleNumber([2, 2, 1])); // Output: 1
console.log("Single Number [4, 1, 2, 1, 2]: ", singleNumber([4, 1, 2, 1, 2])); // Output: 4

/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
*/

const isAnagram = (s: string, t: string): boolean => {
	if (s.length !== t.length) {
		return false; // Jika panjang kedua string berbeda, mereka tidak bisa menjadi anagram
	}

	const charCount: { [key: string]: number } = {};

	for (const char of s) {
		charCount[char] = (charCount[char] || 0) + 1; // Menghitung frekuensi karakter dalam string s
	}

	for (const char of t) {
		if (!charCount[char]) {
			return false; // Jika karakter dari t tidak ditemukan di charCount, maka t bukan anagram dari s
		}
		charCount[char]--; // Mengurangi hitungan karakter untuk setiap karakter yang ditemukan di t
	}

	return true; // Jika semua karakter cocok, maka t adalah anagram dari s
};

console.log(
	'Is Anagram ("anagram", "nagaram"): ',
	isAnagram("anagram", "nagaram"),
); // Output: true
console.log('Is Anagram ("rat", "car"): ', isAnagram("rat", "car")); // Output: false

/*
You are climbing a staircase. It takes n steps to reach the top. 
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
*/

const climbStairs = (n: number): number => {
	if (n <= 0) return 0; // Tidak ada cara untuk mendaki tangga jika n kurang dari atau sama dengan 0
	if (n === 1) return 1; // Hanya ada satu cara untuk mendaki satu anak tangga
	if (n === 2) return 2; // Ada dua cara untuk mendaki dua anak tangga: (1+1) atau (2)

	const ways: number[] = new Array(n + 1).fill(0);
	ways[1] = 1; // Cara untuk mendaki satu anak tangga
	ways[2] = 2; // Cara untuk mendaki dua anak tangga

	for (let i = 3; i <= n; i++) {
		ways[i] = ways[i - 1] + ways[i - 2]; // Jumlah cara untuk mendaki i anak tangga adalah jumlah cara untuk mendaki (i-1) dan (i-2) anak tangga
	}

	return ways[n]; // Mengembalikan jumlah cara untuk mendaki n anak tangga
};

console.log("Climb Stairs (3): ", climbStairs(3)); // Output: 3
console.log("Climb Stairs (4): ", climbStairs(4)); // Output: 5
console.log("Climb Stairs (5): ", climbStairs(5)); // Output: 8

/*
Given an array nums of size n, return the majority element. 
The majority element is the element that appears more than ⌊n / 2⌋ times. 
You may assume that the majority element always exists in the array.
*/

const findMajorityElement = (nums: number[]): number => {
	const countMap: { [key: number]: number } = {};
	const majorityCount = Math.floor(nums.length / 2);
	// nums.length / 2 dibulatkan ke bawah untuk menentukan jumlah mayoritas
	// dari mana jumlah mayoritas dihitung? Dari panjang array dibagi 2
	// mengapa dari panjang array dibagi 2? Karena mayoritas didefinisikan sebagai elemen yang muncul lebih dari n/2 kali
	for (const num of nums) {
		countMap[num] = (countMap[num] || 0) + 1;
		if (countMap[num] > majorityCount) {
			return num;
			// Kembalikan elemen mayoritas segera setelah ditemukan
		}
	}
	return -1; // Kalau majority element sudah ditemukan, ini tidak akan pernah terjadi
};

console.log(
	"Majority Element [2, 2, 1, 1, 2, 2]: ",
	findMajorityElement([2, 2, 1, 1, 2, 2]),
);

/*
Create a function to convert roman numeral to integer.
*/

const romanToInt = (s: string): number => {
	const romanMap: { [key: string]: number } = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000,
	};

	let total = 0;
	let prevValue = 0;

	// iterasi dimulai dari akhir string supaya lebih mudah untuk menghitung nilai dari angka terkecil ke terbesar
	for (let i in s.split("").reverse()) {
		const currentValue = romanMap[s[i]];
		// guard untuk memastikan bila sebelum V atau X ada I, maka dikurangi
		if (currentValue < prevValue) {
			total -= currentValue;
		} else {
			total += currentValue;
		}
		prevValue = currentValue;
	}

	return total;
};

console.log(romanToInt("MCMXCIV"));

/*
Given an integer numRows, return the first numRows of Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly above it 
*/

const generatePascalTriangle = (numRows: number): number[][] => {
	const result: number[][] = [];
	for (let row = 0; row < numRows; row++) {
		result[row] = [];
		// ketika ada nested loop, nested loop tersebut akan dijalankan sampai selesai sebelum melanjutkan ke iterasi berikutnya dari loop luar
		for (let col = 0; col <= row; col++) {
			if (col === 0 || col === row) {
				result[row][col] = 1; // Setiap baris dimulai dan diakhiri dengan 1
			} else {
				result[row][col] = result[row - 1][col - 1] + result[row - 1][col];
				// Setiap elemen adalah jumlah dari dua elemen di atasnya
			}
		}
	}
	return result;
};

console.log(generatePascalTriangle(5));

/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0. 
*/

const maxProfit = (prices: number[]): number => {
	let minPrice = Infinity;
	let maxProfit = 0;
	for (const price of prices) {
		// di awal iterasi minPrice di-set ke Infinity supaya harga pertama di array pasti lebih kecil
		// jika harga pertama adalah harga tertinggi dia tetap tidak akan jadi pilihan beli
		// karena tujuan kita adalah mencari profit maksimal dengan membeli di harga terendah
		// jadi kita perlu memastikan minPrice selalu berisi harga terendah sejauh ini
		// di iterasi berikutnya minPrice akan di-update bila ada harga yang lebih rendah
		// sehingga pada akhirnya minPrice akan berisi harga terendah dari seluruh array
		if (price < minPrice) {
			minPrice = price; // Update harga minimum jika harga saat ini lebih rendah
		} else if (price - minPrice > maxProfit) {
			maxProfit = price - minPrice; // Hitung profit dan update jika lebih besar dari maxProfit saat ini
		}
	}
	return maxProfit;
};

console.log("Max Profit [7, 1, 5, 3, 6, 4]: ", maxProfit([7, 1, 5, 3, 6, 4]));
console.log("Max Profit [7, 6, 4, 3, 1]: ", maxProfit([7, 6, 4, 3, 1]));
