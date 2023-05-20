const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Siswa = require("./siswa");

const Absensi = sequelize.define(
  "absensi",
  {
    id_absensi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nisn: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Siswa,
        key: "nisn",
      },
    },
    waktu_masuk: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    waktu_keluar: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    tableName: "absensi",
    timestamps: false,
  }
);

Absensi.belongsTo(Siswa, { foreignKey: "nisn" });

module.exports = Absensi;
