const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Buku = require("./buku");
const Siswa = require("./siswa");

const PemesananBuku = sequelize.define(
  "pemesanan_buku",
  {
    id_pemesanan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_buku: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Buku,
        key: "id_buku",
      },
    },
    id_siswa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Siswa,
        key: "id_siswa",
      },
    },
    waktu: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "pemesanan_buku",
    timestamps: false,
  }
);

PemesananBuku.belongsTo(Buku, { foreignKey: "id_buku" });
PemesananBuku.belongsTo(Siswa, { foreignKey: "id_siswa" });

module.exports = PemesananBuku;
