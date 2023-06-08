const Peminjaman = require("../models/peminjaman");
const Siswa = require("../models/siswa");
const Buku = require("../models/buku");
const Pengembalian = require("../models/pengembalian");
const BukuPerpus = require("../models/bukuPerpus");
const { Op } = require("sequelize");
const Kategori = require("../models/kategori");
const { response } = require("express");
// Function untuk menambahkan peminjaman
exports.createPeminjaman = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  const { id_buku, id_siswa } = req.body;
  //   "id_peminjaman": "1234567890",
  //   "id_buku": "1234567890",
  //   "id_siswa": "1234567890",
  //   "tanggal_pinjam": "2020-12-10",
  //   "tanggal_kembali": "2020-12-12"
  // }
  // tanggal kembali dibuat otomatist 14 hari setelah tanggal pinjam
  try {
    // cek stok buku di tabel buku_perpus dengan id_buku
    const buku = await BukuPerpus.findByPk(id_buku);
    console.log(buku);
    if (buku === null) {
      return res.status(400).json({ message: "Buku tidak ditemukan" });
    } else if (buku.stok === 0) {
      return res.status(400).json({ message: "Stok buku kosong" });
    }
    const peminjaman = await Peminjaman.create({
      id_buku: id_buku,
      id_siswa: id_siswa,
      tanggal_pinjam: new Date(),
      tanggal_kembali: new Date().setDate(new Date().getDate() + 14),
    });
    // kurangi stok buku di tabel buku_perpus dengan id_buku
    buku.stok = buku.stok - 1;
    await buku.save();

    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengubah data peminjaman
exports.updatePeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await Peminjaman.update(req.body, {
      where: {
        id_peminjaman: req.params.peminjamanId,
      },
    });
    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data peminjaman
exports.deletePeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await Peminjaman.findOne({ where: { id_peminjaman: req.params.peminjamanId } });
    // tentukan status pengembalian jika lebih dari tangga_kembali maka 'Terlambat' jika tidak 'Tepat Waktu'
    let status = "";
    if (new Date() > peminjaman.tanggal_kembali) {
      status = "Terlambat";
    }
    status = "Tepat Waktu";

    const pengembalian = await Pengembalian.create({
      id_peminjaman: req.params.peminjamanId,
      tanggal_pengembalian: new Date(),
      status: status,
    });
    const buku =await BukuPerpus.findByPk(peminjaman.id_buku);
    buku.stok=buku.stok+1;
    await buku.save();
    res.json({ message: "Peminjaman berhasil dihapus", pengembalian: pengembalian });
    // tambahkan ke tabel pengembalian
    // pengembalianController.createPengembalian(req, res, next);
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan semua data peminjaman join dengan tabel siswa dan buku
exports.getAllPeminjaman = async function (req, res, next) {
  try {
    // ambil semua id_peminjaman di tabel pengembalian
    const idPeminjaman = await Pengembalian.findAll({ attributes: ["id_peminjaman"] });
    // ambil data yang tidak ada di idPeminjaman
    console.log(idPeminjaman.length);
    const peminjaman = await Peminjaman.findAll({
      include: [
        {
          model: Siswa,
          as: "siswa",
        },
        {
          model: Buku,
          as: "buku",
          include: [{ model: Kategori }],
        },
      ],
    });
    // filter data peminjaman yang id_peminjaman tidak ada di idPeminjaman
    const idPeminjamanSelesai = idPeminjaman.map((p) => p.id_peminjaman);
    const peminjamanBelumSelesai = peminjaman.filter((p) => !idPeminjamanSelesai.includes(p.id_peminjaman));
    res.json(peminjamanBelumSelesai);
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan data satu peminjaman join dengan tabel siswa dan buku
exports.getPeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await Peminjaman.findOne({
      where: {
        id_peminjaman: req.params.peminjamanId,
      },
      include: [
        {
          model: Siswa,
          as: "siswa",
        },
        {
          model: Buku,
          as: "buku",
        },
      ],
    });
    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan data peminjaman berdasarkan user dan belum selesai di pinjam
exports.getPeminjamanByUser = async function (req, res, next) {
  console.log(req.id_akun);
  const siswa = await Siswa.findOne({ where: { id_akun: req.id_akun } });
  try {
    const peminjaman = await Peminjaman.findAll({
      where: {
        id_siswa: siswa.id_siswa,
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
    res.json(peminjamanBelumSelesai);
    // eror perbaiki lagi
    // const peminjaman = await ViewPeminjamanBelumSelesai.findAll({
    //   where: {
    //     id_siswa: 2,
    //   },
    //   include: [
    //     {
    //       model: Buku,
    //       as: "buku",
    //     },
    //     {
    //       model: Siswa,
    //       as: "siswa",
    //     },
    //   ],
    // });
    // res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan histori peminjaman berdasarkan user
exports.getHistoriPeminjaman = async function (req, res, next) {
  try {
    const peminjaman = await Peminjaman.findAll({ where: { id_siswa: 5 } });

    // Ambil semua id_peminjaman dan masukkan ke dalam array
    const idPeminjaman = peminjaman.map((p) => p.id_peminjaman);

    // Cari semua pengembalian berdasarkan id_peminjaman
    const pengembalian = await Pengembalian.findAll({
      where: {
        id_peminjaman: {
          [Op.in]: idPeminjaman,
        },
      },
      include: [
        {
          model: Peminjaman,
          include: [
            { model: Siswa },
            {
              model: Buku,
              include: { model: Kategori },
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








exports.getPeminjamanByUserId = async function (req, res, next) {
  console.log(`Test :${req.params.idAkun}`);
  const siswa = await Siswa.findOne({ where: { id_siswa: req.params.idAkun } });
  try {
    const peminjaman = await Peminjaman.findAll({
      where: {
        id_siswa: siswa.id_siswa,
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
    res.json(peminjamanBelumSelesai);
    // eror perbaiki lagi
    // const peminjaman = await ViewPeminjamanBelumSelesai.findAll({
    //   where: {
    //     id_siswa: 2,
    //   },
    //   include: [
    //     {
    //       model: Buku,
    //       as: "buku",
    //     },
    //     {
    //       model: Siswa,
    //       as: "siswa",
    //     },
    //   ],
    // });
    // res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};






//Nambahi Peminjaman berdasarkan barcode buku

exports.createPeminjamanBarcode = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  const { barcode, id_siswa } = req.body;
  console.log(barcode)
  console.log(id_siswa)
  //   "id_peminjaman": "1234567890",
  //   "id_buku": "1234567890",
  //   "id_siswa": "1234567890",
  //   "tanggal_pinjam": "2020-12-10",
  //   "tanggal_kembali": "2020-12-12"
  // }
  // tanggal kembali dibuat otomatist 14 hari setelah tanggal pinjam
  try {
    // cek stok buku di tabel buku_perpus dengan id_buku
    const buku = await Buku.findOne({where:{barcode:barcode}});
    const bukuPerpus= await BukuPerpus.findByPk(buku.id_buku)
    console.log(buku);
    if (buku === null) {
      return res.status(501).json({ message: "Buku tidak ditemukan" });
    } else if(bukuPerpus === null)
    {
      return res.status(501).json({message:"Buku Tidak Tersedia dalam perpus"})
    } else if (bukuPerpus.stok === 0) {
      return res.status(501).json({ message: "Stok buku kosong" });
    }



    const peminjamans = await Peminjaman.findAll({
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
    const idPeminjaman = peminjamans.map((p) => p.id_peminjaman);
    const pengembalian = await Pengembalian.findAll({
      where: {
        id_peminjaman: {
          [Op.in]: idPeminjaman,
        },
      },
    });
    const idPeminjamanSelesai = pengembalian.map((p) => p.id_peminjaman);
    const peminjamanBelumSelesai = peminjamans.filter((p) => !idPeminjamanSelesai.includes(p.id_peminjaman));
    console.log(`List Belum Selesai${peminjamanBelumSelesai.map(p=>p)}`)
    const bukuSama=await  peminjamanBelumSelesai.find((item)=>item.buku.barcode ===barcode)
    console.log(`Same :${bukuSama}`);
    const pinjamLength=peminjamanBelumSelesai.length +1;
    console.log(pinjamLength)
    if(bukuSama)
      return res.status(501).json({message:"Buku Saat Ini sedang Dalam masa Peminjaman"})
    if(pinjamLength >3)
      return res.status(501).json({message:"Maksimal Buku Yang bisa Dipinjam (3 Buah)"})
    

   
    const peminjaman = await Peminjaman.create({
      id_buku: buku.id_buku,
      id_siswa: id_siswa,
      tanggal_pinjam: new Date(),
      tanggal_kembali: new Date().setDate(new Date().getDate() + 14),
    });
    // kurangi stok buku di tabel buku_perpus dengan id_buku
    buku.stok = buku.stok - 1;
    await buku.save();

    res.json(peminjaman);
  } catch (error) {
    next(error);
  }
};