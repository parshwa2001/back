const { Sequelize } = require("sequelize");

const connectDb = async () => {
  const DB = require("./database");
  try {
    const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
      host: process.env.HOST,
      dialect: "mysql",
      port : process.env.DB_PORT
    });
    console.log(`DB CONNECT To ${process.env.DATABASE}` );
  } catch (error) {
    console.log("connection error ", error);
  }
};
module.exports = connectDb;
