import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(
//   process.env.DB_NAME, 
//   process.env.DB_USER, 
//   process.env.DB_PASSWORD, 
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'mysql'
//   });

const isProduction = process.env.NODE_ENV === "production";
const _dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};
const dialectOptions = isProduction ? _dialectOptions: {}


const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: dialectOptions
  });

export default sequelize;

