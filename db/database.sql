CREATE DATABASE trenmayadb;

USE trenmayadb;

-- DROP DATABASE trenmayadb;

CREATE TABLE negocios (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imagenNegocio LONGBLOB,
    tituloNegocio VARCHAR(255) NOT NULL,
	disponible VARCHAR(255),
    distancia VARCHAR(255),
    imagenCategoria LONGBLOB,
    descripcion VARCHAR(255),
    insignia BOOLEAN,
    tipoNegocio VARCHAR(255),
    direccion VARCHAR(255),
    imagenRealNegocio LONGBLOB,
    nombreCategoria VARCHAR(255),
    horario VARCHAR(255),
    latitud DOUBLE,
    longitud DOUBLE
);

CREATE TABLE admin (
    user VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

INSERT INTO admin (user, password)
VALUES ('admin', SHA1('deluna123'));

INSERT INTO negocios (imagenNegocio, tituloNegocio, disponible, distancia, imagenCategoria, descripcion, insignia, tipoNegocio, direccion, imagenRealNegocio, nombreCategoria, horario, latitud, longitud)
VALUES (
	('C:\Users\Axel\Desktop\imgs\yoshi.png', 
    'Café Jade',
    'Abierto',
    '5km',
    'C:\Users\Axel\Desktop\imgs\monocafe.png',
    '¡Descubre el encanto de Café Jade! Nos ubicamos en un lugar privilegiado lleno de naturaleza. ¡Ven a vivir momentos inolvidables con nosotros!', 
    true, 
    'Restaurante', 
	'Prolongación Av. Hidalgo Esq. 5ta Poniente Norte, #1 Zona Turística la Cañada. 29960 Palenque, Chiapas, Mexico',
    'C:\Users\Axel\Desktop\imgs\plantita.png',
    'Turismo consciente', 
    '8:00 - 23:00', 
    ' 17.50966062464474 ', 
    '-91.9869004314338'), 
    
	('C:\Users\Axel\Desktop\imgs\yoshi.png', 
    'Cocreamos',
    'Abierto', 
    '5km',
    'C:\Users\Axel\Desktop\imgs\monocafe.png', 
    'Santuario Urbano del buen vivir. Familia /Infancia /Teens/Eventos/Yoga/Actividades/Temazcal/Unión', 
    true, 
    'Estudio de yoga', 
    'Luis Donaldo Colosio M 408 L 13 Av 10 norte C 76 y 78 CP 77710 Zona Urbana A, 77728, Playa del Carmen, Q.R.', 
    'C:\Users\Axel\Desktop\imgs\plantita.png',
    'Medicina tradicional',
    '19:00 - 21:00', 
    '20.644980138204946', 
    '-87.05989948465617'),
    
	('C:\Users\Axel\Desktop\imgs\yoshi.png', 
	'La Casa de los Niños del Árbol',
    'Abierto', 
    '5km', 
    'C:\Users\Axel\Desktop\imgs\monocafe.png', 
    'Este mágico lugar de consciencia en la selva maya, está dedicado a reconectarse con la naturaleza armonizando mente, cuerpo y espíritu.
	Ofrecemos un programa de formación a cargo de Eres Reyes, además de diversas clases, temazcales, ceremonias, eventos y talleres para el desarrollo personal y espiritual.', 
     true, 
    'Centro Holístico de Sanación y Crecimiento Espiritual.', 
    'México 307 km 15-6, 77930 Bacalar, Q.R., Bacalar, Mexico, 77930',
    'C:\Users\Axel\Desktop\imgs\plantita.png',
    'Medicina tradicional', 
    '0:00 a 23:59', 
    '18.65002007119052', 
    '-88.41264467264686'),

	('C:\Users\Axel\Desktop\imgs\yoshi.png', 
	'La Ventana Palenque',
    'Abierto', 
    '5km', 
    'C:\Users\Axel\Desktop\imgs\monocafe.png', 
    'Somos un santuario de 50 hectáreas que sirve como centro sustentable, educativo, ecoturístico y ceremonial en el corazón de la Selva Maya Mexicana (precisamente Palenque, Chiapas).
    Nos enfocamos en revivir la rica cultura perdida hace mucho tiempo de las comunidades mayas y traer de vuelta el santuario cultural para EL BUEN VIVIR',
     true, 
    'Santuario', 
    '29963 Palenque, Chis., México',
    'C:\Users\Axel\Desktop\imgs\plantita.png',
    'Turismo Consciente', 
    '0:00 a 23:59', 
    '17.454557605940717', 
    '-92.03207173344042'),
    
	('C:\Users\Axel\Desktop\imgs\yoshi.png', 
	'100% Natural Cancún',
    'Abierto', 
    '5km', 
    'C:\Users\Axel\Desktop\imgs\monocafe.png', 
    '100% natural es el lugar ideal para disfrutar platillos y bebidas preparados al momento con la mejor selección de ingredientes frescos y naturales.
    Atendemos a nuestros clientes con cordialidad y vocación de servicio, ofreciéndoles un menú innovador, variado e incluyente para satisfacer todos los paladares a cualquier hora del día con opciones para desayunos, comidas y cenas.',
     true, 
    'Restaurante', 
    'Av Sunyaxchen Mza. 6, 77509 Cancún, Q.R.',
    'C:\Users\Axel\Desktop\imgs\plantita.png',
    'Turismo Consciente', 
    '7:00 a 23:00', 
    '21.16223961525116', 
    '-86.82993721443279'),
    
    ('C:\Users\Axel\Desktop\imgs\yoshi.png', 
	'Tec de Monterrey Cuernavaca',
    'Abierto', 
    '5km', 
    'C:\Users\Axel\Desktop\imgs\monocafe.png', 
    'El Tecnológico de Monterrey, es una institución de educación superior privada, con sede en Monterrey, Nuevo León, México. Cuenta con 31 campus en el país, además de sedes en China, Colombia, Costa Rica, España, Guatemala y Perú.',
     true, 
    'Universidad', 
    'Av. 24 de Marzo #210',
    'C:\Users\Axel\Desktop\imgs\plantita.png',
    'Bioconstrucción', 
    '9:00 a 22:40', 
    '18.80551022', 
    '-99.22189178'),
    
    ('C:\Users\Axel\Desktop\imgs\yoshi.png', 
	'Bambú Maya',
    'Abierto', 
    '5km', 
    'C:\Users\Axel\Desktop\imgs\monocafe.png', 
    'Taller de Bioconstrucción, arquitectura sustentable, materiales renovables, arte y diseño en Bambú.',
     true, 
    'Taller', 
    'Carretera Federal Km 4.5 en Zona Arqueológica 29960 Palenque, Chiapas, Mexico',
    'C:\Users\Axel\Desktop\imgs\plantita.png',
    'Bioconstrucción', 
    '7:00 a 16:00', 
    '17.493283526536157', 
    '-92.0208053'),
    
	('C:\Users\Axel\Desktop\imgs\yoshi.png', 
	'Zona Arqueológica de Palenque',
    'Abierto', 
    '5km', 
    'C:\Users\Axel\Desktop\imgs\monocafe.png', 
    'La Zona Arqueológica de Palenque, tuvo un notable desarrollo cultural hasta fines del período Clásico. 
    Es un sitio de sobresaliente belleza arquitectónica e importancia estética, lo que hace que esta excepcional ciudad, enclavada en medio de la selva, sea una de las más grandiosas creaciones de los hombres antiguos.',
     true, 
    'Zona arqueológica', 
    'Carretera a Palenque- Zona Archaeologica Km. 8, 29960 Palenque, Chis.',
    'C:\Users\Axel\Desktop\imgs\plantita.png',
    'Turismo Consciente', 
    '8:30 a 16:30', 
    '17.48532228817129', 
    '-92.04593781534382'),
    
	('C:\Users\Axel\Desktop\imgs\yoshi.png', 
	'De Luna',
    'Abierto', 
    '5km', 
    'C:\Users\Axel\Desktop\imgs\monocafe.png', 
    'El fascinante centro de Cuernavaca está lleno de reliquias coloniales como el fortificado Palacio de Cortés, que alberga el Museo Regional Cuauhnáhuac y sus murales de Diego Rivera. 
    La plaza arbolada el Zócalo linda con el jardín Juárez, que cuenta con un quiosco que diseñó Gustave Eiffel.',
     true, 
    'Museo', 
    'Paseo de las lunas #123',
    'C:\Users\Axel\Desktop\imgs\plantita.png',
    'Agricultura Regenerativa', 
    '9:00 a 21:30', 
    '2.0', 
    '45.0')
 );

SELECT * FROM admin;
SELECT * FROM negocios;




