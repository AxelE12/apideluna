import {Router} from 'express';
import {getAdmin} from '../controllers/admin.controller.js';

const router = Router();

router.get('/admin', getAdmin); 

export default router;