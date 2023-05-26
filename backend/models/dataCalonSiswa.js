const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const DataCalonSiswa = sequelize.define(
  "data_calon_siswa",
  {
    id_calon: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_calon: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nik_calon: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    no_akte_lahir: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    tempat_lahir: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Laki-laki", "Perempuan"),
      allowNull: false,
    },
    agama: {
      type: DataTypes.ENUM("Islam", "Kristen Protestan", "Kristen Katolik", "Buddha", "Hindu", "Kong Hu Chu"),
      allowNull: false,
    },
    warga_negara: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    anak_ke: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jlh_saudara_kandung: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "data_calon_siswa",
    timestamps: false,
  }
);

module.exports = DataCalonSiswa;
