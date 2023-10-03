import { pool } from '../db.js';

export const getAdmin = async (req, res) => {
    const { user, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM admin WHERE user = ? AND password = ?', [user, password]);

        if (rows.length === 1) {
            // Credenciales válidas, el usuario y contraseña coinciden
            res.json({ message: 'Inicio de sesión exitoso' });
        } else {
            // Credenciales inválidas, el usuario y contraseña no coinciden
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al autenticar al administrador'
        });
    }
};
