import { pool } from '../db.js';
import crypto from 'crypto';

export const getAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);

        if (rows.length === 1) {
            const storedPasswordHash = rows[0].password; 
            const userPasswordHash = crypto.createHash('sha1').update(password).digest('hex'); 

            if (userPasswordHash === storedPasswordHash) {
              
                res.json({ message: 'Inicio de sesión exitoso' });
            } else {
              
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        } else {
        
            res.status(401).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al autenticar al administrador'
        });
    }
};
