// FOR

// for (let i = 0; i < 5; i++) {
// 	console.log(`Perulangan ke-${i}`);
// }

// for (let i = 1; i <= 5; i++) {
// 	console.log(`Perulangan ke-${i}`);
// }

// Nested FOR Loop

let kolom: number = 3;
let baris: number = 2;

let tabel: string = "";

for (let i = 1; i <= baris; i++) {
	tabel += `Baris ke-${i}
    `;
	for (let j = 1; j <= kolom; j++) {
		tabel += `Kolom ke-${j} `;
	}
	tabel += "\n";
}

console.log(tabel);

// WHILE

let i: number = 6;

while (i < 5) {
	console.log(`Perulangan ke-${i}`);
	i++;
}

// Do While akan selalu dieksekusi minimal sekali,
// karena kondisi diperiksa setelah blok kode dijalankan.

do {
	console.log(`Perulangan ke-${i}`);
	i++;
} while (i < 5);

// BREAK
// Break digunakan untuk menghentikan seluruh loop secara langsung, tanpa memeriksa kondisi lebih lanjut.

let sum: number = 0;

while (true) {
	if (sum === 5) break;

	sum++;

	console.log(`Nilai saat ini: ${sum}`);
}

// CONTINUE
// Continue digunakan untuk melewati iterasi saat ini dan melanjutkan ke iterasi berikutnya dalam loop.

for (let i = 0; i < 5; i++) {
	console.log(`Perulangan ke-${i} sebelum continue`);
	if (i === 3) continue;
	console.log(`Perulangan ke-${i}`);
}
