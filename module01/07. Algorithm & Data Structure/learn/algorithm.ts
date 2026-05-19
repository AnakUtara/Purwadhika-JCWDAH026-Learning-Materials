// Binary Search: O(log n)
// Karena binary search bekerja dengan membagi dua bagian dari array
// yang sudah terurut, maka kompleksitasnya adalah O(log n).
// Early return-nya membantu mengurangi jumlah iterasi yang diperlukan
// untuk menemukan elemen yang dicari,
// sehingga meningkatkan efisiensi algoritma ini dibandingkan
// dengan linear search yang memiliki kompleksitas O(n).
const binarySearch = (
	arr: number[],
	searchTarget: number,
	l: number = 0,
	r: number = arr.length - 1,
): number => {
	if (r >= l) {
		// mencari index tengah di array input
		let mid = l + Math.floor((r - l) / 2);
		console.log("middle index: ", mid);

		if (arr[mid] === searchTarget) {
			console.log("langsung ditemukan");
			return mid;
		}

		if (searchTarget < arr[mid]) {
			console.log("cari ke kiri");
			return binarySearch(arr, searchTarget, l, mid - 1);
		}

		console.log("cari ke kanan");
		return binarySearch(arr, searchTarget, mid + 1, r);
	}
	return -1; // return -1 jika elemen tidak ditemukan
};

const arr = [2, 3, 4, 10, 40];
console.log("Hasil binary search: ", binarySearch(arr, 10));

// Bubble Sort: O(n^2)
// Bubble sort memiliki kompleksitas O(n^2) karena algoritma ini
// memerlukan dua loop bersarang untuk membandingkan setiap elemen
// dengan elemen berikutnya dalam array. Loop pertama berjalan sebanyak n-1 kali,
// dan loop kedua juga berjalan sebanyak n-1 kali dalam setiap iterasi loop pertama,
// sehingga menghasilkan O(n * n) atau O(n^2).
// const bubbleSort = (arr: number[]): number[] => {
// 	for (let i = 0; i < arr.length - 1; i++) {
// 		console.log("iterasi ke-" + i);
// 		for (let j = 0; j < arr.length - i - 1; j++) {
// 			console.log(
// 				"cek iterasi ke-" +
// 					j +
// 					", apakah nilainya lebih besar dari nilai setelahnya",
// 			);
// 			if (arr[j] > arr[j + 1]) {
// 				console.log(`lakukan perpindahan nilai dari ${arr[j]} & ${arr[j + 1]}`);

// 				// swap arr[j] dan arr[j + 1]
// 				const temp = arr[j];
// 				arr[j] = arr[j + 1];
// 				arr[j + 1] = temp;
// 			}
// 		}
// 	}
// 	return arr;
// };

// console.log(bubbleSort([5, 3, 8, 4, 6]));

// Selection Sort: O(n^2)
// Selection sort memiliki kompleksitas O(n^2) karena algoritma ini
// memerlukan dua loop bersarang untuk menemukan elemen terkecil
// dalam array dan menukarnya dengan elemen pertama yang belum terurut.
// Loop pertama berjalan sebanyak n-1 kali, dan loop kedua juga berjalan
// sebanyak n-1 kali dalam setiap iterasi loop pertama, sehingga menghasilkan O(n * n) atau O(n^2).
// const selectionSort = (arr: number[]): number[] => {
// 	for (let i = 0; i < arr.length - 1; i++) {
// 		console.log("iterasi ke-" + i);
// 		let minIndex = i; // indeks elemen terkecil
// 		for (let j = i + 1; j < arr.length; j++) {
// 			console.log(
// 				"cek iterasi ke-" +
// 					j +
// 					", apakah nilainya lebih kecil dari nilai pada indeks " +
// 					minIndex,
// 			);
// 			if (arr[j] < arr[minIndex]) {
// 				console.log(`update indeks elemen terkecil dari ${minIndex} ke ${j}`);
// 				minIndex = j; // update indeks elemen terkecil
// 			}
// 		}
// 		if (minIndex !== i) {
// 			console.log(
// 				`lakukan perpindahan nilai dari ${arr[i]} & ${arr[minIndex]}`,
// 			);

// 			// swap arr[i] dan arr[minIndex]
// 			const temp = arr[i];
// 			arr[i] = arr[minIndex];
// 			arr[minIndex] = temp;
// 		}
// 	}
// 	return arr;
// };

// console.log(selectionSort([64, 25, 12, 22, 11]));

// Insertion Sort: O(n^2)
// Insertion sort memiliki kompleksitas O(n^2) karena algoritma ini
// memerlukan dua loop bersarang untuk menyisipkan elemen ke posisi yang benar
// dalam array yang sudah terurut. Loop pertama berjalan sebanyak n-1 kali,
// dan loop kedua juga berjalan sebanyak n-1 kali dalam setiap iterasi loop pertama,
// sehingga menghasilkan O(n * n) atau O(n^2).
// const insertionSort = (arr: number[]): number[] => {
// 	for (let i = 1; i < arr.length; i++) {
// 		console.log("iterasi ke-" + i);
// 		const key = arr[i]; // elemen yang akan disisipkan
// 		let j = i - 1; // indeks elemen sebelum key dalam array yang sudah terurut
// 		console.log(
// 			"cek iterasi ke-" + j + ", apakah nilainya lebih besar dari key " + key,
// 		);
// 		while (j >= 0 && arr[j] > key) {
// 			console.log(`geser nilai ${arr[j]} ke indeks ${j + 1}`);
// 			arr[j + 1] = arr[j]; // geser elemen yang lebih besar ke kanan
// 			j--; // pindah ke elemen sebelumnya
// 		}
// 		console.log(`sisipkan key ${key} ke indeks ${j + 1}`);
// 		arr[j + 1] = key; // sisipkan key ke posisi yang benar
// 	}
// 	return arr;
// };

// console.log(insertionSort([12, 11, 13, 5, 6]));
