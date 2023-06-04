const LogBuku = require('../models/logBuku');
const LogBukuPerpus = require('../models/logBukuPerpus');
const LogBukuThnAjaranBaru = require('../models/logBukuThnAjaranBaru');
const LogPemesananBuku = require('../models/logPemesananBuku');

exports.getLogBuku = (req, res, next) => {
    LogBuku.findAll()
        .then((result) => {
            res.status(200).json({
                message: 'Berhasil mendapatkan semua log buku',
                data: result,
            });
        })
        .catch((err) => {
            next(err);
        });
}

exports.getLogBukuPerpus = (req, res, next) => {
    LogBukuPerpus.findAll({ attributes: ['id_buku', 'riwayat', 'timestamp']})
        .then((result) => {
            res.status(200).json({
                message: 'Berhasil mendapatkan semua log buku perpus',
                data: result,
            });
        })
        .catch((err) => {
            next(err);
        });
}

exports.getLogBukuThnAjaranBaru = (req, res, next) => {
    LogBukuThnAjaranBaru.findAll({ attributes: ["id_buku", "riwayat", "timestamp"] })
      .then((result) => {
        res.status(200).json({
          message: "Berhasil mendapatkan semua log buku tahun ajaran baru",
          data: result,
        });
      })
      .catch((err) => {
        next(err);
      });
}

exports.getLogPemesananBuku = (req, res, next) => {
    LogPemesananBuku.findAll()
        .then((result) => {
            res.status(200).json({
                message: 'Berhasil mendapatkan semua log pemesanan buku',
                data: result,
            });
        })
        .catch((err) => {
            next(err);
        });
}
