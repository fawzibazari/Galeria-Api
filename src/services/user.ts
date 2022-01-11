import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from './../models/user';
import { validate } from 'class-validator';
import user from '../routes/user';

class UserServices {
  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.send(users);
  };

  static async getOneById(req: Request, res: Response) {
    const id = req.params.id;
    console.log(id);

    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (error) {
      res.status(404).send('User not found');
    }
    // res.send(user);
  }

  static async newUser(req: Request, res: Response) {
    const { firstname, lastname, email, password, isValid } = req.body;

    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    user.isValid = isValid;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();

    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('email deja utiliser');
      return;
    }

    res.status(201).send('user crée avec succes 👏');
  }

  static async editUser(req: Request, res: Response) {
    const id = req.params.id;

    const { firstname, lastname } = req.body;

    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send('on a pas trouvé le User que vous chercher');
      return;
    }

    user.firstname = firstname;
    user.lastname = lastname;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('user deja utilisé');
      return;
    }
    res.status(204).send();
  }

  static async deleteUser(req: Request, res: Response) {
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User pas trouvé');
      return;
    }
    userRepository.delete(id);
    res.status(204).send();
  }
}
export default UserServices;
