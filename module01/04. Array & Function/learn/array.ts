// Immutable akan selalu membuat address baru di memory setiap kali kita melakukan assignment
const aa: string = "lala";
const bb: string = aa;
const cc: string = bb + aa + "lili";

console.log(aa);

console.log(cc);

// Mutable akan membuat address yang sama di memory setiap kali kita melakukan assignment
// data-nya di simpan di heap memory, sedangkan variabelnya di stack memory
const arr: any[] = [1, "dua", true, null, undefined];
const arr2: any[] = arr;
const arr3: any[] = arr2;
// shallow copy & deep copy
// Semi deep copy itu dibuat dengan spread operator: ...
// shallow copy itu hanya membuat address baru di memory untuk variabelnya,
// tapi data-nya tetap di heap memory yang sama

// Spread operator akan membuat address baru di memory untuk variabelnya,
// tapi data-nya tetap di heap memory yang sama

// Deep copy itu membuat address baru di memory untuk variabelnya,
// dan data-nya juga dibuat baru di heap memory

// Semi deep copy
const arr4: any[] = [...arr];

// Deep copy
const arr5: any[] = structuredClone(arr);

arr2.push(aa);
arr3.push(cc);
arr4.push("lulu");

console.log(arr4);
console.log(arr);

// Array dengan typescript
// string array
const strArr: string[] = ["satu", "dua", "tiga"];
// number array
const numArr: number[] = [1, 2, 3, 4, 5];

numArr[0] *= 10;

// pop untuk menghapus elemen terakhir dari array
numArr.pop();

// push untuk menambahkan elemen di akhir array
numArr.push(57);

// shift untuk menghapus elemen pertama dari array
numArr.shift();

// unshift untuk menambahkan elemen di awal array
numArr.unshift(145);

// splice untuk menghapus elemen di tengah array & menambahkan elemen di tengah array
// splice(startIndex, deleteCount, item1, item2, ...)
numArr.splice(3, 2, 400, 500, 600);

console.log("Array numArr: ", numArr);

// menggunakan length untuk mendapatkan index terakhir dari array
console.log("Elemen terakhir di numArr: ", numArr[numArr.length - 1]);

// length tidak dimulai dari 0, tapi dimulai dari 1,
// karena length itu menghitung jumlah elemen di dalam array, bukan index-nya
console.log("Panjang numArr: ", numArr.length);

console.log(`string-nya: ${strArr[0]} | angka-nya: ${numArr[0]}`);

let fruits: string[] = ["apple", "banana", "orange"];
let animals: string[] = ["cat", "dog", "elephant"];
let selectedAnimal: string = "";

for (let fruit of fruits) {
	console.log(fruit);
}

for (let i = 0; i < animals.length; i++) {
	if (i === 2) {
		selectedAnimal = animals[i];
	}
}

// callback function
// callback function adalah fungsi yang dipanggil di dalam fungsi lain sebagai argumen
fruits.forEach((value: string, i: number, array: string[]) => {
	console.log(`index: ${i} | value: ${value} | array: ${array}`);
});

console.log("Selected animal: ", selectedAnimal);
