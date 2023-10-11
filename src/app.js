import express from 'express';
import negociosRoutes from './routes/negocios.routes.js';
import indexRoutes from './routes/index.routes.js';
import adminRoutes from './routes/admin.routes.js';
//import fileUpload from 'express-fileupload';
import {pool} from './db.js';
import {upload} from './multer.js'
import {uploadFile} from './util/uploadFile.js'

const app = express();

app.use(express.json());
//app.use(fileUpload());

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



//INTENTO VIDEO
// prettier-ignore
app.post('/api/negocios', upload.fields([{name: 'imagenNegocio', maxCount:1}, {name: 'imagenRealNegocio', maxCount:1}]), async (req, res) => {
    const { tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, nombreCategoria, horario, latitud, longitud } = req.body;
    let imagenNegocio = req.files.imagenNegocio;
    let imagenRealNegocio = req.files.imagenRealNegocio;

    if (
        imagenNegocio && imagenRealNegocio && // Verifica que los objetos no sean nulos
        imagenNegocio.length > 0 && imagenRealNegocio.length > 0 // Verifica que los arrays tengan elementos
      ) {
        const uploadPromises = [
            uploadFile(imagenNegocio[0]),
            uploadFile(imagenRealNegocio[0])
          ];

          const uploadResults = await Promise.all(uploadPromises);
          const [imagenNegocioResult, imagenRealNegocioResult] = uploadResults;

          imagenNegocio = imagenNegocioResult.downloadURL;
          imagenRealNegocio = imagenRealNegocioResult.downloadURL;

        const [rows] = await pool.query(
            'INSERT INTO negocios (imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud]
          );
        
        
        res.status(201).json({message: 'Negocio creado'})
        
    }

    return res.status(400).json({message: 'No hay imagen'})

})


app.get('/api/negocios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM negocios')
        res.json(rows)
    } catch (error) {        
        res.status(500).json({
            message: 'Error al obtener los negocios'
        })
    }
})

app.get('/api/negocios/id:', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM negocios WHERE id = ?', [req.params.id])

        if(rows.length <= 0) return res.status(404).json({
            message: 'Negocio no encontrado'
        })

        res.json(rows[0])
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el negocio'
        })
    }
})

    






/*
app.post('/api/NegImg', async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'No se enviaron archivos'
            });
        }
  
      const { tituloNegocio, disponible, distancia, descripcion, insignia, tipoNegocio, direccion, nombreCategoria, horario, latitud, longitud } = req.body;
      const { imagenNegocio, imagenCategoria, imagenRealNegocio } = req.files;
  
      // Subir imágenes a Firebase Storage
      const urls = await Promise.all([
        uploadImage(imagenNegocio[0]),
        uploadImage(imagenCategoria[1]),
        uploadImage(imagenRealNegocio[2]),
      ]);
  
      // Almacenar los datos y las URLs en la base de datos
      const [rows] = await pool.query(
        'INSERT INTO firebase (imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [urls[0], tituloNegocio, disponible, distancia, urls[1], descripcion, insignia, tipoNegocio, direccion, urls[2], nombreCategoria, horario, latitud, longitud]
      );
  
      res.status(201).json({
        id: rows.insertId,
        imagenNegocio: urls[0],
        tituloNegocio,
        disponible,
        distancia,
        imagenCategoria: urls[1],
        descripcion,
        insignia,
        tipoNegocio,
        direccion,
        imagenRealNegocio: urls[2],
        nombreCategoria,
        horario,
        latitud,
        longitud,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error al crear el negocio',
      });
    }
  });

    

  async function uploadImage(image) {
    const destination = `Imagenes/${Date.now()}_${image.name}`;
    const storage = getStorage(firebaseApp); // Inicializa una instancia de Firebase Storage
    const storageRef = ref(storage, destination);
    try {
        await uploadBytes(storageRef, image.data);
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({
          message: 'Error al crear el negociooo',
        })
        }
    }

    */


/*
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

*/

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    })
})

export default app;