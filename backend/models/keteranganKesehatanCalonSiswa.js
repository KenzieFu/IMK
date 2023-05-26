const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const KeteranganKesehatanCalonSiswa = sequelize.define(
  "keteragan_kesehatan_calon_siswa",
  {
    id_calon: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    golongan_darah: {
      type: DataTypes.ENUM("O", "A", "B", "AB"),
      allowNull: false,
    },
    berat_badan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tinggi_badan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    penyakit_dulu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cacat_jasmani: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "keteragan_kesehatan_calon_siswa",
    timestamps: false,
  }
);

module.exports = KeteranganKesehatanCalonSiswa;
