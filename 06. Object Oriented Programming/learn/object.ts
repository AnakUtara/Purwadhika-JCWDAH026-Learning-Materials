const car: ICar = {
	brand: "BYD",
	model: "Denza D9",
	price: 950000000,
	drive() {
		console.log(`The ${this.brand} ${this.model} is driving.`);
	},
};

const car2: ICar = {
	brand: "Toyota",
	model: "Camry",
	price: 500000000,
	drive() {
		console.log(`The ${this.brand} ${this.model} is drifting.`);
	},
};

interface ICar {
	brand: string;
	model: string;
	price: number;
	drive(): void;
}

interface IParkingLot {
	cars: ICar[];
	park(...cars: ICar[]): void;
}

const parkiran1: IParkingLot = {
	cars: [],
	park(...cars: ICar[]) {
		this.cars = [...this.cars, ...cars];
	},
};

console.log(car.drive());
console.log(car2.drive());

parkiran1.park(car, car2);
console.log(parkiran1.cars);

// Pattern backend

interface IController {
	findAll(): any[];
	findById(id: string): any;
	create(data: any): void;
	update(id: string, data: any): void;
	delete(id: string): void;
}

interface IUser {
	id: number;
	email: string;
	fullName: string;
	address?: {
		street: string;
		city: string;
		country: string;
	};
}

interface IUserWithPassword extends IUser {
	password?: string;
}

const user: IUserWithPassword = {
	id: 1,
	fullName: "Yulius",
	email: "yulius@example.com",
};

//Optional Chaining untuk mengakses properti yang mungkin undefined atau null
console.log(user.address?.street);

delete user.password;

// Destructuring untuk mengambil properti yang diinginkan dan menyimpan sisanya dalam objek baru
const { password, fullName, ...cleanUser } = user;

console.log("Clean User: ", cleanUser);

class UserController implements IController {
	findAll(): any[] {
		// Logic to find all users
		return [];
	}
	findById(id: string) {
		// Logic to find a user by id
		return `User with id ${id}`;
	}
	create(data: IUser): void {
		// Logic to create a new user
		console.log(`Creating user: ${data}`);
	}
	update(id: string, data: IUser): void {
		// Logic to update a user by id
		console.log(`Updating user with id ${id}: ${data}`);
	}
	delete(id: string): void {
		// Logic to delete a user by id
		console.log(`Deleting user with id ${id}`);
	}
}

type TProductData = {
	name: string;
	price: number;
};

class ProductDisplay {
	private products: TProductData[] = [];

	get allProducts() {
		return this.products;
	}

	addProducts(...products: TProductData[]): void {
		this.products = [...this.products, ...products];
	}

	showProducts(): TProductData[] {
		return this.products;
	}

	reshapeProducts(...products: TProductData[]): void {
		this.products = products.map((product, i, arr) => {
			return {
				...arr[i],
				name: product.name.toUpperCase(),
				price: product.price * 1.1, // Menambahkan markup 10% pada harga
			};
		});
	}
}

const jeruk: TProductData = {
	name: "Jeruk",
	price: 5000,
};

const apel: TProductData = {
	name: "Apel",
	price: 7000,
};

const pisang: TProductData = {
	name: "Pisang",
	price: 3000,
};

const newPisang: TProductData = { ...pisang, name: "Pisang Raja", price: 4000 };

const displayBuah: ProductDisplay = new ProductDisplay();
displayBuah.addProducts(jeruk, apel, pisang);
console.log(displayBuah.showProducts());

console.log(pisang["name"]);

newPisang.name = "Pisang Raja";
newPisang.price = 4000;

console.log(pisang);

const semangka: TProductData = {
	name: "Semangka",
	price: 10000,
};

const melon: TProductData = {
	name: "Melon",
	price: 12000,
};

const pepaya: TProductData = {
	name: "Pepaya",
	price: 8000,
};

displayBuah.reshapeProducts(semangka, melon, pepaya);
console.log(displayBuah.showProducts());

const [firstProduct, secondProduct, thirdProduct] =
	displayBuah.allProducts as TProductData[];

const { name: nama, price } = firstProduct;

console.log("First Product Nama: ", nama);

for (const key in user) {
	console.log(user[key as keyof IUserWithPassword]);
}

// Object.keys, Object.values, Object.entries
// untuk mendapatkan array dari properti, nilai,
// atau pasangan key-value dari sebuah objek
console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));
console.log(Object.fromEntries(Object.entries(user)));

for (const fruits of displayBuah.allProducts) {
	console.log("Hasil for...of:", fruits);
}
