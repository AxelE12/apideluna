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
        const {nombre, descripcion, direccion, horario, tipo, disponible, distancia, latitud, longitud, categoria, insignia, imagen, imagenCategoria, logo} = req.body;
        const [rows]= await pool.query ('INSERT INTO negocios (nombre, descripcion, direccion, horario, tipo, disponible, distancia, latitud, longitud, categoria, insignia, imagen, imagenCategoria, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
            [nombre, descripcion, direccion, horario, tipo, disponible, distancia, latitud, longitud, categoria, insignia, imagen, imagenCategoria, logo])
        
        res.send({
            id: rows.insertId,
            nombre, 
            descripcion,
            direccion,
            horario,
            tipo,
            disponible,
            distancia,
            latitud,
            longitud,
            categoria,
            insignia,
            imagen,
            imagenCategoria,
            logo
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
        const {nombre, descripcion, direccion, horario, tipo, disponible, distancia, latitud, longitud, categoria, insignia, imagen, imagenCategoria, logo} = req.body
    
        const [result] = await pool.query('UPDATE negocios SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion), direccion = IFNULL(?, direccion), horario = IFNULL(?, horario), tipo = IFNULL(?, tipo), disponible = IFNULL(?, disponible), distancia = IFNULL(?, distancia), latitud = IFNULL(?, latitud), longitud = IFNULL(?, longitud), categoria = IFNULL(?, categoria), insignia = IFNULL(?, insignia), imagen = IFNULL(?, imagen), imagenCategoria = IFNULL(?, imagenCategoria), logo = IFNULL(?, logo) WHERE id = ?', [
            nombre, 
            descripcion,
            direccion,
            horario,
            tipo,
            disponible,
            distancia,
            latitud,
            longitud,
            categoria,
            insignia,
            imagen,
            imagenCategoria,
            logo,
            id])
    
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


