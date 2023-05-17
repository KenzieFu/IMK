const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Pengembalian = require("./pengembalian");
const Buku = require("./buku");
const Siswa = require("./siswa");

const ViewPeminjamanBelumSelesai = sequelize.define(
  "view_peminjaman_belum_selesai",
  {
    id_peminjaman: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_buku: {
        // foreign key dari tabel buku
        type: DataTypes.INTEGER,
        allowNull: false,
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
    tableName: "view_peminjaman_belum_selesai",
    timestamps: false,
  }
);

ViewPeminjamanBelumSelesai.hasOne(Pengembalian, { foreignKey: "id_peminjaman" });
ViewPeminjamanBelumSelesai.hasOne(Buku, { foreignKey: "id_buku" });
ViewPeminjamanBelumSelesai.hasOne(Siswa, { foreignKey: "id_siswa" });

module.exports = ViewPeminjamanBelumSelesai;
