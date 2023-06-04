const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const LogPemesananBuku = sequelize.define(
  "log_pemesanan_buku",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    riwayat_pemesanan_buku: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "log_pemesanan_buku",
    timestamps: false,
  }
);

module.exports = LogPemesananBuku;
