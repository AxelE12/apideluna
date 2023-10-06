import express from 'express';
import negociosRoutes from './routes/negocios.routes.js';
import indexRoutes from './routes/index.routes.js';
import adminRoutes from './routes/admin.routes.js';
import fileUpload from 'express-fileupload';
import {pool} from './db.js';


import multer from 'multer';

const app = express();

app.use(express.json());
app.use(fileUpload());

// Configura multer para manejar la carga de archivos
const storage = multer.memoryStorage(); // Almacenar las imágenes en memoria
const upload = multer({ storage: storage });

// Ruta PATCH para actualizar el negocio y las imágenes
app.patch('/api/negocios/:id', upload.fields([
    { name: 'imagenNegocio', maxCount: 1 },
    { name: 'imagenRealNegocio', maxCount: 1 },
    { name: 'imagenCategoria', maxCount: 1 },
]), async (req, res) => {
    try {
        const { id } = req.params;
        const {
            tituloNegocio,
            disponible,
            distancia,
            descripcion,
            insignia,
            tipoNegocio,
            direccion,
            nombreCategoria,
            horario,
            latitud,
            longitud
        } = req.body;

        // Verificar si al menos una de las imágenes es válida para actualizar
        const imagenNegocioFile = req.files['imagenNegocio']; // El archivo de imagen subido para imagenNegocio
        const imagenRealNegocioFile = req.files['imagenRealNegocio']; // El archivo de imagen subido para imagenRealNegocio
        const imagenCategoriaFile = req.files['imagenCategoria']; // El archivo de imagen subido para imagenCategoria

        const updateData = {
            tituloNegocio,
            disponible,
            distancia,
            descripcion,
            insignia,
            tipoNegocio,
            direccion,
            nombreCategoria,
            horario,
            latitud,
            longitud
        };

        // Verificar si hay una imagen de negocio para actualizar
        if (imagenNegocioFile) {
            updateData.imagenNegocio = imagenNegocioFile[0].buffer; // Guardar los datos de la imagen en el campo imagenNegocio
        }

        // Verificar si hay una imagen real de negocio para actualizar
        if (imagenRealNegocioFile) {
            updateData.imagenRealNegocio = imagenRealNegocioFile[0].buffer; // Guardar los datos de la imagen en el campo imagenRealNegocio
        }

        // Verificar si hay una imagen de categoría para actualizar
        if (imagenCategoriaFile) {
            updateData.imagenCategoria = imagenCategoriaFile[0].buffer; // Guardar los datos de la imagen en el campo imagenCategoria
        }

        // Actualizar los datos del negocio y las imágenes
        const [result] = await pool.query(
            'UPDATE negocios SET ? WHERE id = ?',
            [updateData, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Negocio no encontrado'
            });
        }

        const [rows] = await pool.query('SELECT * FROM negocios WHERE id = ?', [id]);

        res.json(rows);
    } catch (error) {
        console.error('Error al actualizar el negocio:', error);
        res.status(500).json({
            message: 'Error al actualizar el negocio',
            error: error.message
        });
    }
});









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

app.post('/img', (req, res) => {
    let sampleFile = '';
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No se enviaron archivos');
    }

    sampleFile = req.files.archivo;

    //name, data, size, mimetype
    let sql = `INSERT INTO file(name, data, size, mimetype) VALUES(?, ?, ?, ?)`;
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