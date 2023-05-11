const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Buku = require("./buku");

const LogBukuPerpus = sequelize.define(
  "log_buku_perpus",
  {
    id_buku: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Buku,
        key: "id_buku",
      },
    },
    riwayat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "log_buku_perpus",
    timestamps: false,
  }
);

module.exports = LogBukuPerpus;
