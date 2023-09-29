import {pool} from '../db.js'

export const getAdmin = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM admin')
        res.json(rows)
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los admins'
        })
    }
}