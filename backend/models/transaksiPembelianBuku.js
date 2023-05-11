const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const NotaPembelianBuku = require("./nota_pembelian_buku");
const Buku = require("./buku");

const TransaksiPembelianBuku = sequelize.define(
  "transaksi_pembelian_buku",
  {
    no_faktur: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      references: {
        model: NotaPembelianBuku,
        key: "no_faktur",
      },
    },
    id_buku: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Buku,
        key: "id_buku",
      },
    },
    jumlah_buku: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "transaksi_pembelian_buku",
    timestamps: false,
  }
);

TransaksiPembelianBuku.belongsTo(Buku, { foreignKey: "id_buku" });
NotaPembelianBuku.hasMany(TransaksiPembelianBuku, { foreignKey: "no_faktur" });

module.exports = TransaksiPembelianBuku;
