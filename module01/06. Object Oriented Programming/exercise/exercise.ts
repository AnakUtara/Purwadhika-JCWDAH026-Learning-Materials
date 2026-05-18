// Create function to calculate array of student data

interface IStudentData {
	name: string;
	email: string;
	age: Date;
	score: number;
}

interface IStudentStatsResults {
	highest: number;
	lowest: number;
	average: number;
}

function calcMinMaxAvgAgeAndScore(students: IStudentData[]): {
	score: IStudentStatsResults;
	age: IStudentStatsResults;
} {
	const scores: number[] = students.map(({ score }: IStudentData) => score);
	const ages: number[] = students.map(
		({ age }: IStudentData) => new Date().getFullYear() - age.getFullYear(),
	);
	return {
		score: {
			highest: Math.max(...scores),
			lowest: Math.min(...scores),
			// rumus rata-rata: jumlah semua nilai dibagi dengan jumlah data
			average: scores.reduce((acc, n) => acc + n, 0) / scores.length,
		},
		age: {
			highest: Math.max(...ages),
			lowest: Math.min(...ages),
			// rumus rata-rata: jumlah semua nilai dibagi dengan jumlah data
			average: Math.floor(ages.reduce((acc, n) => acc + n, 0) / ages.length),
		},
	};
}

const studentsData: IStudentData[] = [
	{
		name: "Alice",
		email: "alice@example.com",
		age: new Date("2000-05-15"),
		score: 85,
	},
	{
		name: "Bob",
		email: "bob@example.com",
		age: new Date("1998-10-22"),
		score: 92,
	},
	{
		name: "Charlie",
		email: "charlie@example.com",
		age: new Date("2001-03-30"),
		score: 78,
	},
];

console.log(calcMinMaxAvgAgeAndScore(studentsData));

// Create a program to create transaction

// Perhatikan bahwa class bisa menjadi tipe dari sebuah objek juga

class Product {
	private name: string;
	private price: number;
	constructor(name: string, price: number) {
		this.name = name;
		this.price = price;
	}
	get data() {
		return {
			name: this.name,
			price: this.price,
		};
	}
}

const product1 = new Product("Laptop", 1500);
const product2 = new Product("Smartphone", 800);
const product3 = new Product("Tablet", 600);
const product4 = new Product("Headphones", 200);

// Cek data produk untuk debugging
console.log("Product1: ", product1.data);
console.log("Product2: ", product2.data);
console.log("Product3: ", product3.data);
console.log("Product4: ", product4.data);

class Transaction {
	private total: number = 0;
	// properti data diambil dari getter pada class Product
	// lalu di-intersect dengan properti qty untuk menyimpan jumlah produk yang dibeli
	// sehingga concern produk di class Transaction bisa berbeda dengan class Product
	// class Product untuk mendefinisikan produk secara umum
	// sedangkan class Transaction untuk mendefinisikan produk yang dibeli beserta jumlahnya
	private products: (Product["data"] & { qty: number })[] = [];
	get getCart() {
		return this.products;
	}
	get showTotal(): number {
		return this.total;
	}
	addToCart(product: Product, qty: number): void {
		this.products = [...this.products, { ...product.data, qty }];
		this.sumTotal();
	}
	addManyToCart(...products: { product: Product; qty: number }[]): void {
		products.forEach(({ product, qty }) => {
			const existingIndex = this.products.findIndex(
				({ name }) => name === product.data.name,
			);
			// Jika hasil indexOf adalah -1 berarti index produk tidak ditemukan.
			// this.products adalah array yang menyimpan produk atau seperti cart
			// Maka jika existingIndex tidak sama dengan -1 berarti produk sudah ada di cart,
			// maka kita update qty-nya dengan menambahkan qty yang baru
			// else berarti produk belum ada di cart, maka kita push produk baru ke cart dengan qty yang sesuai
			if (existingIndex !== -1) {
				this.products[existingIndex].qty += qty;
			} else {
				this.products.push({ ...product.data, qty });
			}
		});
		this.sumTotal();
	}
	// private bisa juga diberikan prefix #,
	// tapi ini masih experimental dan belum didukung di semua environment
	private sumTotal(): void {
		this.total = this.products.reduce((acc, { price, qty }) => {
			return acc + price * qty;
		}, 0);
	}
	checkout(): void {
		console.log("Checkout Summary:");
		this.products.forEach(({ name, price, qty }) => {
			console.log(
				`${name} - Quantity: ${qty}, Unit Price: $${price}, Subtotal: $${price * qty}`,
			);
		});
		console.log(`Total Amount: $${this.total}`);
	}
}

const transaction1 = new Transaction();

transaction1.addToCart(product1, 1);
transaction1.addToCart(product2, 2);
transaction1.addToCart(product3, 3);
console.log("Cart contents: ", transaction1.getCart);
transaction1.addManyToCart(
	{ product: product4, qty: 4 },
	{ product: product1, qty: 2 },
	{ product: product2, qty: 1 },
);
// perhatikan bahwa getter di-treat sebagai properti, bukan method
console.log("Cart contents: ", transaction1.getCart);
transaction1.checkout();
