/* 
    Hoisting
    - Proses dimana deklarasi variabel dan fungsi dipindahkan ke bagian atas scope sebelum kode dieksekusi
    - Hanya deklarasi yang dihoist, bukan inisialisasi
    - Variabel yang dihoist akan memiliki nilai undefined sampai inisialisasi dilakukan

    Temporal Dead Zone (TDZ)
    - Area dalam scope dimana variabel yang dideklarasikan dengan let dan const tidak dapat diakses sebelum deklarasi mereka
    - Mengakses variabel dalam TDZ akan menghasilkan ReferenceError
*/

// var itu haram, karena bisa di redeclare dan reassign
aduh = 20;

console.log(aduh);

var aduh = 10;

var aduh = 20;

// ==== Yg di atas haram === //

// let itu halal, karena bisa di reassign tapi tidak bisa di redeclare
// const itu suci, karena tidak bisa di reassign dan tidak bisa di redeclare

let nama = "Yulius";

nama = "Tiara";

const PI = 3.14;

console.log("Hello " + nama);

nama = "Daiva";

let rectangleArea;

console.log(typeof rectangleArea);

const width = 10;
const height = 5;

rectangleArea = width * height;

console.log("Luas persegi panjang: \n" + rectangleArea); // String Concatenation

// Keanehan Javascript

const num = "3 " - true; // auto type coercion, string "3 " diubah menjadi number 3, true diubah menjadi 1, jadi hasilnya 2

console.log(num);
