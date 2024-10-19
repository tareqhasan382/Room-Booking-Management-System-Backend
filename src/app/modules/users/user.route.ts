import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);

export const UserRoute = router;
