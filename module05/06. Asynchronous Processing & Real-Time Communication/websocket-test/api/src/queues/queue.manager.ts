import { Queue } from "bullmq";
import { redisConfig } from "../libs/redis.js";

// Queue Manager bertanggung jawab untuk menciptakan dan mengelola antrian (queue)
// Misal mau dibuat lebih rapih bisa buat queue per file, misal chat.queue.ts, email.queue.ts, dll
// Simpelnya nanti queue yang dibuat bisa dipanggil di mana saja di project ini
// Misal di controller, service, socket, dll
// Jadi misal di controller post route /storage/image ketimbang langsung panggil cloudinary upload
// cloudinary upload bisa dimasukkan ke layer service, lalu service-nya
// diantrikan ke queue lewat mediaQueue.add("uploadImage", { imageData }, { jobId: uniqueJobId });
// Queue itu sifatnya hanya simpan data yang dibutuhkan oleh worker.
// Nanti service uploadImage cloudinary-nya dipanggil di worker yang membaca queue tersebut, misal di media.worker.ts.
// Worker akan memfilter job.name yang sesuai, misal "uploadImage" untuk memproses upload image ke cloudinary menggunakan service terkait.
// Jadi nanti proses upload image tidak akan menghabiskan resource server walaupun sama2 async seperti yang lain
// karena dipindahkan ke server berbeda dalam kasus ini redis yang di host di upstash

// Queue juga umumnya dipakai untuk mengirim email, notifikasi dari websocket, dan proses2 lain yang memakan waktu lebih lama daripada request biasa.
// Simpelnya misal ga pake third-party lalu di service/controller isinya panjang sekali logikanya
// dan banyak await2-nya. Itu boleh di-queue. Kalau pake third-party tetap lihat dari tipe prosesnya.
// Untuk yang sifatnya file handling, media processing, blast notification/email itu umum pakai queue.
// Untuk yang sifatnya request biasa, misal get data dari database, itu ga perlu di-queue.
// Karena request biasa itu cenderung cepat dan ga makan resource server terlalu banyak.
// Kecuali create data ke db yang dilakukan dari websocket protocol, untuk mengurangi beban data-write secara real-time
// lebih baik di-queue setiap kali event berhasil di-listen.

/*
Kurang lebih flow-nya seperti ini:
1. Client mengirim request ke server (misal via REST API atau WebSocket).
2. Server menerima request dan menambahkan job ke queue beserta dengan data yang dibutuhkan logic yang akan dipanggil di worker (misal testQueue.add("job-name", { data }, { jobId: uniqueId })).
3. Worker yang berjalan secara terpisah mendengarkan queue dari nama queue-nya dan memproses job yang ada di dalamnya mengikuti filtrasi job.name yang ditulis saat queue.add.
4. Setelah job selesai diproses, worker bisa mengirim notifikasi kembali ke client (misal via WebSocket) atau melakukan tindakan lain sesuai kebutuhan.
*/

export const testQueue = new Queue("test-queue", { connection: redisConfig });
export const emailQueue = new Queue("email-queue", { connection: redisConfig });
export const mediaQueue = new Queue("media-queue", { connection: redisConfig });
