const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const PesanMasuk = sequelize.define(
  "pesan_masuk",
  {
    id_pesan_masuk: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_lengkap: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    no_hp: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    subjek: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pesan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "pesan_masuk",
    timestamps: false,
  }
);

module.exports = PesanMasuk;
