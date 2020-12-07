// dotenv lo unico que hace es buscar un archivo .env y 
// registrar todas las variables dentro de el como variables de entorno en process.env.----
require('dotenv').config(); 
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

// instanciar server express 
const app = express();

// config CORS 
// cors() es simplemente un middleware que permite el acceso desde cualquier origen a nuestra API
app.use(cors());
// inicializar BD
dbConnection();


// asignandole un puerto y levantando el sv
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});                                     