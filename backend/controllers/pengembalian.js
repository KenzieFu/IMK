const Pengembalian = require("../models/pengembalian");
const Peminjaman = require("../models/peminjaman");
const { Op } = require("sequelize");
const Buku = require("../models/buku");
const Siswa = require("../models/siswa");
const ViewPeminjamanSelesai = require("../models/viewPeminjamanSelesai");
const Kategori = require("../models/kategori");

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
  console.log(req.id_akun);
  const siswa = await Siswa.findOne({ id_akun: req.id_akun });
  try {
    // const siswa = await Siswa.findOne({
    //   where: {
    //     id_siswa: id_siswa,
    //   },
    // });

    const peminjaman = await Peminjaman.findAll({
      where: {
        id_siswa: siswa.id_siswa,
      },
      include: [
        {
          model: Pengembalian,
          attributes: ["id_pengembalian", "tanggal_pengembalian", "status"],
        },
        {
          model: Buku,
        },
      ],
    });

    res.json({ siswa, peminjaman });
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan satu data pengembalian join dengan tabel peminjaman dan siswa dan buku
exports.getPengembalianAdmin = async function (req, res, next) {
  try {
    const pengembalian = await Pengembalian.findOne({
      where: {
        id_pengembalian: req.params.pengembalianId,
      },
      include: [
        {
          model: Peminjaman,
          // di pemijaman join ke siswa dan buku
          include: [
            {
              model: Siswa,
            },
            {
              model: Buku,
              include: [{ model: Kategori }],
            },
          ],
        },
      ],
    });
    res.json(pengembalian);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan semua data pengembalian join dengan tabel peminjaman dan siswa dan buku
exports.getAllPengembalianAdmin = async function (req, res, next) {
  try {
    const pengembalian = await Pengembalian.findAll({
      include: [
        {
          model: Peminjaman,
          include: [{ model: Siswa }, { model: Buku, include: [{ model: Kategori }] }],
        },
      ],
    });
    res.json(pengembalian);
  } catch (error) {
    next(error);
  }
};




// Function untuk menampilkan data pengembalian berdasarkan user
// id_akun diambil dari jwt user : "id_akun"
exports.getPengembalianById = async function (req, res, next) {
  
  const siswa = await Siswa.findOne({ id_siswa: req.params.idAkun });
  try {
    // const siswa = await Siswa.findOne({
    //   where: {
    //     id_siswa: id_siswa,
    //   },
    // });

    const peminjaman = await Peminjaman.findAll({
      where: {
        id_siswa: siswa.id_siswa,
      },
      include: [
        {
          model: Pengembalian,
          attributes: ["id_pengembalian", "tanggal_pengembalian", "status"],
        },
        {
          model: Buku,
        },
      ],
    });

    res.json({ siswa, peminjaman });
  } catch (error) {
    next(error);
  }
};
