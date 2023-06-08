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

// Function untuk create siswa secara multiple dari data calon siswa berdasarkan id_calon
// cth data yang dikirimkan dalam json
// { "id_calon": [1,2] }
exports.createSiswaMultiple = async function (req, res, next) {
  try {
    // Get data calon siswa
    const dataCalonSiswa = await DataCalonSiswa.findAll({
      where: {
        id_calon: {
          [Op.in]: req.body.id_calon,
        },
      },

      // Include related tables
      include: [
        {
          model: DataOrtuWaliCalonSiswa,
          as: "data_ortu_wali_calon_siswa",
        },
        {
          model: KeteranganKesehatanCalonSiswa,
          as: "keterangan_kesehatan_calon_siswa",
        },
        {
          model: KeteranganPendidikanCalonSiswa,
          as: "keterangan_pendidikan_calon_siswa",
        },
      ],
    });

    // Create siswa
    const createdSiswa = await Siswa.bulkCreate(
      dataCalonSiswa.map((calon) => {
        return {
          id_siswa: calon.id_calon,
          id_akun: calon.id_calon,
          nisn: calon.nisn,
          nik: calon.nik,
          no_akte_lahir: calon.no_akte_lahir,
          nama_lengkap: calon.nama_lengkap,
          jenis_kelamin: calon.jenis_kelamin,
          tanggal_lahir: calon.tanggal_lahir,
          tempat_lahir: calon.tempat_lahir,
          kelas: calon.kelas,
          agama: calon.agama,
          warga_negara: calon.warga_negara,
          anak_ke: calon.anak_ke,
          jlh_saudara_kandung: calon.jlh_saudara_kandung,
          alamat: calon.alamat,
          nomor_telepon: calon.nomor_telepon,
          email: calon.email,
          tahun_masuk: calon.tahun_masuk,
        };
      })
    );

    // Create ortu_wali_siswa
    const createdOrtuWaliSiswa = await OrtuWaliSiswa.bulkCreate(
      dataCalonSiswa.map((calon) => {
        return {
          id_siswa: calon.id_calon,
          tipe: calon.data_ortu_wali_calon_siswa.tipe,
          nama_lengkap: calon.data_ortu_wali_calon_siswa.nama_lengkap,
          nik: calon.data_ortu_wali_calon_siswa.nik,
          tempat_lahir: calon.data_ortu_wali_calon_siswa.tempat_lahir,
          tanggal_lahir: calon.data_ortu_wali_calon_siswa.tanggal_lahir,
          agama: calon.data_ortu_wali_calon_siswa.agama,
          pendidikan_terakhir: calon.data_ortu_wali_calon_siswa.pendidikan_terakhir,
          pekerjaan: calon.data_ortu_wali_calon_siswa.pekerjaan,
          penghasilan_per_bulan: calon.data_ortu_wali_calon_siswa.penghasilan_per_bulan,
          alamat: calon.data_ortu_wali_calon_siswa.alamat,
          no_hp: calon.data_ortu_wali_calon_siswa.no_hp,
          email: calon.data_ortu_wali_calon_siswa.email,
          status: calon.data_ortu_wali_calon_siswa.status,
        };
      })
    );

    // Create keterangan_kesehatan_siswa
    const createdKeteranganKesehatanSiswa = await KeteranganKesehatanSiswa.bulkCreate(
      dataCalonSiswa.map((calon) => {
        return {
          id_siswa: calon.id_calon,
          golongan_darah: calon.keterangan_kesehatan_calon_siswa.golongan_darah,
          berat_badan: calon.keterangan_kesehatan_calon_siswa.berat_badan,
          tinggi_badan: calon.keterangan_kesehatan_calon_siswa.tinggi_badan,
          penyakit_dulu: calon.keterangan_kesehatan_calon_siswa.penyakit_dulu,
          cacat_jasmani: calon.keterangan_kesehatan_calon_siswa.cacat_jasmani,
        };
      })
    );

    // Create keterangan_pendidikan_siswa
    const createdKeteranganPendidikanSiswa = await KeteranganPendidikanSiswa.bulkCreate(
      dataCalonSiswa.map((calon) => {
        return {
          id_siswa: calon.id_calon,
          nisn: calon.keterangan_pendidikan_calon_siswa.nisn,
          nama_sekolah_sebelumnya: calon.keterangan_pendidikan_calon_siswa.nama_sekolah_sebelumnya,
          diterima_di_kelas: calon.keterangan_pendidikan_calon_siswa.diterima_di_kelas,
          no_ijazah: calon.keterangan_pendidikan_calon_siswa.no_ijazah,
          tgl_ijazah: calon.keterangan_pendidikan_calon_siswa.tgl_ijazah,
        };
      })
    );

    // Response with created data
    res.json({
      siswa: createdSiswa,
      ortu_wali_siswa: createdOrtuWaliSiswa,
      keterangan_kesehatan_siswa: createdKeteranganKesehatanSiswa,
      keterangan_pendidikan_siswa: createdKeteranganPendidikanSiswa,
    });
  } catch (error) {
    next(error);
  }
};



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
    if(!siswa)
    {
      return res.status(501).json({message:"Siswa Tidak Ditemukan"})
    }
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
