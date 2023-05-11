const Peminjaman = require("../models/peminjaman");

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

// Function untuk mendapatkan semua data peminjaman
exports.getAllPeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await Peminjaman.findAll();
    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan data satu peminjaman
exports.getPeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await Peminjaman.findByPk(req.params.peminjamanId);
    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};
