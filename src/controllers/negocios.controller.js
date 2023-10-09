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
        const {tituloNegocio, disponible, distancia, descripcion, insignia, tipoNegocio, direccion, nombreCategoria, horario, latitud, longitud} = req.body;
        const [rows]= await pool.query ('INSERT INTO negocios (tituloNegocio, disponible, distancia, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
            [tituloNegocio, disponible, distancia, descripcion, insignia, tipoNegocio, direccion, nombreCategoria, horario, latitud, longitud])
        
        res.send({
            id: rows.insertId, tituloNegocio, disponible, distancia, descripcion, insignia, tipoNegocio, direccion, nombreCategoria, horario, latitud, longitud
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el negocio'
        })
    }
}


export const eliminarNegocio = async (req, res) =>{
    try {
        const [result] = await pool.query('DELETE FROM negocios WHERE id = ?', [req.params.id])
        const [result2] = await pool.query('DELETE FROM imagenNegocio WHERE id = ?', [req.params.id])
        const [result3] = await pool.query('DELETE FROM imagenCategoria WHERE id = ?', [req.params.id])
        const [result4] = await pool.query('DELETE FROM imagenRealNegocio WHERE id = ?', [req.params.id])

        if(result.affectedRows <= 0 && result2.affectedRows <= 0 && result3.affectedRows <= 0 && result4.affectedRows <= 0) return res.status(404).json({
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
        const imagenNegocioFile = req.files.imagenNegocio; // El archivo de imagen subido para imagenNegocio
        const imagenRealNegocioFile = req.files.imagenRealNegocio; // El archivo de imagen subido para imagenRealNegocio
        const imagenCategoriaFile = req.files.imagenCategoria; // El archivo de imagen subido para imagenCategoria
        const {imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud} = req.body
        
        if (!imagenNegocioFile && !imagenRealNegocioFile && !imagenCategoriaFile) {
            return res.status(400).json({
                message: 'No se envió ninguna imagen válida para actualizar.',
            });
        }

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

/*
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


*/