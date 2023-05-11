const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Peminjaman = require("./peminjaman");

const Pengembalian = sequelize.define(
  "pengembalian",
  {
    id_pengembalian: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_peminjaman: {
      type: DataTypes.INTEGER,
      references: {
        model: Peminjaman,
        key: "id_peminjaman",
      },
    },
    tanggal_pengembalian: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Tepat Waktu", "Terlambat"),
      allowNull: true,
    },
  },
  {
    tableName: "pengembalian",
    timestamps: false,
  }
);

Peminjaman.hasOne(Pengembalian, { foreignKey: "id_peminjaman" });
Pengembalian.belongsTo(Peminjaman, { foreignKey: "id_peminjaman" });

module.exports = Pengembalian;
