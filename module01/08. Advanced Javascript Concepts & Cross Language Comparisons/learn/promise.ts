// Basic Async Example memakai setTimeout
// Sebuah task tidak perlu menunggu task sebelumnya untuk selesa,
// sehingga task yang memakan waktu lama tidak akan menghambat task lainnya

console.log("Task 01");
setTimeout(() => {
	console.log("Task 02");
}, 3000);
console.log("Task 03");

// Callback
const calculator = (a: number, b: number, cb: (result: number) => void) => {
	cb(a + b);
};

calculator(2, 3, (result) => console.log("Callback Result: ", result + 5));

// Callback With Closure
const add10 = (n: number): ((result: number) => void) => {
	const sum = n + 10;
	return (result: number): void => {
		console.log("Callback Result: ", result + sum);
	};
};

const display = add10(10);

calculator(4, 5, add10(10));

// Promise
// Promise adalah objek yang mewakili penyelesaian atau kegagalan dari sebuah operasi asynchronous
// Promise memiliki tiga state: pending, fulfilled, dan rejected
const dataFromServer = new Promise<string>((resolve, reject) => {
	const randomSuccess = Math.random() > 0.5;
	setTimeout(() => {
		if (randomSuccess) {
			resolve("Data received from server");
		} else {
			reject("Failed to fetch data");
		}
	}, 3000);
});

// Then dan Catch
// Cara lama untuk menangani hasil dari Promise
// adalah dengan menggunakan then untuk hasil yang berhasil dan catch untuk hasil yang gagal

dataFromServer
	.then((data) => {
		// then untuk menangani hasil yang berhasil dari Promise
		// then otomatis menunggu Promise selesai sebelum mengeksekusi callback di dalamnya
		console.log(data);
	})
	.catch((error) => {
		// catch untuk menangani error jika Promise gagal
		// catch otomatis menunggu Promise selesai sebelum mengeksekusi callback di dalamnya
		console.error(error);
	});

// Async/Await
// Cara modern untuk menangani Promise adalah dengan menggunakan async/await
// Async/await membuat kode asynchronous terlihat seperti kode synchronous, sehingga lebih mudah dibaca dan dipahami

const fetchDataFromServer = async (): Promise<void> => {
	let isLoading: boolean = true;
	try {
		if (isLoading) {
			console.log("Loading data from server...");
		}
		const data = await dataFromServer;
		console.log("Data received: ", data);
	} catch (error) {
		console.error("Error fetching data: ", error);
	} finally {
		isLoading = false;
		console.log("Loading completed");
	}
};

fetchDataFromServer();

// Fetch dengan Error Handling
const fetchData = async (): Promise<Object> => {
	try {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/users/1",
		);
		let users = null;
		if (response.ok) {
			users = await response.json();
		} else {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return users;
	} catch (error) {
		return { error };
	}
};

fetchData().then((data) => {
	if ((data as any)?.error) {
		console.error("Error fetching data: ", (data as any).error);
		return;
	}
	console.log("Fetched Data: ", (data as any)?.address?.geo);
});
