import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";


export const checkJwt = (req: Request, res: Response) => {
    const token = <any>req.headers["auth"];

    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
      } catch (error) {
          //si token pas bon error
        res.status(401).send();
        return;
      }

      const { email } = jwtPayload;
  const newToken = jwt.sign({ email }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  //PAS SUR QUE J'AURAIS besoin du next 
};
