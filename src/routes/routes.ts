import { Router } from "express";
import photo from "../services/photo";
import auth from "./auth";
import user from "./user";

const routes = Router();

//routes
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/photo", photo);

export default routes;
