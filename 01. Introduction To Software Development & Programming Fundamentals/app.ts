const PI_VALUE: number = 3.14;

let x: number = 10;

let y: number = 20;

let greeting: string = "Selamat bergabung".toUpperCase();

x = 40.5;

// x = x * 2;

x *= 2;

// ++x; // prefix

// x++; // postfix

console.log(++x);

console.log(x++);

console.log(x);

console.log(y.toString());

const kalkulasi: number = x + y;

console.log(`Hasil kalkulasi: 
${kalkulasi}

`); //Template Literal

console.log(Boolean(0)); //type conversion

console.log(
	greeting.toLowerCase().replace("a", "o").toUpperCase().replaceAll("A", "O"),
);

console.log(3 ** 2); //exponentiation operator

/* Multiple Line Comment
Pseudocode:
1. Mencari luas persegi panjang
2. Rumusnya adalah panjang x lebar
3. Berarti butuh 2 variabel untuk menyimpan nilai panjang dan lebar
4. Setelah itu, nilai kalkulasi luas bisa disimpan di variabel lain
5. Terakhir, tampilkan hasil kalkulasi luas ke console
*/
