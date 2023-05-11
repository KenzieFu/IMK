const Kategori = require("../models/kategori");

// Function untuk mengambil single kategori
exports.getKategoriById = async function (req, res, next) {
  try {
    const kategori = await Kategori.findByPk(req.params.kategoriId);
    res.json(kategori);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan daftar kategori
exports.getAllKategori = async function (req, res, next) {
  try {
    const kategori = await Kategori.findAll();
    res.json(kategori);
  } catch (error) {
    next(error);
  }
};

// Function untuk menambahkan kategori
exports.createKategori = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  // {
  //   "id_kategori": "1234567890",
  //   "nama_kategori": "Kategori A"
  // }
  try {
    const kategori = await Kategori.create(req.body);
    res.json(kategori);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengubah data kategori
exports.updateKategori = async function (req, res, next) {
  try {
    const kategori = await Kategori.update(req.body, {
      where: {
        id_kategori: req.params.kategoriId,
      },
    });
    res.json(kategori);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data kategori
exports.deleteKategori = async function (req, res, next) {
  try {
    const kategori = await Kategori.destroy({
      where: {
        id_kategori: req.params.kategoriId,
      },
    });
    res.json(kategori);
  } catch (error) {
    next(error);
  }
};
