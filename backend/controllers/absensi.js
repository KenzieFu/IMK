const Absensi = require("../models/absensi");
const Siswa = require("../models/siswa");
const dayjs = require("dayjs");
const { literal } = require("sequelize");
const ViewPengunjungHarian = require("../models/viewPengunjungHarian");

// Function untuk menambahkan absensi
exports.createAbsensi = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  //   {
  //     "nisn": "0118741444",
  //     "waktu_masuk": "07:00:00",
  //     "tanggal": "2023-05-18",
  //     "waktu_keluar": "14:00:00"
  //   }
  try {
    const absensi = await Absensi.create(req.body);
    res.json(absensi);
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
    res.json({ absensi, siswa });
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
    }
    catch (error) {
        next(error);
    }
};
