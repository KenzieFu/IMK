const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const LogBukuThnAjaranBaru = sequelize.define(
  "log_buku_thn_ajaran_baru",
  {
    id_buku: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    riwayat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "log_buku_thn_ajaran_baru",
    timestamps: false,
  }
);

module.exports = LogBukuThnAjaranBaru;
