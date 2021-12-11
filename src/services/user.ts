import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "./../models/user";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = await getRepository(User).create(req.body);
  const resultat = await getRepository(User).save(newUser);
  return res.json(resultat);
};
