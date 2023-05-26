const Buku = require("../models/buku");
const Kategori = require("../models/kategori");
const BukuPerpus = require("../models/bukuPerpus");
const BukuTahunAjaranBaru = require("../models/bukuTahunAjaranBaru");
const { Op } = require("sequelize");
const ViewJumlahDipinjamin = require("../models/viewJumlahDipinjam");
// import fs from "fs";
// import path from "path";
const path = require("path");
const fs = require("fs");

// Function untuk menghapus data buku secara multiple
// misal id_buku = [1,2,3,4,5]
// hasilnya semua buku dengan id_buku 1,2,3,4,5 akan dihapus
// cth data yang dikirimkan dalam json
// { "id_buku": [1,2,3,4,5] }
exports.deleteBookMultiple = async function (req, res, next) {
  try {
    const buku = await Buku.destroy({
      where: {
        id_buku:{ [Op.in]: req.body.id_buku },
      },
    });
    res.json(buku);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan daftar banyak buku dipinjam
exports.getJumlahDipinjam = async function (req, res, next) {
  try {
    const jumlahDipinjam = await ViewJumlahDipinjamin.findAll({
      include: Buku,
    });
    res.json(jumlahDipinjam);
  } catch (error) {
    next(error);
  }
};

// Function untuk
exports.getJumlahDipinjamById = async function (req, res, next) {
  try {
    const jumlahDipinjam = await ViewJumlahDipinjamin.findByPk(req.params.bukuId, {
      include: Buku,
    });
    res.json(jumlahDipinjam);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan detail buku khusus buku perpus
exports.getPerpusBook = async function (req, res, next) {
  const bukuId = req.params.bukuId;
  try {
    const book = await BukuPerpus.findByPk(bukuId, {
      include: Buku,
    });
    if (!book) {
      const error = new Error("Buku tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Buku berhasil ditemukan",
      data: book,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Function untuk menampilkan detail buku khusus buku tahun ajaran baru
exports.getTahunAjaranBaruBook = async function (req, res, next) {
  const bukuId = req.params.bukuId;
  try {
    const book = await BukuTahunAjaranBaru.findByPk(bukuId, {
      include: Buku,
    });

    if (!book) {
      const error = new Error("Buku tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Buku berhasil ditemukan",
      data: book,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Function untuk menambahkan buku
exports.createBook = async function (req, res, next) {
  try {
    
    console.log(req.body);
    console.log(req.file)
    if (!req.file) {
      const error = new Error("Tidak ada gambar yang terupload");
      error.statusCode = 422;
      throw error;
    }

    const { id_buku, judul_buku, pengarang, penerbit, tahun_terbit, id_kategori, sinopsis, isbn } = req.body;
    const gambar_buku = req.file.path.replace("\\", "/");

    const book = await Buku.create({
      id_buku: id_buku,
      judul_buku: judul_buku,
      pengarang: pengarang,
      penerbit: penerbit,
      tahun_terbit: tahun_terbit,
      id_kategori: id_kategori,
      sinopsis: sinopsis,
      gambar_buku: gambar_buku,
      isbn: isbn,
    });
    res.json(book);
  } catch (error) {
    next(error);
  }
};


// Function untuk mengubah data buku
exports.updateBook = async function (req, res, next) {
  try {
    const book = await Buku.update(req.body, {
      where: {
        id_buku: req.params.bukuId,
      },
    });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data buku
exports.deleteBook = async function (req, res, next) {
  try {
    const book = await Buku.destroy({
      where: {
        id_buku: req.params.bukuId,
      },
    });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengambil daftar buku
exports.getBooks = async function (req, res, next) {
  try {
    const books = await Buku.findAll({
      include: [{ model: Kategori }],
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengambil daftar buku perpus
exports.getPerpusBooks = async function (req, res, next) {
  try {
    const books = await BukuPerpus.findAll({
      include: [
        {
          model: Buku,
          include: [{ model: Kategori }],
        },
      ],
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
};


// Function untuk mengambil daftar buku tahun ajaran baru
exports.getTahunAjaranBaruBooks = async function (req, res, next) {
  try {
    const books = await BukuTahunAjaranBaru.findAll({
      include: [{ model: Buku }],
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengambil single book
exports.getBook = async function (req, res, next) {
  try {
    const book = await Buku.findByPk(req.params.bukuId, {
      include: [{ model: Kategori }],
    });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Function untuk search buku
exports.searchBook = async function (req, res, next) {
  console.log("ini pencarian");
  console.log(req.query.keyword);
  try {
    const keyword = req.query.keyword.toLowerCase();
    const keywords = keyword.split(" ");

    const whereCondition = {
      [Op.or]: [
        { judul_buku: { [Op.like]: `%${keyword}%` } },
        { pengarang: { [Op.like]: `%${keyword}%` } },
        { penerbit: { [Op.like]: `%${keyword}%` } },
        { tahun_terbit: { [Op.like]: `%${keyword}%` } },
        { sinopsis: { [Op.like]: `%${keyword}%` } },
        { isbn: { [Op.like]: `%${keyword}%` } },
      ].concat(
        keywords.map((keyword) => ({
          [Op.or]: [
            { judul_buku: { [Op.like]: `%${keyword}%` } },
            { pengarang: { [Op.like]: `%${keyword}%` } },
            { penerbit: { [Op.like]: `%${keyword}%` } },
            { tahun_terbit: { [Op.like]: `%${keyword}%` } },
            { sinopsis: { [Op.like]: `%${keyword}%` } },
            { isbn: { [Op.like]: `%${keyword}%` } },
          ],
        }))
      ),
    };

    const books = await Buku.findAll({
      where: whereCondition,
    });

    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan buku berdasarkan kategori
exports.getBookByKategori = async function (req, res, next) {
  try {
    const books = await Buku.findAll({
      where: {
        id_kategori: req.params.kategoriId,
      },
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Function untuk menambahkan buku perpus
exports.createPerpusBook = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  // {
  //   "id_buku": "1234567890",
  //   "stok": "10"
  // }
  try {
    const book = await BukuPerpus.create(req.body);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengubah data buku perpus
exports.updatePerpusBook = async function (req, res, next) {
  try {
    const book = await BukuPerpus.update(req.body, {
      where: {
        id_buku: req.params.bukuId,
      },
    });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data buku perpus
exports.deletePerpusBook = async function (req, res, next) {
  try {
    const book = await BukuPerpus.destroy({
      where: {
        id_buku: req.params.bukuId,
      },
    });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Function untuk menambahkan buku tahun ajaran baru
exports.createTahunAjaranBaruBook = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  // {
  //   "id_buku": "10",
  //   "stok": "10",
  //   "harga": 10000
  // }
  try {
    const book = await BukuTahunAjaranBaru.create(req.body);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengubah data buku tahun ajaran baru
exports.updateTahunAjaranBaruBook = async function (req, res, next) {
  try {
    const book = await BukuTahunAjaranBaru.update(req.body, {
      where: {
        id_buku: req.params.bukuId,
      },
    });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data buku tahun ajaran baru
exports.deleteTahunAjaranBaruBook = async function (req, res, next) {
  try {
    const book = await BukuTahunAjaranBaru.destroy({
      where: {
        id_buku: req.params.bukuId,
      },
    });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Function untuk search buku perpus
exports.searchPerpusBook = async function (req, res, next) {
  console.log("ini pencarian");
  console.log(req.query.keyword);
  try {
    const keyword = req.query.keyword.toLowerCase();
    const keywords = keyword.split(" ");

    const whereCondition = {
      [Op.or]: [
        { judul_buku: { [Op.like]: `%${keyword}%` } },
        { pengarang: { [Op.like]: `%${keyword}%` } },
        { penerbit: { [Op.like]: `%${keyword}%` } },
        { tahun_terbit: { [Op.like]: `%${keyword}%` } },
        { sinopsis: { [Op.like]: `%${keyword}%` } },
        { isbn: { [Op.like]: `%${keyword}%` } },
      ].concat(
        keywords.map((keyword) => ({
          [Op.or]: [
            { judul_buku: { [Op.like]: `%${keyword}%` } },
            { pengarang: { [Op.like]: `%${keyword}%` } },
            { penerbit: { [Op.like]: `%${keyword}%` } },
            { tahun_terbit: { [Op.like]: `%${keyword}%` } },
            { sinopsis: { [Op.like]: `%${keyword}%` } },
            { isbn: { [Op.like]: `%${keyword}%` } },
          ],
        }))
      ),
    };

    // ambil semua id_buku ditabel buku perpus
    const bukuPerpus = await BukuPerpus.findAll({
      attributes: ["id_buku"],
    });

    // ambil semua data buku yang id_bukunya ada di tabel buku perpus
    const books = await Buku.findAll({
      where: {
        id_buku: bukuPerpus.map((buku) => buku.id_buku),
        ...whereCondition,
      },
    });

    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Function untuk search buku tahun ajaran baru
exports.searchTahunAjaranBaruBook = async function (req, res, next) {
  try {
    const keyword = req.query.keyword.toLowerCase();
    const keywords = keyword.split(" ");

    const whereCondition = {
      [Op.or]: [
        { judul_buku: { [Op.like]: `%${keyword}%` } },
        { pengarang: { [Op.like]: `%${keyword}%` } },
        { penerbit: { [Op.like]: `%${keyword}%` } },
        { tahun_terbit: { [Op.like]: `%${keyword}%` } },
        { sinopsis: { [Op.like]: `%${keyword}%` } },
        { isbn: { [Op.like]: `%${keyword}%` } },
      ].concat(
        keywords.map((keyword) => ({
          [Op.or]: [
            { judul_buku: { [Op.like]: `%${keyword}%` } },
            { pengarang: { [Op.like]: `%${keyword}%` } },
            { penerbit: { [Op.like]: `%${keyword}%` } },
            { tahun_terbit: { [Op.like]: `%${keyword}%` } },
            { sinopsis: { [Op.like]: `%${keyword}%` } },
            { isbn: { [Op.like]: `%${keyword}%` } },
          ],
        }))
      ),
    };

    // ambil semua id_buku ditabel buku tahun ajaran baru
    const bukuTahunAjaranBaru = await BukuTahunAjaranBaru.findAll({
      attributes: ["id_buku"],
    });

    // ambil semua data buku yang id_bukunya ada di tabel buku perpus
    const books = await Buku.findAll({
      where: {
        id_buku: bukuTahunAjaranBaru.map((buku) => buku.id_buku),
        ...whereCondition,
      },
    });

    res.json(books);
  } catch (error) {
    next(error);
  }
};
