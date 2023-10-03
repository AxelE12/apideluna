import express from 'express';
import negociosRoutes from './routes/negocios.routes.js';
import indexRoutes from './routes/index.routes.js';
import adminRoutes from './routes/admin.routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(indexRoutes);
app.use('/api', negociosRoutes, adminRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    })
})


export default app;