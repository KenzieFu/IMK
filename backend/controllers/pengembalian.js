const Pengembalian = require("../models/pengembalian");
const Peminjaman = require("../models/peminjaman");
const { Op } = require("sequelize");
const Buku = require("../models/buku");

// Function untuk menambahkan pengembalian
exports.createPengembalian = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  // {
  //   "id_pengembalian": "1234567890",
  //   "id_peminjaman": "1234567890",
  //   "tanggal_pengembalian": "2020-12-12",
  //   "status": "Tepat Waktu"
  // }
  try {
    const pengembalian = await Pengembalian.create(req.body);

    // menghapus data peminjaman dengan id_peminjaman yang sama
    await Peminjaman.destroy({
      where: {
        id_peminjaman: req.body.id_peminjaman,
      },
    });
    res.json(pengembalian);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengubah data pengembalian
exports.updatePengembalian = async function (req, res, next) {
  try {
    const pengembalian = await Pengembalian.update(req.body, {
      where: {
        id_pengembalian: req.params.pengembalianId,
      },
    });
    res.json(pengembalian);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data pengembalian
exports.deletePengembalian = async function (req, res, next) {
  try {
    const pengembalian = await Pengembalian.destroy({
      where: {
        id_pengembalian: req.params.pengembalianId,
      },
    });
    res.json(pengembalian);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan data pengembalian berdasarkan user yang login
// id_akun diambil dari jwt user : "id_akun"
exports.getPengembalian = async function (req, res, next) {
  try {
    // Ambil id_akun dari JWT user
    // const { id_akun } = req.user;

    // Cari peminjaman yang dilakukan oleh siswa dengan id_akun tersebut
    const peminjaman = await Peminjaman.findAll({
      where: {
        // id_siswa: id_akun,
        id_siswa: 5,
      },
    });
    

    // // Ambil semua id_peminjaman dari peminjaman yang ditemukan
    const id_peminjaman = peminjaman.map((p) => p.id_peminjaman);

    // // Cari data pengembalian yang memiliki id_peminjaman yang sama
    const pengembalian = await Pengembalian.findAll({
      where: {
        id_peminjaman: {
          [Op.in]: id_peminjaman,
        },
      },
    });

    // ambil semua id_peminjaman lihat ke tabel peminjaman dan ambil id_buku
    const id_buku = peminjaman.map((p) => p.id_buku);

    // ambil semua data buku yang dipinjam dan sudah dikembalikan
    const buku = await Buku.findAll({
      where: {
        id_buku: {
          [Op.in]: id_buku,
        },
      },
    });

    // // Kirim data pengembalian sebagai respons
    res.json(buku);
  } catch (error) {
    next(error);
  }
};

