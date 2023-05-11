const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Buku = require("./buku");
const Siswa = require("./siswa");

const Peminjaman = sequelize.define(
  "peminjaman",
  {
    id_peminjaman: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_buku: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Buku,
            key: "id_buku",
        },
    },
    id_siswa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Siswa,
            key: "id_siswa",
        },
    },
    tanggal_pinjam: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    tanggal_kembali: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "peminjaman",
    timestamps: false,
  }
);

// Relasi dengan tabel buku
Peminjaman.belongsTo(Buku, { foreignKey: "id_buku" });

// Relasi dengan tabel siswa
Peminjaman.belongsTo(Siswa, { foreignKey: "id_siswa" });

module.exports = Peminjaman;
