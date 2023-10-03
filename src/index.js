import app from './app.js';
import {PORT} from './config.js';

const express = require('express');
const app = express();

// Configurar CORS para permitir todas las solicitudes (en un entorno de desarrollo local)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Esto permite todas las solicitudes
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.listen(PORT);
console.log('Server on port', PORT);