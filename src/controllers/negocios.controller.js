import {pool} from '../db.js';

export const getNegocios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM negocios')
        res.json(rows)
    } catch (error) {        
        res.status(500).json({
            message: 'Error al obtener los negocios'
        })
    }
}

export const imgs = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM file')
        res.setHeader('Content-Disposition', `attachment; filename="${rows[0].name}"`);
        res.setHeader('Content-Type', rows[0].mimetype)
        res.json(rows[0].data)
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las imagenes'
        })
    }
}

export const getNegocio = async (req, res) => {
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
}

export const crearNegocio = async (req, res) => {
    try {
        const {imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud} = req.body;
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
}

/*
export const crearNegocio = async (req, res) => {
    try {
        let sampleFile = '';
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).send('No se enviaron archivos');
        }

        sampleFile = req.files.archivo;

        let sql = `INSERT INTO negocios (imagenNegocio) VALUES(?)`;
        pool.query(sql, [req.files.archivo.data]);


        const {tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud} = req.body;
        const [rows]= await pool.query ('INSERT INTO negocios (tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
            [tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud])
        
        res.send({
            id: rows.insertId, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el negocio'
        })
    }
}


*/

export const eliminarNegocio = async (req, res) =>{
    try {
        const [result] = await pool.query('DELETE FROM negocios WHERE id = ?', [req.params.id])

        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Negocio no encontrado'
        })

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el negocio'
        })
    }
}

export const actualizarNegocio = async (req, res) => {
    try {
        const {id} = req.params
        const {imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud} = req.body
    
        const [result] = await pool.query('UPDATE negocios SET imagenNegocio = IFNULL(?, imagenNegocio), tituloNegocio = IFNULL(?, tituloNegocio), disponible = IFNULL(?, disponible), distancia = IFNULL(?, distancia), imagenCategoria = IFNULL(?, imagenCategoria), descripcion= IFNULL(?, descripcion), insignia = IFNULL(?, insignia), tipoNegocio = IFNULL(?, tipoNegocio), direccion = IFNULL(?, direccion), imagenRealNegocio = IFNULL(?, imagenRealNegocio), nombreCategoria = IFNULL(?, nombreCategoria), horario = IFNULL(?, horario), latitud = IFNULL(?, latitud), longitud = IFNULL(?, longitud) WHERE id = ?', [
            imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud, id])
    
            if(result.affectedRows === 0) return res.status(404).json({
                message: 'Negocio no encontrado'
            })
    
            const [rows] = await pool.query('SELECT * FROM negocios WHERE id = ?', [id])
    
            res.json(rows) 
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el negocio'
        })
    }
}


