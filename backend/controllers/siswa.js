const Siswa = require("../models/siswa");
const Buku = require("../models/buku");
const Kategori = require("../models/kategori");
const Peminjaman = require("../models/peminjaman");
const Pengembalian = require("../models/pengembalian");

// Function untuk mengambil daftar siswa
exports.getSiswa = async function (req, res, next) {
  try {
    const siswa = await Siswa.findAll();
    res.json(siswa);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengambil detail siswa
exports.getSiswaById = async function (req, res, next) {
  try {
    const siswa = await Siswa.findByPk(req.params.siswaId);
    res.json(siswa);
  } catch (error) {
    next(error);
  }
};

// Function untuk menambahkan siswa
exports.createSiswa = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  // {
  //   "id_siswa": "1234567890",
  //   "nisn": "1234567890",
  //   "nama_lengkap": "John Doe",
  //   "jenis_kelamin": "Laki-laki",
  //   "tanggal_lahir": "2000-01-01",
  //   "tempat_lahir": "Jakarta",
  //   "kelas": "XII",
  //  "agama": "Kristen Protestan",
  //   "alamat": "Jl. Jalan No. 1",
  //   "nomor_telepon": "081234567890",
  //   "email": "john.doe@gmail"
  //   }
  try {
    const siswa = await Siswa.create(req.body);
    res.json(siswa);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengubah data siswa
exports.updateSiswa = async function (req, res, next) {
  try {
    const siswa = await Siswa.update(req.body, {
      where: {
        id_siswa: req.params.siswaId,
      },
    });
    res.json(siswa);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data siswa
exports.deleteSiswa = async function (req, res, next) {
  try {
    const siswa = await Siswa.destroy({
      where: {
        id_siswa: req.params.siswaId,
      },
    });
    res.json(siswa);
  } catch (error) {
    next(error);
  }
};

exports.getProfil = (req, res, next) => {
  const siswaId = req.params.siswaId;

  Siswa.findOne({ ID_Siswa: siswaId })
    .then((siswa) => {
      if (!siswa) {
        const error = new Error("Could not find siswa.");
        error.statusCode = 404;
        throw error;
      }
      console.log("Siswa fetched.");
      console.log(siswa);
      res.status(200).json({ message: "siswa fetched.", siswa: siswa });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getHistoriPeminjaman = (req, res, next) => {
  const siswaId = req.params.siswaId;

  Peminjaman.findAll({
    where: { id_siswa: siswaId },
    include: [
      {
        model: Buku,
        attributes: ["Judul_Buku","pengarang","id_buku",'sinopsis'],
      },
    ],
  })
    .then((peminjaman) => {
      if (!peminjaman) {
        const error = new Error("Could not find peminjaman.");
        error.statusCode = 404;
        throw error;
      }
      console.log("Peminjaman fetched.");
      console.log(peminjaman);
      res.status(200).json({ message: "Peminjaman fetched.", peminjaman: peminjaman });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getHistoriPengembalian = (req, res, next) => {
  const siswaId = req.params.siswaId;

  Peminjaman.findAll({
    where: { id_siswa: siswaId },
    include: [{ model: Buku, attributes: ["Judul_Buku","id_buku","gambar_buku"] }],
  })
    .then((peminjaman) => {
      if (!peminjaman) {
        const error = new Error("Could not find peminjaman.");
        error.statusCode = 404;
        throw error;
       
      }
      console.log("Peminjaman fetched.");
      

      //   res.status(200).json({ message: "Peminjaman fetched.", peminjaman: peminjaman });
      //   return Pengembalian.findAll({ where: { id_peminjaman: peminjaman[0].id_peminjaman } });
      // mapping semua id_peminjaman
      const id_peminjaman = peminjaman.map((item) => item.id_peminjaman);
      console.log(id_peminjaman);
      return Pengembalian.findAll({ where: { id_peminjaman: id_peminjaman },
         });
    })
    .then((pengembalian) => {
      if (!pengembalian) {
        const error = new Error("Could not find pengembalian.");
        error.statusCode = 404;
        throw error;
      }
      console.log("Pengembalian fetched.");
      console.log(pengembalian);
      res.status(200).json({ message: "Pengembalian fetched.",pengembalian:pengembalian  });
    })


    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
