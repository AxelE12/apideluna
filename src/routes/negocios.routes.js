import {Router} from 'express';
import {getNegocios, getNegocio, crearNegocio, actualizarNegocio, eliminarNegocio, imgs, imagenNegocio, imagenCategoria, imagenRealNegocio} from '../controllers/negocios.controller.js';

const router = Router();

router.get('/negocios', getNegocios);

router.get('/negocios/:id', getNegocio);

router.post('/negocios', crearNegocio);

router.post('/imagenNegocio', imagenNegocio);

router.post('/imagenCategoria', imagenCategoria);

router.post('/imagenRealNegocio', imagenRealNegocio);

router.delete('/negocios/:id', eliminarNegocio);

router.patch('/negocios/:id', actualizarNegocio);

router.get('/imgs', imgs);


export default router;
