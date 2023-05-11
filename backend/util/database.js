const Sequelize = require("sequelize");

const sequelize = new Sequelize("db_tubes_imk", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
