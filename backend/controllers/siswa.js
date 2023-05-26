const Siswa = require("../models/siswa");
const Buku = require("../models/buku");
const Kategori = require("../models/kategori");
const Peminjaman = require("../models/peminjaman");
const Pengembalian = require("../models/pengembalian");
const Akun = require("../models/akun");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const DataCalonSiswa = require("../models/dataCalonSiswa");
const DataOrtuWaliCalonSiswa = require("../models/dataOrtuWaliCalonSiswa");
const KeteranganKesehatanCalonSiswa = require("../models/keteranganKesehatanCalonSiswa");
const KeteranganPendidikanCalonSiswa = require("../models/keteranganPendidikanCalonSiswa");
const bcryptjs = require("bcryptjs");
const dayjs = require("dayjs");

// Function untuk update status siswa secara multiple dari data calon siswa berdasarkan id_calon
// cth data yang dikirimkan dalam json
// { "id_calon": [1,2,3,4,5] }
// update : status menjadi aktif
// exports.aktivasiSiswaMultiple = async function (req, res, next) {
//   try {
//     // update status siswa
//     const siswa = await DataCalonSiswa.update(
//       {
//         status: req.body.status,
//       },
//       {
//         where: {
//           id_calon: {
//             [Op.in]: req.body.id_calon,
//           },
//         },
//       }
//     );
//     res.json(siswa);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.createSiswaFromCalonSiswa = async function (req, res, next) {
//   const { id_calon } = req.body;

//   try {
//     // Get data calon siswa berdasarkan id_calon
//     const dataCalonSiswa = await DataCalonSiswa.findAll({
//       where: {
//         id_calon: {
//           [Op.in]: id_calon,
//         },
//       },
//     });

//     // Create akun siswa dari data siswa
//     const createdAkunSiswa = await Akun.bulkCreate(
//       createdSiswa.map((siswa) => {
//         return {
//           // id_siswa: siswa.id_siswa,
//           username: siswa.nisn,
//           password: bcryptjs.hashSync(siswa.nisn, 8),
//           role: "Siswa",
//           status: "Aktif",
//         };
//       })
//     );

//     // ambil semua id_akun yang telah dibuat
//     const id_akun = createdAkunSiswa.map((akun) => akun.id_akun);

//     // Create siswa dari data calon siswa :
//     // id_siswa: ID Siswa
//     // id_akun: ID Akun
//     // nisn: NISN (Nomor Induk Siswa Nasional)
//     // nama_lengkap: Nama Lengkap
//     // jenis_kelamin: Jenis Kelamin
//     // tanggal_lahir: Tanggal Lahir
//     // tempat_lahir: Tempat Lahir
//     // kelas: Kelas
//     // agama: Agama
//     // alamat: Alamat
//     // nomor_telepon: Nomor Telepon
//     // email: Email
//     // tahun_masuk: Tahun Masuk (default: 2023)
//     const createdSiswa = await Siswa.bulkCreate(
//       dataCalonSiswa.map((data) => {
//         return {
//           id_siswa: data.id_calon,
//           // id_akun: createdSiswa.id_akun,
//           id_akun: id_akun.shift(),
//           nisn: data.nisn,
//           nama_lengkap: data.nama_calon,
//           jenis_kelamin: data.jenis_kelamin,
//           tanggal_lahir: data.tanggal_lahir,
//           tempat_lahir: data.tempat_lahir,
//           // kelas: data.kelas,
//           agama: data.agama,
//           alamat: data.alamat,
//           nomor_telepon: data.no_hp,
//           email: data.email,
//           tahun_masuk: dayjs().year(),
//         };
//       })
//     );

//     res.status(200).json({ message: "Berhasil membuat siswa dari data calon siswa" });
//   } catch (error) {
//     next(error);
//   }
// };

// Function untuk create data calon siswa dan tabel terkait
// cth data yang dikirimkan dalam json
// {
//   "dataCalonSiswa": {
//     "nama_calon": "John Doe",
//     "nik_calon": 1234567890,
//     "no_akte_lahir": "12345",
//     "tempat_lahir": "Jakarta",
//     "tanggal_lahir": "2005-05-10",
//     "alamat": "Jl. ABC No. 123",
//     "gender": "Laki-laki",
//     "agama": "Islam",
//     "warga_negara": "Indonesia",
//     "anak_ke": 2,
//     "jlh_saudara_kandung": 3,
//     "no_hp": "081234567890",
//     "email": "john.doe@example.com"
//   },
//   "dataOrtuWali": {
//     "tipe": "Ayah",
//     "nama_lengkap": "John Doe Sr.",
//     "nik": 9876543210,
//     "tempat_lahir": "Jakarta",
//     "tanggal_lahir": "1975-03-15",
//     "agama": "Islam",
//     "pendidikan_terakhir": "S1",
//     "pekerjaan": "PNS",
//     "penghasilan_per_bulan": 10000000,
//     "alamat": "Jl. XYZ No. 456",
//     "no_hp": "081234567891",
//     "email": "john.doe.sr@example.com",
//     "status": "hidup"
//   },
//   "keteranganKesehatan": {
//     "golongan_darah": "O",
//     "berat_badan": 60,
//     "tinggi_badan": 170,
//     "penyakit_dulu": "Tidak ada penyakit",
//     "cacat_jasmani": "Tidak ada cacat jasmani"
//   },
//   "keteranganPendidikan": {
//     "nisn": 1234567890,
//     "nama_sekolah_sebelumnya": "SMP ABC",
//     "diterima_di_kelas": "X",
//     "no_ijazah": "1234567",
//     "tgl_ijazah": "2023-05-20"
//   }
// }

exports.createDataCalonSiswa = async function (req, res, next) {
  const { dataCalonSiswa, dataOrtuAyah, dataOrtuIbu, dataOrtuWali, keteranganKesehatan, keteranganPendidikan } = req.body;

  try {
    // Create data calon siswa
    const createdDataCalonSiswa = await DataCalonSiswa.create(dataCalonSiswa);

    // Assign calon siswa ID to related tables
    const idCalon = createdDataCalonSiswa.id_calon;

    // Create data ortu/wali calon siswa
    // kondisi : ayah or ibu or wali
    if (dataOrtuAyah) {
      const createdDataOrtuAyah = await DataOrtuWaliCalonSiswa.create({
        ...dataOrtuAyah,
        id_calon: idCalon,
        tipe: "Ayah",
      });
    }
    if (dataOrtuIbu) {
      const createdDataOrtuIbu = await DataOrtuWaliCalonSiswa.create({
        ...dataOrtuIbu,
        id_calon: idCalon,
        tipe: "Ibu",
      });
    }
    if (dataOrtuWali) {
      const createdDataOrtuWali = await DataOrtuWaliCalonSiswa.create({
        ...dataOrtuWali,
        id_calon: idCalon,
        tipe: "Wali",
      });
    }

    // Create keterangan kesehatan calon siswa
    const createdKeteranganKesehatan = await KeteranganKesehatanCalonSiswa.create({
      ...keteranganKesehatan,
      id_calon: idCalon,
    });

    // Create keterangan pendidikan calon siswa
    const createdKeteranganPendidikan = await KeteranganPendidikanCalonSiswa.create({
      ...keteranganPendidikan,
      id_calon: idCalon,
    });

    // Response with created data
    res.json({
      dataCalonSiswa: createdDataCalonSiswa,
      keteranganKesehatan: createdKeteranganKesehatan,
      keteranganPendidikan: createdKeteranganPendidikan,
    });
  } catch (error) {
    next(error);
  }
};

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
        attributes: ["Judul_Buku", "pengarang", "id_buku", "sinopsis"],
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
    include: [{ model: Buku, attributes: ["Judul_Buku", "id_buku", "gambar_buku"] }],
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
      return Pengembalian.findAll({ where: { id_peminjaman: id_peminjaman } });
    })
    .then((pengembalian) => {
      if (!pengembalian) {
        const error = new Error("Could not find pengembalian.");
        error.statusCode = 404;
        throw error;
      }
      console.log("Pengembalian fetched.");
      console.log(pengembalian);
      res.status(200).json({ message: "Pengembalian fetched.", pengembalian: pengembalian });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
