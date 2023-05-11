const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Siswa = require("./siswa");
const Kasir = require("./kasir");

const NotaPembelianBuku = sequelize.define(
  "nota_pembelian_buku",
  {
    no_faktur: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    id_siswa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Siswa,
        key: "id_siswa",
      },
    },
    id_kasir: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kasir,
        key: "id_kasir",
      },
    },
  },
  {
    tableName: "nota_pembelian_buku",
    timestamps: false,
  }
);

Siswa.hasMany(NotaPembelianBuku, { foreignKey: "id_siswa" });
Kasir.hasMany(NotaPembelianBuku, { foreignKey: "id_kasir" });

module.exports = NotaPembelianBuku;
