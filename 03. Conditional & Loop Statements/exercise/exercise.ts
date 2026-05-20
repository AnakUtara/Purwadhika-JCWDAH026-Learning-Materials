// Exercise 01
const x: number = 5;
const isOdd: boolean = x % 2 !== 0;
console.log(`Apakah ${x} adalah bilangan ganjil? ${isOdd}`);

// Exercise 02
const y: number = 23;
let isPrime: boolean = true;
// loop dari 2 sampai akar kuadrat dari y
// karena faktor bilangan prima hanya perlu dicek sampai akar kuadratnya saja
// akar kuadrat adalah nilai yang jika dikuadratkan akan menghasilkan nilai asal
console.log(`nilai asal dari y: ${Math.sqrt(y)}`);

for (let i = 2; i <= Math.sqrt(y); i++) {
	// jika y habis dibagi i, maka bukan bilangan prima
	if (y % i === 0) {
		isPrime = false;
		break;
	}
}

if (isPrime && y > 1) {
	console.log(`${y} adalah bilangan prima.`);
} else {
	console.log(`${y} bukan bilangan prima.`);
}

// Exercise 03
const z: number = 20;
let sumResult: number = 0;

for (let i = 1; i <= z; i++) {
	sumResult += i;
}

console.log(`Jumlah dari 1 hingga ${z} adalah ${sumResult}.`);

// Exercise 04
let q: number = 10;
let factorialResult: number = 1;

for (let i = 1; i <= q; i++) {
	factorialResult *= i;
}

console.log(`Faktorial dari ${q} adalah ${factorialResult}.`);

// Exercise 05
const nFib: number = 15;
let a: number = 0;
let b: number = 1;
let nextFib: number = 0;

// loop untuk menghitung deret Fibonacci sampai nFib
for (let i = 0; i <= nFib; i++) {
	if (i === 0) {
		continue;
	} else if (i === 1) {
		continue;
	}
	nextFib = a + b;
	a = b;
	b = nextFib;
}

console.log(`Fibonacci dari ${nFib} : ${nextFib}`);
