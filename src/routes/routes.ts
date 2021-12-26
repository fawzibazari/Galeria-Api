import { Router } from 'express';
import ProductRoutes from '../services/photo';
import auth from './auth';
import user from './user';

const routes = Router();

//routes
routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/photo', ProductRoutes);

export default routes;
