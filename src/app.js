import express from 'express';
import negociosRoutes from './routes/negocios.routes.js';
import indexRoutes from './routes/index.routes.js';
import adminRoutes from './routes/admin.routes.js';
import {pool} from './db.js';
import {upload} from './multer.js'
import {uploadFile} from './util/uploadFile.js'
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');
    if (req.method === 'OPTIONS') {
        res.status(200).end(); 
    } else {
        next();
    }
});

app.use(indexRoutes);
app.use('/api', negociosRoutes, adminRoutes);


// prettier-ignore
app.post('/api/negocios', upload.fields([{name: 'imagenNegocio', maxCount:1}, {name: 'imagenRealNegocio', maxCount:1}]), async (req, res) => {
    const { tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, nombreCategoria, horario, latitud, longitud } = req.body;
    let imagenNegocio = req.files.imagenNegocio;
    let imagenRealNegocio = req.files.imagenRealNegocio;

    if (
        imagenNegocio && imagenRealNegocio && 
        imagenNegocio.length > 0 && imagenRealNegocio.length > 0 
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
    else{
        return res.status(400).json({message: 'No hay imagen'}) 
    }

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

app.get('/api/negocios/:id', async (req, res) => {
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


app.patch('/api/negocios/:id', upload.fields([{ name: 'imagenNegocio', maxCount: 1 }, { name: 'imagenRealNegocio', maxCount: 1 }]), async (req, res) => {
    const negocioId = req.params.id;
    const {
        tituloNegocio,
        disponible,
        distancia,
        imagenCategoria,
        descripcion,
        insignia,
        tipoNegocio,
        direccion,
        nombreCategoria,
        horario,
        latitud,
        longitud
    } = req.body;
    let imagenNegocio = req.files.imagenNegocio;
    let imagenRealNegocio = req.files.imagenRealNegocio;

    try {
        const selectQuery = 'SELECT imagenNegocio, imagenRealNegocio FROM negocios WHERE id = ?';
        const [currentNegocio] = await pool.query(selectQuery, [negocioId]);

        if (imagenNegocio && imagenNegocio.length > 0) {
            const imagenNegocioResult = await uploadFile(imagenNegocio[0]);
            imagenNegocio = imagenNegocioResult.downloadURL;
        } else {
            imagenNegocio = currentNegocio[0].imagenNegocio;
        }

        if (imagenRealNegocio && imagenRealNegocio.length > 0) {
            const imagenRealNegocioResult = await uploadFile(imagenRealNegocio[0]);
            imagenRealNegocio = imagenRealNegocioResult.downloadURL;
        } else {
            imagenRealNegocio = currentNegocio[0].imagenRealNegocio;
        }

        const updateQuery = `
            UPDATE negocios
            SET imagenNegocio = IFNULL(?, imagenNegocio), tituloNegocio = IFNULL(?, tituloNegocio), disponible = IFNULL(?, disponible), distancia = IFNULL(?, distancia), imagenCategoria = IFNULL(?, imagenCategoria), descripcion = IFNULL(?, descripcion), insignia = IFNULL(?, insignia), tipoNegocio = IFNULL(?, tipoNegocio), direccion = IFNULL(?, direccion), imagenRealNegocio = IFNULL(?, imagenRealNegocio), nombreCategoria = IFNULL(?, nombreCategoria), horario = IFNULL(?, horario), latitud = IFNULL(?, latitud), longitud = IFNULL(?, longitud)
            WHERE id = ?`;

        await pool.query(updateQuery, [imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud, negocioId]);

        res.json({ message: 'Negocio actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el negocio' });
    }
});



app.delete('/api/negocios/:id', async (req, res) => {
    const negocioId = req.params.id;

    try {
        const deleteQuery = 'DELETE FROM negocios WHERE id = ?';
        await pool.query(deleteQuery, [negocioId]);

        res.json({ message: 'Negocio eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el negocio' });
    }
});



app.post('/admin/login', async (req, res) => {
    try {
        const { user, password } = req.body;

        if (!user || !password) {
            return res.status(400).json({ message: 'El usuario y la contraseña son obligatorios' });
        }

        // Obtener los datos del administrador desde la base de datos
        const [rows] = await pool.query('SELECT * FROM admin WHERE user = ?', [user]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const admin = rows[0];
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar un token de autenticación
        const generarToken = (userData) => {
            const token = jwt.sign(userData, 'deluna', { expiresIn: '1m' }); // Token expira en 1 minuto
            return token;
        }

        res.json({ message: 'Inicio de sesión exitoso', generarToken });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
});


const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, 'deluna', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }

        // El token es válido, continúa con la solicitud
        next();
    });
};

// Usar el middleware requireAuth en rutas protegidas
app.get('/ruta_protegida', requireAuth, (req, res) => {
    res.json({ message: 'Acceso permitido a la ruta protegida' });
});







app.get('/recordatorio', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recordatorios')
        res.json(rows)
    } catch (error) {        
        res.status(500).json({
            message: 'Error al obtener los recordatorios'
        })
    }
});

app.post('/recordatorio', async (req, res) => {
    try {
        const { titulo, descripcion, categoria } = req.body;

        if (!titulo) {
            return res.status(400).json({ message: 'El campo "titulo" es obligatorio' });
        }

        const [result] = await pool.query(
            'INSERT INTO recordatorios (titulo, descripcion, categoria) VALUES (?, ?, ?)',
            [titulo, descripcion, categoria]
        );

        res.status(201).json({ message: 'Recordatorio creado con éxito', recordatorioId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el recordatorio', error: error.message });
    }
});



app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    })
})




export default app;