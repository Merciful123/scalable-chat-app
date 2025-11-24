import {Router} from "express";
import AuthController from "../controller/AuthController.js";

const router = Router();

// Auth route
router.post("/auth/login", AuthController.login);

export default router;
