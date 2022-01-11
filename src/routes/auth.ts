import { Router } from 'express';
import AuthServices from '../services/auth';

const router = Router();
router.post('/login', AuthServices.login);
router.post('/change-password', AuthServices.changePassword);

export default router;
