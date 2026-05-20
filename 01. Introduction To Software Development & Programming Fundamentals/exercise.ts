const l: number = 5;
const w: number = 3;
const area: number = l * w;
console.log("Area of rectangle is: " + area);

const perimeter: number = 2 * (l + w);
console.log("Perimeter of rectangle is: " + perimeter);

const r: number = 5;
const pi: number = Math.PI;
const diameter: number = 2 * r;
console.log("Diameter of circle is: " + diameter);

const circumference: number = 2 * pi * r;
console.log("Circumference of circle is: " + circumference);

const a: number = 80;
const b: number = 65;
const c: number = 180 - (a + b);
console.log("The third angle of the triangle is: " + c);

// Menentukan jumlah hari dalam beberapa tahun, bulan, dan hari
const days: number = 400;
// Menghitung jumlah tahun dari jumlah hari
const years: number = Math.floor(days / 365);
// Mendapatkan sisa hari dengan menggunakan operator modulus yang akan memberikan sisa hari setelah menghitung jumlah tahun
// Modulo operator (%) digunakan untuk mendapatkan sisa dari pembagian antara jumlah hari dengan 365,
// sehingga kita bisa mengetahui berapa banyak hari yang tersisa setelah menghitung jumlah tahun.
const remainingDays: number = days % 365;
// Menghitung jumlah bulan dari sisa hari dengan membagi sisa hari dengan 30 dan menggunakan Math.floor
// untuk mendapatkan jumlah bulan yang bulat ke bawah, karena kita tidak bisa memiliki sebagian bulan dalam perhitungan ini
const months: number = Math.floor(remainingDays / 30);

console.log(
	days +
		" days is approximately " +
		years +
		" years, " +
		months +
		" months, and " +
		(remainingDays % 30) +
		" days.",
);

// Menghitung selisih hari antara dua tanggal
const date1: Date = new Date("2023-01-01");
const date2: Date = new Date("2023-01-02");
// Metode getTime() digunakan untuk mendapatkan waktu dalam bentuk milidetik sejak 1 Januari 1970,
// sehingga kita bisa menghitung selisih waktu antara dua tanggal dengan mengurangkan nilai getTime() dari kedua tanggal tersebut.
// Kemudian, kita menggunakan Math.abs() untuk memastikan bahwa hasilnya selalu positif,
// karena kita hanya tertarik pada jumlah hari antara dua tanggal, bukan arah selisihnya.
const timeDiff: number = Math.abs(date2.getTime() - date1.getTime());
// Setelah itu, kita membagi selisih waktu dalam milidetik dengan jumlah milidetik dalam satu hari
// (1000 ms/s * 3600 s/jam * 24 jam/hari) untuk mendapatkan jumlah hari, dan menggunakan Math.ceil()
// untuk membulatkan ke atas agar mendapatkan jumlah hari yang tepat.
const diffDays: number = Math.ceil(timeDiff / (1000 * 3600 * 24));

console.log("Difference between the two dates is: " + diffDays + " days.");
