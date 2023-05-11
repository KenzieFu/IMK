const Guru = require("../models/guru");

// Function untuk menambahkan guru
exports.createGuru = async function (req, res, next) {
  // contoh data json yang dikirimkan
  // {
  //     "id_guru": "1234567890",
  //     "nip": "1234567890",
  //     "nama_lengkap": "John Doe",
  //     "jenis_kelamin": "Laki-laki",
  //     "tanggal_lahir": "2000-01-01",
  //     "tempat_lahir": "Jakarta",
  //     "agama": "Kristen Protestan",
  //     "pendidikan_terakhir": "S1",
  //     "jabatan": "Guru",
  //     "alamat": "Jl. Jalan No. 1",
  //     "nomor_telepon": "081234567890",
  //     "email": "john.doe@gmail"
  // }
  try {
    const guru = await Guru.create(req.body);
    res.json(guru);
  } catch (error) {
    next(error);
  }
};

// Function untuk mengubah data guru
exports.updateGuru = async function (req, res, next) {
  try {
    const guru = await Guru.update(req.body, {
      where: {
        id_guru: req.params.guruId,
      },
    });
    res.json(guru);
    console.log("Guru berhasil diubah");
  } catch (error) {
    next(error);
  }
};

// Function untuk menghapus data guru
exports.deleteGuru = async function (req, res, next) {
  try {
    const guru = await Guru.destroy({
      where: {
        id_guru: req.params.guruId,
      },
    });
    res.json(guru);
    console.log("Guru berhasil dihapus");
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan data satu guru
exports.getGuru = async function (req, res, next) {
  try {
    const guru = await Guru.findByPk(req.params.guruId);
    res.json(guru);
  } catch (error) {
    next(error);
  }
};

// Function untuk menampilkan data semua guru
exports.getAllGuru = async function (req, res, next) {
  try {
    const guru = await Guru.findAll();
    res.json(guru);
  } catch (error) {
    next(error);
  }
};
