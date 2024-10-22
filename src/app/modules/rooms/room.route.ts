import express from "express";
import { RoomController } from "./room.controller";

const router = express.Router();

router.post("/create", RoomController.createRoom);
router.get("/rooms", RoomController.Rooms);
router.get("/room/:id", RoomController.SignleRoom);
router.patch("/availability/:id", RoomController.updateRoomAvailability);
router.patch("/room/:id", RoomController.UpdateRoom);
router.delete("/room/:id", RoomController.DeleteRoom);

export const RoomRoute = router;
