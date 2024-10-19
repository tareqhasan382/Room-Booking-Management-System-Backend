import express from "express";
import { UserRoute } from "../modules/users/user.route";
import { RoomRoute } from "../modules/rooms/room.route";

const router = express.Router();

router.use("/user", UserRoute);
router.use("/room", RoomRoute);

export default router;
