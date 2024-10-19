import catchAsync from "../../../shared/catchAsync";
import { NextFunction, Request, Response } from "express";
import { RoomModel } from "./room.model";

const createRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await req.body;
      const result = await RoomModel.create(data);
      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Room created successfully",
        data: {
          _id: result._id,
          title: result.title,
          rent: result.rent,
          facilities: result.facilities,
          picture: result.picture,
        },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }
);

const Rooms = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await RoomModel.countDocuments();
      const result = await RoomModel.find();
      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Rooms retrive successfully",
        total: count,
        data: result,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }
);
const SignleRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await RoomModel.findById(id);
      if (!result) {
        res.status(404).json({ success: false, message: "Room not found" });
        return;
      }
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room retrieved successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }
);
const UpdateRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, rent, facilities, picture } = req.body;
      const result = await RoomModel.findByIdAndUpdate(
        req.params.id,
        { title, rent, facilities, picture },
        { new: true, runValidators: true }
      );
      if (!result) {
        res.status(404).json({
          success: false,
          statusCode: 404,
          message: "Room not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room updated successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }
);
const DeleteRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await RoomModel.findByIdAndDelete(req.params.id);
      if (!result) {
        res.status(404).json({ success: false, message: "Room not found" });
        return;
      }
      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Room deleted successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }
);
export const RoomController = {
  createRoom,
  Rooms,
  SignleRoom,
  UpdateRoom,
  DeleteRoom,
};
