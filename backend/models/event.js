const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Akun = require("./akun");

const Event = sequelize.define(
  "events",
  {
    id_event: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title_event: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content_event: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tanggal_event: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    id_akun: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Akun,
        key: "id_akun",
      },
    },
    status: {
      type: DataTypes.ENUM("Publik", "Privat"),
      allowNull: false,
    },
    tipe: {
      type: DataTypes.ENUM("Siswa", "Guru"),
      allowNull: false,
    },
  },
  {
    tableName: "events",
    timestamps: false,
  }
);

Event.belongsTo(Akun, { foreignKey: "id_akun" });

module.exports = Event;
