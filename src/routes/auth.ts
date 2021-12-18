import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import AuthServices from "../services/auth";

const router = Router();
router.post("/login", AuthServices.login);
router.post("/change-password", [checkJwt], AuthServices.changePassword);

export default router;
