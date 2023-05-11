const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Kategori = sequelize.define(
  "kategori",
  {
    id_kategori: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nama_kategori: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "kategori",
    timestamps: false,
  }
);

module.exports = Kategori;
