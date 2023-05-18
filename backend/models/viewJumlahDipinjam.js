const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Buku = require("./buku");

const ViewJumlahDipinjam = sequelize.define(
  "view_jumlah_dipinjam",
  {
    id_buku: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    judul_buku: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    jumlah_pinjam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "view_jumlah_pinjam",
    timestamps: false,
  }
);

ViewJumlahDipinjam.hasOne(Buku, { foreignKey: "id_buku" });

module.exports = ViewJumlahDipinjam;
