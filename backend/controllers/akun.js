const Akun = require("../models/akun");
// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Function untuk menambahkan akun
exports.createAkun = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
    // {
    //   "id_akun": "6",
    //   "username": "username",
    //   "password": "rahasia1",
    //   "hak_akses": "Siswa"
    // }
  // bycrypt password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  req.body.password = hashedPassword;
  try {
    const akun = await Akun.create(req.body);
    res.json(akun);
  }
  catch (error) {
    next(error);
  }

};

// Function untuk mengubah data akun
exports.updateAkun = async function (req, res, next) {
  try {
    const akun = await Akun.update(req.body, {
      where: {
        id_akun: req.params.akunId,
      },
    });
    res.json(akun);
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data akun
exports.deleteAkun = async function (req, res, next) {
  try {
    const akun = await Akun.destroy({
      where: {
        id_akun: req.params.akunId,
      },
    });
    res.json(akun);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan data satu akun
exports.getAkun = async function (req, res, next) {
  try {
    const akun = await Akun.findByPk(req.params.akunId);
    res.json(akun);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan semua akun
exports.getAllAkun = async function (req, res, next) {
  try {
    const akun = await Akun.findAll();
    res.json(akun);
  } catch (error) {
    next(error);
  }
};
