//Create a function to merge two array of student data and remove duplicate data

interface IStudent {
	name: string;
	email: string;
}

const mergeStudentData = (arr1: IStudent[], arr2: IStudent[]): IStudent[] => {
	const merged = [...arr1, ...arr2];
	const findUnique: { [key: string]: IStudent } = {};
	for (const student of merged) {
		// menggunakan email sebagai key untuk menghindari duplikasi
		// karena object key harus unik, maka bila ada email yang sama, data sebelumnya akan ditimpa
		findUnique[student.email] = student;
	}
	return Object.values(findUnique);
};

const studentsArray1: IStudent[] = [
	{ name: "Alice", email: "alice@example.com" },
	{ name: "Bob", email: "bob@example.com" },
];

const studentsArray2: IStudent[] = [
	{ name: "Charlie", email: "charlie@example.com" },
	{ name: "Alice", email: "alice@example.com" },
];

const mergedStudents = mergeStudentData(studentsArray1, studentsArray2);
console.log(mergedStudents);

const flipObjectKeysAndValuesInArray = (
	arr: { [key: string]: string }[],
): { [key: string]: string }[] => {
	return arr.map((obj) => {
		// Object.entries mengembalikan array dari pasangan [key, value]
		const entries = Object.entries(obj);
		// map untuk membalik pasangan [key, value] menjadi [value, key]
		const flipped = entries.map(([key, value]) => [value, key]);
		// Object.fromEntries mengubah array pasangan [key, value] kembali menjadi object
		return Object.fromEntries(flipped);
	});
};

const sampleArray: { [key: string]: string }[] = [
	{ a: "1", b: "2" },
	{ c: "3", d: "4" },
];

console.log(flipObjectKeysAndValuesInArray(sampleArray));

const factorialByRecursion = (n: number): number => {
	// base case untuk menghentikan recursion
	if (n === 0 || n === 1) return 1;
	// selama recursion nilai input "n" akan terus dikurangi satu hingga mencapai base case
	// return di base case akan menghentikan function ini mencapai return akhir yaitu n * factorialByRecursion(n - 1)
	return n * factorialByRecursion(n - 1);
};

console.log(factorialByRecursion(5));
