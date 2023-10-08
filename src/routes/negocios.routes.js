import {Router} from 'express';
import {getNegocios, getNegocio, crearNegocio, actualizarNegocio, eliminarNegocio, imgs, imagenNegocio, imagenCategoria, imagenRealNegocio, getImagenN, getImagenC, getImagenRN} from '../controllers/negocios.controller.js';

const router = Router();

router.get('/negocios', getNegocios);

router.get('/negocios/:id', getNegocio);

router.post('/negocios', crearNegocio);

router.post('/imagenNegocio', imagenNegocio);

router.get('/getImagenNegocio', getImagenN);

router.post('/imagenCategoria', imagenCategoria);

router.get('/getImagenCategoria', getImagenC);

router.post('/imagenRealNegocio', imagenRealNegocio);

router.get('/getImagenRealNegocio', getImagenRN);

router.delete('/negocios/:id', eliminarNegocio);

router.patch('/negocios/:id', actualizarNegocio);

router.get('/imgs', imgs);


export default router;
