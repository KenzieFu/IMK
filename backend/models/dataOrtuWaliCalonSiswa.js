const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const DataOrtuWaliCalonSiswa = sequelize.define(
  "data_ortu_wali_calon_siswa",
  {
    id_data: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_calon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipe: {
      type: DataTypes.ENUM("Ayah", "Ibu", "Wali"),
      allowNull: false,
    },
    nama_lengkap: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nik: {
      type: DataTypes.BIGINT,
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
    agama: {
      type: DataTypes.ENUM("Islam", "Kristen Protestan", "Kristen Katolik", "Buddha", "Hindu", "Kong Hu Cha"),
      allowNull: false,
    },
    pendidikan_terakhir: {
      type: DataTypes.ENUM("SD", "SMP", "SMA", "S1", "S2", "S3"),
      allowNull: false,
    },
    pekerjaan: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    penghasilan_per_bulan: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("hidup", "meninggal"),
      allowNull: false,
    },
  },
  {
    tableName: "data_ortu_wali_calon_siswa",
    timestamps: false,
  }
);

module.exports = DataOrtuWaliCalonSiswa;
