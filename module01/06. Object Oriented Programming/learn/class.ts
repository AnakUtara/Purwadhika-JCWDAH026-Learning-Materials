class User {
	fullName: string = "";
	email: string = "";
	password: string = "";

	constructor(fullName: string, email: string, password: string) {
		this.fullName = fullName;
		this.email = email;
		this.password = password;
	}

	greeting(): string {
		return `Hello, my name is ${this.fullName}`;
	}
}

class Car {
	public make: string = "";
	public model: string = "";
	public year: number = 0;
	private vin: string = "";

	constructor(make: string, model: string, year: number, vin: string) {
		this.make = make;
		this.model = model;
		this.year = year;
		this.vin = vin;
	}

	// Getter sebuah metode yang digunakan untuk mengakses properti private dari sebuah class
	get carData() {
		return {
			make: this.make,
			model: this.model,
			year: this.year,
			vin: this.vin,
		};
	}

	// Setter sebuah metode yang digunakan untuk mengubah nilai properti private dari sebuah class
	set vinNumber(newVin: string) {
		this.vin = newVin;
	}

	drive() {
		console.log(`The ${this.make} ${this.model} is driving.`);
	}
}

const car1: Car = new Car("Toyota", "Camry", 2020, "1234567890");

console.log(car1.drive());

const user1: User = new User("Yulius", "yulius@example.com", "password123");
const user2: User = new User("Gallant", "gallant@example.com", "password456");
console.log(user1.greeting());
console.log(user2.greeting());

class BankAccount {
	private accountNumber: string;
	private balance: number = 0;

	constructor(initialBalance: number, accountNumber: string) {
		this.balance = initialBalance;
		this.accountNumber = accountNumber;
	}

	get accountBalance() {
		return this.balance;
	}

	get accountNumberData() {
		return this.accountNumber;
	}

	deposit(amount: number): void {
		if (amount > 0) {
			this.balance += amount;
		}
	}
}

const daivaBankAccount: BankAccount = new BankAccount(100000, "abcd1234");
console.log(daivaBankAccount.accountBalance);
daivaBankAccount.deposit(5000000);
console.log(daivaBankAccount.accountBalance);

// Static method sebuah metode yang dapat dipanggil tanpa harus membuat instance dari class tersebut

class MathUtils {
	static add(...numbers: number[]): number {
		return numbers.reduce((sum, num) => sum + num, 0);
	}

	static multiply(...numbers: number[]): number {
		return numbers.reduce((product, num) => product * num, 1);
	}

	static divide(a: number, b: number): number {
		if (b === 0) {
			throw new Error("Cannot divide by zero");
		}
		return a / b;
	}
}

console.log(MathUtils.add(1, 2, 3, 4, 5));
console.log(MathUtils.multiply(1, 2, 3, 4, 5));
console.log(MathUtils.divide(10, 2));

// Inheritance
// konsep dimana sebuah class dapat mewarisi properti dan metode dari class lain

class Animal {
	name: string = "";

	constructor(name: string) {
		this.name = name;
	}
	// Method bisa dikategorikan sebagai bagian dari Abstraction,
	// karena method adalah cara untuk menyembunyikan detail implementasi
	// dan hanya menampilkan fungsionalitas yang relevan kepada pengguna.
	walk() {
		console.log(`${this.name} is walking.`);
	}

	makeSound() {
		console.log(`${this.name} is making a sound.`);
	}
}

class Mammal extends Animal {
	hasFur: boolean = true;
	feetCount: number = 4;

	constructor(name: string, hasFur: boolean, feetCount: number) {
		super(name);
		this.hasFur = hasFur;
		this.feetCount = feetCount;
	}
}

class Dog extends Mammal {
	breed: string = "";

	constructor(name: string, hasFur: boolean, feetCount: number, breed: string) {
		super(name, hasFur, feetCount);
		this.breed = breed;
	}

	// Override method makeSound dari class Animal
	// Mengikuti prinsip OOP: Polymorphism,
	// dimana subclass dapat mengubah perilaku metode yang diwarisi dari superclass
	makeSound(): void {
		console.log(`${this.name} is barking.`);
	}
}

class Reptile extends Animal {
	isColdBlooded: boolean = true;

	constructor(name: string, isColdBlooded: boolean) {
		super(name);
		this.isColdBlooded = isColdBlooded;
	}
}

const mammal1: Mammal = new Mammal("Dog", true, 4);
const reptile1: Reptile = new Reptile("Snake", true);

const pom: Dog = new Dog("Pom", true, 4, "Pomeranian");

console.log(mammal1.walk());
console.log(reptile1.walk());
console.log(mammal1 instanceof Animal);
console.log(reptile1 instanceof Animal);

console.log(mammal1.makeSound());
console.log(reptile1.makeSound());
console.log(pom.makeSound());
