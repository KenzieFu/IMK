const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Buku = require("./buku");

const LogBuku = sequelize.define(
  "log_buku",
  {
    id_buku: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
      allowNull: false,
    },
  },
  {
    tableName: "log_buku",
    timestamps: false,
  }
);

Buku.hasMany(LogBuku, { foreignKey: "id_buku" });
LogBuku.belongsTo(Buku, { foreignKey: "id_buku" });

module.exports = LogBuku;
