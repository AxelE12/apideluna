import express from 'express';
import negociosRoutes from './routes/negocios.routes.js';
import indexRoutes from './routes/index.routes.js';
import adminRoutes from './routes/admin.routes.js';
import fileUpload from 'express-fileupload';
import {pool} from './db.js';

const app = express();

app.use(express.json());
app.use(fileUpload());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');
    next();
});

app.use(indexRoutes);
app.use('/api', negociosRoutes, adminRoutes);


app.post('/api/NegImg', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            message: 'No se enviaron archivos'
        });
    }

    try {
        const { imagenNegocio, imagenCategoria, imagenRealNegocio } = req.files;
        const { tituloNegocio, disponible, distancia, descripcion, insignia, tipoNegocio, direccion, nombreCategoria, horario, latitud, longitud } = req.body;

        const [rows] = await pool.query(
            'INSERT INTO negocios (imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [imagenNegocio.data, tituloNegocio, disponible, distancia, imagenCategoria.data, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio.data, nombreCategoria, horario, latitud, longitud]
        );

        res.status(201).json({
            id: rows.insertId,
            imagenNegocio: imagenNegocio.data,
            tituloNegocio,
            disponible,
            distancia,
            imagenCategoria: imagenCategoria.data,
            descripcion,
            insignia,
            tipoNegocio,
            direccion,
            imagenRealNegocio: imagenRealNegocio.data,
            nombreCategoria,
            horario,
            latitud,
            longitud
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el negocio'
        });
    }
});






/*
app.post('/api/NegImg', async (req, res) => {
    let sampleFile = '';
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No se enviaron archivos');
    }
    try {
        sampleFile = req.files.archivo;
        
        const {imagenNegocio, imagenCategoria, imagenRealNegocio} = req.files.archivo.data;
        const {tituloNegocio, disponible, distancia, descripcion, insignia, tipoNegocio, direccion, nombreCategoria, horario, latitud, longitud} = req.body;
        const [rows]= await pool.query ('INSERT INTO negocios (imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
            [imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud])
        
        res.send({
            id: rows.insertId, imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el negocio'
        })
    }
});

*/
app.post('/api/imagenRealNegocio', (req, res) => {
    let sampleFile = '';
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No se enviaron archivos');
    }

    sampleFile = req.files.archivo;

    //name, data, size, mimetype
    let sql = `INSERT INTO imagenRealNegocio(name, data, size, mimetype) VALUES(?, ?, ?, ?)`;
      pool.query(sql, [req.files.archivo.name, req.files.archivo.data, req.files.archivo.size, req.files.archivo.mimetype], (error, results, fields) => {
      if(error){
         res.send(error);
      }
      res.json(results);
    });
});


app.post('/api/imagenCategoria', (req, res) => {
    let sampleFile = '';
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No se enviaron archivos');
    }

    sampleFile = req.files.archivo;

    //name, data, size, mimetype
    let sql = `INSERT INTO imagenCategoria(name, data, size, mimetype) VALUES(?, ?, ?, ?)`;
      pool.query(sql, [req.files.archivo.name, req.files.archivo.data, req.files.archivo.size, req.files.archivo.mimetype], (error, results, fields) => {
      if(error){
         res.send(error);
      }
      res.json(results);
    });
});


/*
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