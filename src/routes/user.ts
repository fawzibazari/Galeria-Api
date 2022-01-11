import { Router } from "express";
import UserServices from "../services/user";
import passport from "passport";

const user = Router();

user.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserServices.listAll
);

user.post("/", UserServices.newUser);

user.patch("/:id([0-9]+)", UserServices.editUser);

user.delete("/:id([0-9]+)", UserServices.deleteUser);
export default user;
