import express from 'express';
import negociosRoutes from './routes/negocios.routes.js';
import indexRoutes from './routes/index.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use('/api', negociosRoutes, adminRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    })
})

// Configurar CORS para permitir todas las solicitudes (en un entorno de desarrollo local)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Esto permite todas las solicitudes
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

export default app;