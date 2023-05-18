const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Pengembalian = require("./pengembalian");
const Buku = require("./buku");
const Siswa = require("./siswa");


const ViewPeminjamanSelesai = sequelize.define(
  "view_peminjaman_selesai",
  {
    id_peminjaman: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_buku: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_siswa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tanggal_pinjam: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tanggal_kembali: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Selesai", "Belum Selesai"),
      allowNull: false,
    },
  },
  {
    tableName: "view_peminjaman_selesai",
    timestamps: false,
  }
);

ViewPeminjamanSelesai.hasOne(Pengembalian, { foreignKey: "id_peminjaman" });
ViewPeminjamanSelesai.hasOne(Buku, { foreignKey: "id_buku" });
ViewPeminjamanSelesai.hasOne(Siswa, { foreignKey: "id_siswa" });

module.exports = ViewPeminjamanSelesai;
