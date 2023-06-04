const express = require("express");
// const { body } = require("express-validator/check");
const siswaController = require("../controllers/siswa");
const bukuController = require("../controllers/buku");
const guruController = require("../controllers/guru");
const kategoriController = require("../controllers/kategori");
const akunController = require("../controllers/akun");
const peminjamanController = require("../controllers/peminjaman");
const pengembalianController = require("../controllers/pengembalian");
const eventController = require("../controllers/event");
const pesanMasukController = require("../controllers/pesanMasuk");
const absensiController = require("../controllers/absensi");
const logController = require("../controllers/log");

// isAuth middleware untuk memastikan user sudah login sebelum mengakses halaman ini
const isAuth = require("../middleware/isAuth"); //implementasinya nanti di route yang membutuhkan !!!!!

const router = express.Router();

// ROUTES FOR LOG

// route untuk menampilkan semua log buku
// http://localhost:8080/admin-perpustakaan-methodist-cw/log-buku
router.get("/log-buku", logController.getLogBuku);

// route untuk menampilkan semua log buku perpus
// http://localhost:8080/admin-perpustakaan-methodist-cw/log-buku-perpus
router.get("/log-buku-perpus", logController.getLogBukuPerpus);

// route untuk menampilkan semua log buku tahun ajaran baru
// http://localhost:8080/admin-perpustakaan-methodist-cw/log-buku-thn-ajaran-baru
router.get("/log-buku-thn-ajaran-baru", logController.getLogBukuThnAjaranBaru);

// route untuk menampilkan semua log pemesanan buku
// http://localhost:8080/admin-perpustakaan-methodist-cw/log-pemesanan-buku
router.get("/log-pemesanan-buku", logController.getLogPemesananBuku);

// ROUTES FOR SISWA

// route untuk create data siswa multiple
// http://localhost:8080/admin-perpustakaan-methodist-cw/create-siswa-multiple
router.post("/create-siswa-multiple", siswaController.createSiswaMultiple);

// routes untuk create data calon siswa
// http://localhost:8080/admin-perpustakaan-methodist-cw/calon-siswa
router.post("/calon-siswa", siswaController.createDataCalonSiswa);

// route untuk menghapus siswa secara multiple
// http://localhost:8080/admin-perpustakaan-methodist-cw/siswa-multiple
router.delete("/siswa-multiple", siswaController.deleteSiswaMultiple);


// route untuk menampilkan daftar siswa
// http://localhost:8080/admin-perpustakaan-methodist-cw/siswa
router.get("/siswa", siswaController.getSiswa);

// route untuk menampilkan detail siswa
// http://localhost:8080/admin-perpustakaan-methodist-cw/siswa/1
router.get("/siswa/:siswaId", siswaController.getSiswaById);

// LANJUTKAN CRUD SISWA DLL (UPDATE, DELETE, CREATE, ETC)
// route untuk menambahkan siswa
// http://localhost:8080/admin-perpustakaan-methodist-cw/siswa
router.post("/siswa", siswaController.createSiswa);

// route untuk mengupdate siswa
// http://localhost:8080/admin-perpustakaan-methodist-cw/siswa/1
router.put("/siswa/:siswaId", siswaController.updateSiswa);

// route untuk menghapus siswa
// http://localhost:8080/admin-perpustakaan-methodist-cw/siswa/1
router.delete("/siswa/:siswaId", siswaController.deleteSiswa);

// ROUTES FOR BUKU

// route untuk menghapus buku secara multiple
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku-multiple
router.delete("/buku-multiple", bukuController.deleteBookMultiple);

// route untuk menampilkan daftar buku
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku
router.get("/buku", bukuController.getBooks);

// route untuk menampilkan detail buku
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku/1
router.get("/buku/:bukuId", bukuController.getBook);

// route untuk mengambil daftar buku perpus
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku-perpus
router.get("/buku-perpus", bukuController.getPerpusBooks);

// route untuk mengambil daftar buku tahun ajaran baru
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku-tahun-ajaran-baru
router.get("/buku-tahun-ajaran-baru", bukuController.getTahunAjaranBaruBooks);

// route untuk search buku
// http://localhost:8080/admin-perpustakaan-methodist-cw/search?keyword=fisika
router.get("/search", bukuController.searchBook);

// route untuk mengambil daftar buku per kategori
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku/kategori/1
router.get("/buku/kategori/:kategoriId", bukuController.getBookByKategori);

// LANJUTKAN CRUD BUKU DLL (UPDATE, DELETE, CREATE, ETC)

// route untuk menambahkan buku
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku
// router.post("/buku", bukuController.createBook);

// route untuk mengupdate buku
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku/1
router.put("/buku/:bukuId", bukuController.updateBook);

// route untuk menghapus buku
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku/1
router.delete("/buku/:bukuId", bukuController.deleteBook);

// route untuk menambahkan buku ke perpus
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku-perpus
router.post("/buku-perpus", bukuController.createPerpusBook);

// route untuk mengupdate buku perpus
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku-perpus/1
router.put("/buku-perpus/:bukuId", bukuController.updatePerpusBook);

// route untuk menghapus buku perpus
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku-perpus/1
router.delete("/buku-perpus/:bukuId", bukuController.deletePerpusBook);

// route untuk menambahkan buku ke tahun ajaran baru
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku-tahun-ajaran-baru
router.post("/buku-tahun-ajaran-baru", bukuController.createTahunAjaranBaruBook);

// route untuk mengupdate buku tahun ajaran baru
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku-tahun-ajaran-baru/1
router.put("/buku-tahun-ajaran-baru/:bukuId", bukuController.updateTahunAjaranBaruBook);

// route untuk menghapus buku tahun ajaran baru
// http://localhost:8080/admin-perpustakaan-methodist-cw/buku-tahun-ajaran-baru/1
router.delete("/buku-tahun-ajaran-baru/:bukuId", bukuController.deleteTahunAjaranBaruBook);

// ROUTES FOR KATEGORI

// route untuk mengambil single kategori
// http://localhost:8080/admin-perpustakaan-methodist-cw/kategori/1
router.get("/kategori/:kategoriId", kategoriController.getKategoriById);

// route untuk mengambil daftar kategori
// http://localhost:8080/admin-perpustakaan-methodist-cw/kategori
router.get("/kategori", kategoriController.getAllKategori);

// LANJUTKAN CRUD KATEGORI DLL (UPDATE, DELETE, CREATE, ETC)

// route untuk menambahkan kategori
// http://localhost:8080/admin-perpustakaan-methodist-cw/kategori
router.post("/kategori", kategoriController.createKategori);

// route untuk mengupdate kategori
// http://localhost:8080/admin-perpustakaan-methodist-cw/kategori/1
router.put("/kategori/:kategoriId", kategoriController.updateKategori);

// route untuk menghapus kategori
// http://localhost:8080/admin-perpustakaan-methodist-cw/kategori/1
router.delete("/kategori/:kategoriId", kategoriController.deleteKategori);

// ROUTES FOR PEMINJAMAN

// ROUTES FOR GURU

// route untuk menambahkan guru
// http://localhost:8080/admin-perpustakaan-methodist-cw/guru
router.post("/guru", guruController.createGuru);

// route untuk mengupdate guru
// http://localhost:8080/admin-perpustakaan-methodist-cw/guru/1
router.put("/guru/:guruId", guruController.updateGuru);

// route untuk menghapus guru
// http://localhost:8080/admin-perpustakaan-methodist-cw/guru/1
router.delete("/guru/:guruId", guruController.deleteGuru);

// route untuk menampilkan satu guru
// http://localhost:8080/admin-perpustakaan-methodist-cw/guru/1
router.get("/guru/:guruId", guruController.getGuru);

// route untuk menampilkan daftar guru
// http://localhost:8080/admin-perpustakaan-methodist-cw/guru
router.get("/guru", guruController.getAllGuru);

// ROUTES FOR AKUN

// route untuk menghapus akun secara multiple
// http://localhost:8080/admin-perpustakaan-methodist-cw/akun
router.delete("/akun", akunController.deleteAkunMultiple);


// route untuk aktivasi akun secara multiple
// http://localhost:8080/admin-perpustakaan-methodist-cw/akun-aktivasi
router.put("/akun-aktivasi", akunController.aktivasiAkunMultiple);


// route untuk menambahkan akun
// http://localhost:8080/admin-perpustakaan-methodist-cw/akun
router.post("/akun", akunController.createAkun);

// route untuk mengupdate akun
// http://localhost:8080/admin-perpustakaan-methodist-cw/akun/1
router.put("/akun/:akunId", akunController.updateAkun);

// route untuk menghapus akun
// http://localhost:8080/admin-perpustakaan-methodist-cw/akun/1
router.delete("/akun/:akunId", akunController.deleteAkun);

// route untuk menampilkan satu akun
// http://localhost:8080/admin-perpustakaan-methodist-cw/akun/1
router.get("/akun/:akunId", akunController.getAkun);

// route untuk menampilkan daftar akun
// http://localhost:8080/admin-perpustakaan-methodist-cw/akun
router.get("/akun", akunController.getAllAkun);

// ROUTES FOR PEMINJAMAN

// route untuk menambahkan peminjaman
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman
router.post("/peminjaman", peminjamanController.createPeminjaman);

// route untuk mengupdate peminjaman
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/1
router.put("/peminjaman/:peminjamanId", peminjamanController.updatePeminjaman);

// route untuk menghapus peminjaman
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/1
router.post("/peminjaman/:peminjamanId", peminjamanController.deletePeminjaman);

// route untuk menampilkan satu peminjaman
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/1
router.get("/peminjaman/:peminjamanId", peminjamanController.getPeminjaman);

// route untuk menampilkan daftar peminjaman
// http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman
router.get("/peminjaman", peminjamanController.getAllPeminjaman);

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

// route untuk menampilkan satu pengembalian
// http://localhost:8080/admin-perpustakaan-methodist-cw/pengembalian/1
router.get("/pengembalian/:pengembalianId", pengembalianController.getPengembalianAdmin);

// route untuk menampilkan daftar pengembalian
// http://localhost:8080/admin-perpustakaan-methodist-cw/pengembalian
router.get("/pengembalian", pengembalianController.getAllPengembalianAdmin);

// ROUTES FOR EVENTS

// route untuk menambahkan event
// http://localhost:8080/admin-perpustakaan-methodist-cw/event
router.post("/event", eventController.createEvent);

// route untuk mengupdate event
// http://localhost:8080/admin-perpustakaan-methodist-cw/event/1
router.put("/event/:eventId", eventController.updateEvent);

// route untuk menghapus event
// http://localhost:8080/admin-perpustakaan-methodist-cw/event/1
router.delete("/event/:eventId", eventController.deleteEvent);

// route untuk menampilkan satu event
// http://localhost:8080/admin-perpustakaan-methodist-cw/event/1
router.get("/event/:eventId", eventController.getEvent);

// route untuk menampilkan daftar event
// http://localhost:8080/admin-perpustakaan-methodist-cw/event
router.get("/event", eventController.getAllEvent);

// ROUTES FOR PESAN MASUK

// route untuk menambahkan pesan masuk
// http://localhost:8080/admin-perpustakaan-methodist-cw/pesan-masuk
router.post("/pesan-masuk", pesanMasukController.createPesanMasuk);

// route untuk mengupdate pesan masuk
// http://localhost:8080/admin-perpustakaan-methodist-cw/pesan-masuk/1
router.put("/pesan-masuk/:pesanMasukId", pesanMasukController.updatePesanMasuk);

// route untuk menghapus pesan masuk
// http://localhost:8080/admin-perpustakaan-methodist-cw/pesan-masuk/1
router.delete("/pesan-masuk/:pesanMasukId", pesanMasukController.deletePesanMasuk);

// route untuk menampilkan satu pesan masuk
// http://localhost:8080/admin-perpustakaan-methodist-cw/pesan-masuk/1
router.get("/pesan-masuk/:pesanMasukId", pesanMasukController.getPesanMasuk);

// route untuk menampilkan daftar pesan masuk
// http://localhost:8080/admin-perpustakaan-methodist-cw/pesan-masuk
router.get("/pesan-masuk", pesanMasukController.getAllPesanMasuk);

// ROUTES FOR ABSENSI

// route untuk menambahkan absensi
// http://localhost:8080/admin-perpustakaan-methodist-cw/absensi
router.post("/absensi", absensiController.createAbsensi);

// route untuk mengupdate absensi
// http://localhost:8080/admin-perpustakaan-methodist-cw/absensi/1
router.put("/absensi/:absensiId", absensiController.updateAbsensi);

// route untuk menghapus absensi
// http://localhost:8080/admin-perpustakaan-methodist-cw/absensi/1
router.delete("/absensi/:absensiId", absensiController.deleteAbsensi);

// route untuk menampilkan satu absensi
// http://localhost:8080/admin-perpustakaan-methodist-cw/absensi/1
router.get("/absensi/:absensiId", absensiController.getAbsensi);

// route untuk menampilkan daftar absensi di tanggal hari ini
// http://localhost:8080/admin-perpustakaan-methodist-cw/absensi-today
router.get("/absensi-today", absensiController.getAbsensiToday);

// route untuk menampilkan daftar absensi
// http://localhost:8080/admin-perpustakaan-methodist-cw/absensi
router.get("/absensi", absensiController.getAllAbsensi);

// route untuk menampilkan banyak pengunjung per hari
// http://localhost:8080/admin-perpustakaan-methodist-cw/pengunjung-harian
router.get("/pengunjung-harian", absensiController.getPengunjungHarian);

// route untuk set waktu_keluar saat absensi berdasarkan nisn
// http://localhost:8080/admin-perpustakaan-methodist-cw/absensi-keluar/1
router.put("/absensi-keluar/:nisn", absensiController.setWaktuKeluar);

// route untuk set waktu_keluar saat absensi berdasarkan id_absensi
// http://localhost:8080/admin-perpustakaan-methodist-cw/absensi-keluar-manual/1
router.put("/absensi-keluar-manual/:absensiId", absensiController.setWaktuKeluarManual);

module.exports = router;
