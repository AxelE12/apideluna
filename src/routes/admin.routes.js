import {Router} from 'express';
import {getAdmin} from '../controllers/admin.controller.js';

const router = Router();

router.get('/home', getAdmin); 

export default router;