CREATE DATABASE IF NOT EXISTS trenmayadb;

USE trenmayadb;

CREATE TABLE negocios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    direccion VARCHAR(255),
    horario VARCHAR(255),
    tipo VARCHAR(255),
    disponible VARCHAR(255),
    distancia VARCHAR(255),
    latitud DOUBLE,
    longitud DOUBLE,
    categoria VARCHAR(255),
    insignia BOOLEAN,
    imagen LONGBLOB,
    imagenCategoria LONGBLOB,
    logo LONGBLOB
);

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

INSERT INTO admin (nombre_usuario, contrasena)
VALUES ('admin123', SHA1('contraseña123'));

INSERT INTO negocio (nombre, descripcion, direccion, horario, tipo, disponible, distancia, latitud, longitud, categoria, insignia, imagen, imagenCategoria, logo)
VALUES ('100% natural Cancún', 'Descripción muy natural', '123 Calle Principal', '9:00 AM - 5:00 PM', 'Restaurante', 'Abierto', '5km', '18.20', '20.10', 'Turismo consciente', true, 'C:\Users\Axel\Desktop\imgs\yoshi.png', 'C:\Users\Axel\Desktop\imgs\monocafe.png', 'C:\Users\Axel\Desktop\imgs\plantita.png'),
;
