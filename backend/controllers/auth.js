const Akun = require("../models/akun");
const Siswa = require("../models/siswa");
const Guru = require("../models/guru");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Kalau mau coba login, coba pake data ini:
// siswa yang id_akun nya 6

// Function untuk login
exports.login = async function (req, res, next) {
  // contoh data yang dikirimkan dalam json
  // {
  //   "username": "tri",
  //   "password": "rahasia1"
  // }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const username = req.body.username;
  const password = req.body.password;

  // join akun dengan table siswa or guru
  try {
    const akun = await Akun.findOne({
      where: {
        username: username,
      },
    });
    
    if (!akun) {
      const error = new Error("Akun tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    if(akun.status !== "Aktif")
    {
      const error = new Error("Akun Belum Aktif");
      error.statusCode = 500;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, akun.password);
    if (!isEqual) {
       
      const error = new Error("Password salah");

      error.statusCode = 401;
      throw error;
    }
    let user;
    if (akun.hak_akses === "Siswa") {
      user = await Siswa.findOne({
        where: {
          id_akun: akun.id_akun,
        },
      });
    } else {
      user = await Guru.findOne({
        where: {
          id_akun: akun.id_akun,
        },
      });
    }
    const token = jwt.sign(
      // contoh data real
      // {
      //   id_akun: 6,
      //   username: "johansen",
      //   hak_akses: "Siswa",
      // }
      {
        id_akun: akun.id_akun,
        username: akun.username,
        hak_akses: akun.hak_akses,
      },
      "rahasia1",
      { expiresIn: "1h" }
    );
    // hasil token : 
    res.status(200).json({
      message: "Login berhasil",
      data: {
        id_akun: akun.id_akun,
        username: akun.username,
        hak_akses: akun.hak_akses,
        user:user,
        accessToken:token,
      },
      token:token,
    });
  } catch (error) {
    next(error);
  }
};

// Function untuk logout
exports.logout = async function (req, res, next) {
  try {
    //  INI SEBENARNYA HARUS DICOBA DI BROWSERNYA LANGSUNG PAKE FRONTEND
    // Reset cookie
    res.clearCookie("jwt");
    // res.clearCookie("token"); // Reset cookie tergantung apa namanya di simpan di bagian browser  nanti cek lagi

    // Hapus header Authorization
    delete req.headers["Authorization"];

    res.status(200).json({
      message: "Logout berhasil",
    });
  } catch (error) {
    next(error);
  }
};

