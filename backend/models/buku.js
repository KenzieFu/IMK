const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Kategori = require("./kategori");

const Buku = sequelize.define(
  "buku",
  {
    id_buku: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    judul_buku: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    pengarang: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    penerbit: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tahun_terbit: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
    id_kategori: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kategori,
        key: "id_kategori",
      },
    },
    sinopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gambar_buku: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    barcode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "buku",
    timestamps: false,
  }
);

Buku.belongsTo(Kategori, { foreignKey: "id_kategori" });

module.exports = Buku;
