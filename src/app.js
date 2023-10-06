import express from 'express';
import negociosRoutes from './routes/negocios.routes.js';
import indexRoutes from './routes/index.routes.js';
import adminRoutes from './routes/admin.routes.js';
import fileUpload from 'express-fileupload';

const app = express();

app.use(express.json());
app.use(fileUpload());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');
    next();
});

app.use(indexRoutes);
app.use('/api', negociosRoutes, adminRoutes);
/*
app.post('/img', (req, res) => {
    let sampleFile = '';
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No se enviaron archivos');
    }

    sampleFile = req.files.archivo;

    //name, data, size, mimetype
    let sql = `INSERT INTO negocios(imagenNegocio) VALUES(?)`;
      pool.query(sql, [req.files.archivo.data], (error, results, fields) => {
      if(error){
         res.send(error);
      }
      res.json(results);
    });
});

app.get('/img/:id', (req, res) => {
    let sql = `SELECT * FROM file WHERE id = ?`;
      pool.query(sql, [id], (error, results, fields) => {
      if(error){
         res.send(error);
      }
      
      //forza la descarga del archivo
      res.setHeader('Content-Disposition', `attachment; filename="${results[0].name}"`);
      res.setHeader('Content-Type', results[0].mimetype)
      res.send(results[0].data);
    });
});

*/
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    })
})

export default app;