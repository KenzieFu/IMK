const express = require("express");
// const { body } = require("express-validator/check");
const siswaController = require("../controllers/siswa");
const bukuController = require("../controllers/buku");
const guruController = require("../controllers/guru");
const kategoriController = require("../controllers/kategori");
const peminjamanController = require("../controllers/peminjaman");
const pengembalianController = require("../controllers/pengembalian");
const eventController = require("../controllers/event");
const pemesananarController = require("../controllers/pemesananBuku");
// isAuth middleware untuk memastikan user sudah login sebelum mengakses halaman ini
const isAuth = require("../middleware/isAuth"); //implementasinya nanti di route yang membutuhkan !!!!!

const router = express.Router();

// ROUTES FOR BUKU

// route untuk mengambil daftar buku yang tersedia
// http://localhost:8080/perpustakaan-methodist-cw/buku
router.get("/buku", bukuController.getBooks);

// route untuk mengambil daftar buku perpus
// http://localhost:8080/perpustakaan-methodist-cw/buku-perpus
router.get("/buku-perpus", bukuController.getPerpusBooks);

// route untuk mengambil daftar buku tahun ajaran baru
// http://localhost:8080/perpustakaan-methodist-cw/buku-tahun-ajaran-baru
router.get("/buku-tahun-ajaran-baru", bukuController.getTahunAjaranBaruBooks);

// route untuk menampilkan single book
// http://localhost:8080/perpustakaan-methodist-cw/buku/1
router.get("/buku/:bukuId", bukuController.getBook);

// route untuk menampilkan single book khusus detail buku perpus
// http://localhost:8080/perpustakaan-methodist-cw/buku-perpus/1
router.get("/buku-perpus/:bukuId", bukuController.getPerpusBook);

// route untuk menampilkan single book khusus detail buku tahun ajaran baru
// http://localhost:8080/perpustakaan-methodist-cw/buku-tahun-ajaran-baru/1
router.get("/buku-tahun-ajaran-baru/:bukuId", bukuController.getTahunAjaranBaruBook);

// route untuk search buku
// http://localhost:8080/perpustakaan-methodist-cw/search?keyword=fisika
router.get("/search", bukuController.searchBook);

// route untuk search buku perpus
// http://localhost:8080/perpustakaan-methodist-cw/search-perpus?keyword=fisika
router.get("/search-perpus", bukuController.searchPerpusBook);

// route untuk search buku tahun ajaran baru
// http://localhost:8080/perpustakaan-methodist-cw/search-tahun-ajaran-baru?keyword=fisika
router.get("/search-tahun-ajaran-baru", bukuController.searchTahunAjaranBaruBook);

// ROUTES FOR KATEGORI

// route untuk mengambil daftar kategori
// http://localhost:8080/perpustakaan-methodist-cw/kategori
router.get("/kategori", kategoriController.getAllKategori);

// route untuk mengambil daftar buku per kategori
// http://localhost:8080/perpustakaan-methodist-cw/buku/kategori/1
router.get("/buku/kategori/:kategoriId", bukuController.getBookByKategori);

// ROUTES FOR SISWA

// route untuk menampilkan profil siswa
// http://localhost:8080/perpustakaan-methodist-cw/profil/1
router.get("/profil/:siswaId", siswaController.getProfil);

// route untuk menampilkan daftar jumlah peminjaman buku
// http://localhost:8080/perpustakaan-methodist-cw/jumlah-dipinjam
router.get("/jumlah-dipinjam", bukuController.getJumlahDipinjam);

// route untuk menampilkan daftar jumlah peminjaman buku berdasarkan id_buku
// http://localhost:8080/perpustakaan-methodist-cw/jumlah-dipinjam/1
router.get("/jumlah-dipinjam/:bukuId", bukuController.getJumlahDipinjamById);

// GET /perpustakaan/siswa/profil
// http://localhost:8080/perpustakaan/siswa/profil/1
// router.get("/siswa/profil/:siswaId", siswaController.getProfil);

// // GET /perpustakaan/siswa/buku
// // http://localhost:8080/perpustakaan/siswa/buku
// router.get("/siswa/buku", siswaController.getBuku);

// // GET /perpustakaan/siswa/buku/:bukuId
// // http://localhost:8080/perpustakaan/siswa/buku/1
// router.get("/siswa/buku/:bukuId", siswaController.getBukuById);

// // GET /perpustakaan/siswa/buku/kategori/:kategoriId
// // http://localhost:8080/perpustakaan/siswa/buku/kategori/1
// router.get("/siswa/buku/kategori/:kategoriId", siswaController.getBukuByKategori);

// // GET /perpustakaan/siswa/buku/histori-peminjaman/:siswaId
// // http://localhost:8080/perpustakaan-methodist-cw/siswa/buku/histori-peminjaman/1
router.get("/siswa/buku/histori-peminjaman/:siswaId", siswaController.getHistoriPeminjaman);

// // GET /perpustakaan/siswa/buku/histori-pengembalian/:siswaId
// // http://localhost:8080/perpustakaan/siswa/buku/histori-pengembalian/1
router.get("/siswa/buku/histori-pengembalian/:siswaId", siswaController.getHistoriPengembalian);

// ROUTES FOR PEMINJAMAN

// route untuk menambahkan peminjaman
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman
router.post("/peminjaman", peminjamanController.createPeminjaman);
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjamanBarcode
router.post("/peminjamanBarcode", peminjamanController.createPeminjamanBarcode);

// route untuk mengupdate peminjaman
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/1
router.put("/peminjaman/:peminjamanId", peminjamanController.updatePeminjaman);

// route untuk menghapus peminjaman
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/1
router.delete("/peminjaman/:peminjamanId", peminjamanController.deletePeminjaman);

// route untuk menampilkan satu peminjaman
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/1
router.get("/peminjaman/:peminjamanId", peminjamanController.getPeminjaman);

// route untuk menampilkan daftar peminjaman
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman
router.get("/peminjaman", peminjamanController.getAllPeminjaman);

// route untuk menampilkan daftar peminjaman berdasarkan user
// http://localhost:8080/perpustakaan-methodist-cw/peminjaman-siswa
router.get("/peminjaman-siswa-by-user", isAuth, peminjamanController.getPeminjamanByUser);

// route untuk menampilkan histori peminjaman berdasarkan user
// http://localhost:8080/perpustakaan-methodist-cw/histori-peminjaman-siswa
router.get("/histori-peminjaman-siswa", peminjamanController.getHistoriPeminjaman);

// ROUTES FOR PENGEMBALIAN

// route untuk menambahkan pengembalian
// http://localhost:8080/admin-perpustakaan-methodist-cw/pengembalian/1
router.post("/pengembalian/:peminjamanId", pengembalianController.createPengembalian);

// route untuk mengupdate pengembalian
// http://localhost:8080/admin-perpustakaan-methodist-cw/pengembalian/1
router.put("/pengembalian/:pengembalianId", pengembalianController.updatePengembalian);

// route untuk menghapus pengembalian
// http://localhost:8080/admin-perpustakaan-methodist-cw/pengembalian/1
router.delete("/pengembalian/:pengembalianId", pengembalianController.deletePengembalian);

// route untuk menampilkan pengembalian berdasarkan user
// http://localhost:8080/perpustakaan-methodist-cw/pengembalian
router.get("/pengembalian", isAuth, pengembalianController.getPengembalian);

// ROUTES FOR EVENTS

// route untuk menambahkan event
// http://localhost:8080/perpustakaan-methodist-cw/event
router.post("/event", eventController.createEvent);

// route untuk mengupdate event
// http://localhost:8080/perpustakaan-methodist-cw/event/1
router.put("/event/:eventId", eventController.updateEvent);

// route untuk menghapus event
// http://localhost:8080/perpustakaan-methodist-cw/event/1
router.delete("/event/:eventId", eventController.deleteEvent);

// route untuk menampilkan daftar event
// http://localhost:8080/perpustakaan-methodist-cw/event
router.get("/event", eventController.getAllEvent);

// ROUTES FOR PEMESANAN BUKU

// route untuk menambahkan pemesanan buku
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku
router.post("/pemesanan-buku", pemesananarController.createPemesananBuku);

// route untuk menambahkan pemesanan buku multiple
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku-multiple
router.post("/pemesanan-buku-multiple", pemesananarController.createPemesananBukuMultiple);

// route untuk mengupdate pemesanan buku
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/1
router.put("/pemesanan-buku/:pemesananBukuId", pemesananarController.updatePemesananBuku);

// route untuk menghapus pemesanan buku
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/39
router.delete("/pemesanan-buku/:pemesananBukuId", pemesananarController.deletePemesananBuku);

// route untuk menampilkan daftar pemesanan buku
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku
router.get("/pemesanan-buku", pemesananarController.getAllPemesananBuku);

// route untuk menampilkan daftar pemesanan buku berdasarkan id_pemesanan
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/1
router.get("/pemesanan-buku/:pemesananBukuId", pemesananarController.getPemesananBuku);

// route untuk membatalkan pemesanan buku
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-batal/1
router.delete("/pemesanan-batal/:pemesananBukuId", pemesananarController.batalPemesananBuku);

// route untuk menampilkan daftar pemesanan buku berdasarkan siswa yang login
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku-siswa
router.get("/pemesanan-buku-siswa", pemesananarController.getPemesananBukuByUser);






// http://localhost:8080/perpustakaan-methodist-cw/peminjaman-siswa
router.get("/peminjaman-siswa/:idAkun", peminjamanController.getPeminjamanByUserId);



// http://localhost:8080/perpustakaan-methodist-cw/pengembalian
router.get("/pengembalian/:idAkun", pengembalianController.getPengembalianById);


module.exports = router;
