const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Buku = require("./buku");

const BukuTahunAjaranBaru = sequelize.define(
  "buku_tahun_ajaran_baru",
  {
    id_buku:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Buku,
        key: "id_buku",
      },
    },
    stok:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga: 
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "buku_tahun_ajaran_baru",
    timestamps: false,
  }
);

BukuTahunAjaranBaru.belongsTo(Buku, { foreignKey: "id_buku" });

module.exports = BukuTahunAjaranBaru;

