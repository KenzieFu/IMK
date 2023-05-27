const PesanMasuk = require("../models/pesanMasuk");

// Function untuk membuat pesan masuk baru
exports.createPesanMasuk = async (req, res, next) => {
  // contoh data yang dikirimkan:
  // {
  //     "nama_lengkap": "Rizky",
  //     "email": "rizky@gmail",
  //     "no_hp": "081234567890",
  //     "subjek": "Pesan masuk",
  //     "pesan": "Halo, saya ingin bertanya"
  // }
  try {
    const { nama, email, no_HP, subjek, pesan } = req.body;
    console.log(email)
    const pesanMasuk = await PesanMasuk.create({
      nama_lengkap: nama,
      email: email,
      no_hp: no_HP,
      subjek: subjek,
      pesan: pesan,
    });
    res.status(201).json({
      status: "success",
      message: "Pesan masuk berhasil dibuat",
      data: pesanMasuk,
    });
  } catch (error) {
    next(error);
  }
};

// Function untuk mengupdate pesan masuk
exports.updatePesanMasuk = async (req, res, next) => {
  // contoh data yang dikirimkan:
  // {
  //     "nama_lengkap": "Rizky",
  //     "email": "rizky@gmail",
  //     "no_hp": "081234567890",
  //     "subjek": "Pesan masuk",
  //     "pesan": "Halo, saya ingin bertanya"
  // }
  try {
    const { nama_lengkap, email, no_hp, subjek, pesan } = req.body;
    const pesanMasuk = await PesanMasuk.update(
      {
        nama_lengkap: nama_lengkap,
        email: email,
        no_hp: no_hp,
        subjek: subjek,
        pesan: pesan,
      },
      {
        where: {
          id_pesan_masuk: req.params.pesanMasukId,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Pesan masuk berhasil diupdate",
      data: pesanMasuk,
    });
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus pesan masuk
exports.deletePesanMasuk = async (req, res, next) => {
  try {
    const pesanMasuk = await PesanMasuk.destroy({
      where: {
        id_pesan_masuk: req.params.pesanMasukId,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Pesan masuk berhasil dihapus",
      data: pesanMasuk,
    });
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan single pesan masuk
exports.getPesanMasuk = async (req, res, next) => {
  try {
    const pesanMasuk = await PesanMasuk.findByPk(req.params.pesanMasukId);
    res.status(200).json({
      status: "success",
      message: "Pesan masuk berhasil didapatkan",
      data: pesanMasuk,
    });
  } catch (error) {
    next(error);
  }
};

// Function untuk mendapatkan semua pesan masuk
exports.getAllPesanMasuk = async (req, res, next) => {
  try {
    const pesanMasuk = await PesanMasuk.findAll();
    res.status(200).json({
      status: "success",
      message: "Semua pesan masuk berhasil didapatkan",
      data: pesanMasuk,
    });
  } catch (error) {
    next(error);
  }
};
