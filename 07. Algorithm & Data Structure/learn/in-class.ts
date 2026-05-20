// Generic example
// Generic adalah fitur dalam TypeScript yang memungkinkan kita untuk membuat fungsi,
// kelas, atau interface yang dapat bekerja dengan berbagai jenis data
// tanpa kehilangan tipe informasi. Dengan menggunakan generic,
// kita dapat menulis kode yang lebih fleksibel dan dapat digunakan kembali.

interface IKeyValuePair<K, V> {
	key: K;
	value: V;
}

function createKeyValuePair<K, V>(key: K, value: V): IKeyValuePair<K, V> {
	return { key, value };
}

const pair1 = createKeyValuePair<string, number>("age", 30);
const pair2 = createKeyValuePair<number, string>(1, "one");

console.log(pair1); // Output: { key: 'age', value: 30 }
console.log(pair2); // Output: { key: 1, value: 'one' }
