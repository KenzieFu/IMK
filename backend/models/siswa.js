const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Akun = require("./akun");

const Siswa = sequelize.define(
  "siswa",
  {
    id_siswa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_akun: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Akun,
        key: "id_akun",
      },
    },
    nisn: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nik: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    no_akte_lahir: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    nama_lengkap: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    jenis_kelamin: {
      type: DataTypes.ENUM("Laki-laki", "Perempuan"),
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tempat_lahir: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    kelas: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    agama: {
      type: DataTypes.ENUM("Islam", "Kristen Protestan", "Kristen Katolik", "Hindu", "Budha"),
      allowNull: false,
    },
    warga_negara: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    anak_ke: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jlh_saudara_kandung: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    alamat: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nomor_telepon: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tahun_masuk: {
      type: DataTypes.INTEGER,
      defaultValue: 2023,
    },
  },
  {
    tableName: "siswa",
    timestamps: false,
  }
);

Siswa.belongsTo(Akun, { foreignKey: "id_akun" });

module.exports = Siswa;
