import express from "express";
import { UserRoute } from "../modules/users/user.route";
import { RoomRoute } from "../modules/rooms/room.route";
import { BookRoute } from "../modules/bookings/booking.route";
const router = express.Router();

router.use("/user", UserRoute);
router.use("/room", RoomRoute);
router.use("/book", BookRoute);

export default router;
