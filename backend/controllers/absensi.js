const Absensi = require("../models/absensi");
const Siswa = require("../models/siswa");
const dayjs = require("dayjs");
const { literal } = require("sequelize");
const { Op } = require("sequelize");
const ViewPengunjungHarian = require("../models/viewPengunjungHarian");

// Function untuk set waktu_keluar sebagai current time di INDONESIA pada absensi berdasarkan nisn siswa
exports.setWaktuKeluar = async function (req, res, next) {
  try {
    // const siswa = await Siswa.findOne({ where: { nisn: req.body.nisn } });
    console.log("ieoasfdhoihefewsdfewsfwsedfwsedf")
    const absensi = await Absensi.update(
      { waktu_keluar: dayjs().format("HH:mm:ss") },
      {
        where: {
          nisn: req.params.nisn,
          // tanggal: dayjs().format("YYYY-MM-DD"),
          waktu_keluar: null,
        },
      }
    );
    if (absensi[0] === 0) {
      res.status(200).json(
        {message:`Gagal,Siswa dengan NIS ${req.params.nisn} Belum Masuk Perpustakaan`,
         absensi:absensi,status:"gagal"}
          );
    }
    res.status(200).json(
      {message:`Sukses, Siswa dengan NIS ${req.params.nisn} Berhasil keluar dari Perpustakaan`,
       absensi:absensi,status:"sukses"}
        );
  } catch (error) {
    next(error);
  }
};

// Function untuk set waktu_keluar manual sebagai current time di INDONESIA pada absensi berdasarkan id_absensi 
exports.setWaktuKeluarManual = async function (req, res, next) {
  try {
    // const siswa = await Siswa.findOne({ where: { nisn: req.body.nisn } });
    const absensi = await Absensi.update(
      { waktu_keluar: dayjs().format("HH:mm:ss") },
      {
        where: {
          id_absensi: req.params.absensiId,
          // tanggal: dayjs().format("YYYY-MM-DD"),
          waktu_keluar: null,
        },
      }
    );
    if (absensi[0] === 0) {
      const error = new Error("Gagal scan keluar, Anda belum scan masuk perpustakaan!");
      error.statusCode = 400;
      throw error;
    }
    res.json(absensi);
  } catch (error) {
    next(error);
  }
};

// Function untuk menambahkan absensi
exports.createAbsensi = async function (req, res, next) {
  try {
    const { nisn,waktu_masuk,tanggal,waktu_keluar } = req.body;

    // Cek jika siswa sudah absen hari ini dan waktu keluar sudah diisi, maka munculkan error "Anda sudah absen hari ini"
    const absensi = await Absensi.findOne({
      where: {
        nisn: nisn,
        // waktu_masuk is not null
        waktu_keluar: null,
      },
    });

    if (absensi) {
      /* const error = new Error("Gagal masuk, Anda belum  keluar perpustakaan!");
      error.statusCode = 400; */
      return res.status(200).json({
        message: `Gagal, Siswa dengan NIS ${nisn} belum  keluar perpustakaan !`,
        data: {nisn, waktu_masuk, tanggal, waktu_keluar},
        status:"gagal"
      })
    }

    const absensiBaru = await Absensi.create({
      nisn: nisn,
      waktu_masuk: dayjs().format("HH:mm:ss"),
      tanggal: dayjs().format("YYYY-MM-DD"),
      waktu_keluar: null,
    });

    res.status(200).json(
      {message:`Siswa dengan NIS ${nisn} masuk ke dalam perpustakaan !`,
       absensiBaru:absensiBaru,status:"sukses"}
        );
  } catch (error) {
    next(error);
  }
};

// Function untuk mengubah data absensi
exports.updateAbsensi = async function (req, res, next) {
  try {
    const absensi = await Absensi.update(req.body, {
      where: {
        id_absensi: req.params.absensiId,
      },
    });
    res.json(absensi);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data absensi
exports.deleteAbsensi = async function (req, res, next) {
  try {
    const absensi = await Absensi.destroy({
      where: {
        id_absensi: req.params.absensiId,
      },
    });
    res.json(absensi);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan satu data absensi (nisn join ke tabel siswa)
exports.getAbsensi = async function (req, res, next) {
  try {
    const absensi = await Absensi.findByPk(req.params.absensiId);
    const siswa = await Siswa.findOne({ where: { nisn: absensi.nisn } });
    res.json({ absensi: absensi, siswa: siswa });
  } catch (error) {
    next(error);
  }
};



// Function untuk menampilkan semua data absensi (nisn join ke tabel siswa)
exports.getAllAbsensi = async function (req, res, next) {
  try {
    const absensi = await Absensi.findAll();
    const siswaPromises = absensi.map((absensi) => {
      return Siswa.findOne({ where: { nisn: absensi.nisn } });
    });
    console.log(siswaPromises);
    const siswa = await Promise.all(siswaPromises);

    const result = absensi.map((absensiItem, index) => {
      return {
        absensi: absensiItem,
        siswa: siswa[index],
      };
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};



// Function untuk menampilkan semua data absensi (nisn join ke tabel siswa) berdasarkan tanggal hari ini
exports.getAbsensiToday = async function (req, res, next) {
  try {
    const today = dayjs().format("YYYY-MM-DD");
    const absensi = await Absensi.findAll({
      where: {
        tanggal: literal(`DATE_FORMAT(tanggal, '%Y-%m-%d') = '${today}'`),
      },
    });
    console.log(absensi);
    const siswaPromises = absensi.map((absensi) => {
      return Siswa.findOne({ where: { nisn: absensi.nisn } });
    });
    const siswa = await Promise.all(siswaPromises);

    const result = absensi.map((absensiItem, index) => {
      return {
        absensi: absensiItem,
        siswa: siswa[index],
      };
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};


// Function untuk menampilkan view pengunjung harian
exports.getPengunjungHarian = async function (req, res, next) {
  // id tidak perlu ditampilkan

  try {
    const pengunjungHarian = await ViewPengunjungHarian.findAll({
      attributes: ["tanggal", "jumlah_pengunjung"],
    });
    res.json(pengunjungHarian);
  } catch (error) {
    next(error);
  }
};
