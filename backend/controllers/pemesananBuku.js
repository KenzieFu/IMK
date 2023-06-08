const PemesananBuku = require("../models/pemesananBuku");
const Buku = require("../models/buku");
const Kategori = require("../models/kategori");
const Siswa = require("../models/siswa");
const Peminjaman = require("../models/peminjaman");
const dayjs = require("dayjs");
const BukuPerpus = require("../models/bukuPerpus");
const { Op, where } = require("sequelize");
const Pengembalian = require("../models/pengembalian");

// Function untuk menampilkan pemesanan buku berdasarkan user yang login
exports.getPemesananBukuByUser = async function (req, res, next) {
  try {
      //Check id




    // ditabel pemesanan buku join ke tabel buku dan siswa
    const pemesananBuku = await PemesananBuku.findAll({
      where: {
        // masih statis nanti kubuat lagi dri token
        id_siswa: 3,
      },
      include: [
        {
          model: Buku,
          include: [{ model: Kategori }],
        },
        {
          model: Siswa,
        },
      ],
    });
    const peminjaman = await Peminjaman.findAll({ where: { id_siswa: 3 }, attributes: ["id_peminjaman"] });
    const idPeminjaman = peminjaman.map((p) => p.id_peminjaman);
    // idPeminjaman = [9, 15]
    // cek idPeminjaman di tabel pengembalian jika tidak ada maka masukkan ke array idPeminjamanBelumSelesai
    const pengembalian = await Pengembalian.findAll({ where: { id_peminjaman: idPeminjaman }, attributes: ["id_peminjaman"] });
    const idPeminjamanSelesai = pengembalian.map((p) => p.id_peminjaman);
    // idPeminjamanSelesai = [9]
    // filter data peminjaman yang id_peminjaman tidak ada di idPeminjaman
    const idPeminjamanBelumSelesai = idPeminjaman.filter((p) => !idPeminjamanSelesai.includes(p));
    // idPeminjamanBelumSelesai = [15]
    const peminjamanBelumSelesai = await Peminjaman.findAll({
      // where in idPeminjamanBelumSelesai karena idPeminjamanBelumSelesai adalah array
      where: { id_peminjaman: { [Op.in]: idPeminjamanBelumSelesai } },
      include: [
        {
          model: Buku,
          include: [{ model: Kategori }],
        },
        {
          model: Siswa,
        },
      ],
    });

    console.log(idPeminjaman);
    console.log(idPeminjamanSelesai);
    console.log(idPeminjamanBelumSelesai);
    res.json({ pemesananBuku: pemesananBuku, peminjaman: peminjamanBelumSelesai });
  } catch (error) {
    next(error);
  }
};

// Function untuk menambahkan pemesanan buku dengan bangak buku sekaligus
exports.createPemesananBukuMultiple = async function (req, res, next) {
  const { id_siswa, id_buku } = req.body;
  const peminjaman = await Peminjaman.findAll({
    where: {
      id_siswa: id_siswa,
    },
    include: [
      {
        model: Buku,
        as: "buku",
        include: [{ model: Kategori }],
      },
      {
        model: Siswa,
        as: "siswa",
      },
    ],
  });
  // filter peminjaman yang belum selesai dengan mencek jika id_peminjaman belum ada ditabel pengembalian
  const idPeminjaman = peminjaman.map((p) => p.id_peminjaman);
  const pengembalian = await Pengembalian.findAll({
    where: {
      id_peminjaman: {
        [Op.in]: idPeminjaman,
      },
    },
  });
  const idPeminjamanSelesai = pengembalian.map((p) => p.id_peminjaman);
  const peminjamanBelumSelesai = peminjaman.filter((p) => !idPeminjamanSelesai.includes(p.id_peminjaman));
  // contoh data yang dikirimkan dalam json
  // {
  //   "id_siswa": 2,
  //   "id_buku": [2, 3]
  // }

  
  // cek dulu id_siswa kalau ada 3 data di tabel peminjaman buku dengan id_siswa yang sama maka tidak bisa melakukan pemesanan
/*   const peminjamanBukuData = await Peminjaman.findAll({ where: { id_siswa: id_siswa } }); */
const pemesananUser = await PemesananBuku.findAll({where:{id_siswa:id_siswa}});
  const sisaBukuDapatDipesan =( 3 - peminjamanBelumSelesai.length -pemesananUser.length) -id_buku.length;
  console.log(id_buku.length)
  console.log(peminjamanBelumSelesai.length)
  console.log(pemesananUser.length)
 

  if (sisaBukuDapatDipesan < 0) {
    console.log("Buku sudah MAXXXX")
    // tambilkan banyak sisa buku yang dapat dipesan
    return res.status(500).json({ message: "Pemesanan buku sudah mencapai batas maksimal, Anda hanya dapat meminjam buku maksimal 3 eksemplar" });
  }
/*   const pemesananBuku= await PemesananBuku.findAll({where:{id_siswa:id_siswa,id_buku:id_buku}})
  if(pemesananBuku.length)
  {
    return res.status(501).json({data:pemesananBuku});
  } */
  // cek ditabel peminjaman dengan id_buku tidak boleh pinjam buku yang sama
  if (id_buku === undefined) {
    return res.status(400).json({ message: "Buku tidak ditemukan" });
  }
  // if (sisaBukuDapatDipesan >= 1 && sisaBukuDapatDipesan <= 3) {
  //   // tambilkan banyak sisa buku yang dapat dipesan
  //   return res.status(400).json({ message: `Anda hanya dapat meminjam buku ${sisaBukuDapatDipesan} eksemplar lagi` });
  //   // return res.status(400).json({ message: "Pemesanan buku sudah mencapai batas maksimal, Anda hanya dapat meminjam buku maksimal 3 eksemplar" });
  // }
  try {
    if (id_buku.length === 0) {
      return res.status(400).json({ message: "Buku tidak ditemukan" });
    }
    // looping untuk membuat pemesanan buku
    for (let i = 0; i < id_buku.length; i++) {
      // cek stok buku di buku_perpus dengan id_buku jika stok 0 maka tidak bisa melakukan pemesanan jika ada kurangi stok buku
      const buku = await BukuPerpus.findByPk(id_buku[i]);
      if (buku === null) {
        return res.status(400).json({ message: "Buku tidak ditemukan" });
      } else if (buku.stok === 0) {
        console.log("Kosong")
        return res.status(502).json({ message: "Stok buku kosong" });
      }
      const pemesananBuku = await PemesananBuku.create({
        id_buku: id_buku[i],
        id_siswa: id_siswa,
        waktu: dayjs().format("HH:mm:ss"),
        tanggal: dayjs().format("YYYY-MM-DD"),
      });
      buku.stok=buku.stok -1;
      
      res.json({
        message: "Pemesanan buku berhasil",
        pemesananBuku: pemesananBuku});
        await buku.save()
    }

  } catch (error) {
    next(error);
  }
};

// Function untuk menambahkan pemesanan buku
exports.createPemesananBuku = async function (req, res, next) {
  // create pemesanan mengambil array 0bject dan looping untuk membuat pemesanan buku
  
  try {
    // cek stok buku di buku_perpus dengan id_buku jika stok 0 maka tidak bisa melakukan pemesanan jika ada kurangi stok buku
    for(const item in req.body)
    {
      const buku = await BukuPerpus.findByPk(item.id_buku);
    if (!buku?.id_buku) {
      return res.status(200).json({ message: "Buku tidak ditemukan" });
    } else if (buku.stok === 0) {
      return res.status(400).json({ message: "Stok buku kosong" });
    }
    let pemesananBuku = await PemesananBuku.create({
      id_buku: req.body.id_buku,
      id_siswa: req.body.id_siswa,
      waktu: dayjs().format("HH:mm:ss"),
      tanggal: dayjs().format("YYYY-MM-DD"),
    });
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
    bukuPerpus.stok=bukuPerpus.stok -1;

    const pemesananBuku = await PemesananBuku.destroy({
      where: {
        id_pemesanan: req.params.pemesananBukuId,
      },
    });
    
    await bukuPerpus.save()
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
    buku.stok= buku.stok+1;
    await buku.save();
    res.json({ message: "Pemesanan buku berhasil dibatalkan", pemesananBuku: pemesananBuku, buku: buku });
  } catch (error) {
    next(error);
  }
};
