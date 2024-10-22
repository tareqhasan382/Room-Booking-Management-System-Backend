import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.get("/total-user", UserController.totalUser);

export const UserRoute = router;
