const Peminjaman = require("../models/peminjaman");
const Siswa = require("../models/siswa");
const Buku = require("../models/buku");
const Pengembalian = require("../models/pengembalian");
const { Op } = require("sequelize");
const ViewPeminjamanSelesai = require("../models/viewPeminjamanSelesai");
const ViewPeminjamanBelumSelesai = require("../models/viewPeminjamanBelumSelesai");
// Function untuk menambahkan peminjaman
exports.createPeminjaman = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  // {
  //   "id_peminjaman": "1234567890",
  //   "id_buku": "1234567890",
  //   "id_siswa": "1234567890",
  //   "tanggal_pinjam": "2020-12-10",
  //   "tanggal_kembali": "2020-12-12"
  // }
  try {
    const peminjaman = await Peminjaman.create(req.body);
    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengubah data peminjaman
exports.updatePeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await Peminjaman.update(req.body, {
      where: {
        id_peminjaman: req.params.peminjamanId,
      },
    });
    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data peminjaman
exports.deletePeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await Peminjaman.destroy({
      where: {
        id_peminjaman: req.params.peminjamanId,
      },
    });
    res.json(peminjaman);
    // tambahkan ke tabel pengembalian
    // pengembalianController.createPengembalian(req, res, next);
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan semua data peminjaman join dengan tabel siswa dan buku
exports.getAllPeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await Peminjaman.findAll({
      include: [
        {
          model: Siswa,
          as: "siswa",
        },
        {
          model: Buku,
          as: "buku",
        },
      ],
    });
    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan data satu peminjaman join dengan tabel siswa dan buku
exports.getPeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await Peminjaman.findOne({
      where: {
        id_peminjaman: req.params.peminjamanId,
      },
      include: [
        {
          model: Siswa,
          as: "siswa",
        },
        {
          model: Buku,
          as: "buku",
        },
      ],
    });
    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan data peminjaman berdasarkan user dan belum selesai di pinjam
exports.getPeminjamanByUser = async function (req, res, next) {
  try {
    const peminjaman = await ViewPeminjamanBelumSelesai.findAll({
      where: {
        id_siswa: 2,
      },
      include: [
        {
          model: Buku,
          as: "buku",
        },
        {
          model: Siswa,
          as: "siswa",
        },
      ],
    });
    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan histori peminjaman berdasarkan user
exports.getHistoriPeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await ViewPeminjamanSelesai.findAll({
      where: {
        id_siswa: 5,
      },
      include: [
        {
          model: Buku,
          as: "buku",
        },
        {
          model: Siswa,
          as: "siswa",
        },
      ],
    });
    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};
