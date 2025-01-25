const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rutas
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    // Realizar una consulta simple
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en la consulta');
            return;
        }
        res.json(results); // Mostrar resultados como JSON
    });
});


const PORT = process.env.PORT || 3000;
// Conectar a la base de datos y luego iniciar el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
    app.listen(PORT, () => {
      console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });