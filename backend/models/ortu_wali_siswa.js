const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Siswa = require("./siswa");

const OrtuWaliSiswa = sequelize.define(
  "ortu_wali_siswa",
  {
    id_data: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_siswa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Siswa,
        key: "id_siswa",
      },
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tempat_lahir: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
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
      type: DataTypes.INTEGER,
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
    tableName: "ortu_wali_siswa",
    timestamps: false,
  }
);

OrtuWaliSiswa.belongsTo(Siswa, { foreignKey: "id_siswa" });

module.exports = OrtuWaliSiswa;
