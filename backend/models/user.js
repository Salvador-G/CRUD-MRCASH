const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa la conexión a la base de datos


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,  
    unique: true,      
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: true,   
  }
}, {
  tableName: 'usuarios',  
  timestamps: false,       
});

module.exports = User;