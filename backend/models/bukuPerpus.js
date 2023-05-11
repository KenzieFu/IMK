const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Buku = require("./buku");

const BukuPerpus = sequelize.define("buku_perpus", {
  id_buku: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    reference: {
      model: Buku,
      key: "id_buku",
    },
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { table: "buku_perpus", timestamps: false }
);

Buku.hasOne(BukuPerpus,{foreignKey:"id_buku"})
BukuPerpus.belongsTo(Buku, { foreignKey: "id_buku" });

module.exports = BukuPerpus;
