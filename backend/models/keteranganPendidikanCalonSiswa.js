const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const KeteranganPendidikanCalonSiswa = sequelize.define(
  "keterangan_pendidikan_calon_siswa",
  {
    id_calon: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    nisn: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    nama_sekolah_sebelumnya: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    diterima_di_kelas: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    no_ijazah: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    tgl_ijazah: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "keterangan_pendidikan_calon_siswa",
    timestamps: false,
  }
);

module.exports = KeteranganPendidikanCalonSiswa;
