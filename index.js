


const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();


// Crear servidor de express

const app = express();

// Base de Datos

dbConnection();

// cors

app.use( cors());

// Directorio publico

app.use( express.static('public'));

// Lectura y Parseo del Body

app.use( express.json() );


// Rutas
app.use('/api/auth', require('./routes/auth_route'));

app.use('/api/events', require('./routes/events_route'));

// Escuchar peticion

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

