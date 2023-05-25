const Siswa = require("../models/siswa");
const Buku = require("../models/buku");
const Kategori = require("../models/kategori");
const Peminjaman = require("../models/peminjaman");
const Pengembalian = require("../models/pengembalian");
const Akun = require("../models/akun");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Function untuk menghapus data siswa secara multiple
// misal id_siswa = [1,2,3,4,5]
// hasilnya semua siswa dengan id_siswa 1,2,3,4,5 akan dihapus
// cth data yang dikirimkan dalam json
// { "id_siswa": [1,2,3,4,5] }
exports.deleteSiswaMultiple = async function (req, res, next) {
  try {
    const siswa = await Siswa.destroy({
      where: {
        id_siswa: {
          [Op.in]: req.body.id_siswa,
        },
      },
    });
    res.json(siswa);
  } catch (error) {
    next(error);
  }
};

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
  //   "email": "john.doe@gmail",
  //   "tahun_masuk": "2023"
  //   }
  // akun : id_akun, username, password, hak_akses, status
  try {
    // bycrypt password
    const hashedPassword = await bcrypt.hash(req.body.nisn, 12);
    req.body.password = hashedPassword;
    const akun = await Akun.create({
      username: req.body.nisn,
      password: req.body.password,
      hak_akses: "Siswa",
      status: "Aktif",
    });
    // siswa : id_siswa, id_akun, nisn, nama_lengkap, jenis_kelamin, tanggal_lahir, tempat_lahir, kelas, agama, alamat, nomor_telepon, email, tahun_masuk
    // create random id_siswa 11 digit
    const id_siswa = Math.floor(Math.random() * 10000000000) + 1;
    const siswa = await Siswa.create({
      id_siswa: id_siswa,
      id_akun: akun.id_akun,
      nisn: req.body.nisn,
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      tanggal_lahir: req.body.tanggal_lahir,
      tempat_lahir: req.body.tempat_lahir,
      kelas: req.body.kelas,
      agama: req.body.agama,
      alamat: req.body.alamat,
      nomor_telepon: req.body.nomor_telepon,
      email: req.body.email,
      tahun_masuk: req.body.tahun_masuk,
    });
    res.json({ siswa, akun });
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
