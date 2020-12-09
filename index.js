// dotenv lo unico que hace es buscar un archivo .env y registrar todas las variables dentro de el como variables de entorno en process.env.----
require('dotenv').config(); 
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

// instanciar server express 
const app = express();

// config CORS ||  cors() es simplemente un middleware que permite el acceso desde cualquier origen a nuestra API
app.use(cors());

// Lectura y parseo del body de las peticiones
app.use( express.json() );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/buscar', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

// inicializar BD
dbConnection();

// asignandole un puerto y levantando el sv
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});                                     