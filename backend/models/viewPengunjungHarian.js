const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const ViewPengunjungHarian = sequelize.define(
  "view_pengunjung_harian",
  {
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jumlah_pengunjung: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "view_pengunjung_harian",
    timestamps: false,
  }
);

module.exports = ViewPengunjungHarian;
