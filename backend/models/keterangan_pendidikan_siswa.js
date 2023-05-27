const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Siswa = require("./siswa");

const KeteranganPendidikanSiswa = sequelize.define(
  "keterangan_pendidikan_siswa",
  {
    id_siswa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Siswa,
        key: "id_siswa",
      },
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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "keterangan_pendidikan_siswa",
    timestamps: false,
  }
);

KeteranganPendidikanSiswa.belongsTo(Siswa, { foreignKey: "id_siswa" });

module.exports = KeteranganPendidikanSiswa;
