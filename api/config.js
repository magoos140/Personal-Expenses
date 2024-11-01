const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('personal_expenses', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
