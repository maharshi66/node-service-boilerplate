const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // Change the dialect to 'postgres' for PostgreSQL
    logging: false, // Set to true if you want to see Sequelize logs
  }
);

module.exports = sequelize;
