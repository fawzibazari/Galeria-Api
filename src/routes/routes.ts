import { Router } from "express";
const router = Router();

import { createUser } from "../services/user";

router.post("/users", createUser);

export default router;
