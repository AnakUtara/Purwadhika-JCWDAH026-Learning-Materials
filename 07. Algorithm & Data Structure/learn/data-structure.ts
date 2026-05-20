// Array

// const numArr: number[] = [1, 2, 3, 4, 5];
// const strArr: string[] = ["Hello", "World"];
// const boolArr: boolean[] = [true, false, true];

// //O(n) - Linear Time Complexity
// console.log(numArr[2]); // Mengakses elemen ke-3 (index 2) dalam array, waktu akses konstan O(1)

//Linked List

class ListNode {
	value: number;
	next: ListNode | null;
	constructor(value: number) {
		this.value = value;
		this.next = null;
	}
}

class LinkedList {
	head: ListNode | null;
	constructor() {
		this.head = null;
	}

	get getHead() {
		return this.head;
	}

	// O(n) - Linear Time Complexity
	append(value: number): void {
		// Membuat node baru dengan nilai yang diberikan
		const newNode = new ListNode(value);
		// Jika linked list masih kosong, set head ke node baru
		if (!this.head) {
			this.head = newNode;
			return;
		}
		// Jika linked list tidak kosong, cari node terakhir dan tambahkan node baru di akhir
		let current = this.head;
		// Loop untuk menemukan node terakhir (node yang next-nya null)
		while (current.next) {
			current = current.next;
		}
		current.next = newNode;
	}

	// O(n) - Linear Time Complexity
	find(value: number): ListNode | null {
		let current = this.head;
		while (current) {
			if (current.value === value) {
				return current; // Elemen ditemukan
			}
			current = current.next;
		}
		return null; // Elemen tidak ditemukan
	}
}

const linkedList = new LinkedList();
linkedList.append(10);
linkedList.append(20);
linkedList.append(30);

console.log(linkedList.find(20)); // Output: ListNode { value: 20, next: ListNode { value: 30, next: null } }
console.log(linkedList.find(40)); // Output: null
console.log("Linked list: ", linkedList.getHead);

// class DoublyListNode extends ListNode {
// 	prev: DoublyListNode | null;
// 	constructor(value: number) {
// 		super(value);
// 		this.prev = null;
// 	}
// }

// class DoublyLinkedList extends LinkedList {
// 	head: DoublyListNode | null;
// 	constructor() {
// 		super();
// 		this.head = null;
// 	}

// 	append(value: number): void {
// 		const newNode = new DoublyListNode(value);
// 		if (!this.head) {
// 			this.head = newNode;
// 			return;
// 		}
// 		let current: DoublyListNode = this.head;
// 		while (current.next) {
// 			current = current.next as DoublyListNode;
// 		}
// 		current.next = newNode;
// 		newNode.prev = current; // Menambahkan referensi ke node sebelumnya
// 	}

// 	find(value: number): DoublyListNode | null {
// 		let current = this.head;
// 		while (current) {
// 			if (current.value === value) {
// 				return current; // Elemen ditemukan
// 			}
// 			current = current.next as DoublyListNode;
// 		}
// 		return null; // Elemen tidak ditemukan
// 	}
// }

// const doublyLinkedList = new DoublyLinkedList();
// doublyLinkedList.append(10);
// doublyLinkedList.append(20);
// doublyLinkedList.append(30);

// console.log(doublyLinkedList.find(20)); // Output: DoublyListNode { value: 20, next: DoublyListNode { value: 30, next: null, prev: [Circular] }, prev: DoublyListNode { value: 10, next: [Circular], prev: null } }
// console.log(doublyLinkedList.find(40)); // Output: null
// console.log("Doubly linked list: ", doublyLinkedList.getHead);

// class CircularLinkedList extends LinkedList {
// 	append(value: number): void {
// 		const newNode = new ListNode(value);
// 		if (!this.head) {
// 			this.head = newNode;
// 			newNode.next = this.head; // Membuat node baru menunjuk ke dirinya sendiri untuk circular linked list
// 			return;
// 		}
// 		let current: ListNode | null = this.head;
// 		while (current?.next !== this.head) {
// 			// Loop hingga menemukan node terakhir yang menunjuk kembali ke head
// 			current = current!.next;
// 		}
// 		current!.next = newNode; // Node terakhir sekarang menunjuk ke node baru
// 		newNode.next = this.head; // Node baru menunjuk kembali ke head, menjaga sifat circular linked list
// 	}
// }

// const circularLinkedList = new CircularLinkedList();
// circularLinkedList.append(10);
// circularLinkedList.append(20);
// circularLinkedList.append(30);

// console.log("Circular linked list: ", circularLinkedList.getHead);

// Stack

// class Stack {
// 	private items: number[] = [];

// 	push(item: number): void {
// 		this.items.push(item); // Menambahkan item ke atas stack
// 	}

// 	pop(): number | undefined {
// 		return this.items.pop(); // Menghapus dan mengembalikan item dari atas stack
// 	}

// 	peek(): number | undefined {
// 		return this.items[this.items.length - 1]; // Mengembalikan item di atas stack tanpa menghapusnya
// 	}

// 	isEmpty(): boolean {
// 		return this.items.length === 0; // Memeriksa apakah stack kosong
// 	}
// }

// const stack = new Stack();
// stack.push(10);
// stack.push(20);
// stack.push(30);

// console.log("Top item in the stack: ", stack.peek());

// Bayangkan stack itu sebagai tumpukan vertikal,
// di mana item terakhir yang ditambahkan akan selalu berada di atas item sebelumnya,
// sehingga item terakhir yang ditambahkan adalah yang pertama diambil (Last In, First Out - LIFO).

// Queue

// class Queue {
// 	private items: number[] = [];

// 	enqueue(item: number): void {
// 		this.items.push(item); // Menambahkan item ke belakang queue
// 	}

// 	dequeue(): number | undefined {
// 		return this.items.shift(); // Menghapus dan mengembalikan item dari depan queue
// 	}

// 	peek(): number | undefined {
// 		return this.items[0]; // Mengembalikan item di depan queue tanpa menghapusnya
// 	}

// 	isEmpty(): boolean {
// 		return this.items.length === 0; // Memeriksa apakah queue kosong
// 	}
// }

// const queue = new Queue();
// queue.enqueue(10);
// queue.enqueue(20);
// queue.enqueue(30);

// console.log("Front item in the queue: ", queue.peek());

// Bayangkan queue itu sebagai antrian horizontal,
// di mana item pertama yang ditambahkan akan selalu berada di depan item berikutnya,
// sehingga item pertama yang ditambahkan adalah yang pertama diambil (First In, First Out - FIFO).

// Hash Map

// class HashMap {
// 	private map: { [key: string]: number } = {};

// 	set(key: string, value: number): void {
// 		this.map[key] = value; // Menambahkan atau memperbarui nilai untuk kunci tertentu
// 	}

// 	get(key: string): number | undefined {
// 		return this.map[key]; // Mengembalikan nilai yang terkait dengan kunci tertentu
// 	}

// 	has(key: string): boolean {
// 		return key in this.map; // Memeriksa apakah kunci ada dalam hash map
// 	}

// 	delete(key: string): void {
// 		delete this.map[key]; // Menghapus kunci dan nilai terkait dari hash map
// 	}
// }

// const hashMap = new HashMap();
// hashMap.set("apple", 1);
// hashMap.set("banana", 2);

// console.log("Value for 'apple': ", hashMap.get("apple")); // Output: 1
// console.log("Does 'banana' exist? ", hashMap.has("banana")); // Output: true
// hashMap.delete("apple");
// console.log("Does 'apple' exist after deletion? ", hashMap.has("apple")); // Output: false

// Hash map adalah struktur data yang menyimpan pasangan kunci-nilai,
// Hash map juga bisa dibuat menggunakan object literal atau Map bawaan JavaScript,
// namun implementasi di atas memberikan gambaran dasar tentang bagaimana hash map bekerja
// dengan menggunakan objek untuk menyimpan data.

// Hash merujuk pada proses mengubah input (seperti string) menjadi nilai hash yang unik,
// yang kemudian digunakan sebagai kunci dalam hash map untuk menyimpan dan mengambil nilai dengan cepat.

// Map merujuk pada nilai yang disimpan atau di-assign kepada kunci tertentu dalam hash map,
// sehingga Map adalah struktur data yang menyimpan pasangan kunci-nilai,
// sedangkan Hash adalah proses atau fungsi yang menghasilkan nilai hash untuk kunci tersebut.

// Map

// const myMap = new Map<string, number>();
// myMap.set("apple", 1);
// myMap.set("banana", 2);

// console.log("Value for 'apple' in Map: ", myMap.get("apple")); // Output: 1
// console.log("Does 'banana' exist in Map? ", myMap.has("banana")); // Output: true
// myMap.delete("apple");
// console.log("Does 'apple' exist in Map after deletion? ", myMap.has("apple")); // Output: false
