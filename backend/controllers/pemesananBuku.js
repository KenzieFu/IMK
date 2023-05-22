const PemesananBuku = require("../models/pemesananBuku");
const Buku = require("../models/buku");
const Siswa = require("../models/siswa");
const Peminjaman = require("../models/peminjaman");
const dayjs = require("dayjs");
const BukuPerpus = require("../models/bukuPerpus");
const { where } = require("sequelize");

// Function untuk menambahkan pemesanan buku
exports.createPemesananBuku = async function (req, res, next) {
  try {
    // cek stok buku di buku_perpus dengan id_buku jika stok 0 maka tidak bisa melakukan pemesanan jika ada kurangi stok buku
    for(const item in req.body)
    {
      let buku = await BukuPerpus.findByPk(item.id_buku);
    if (buku) {
      return res.status(400).json({ message: "Buku tidak ditemukan" });
    } else if (buku.stok === 0) {
      return res.status(400).json({ message: "Stok buku kosong" });
    }
    let pemesananBuku = await PemesananBuku.create({
      id_buku: req.body.id_buku,
      id_siswa: req.body.id_siswa,
      waktu: dayjs().format("HH:mm:ss"),
      tanggal: dayjs().format("YYYY-MM-DD"),
    });

    // kurangi jumlah buku yang dipesan --> udh ada di trigger
    // const buku = await BukuPerpus.findByPk(req.body.id_buku);
    // buku.stok = buku.stok - 1;
    // await buku.save();

    res.json(pemesananBuku);
    }
    
  } catch (error) {
    next(error);
  }
};

// nanti kalau buat buku nya di ambil gk usah kurangg stok lagi
// Function untuk mengubah data pemesanan buku
exports.updatePemesananBuku = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  // {
  //   "id_pemesanan": "1234567890",
  //   "id_buku": "1234567890",
  //   "id_siswa": "1234567890",
  //   "waktu": "2020-12-10",
  //   "tanggal": "2020-12-12"
  // }
  // kalau buku nya berubah maka stok buku sebelumnya di tambah dan yang baru di kurang
  try {
    const pemesananBukuData = await PemesananBuku.findOne({ where: { id_pemesanan: req.params.pemesananBukuId } });
    const buku_old = await BukuPerpus.findByPk(pemesananBukuData.id_buku);
    buku_old.stok = buku_old.stok + 1;
    await buku_old.save();
    const buku_new = await BukuPerpus.findByPk(req.body.id_buku);
    buku_new.stok = buku_new.stok - 1;
    await buku_new.save();

    // update data pemesanan buku
    const update_data = await PemesananBuku.update(req.body, {
      where: {
        id_pemesanan: req.params.pemesananBukuId,
      },
    });
    res.json(update_data);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data pemesanan buku
exports.deletePemesananBuku = async function (req, res, next) {
  try {
    const dataPemesananBuku = await PemesananBuku.findOne({ where: { id_pemesanan: req.params.pemesananBukuId } });
    console.log(dataPemesananBuku);
    const bukuPerpus = await BukuPerpus.findOne({ where: { id_buku: dataPemesananBuku.id_buku } });

    const peminjaman = await Peminjaman.create({
      id_buku: dataPemesananBuku.id_buku,
      id_siswa: dataPemesananBuku.id_siswa,
      tanggal_pinjam: new Date(),
      tanggal_kembali: new Date().setDate(new Date().getDate() + 14),
    });

    const pemesananBuku = await PemesananBuku.destroy({
      where: {
        id_pemesanan: req.params.pemesananBukuId,
      },
    });

    res.json({ pemesananBuku: pemesananBuku, peminjaman: peminjaman });
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan daftar pemesanan buku
exports.getAllPemesananBuku = async function (req, res, next) {
  try {
    // ditabel pemesanan buku join ke tabel buku dan siswa
    const pemesananBuku = await PemesananBuku.findAll({
      include: [
        {
          model: Buku,
        },
        {
          model: Siswa,
        },
      ],
    });
    res.json(pemesananBuku);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan daftar pemesanan buku berdasarkan id_pemesanan
exports.getPemesananBuku = async function (req, res, next) {
  try {
    // ditabel pemesanan buku join ke tabel buku dan siswa
    const pemesananBuku = await PemesananBuku.findByPk(req.params.pemesananBukuId, {
      include: [
        {
          model: Buku,
        },
        {
          model: Siswa,
        },
      ],
    });
    res.json(pemesananBuku);
  } catch (error) {
    next(error);
  }
};

// Function untuk membatalkan pemesanan buku
exports.batalPemesananBuku = async function (req, res, next) {
  try {
    // tambah stok buku di tabel buku_perpus dengan id_buku
    const pemesananBukuData = await PemesananBuku.findOne({ where: { id_pemesanan: req.params.pemesananBukuId } });
    const buku = await BukuPerpus.findByPk(pemesananBukuData.id_buku);
    const pemesananBuku = await PemesananBuku.destroy({
      where: {
        id_pemesanan: req.params.pemesananBukuId,
      },
    });
    res.json({message: "Pemesanan buku berhasil dibatalkan", pemesananBuku: pemesananBuku, buku: buku});
  } catch (error) {
    next(error);
  }
};
