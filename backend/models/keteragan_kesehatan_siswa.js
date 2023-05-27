const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Siswa = require("./siswa");

const KeteraganKesehatanSiswa = sequelize.define(
  "keteragan_kesehatan_siswa",
  {
    id_siswa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Siswa,
        key: "id_siswa",
      },
    },
    golongan_darah: {
      type: DataTypes.ENUM("O", "A", "B", "AB"),
      allowNull: false,
    },
    berat_badan: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    tinggi_badan: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    penyakit_dulu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cacat_jasmani: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "keteragan_kesehatan_siswa",
    timestamps: false,
  }
);

KeteraganKesehatanSiswa.belongsTo(Siswa, { foreignKey: "id_siswa" });

module.exports = KeteraganKesehatanSiswa;
