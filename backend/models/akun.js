const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Akun = sequelize.define(
  "akun",
  {
    id_akun: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    hak_akses: {
      type: DataTypes.ENUM("Admin", "Siswa", "Petugas", "Kasir"),
      allowNull: false,
    },
  },
  {
    tableName: "akun",
    timestamps: false,
  }
);



module.exports = Akun;
