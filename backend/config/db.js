require('dotenv').config();

const { Sequelize } = require('sequelize');

// Usar las variables de entorno para configurar la conexión
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nombre de la base de datos
  process.env.DB_USER,      // Usuario de la base de datos
  process.env.DB_PASSWORD,  // Contraseña del usuario
  {
    host: process.env.DB_HOST,   // Dirección del servidor de base de datos
    dialect: process.env.DB_DIALECT, // Tipo de base de datos (mysql)
    logging: false,               // Si quieres ver las consultas SQL en la consola
  }
);

module.exports = sequelize;