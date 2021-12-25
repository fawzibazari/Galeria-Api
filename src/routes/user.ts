import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import UserServices from '../services/user';

const user = Router();

user.get('/', checkJwt, UserServices.listAll);

user.post('/', UserServices.newUser);

user.patch('/:id([0-9]+)', [checkJwt], UserServices.editUser);

user.delete('/:id([0-9]+)', [checkJwt], UserServices.deleteUser);
export default user;
