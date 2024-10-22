import { NextFunction, Request, Response } from "express";
import { BookModel } from "./booking.model";
import catchAsync from "../../../shared/catchAsync";
import { addDays, format, parse } from "date-fns";
import { RoomModel } from "../rooms/room.model";

const getDatesInRange = (startDate: string, endDate: string): string[] => {
  const start = parse(startDate, "MM/dd/yyyy", new Date());
  const end = parse(endDate, "MM/dd/yyyy", new Date());
  const dates: string[] = [];
  let currentDate = start;

  while (currentDate <= end) {
    dates.push(format(currentDate, "MM/dd/yyyy"));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};
const createBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await req.body;
      // console.log("data:", data);
      const allDates = getDatesInRange(data.date.startDate, data.date.endDate);
      // console.log("allDates:", allDates);
      // const result = await BookModel.create(data);
      const result = await BookModel.create({
        checkInDate: data.date.startDate,
        checkOutDate: data.date.endDate,
        roomId: data.roomId,
        userId: data.userId,
      });
      await RoomModel.updateOne(
        { _id: data.roomId },
        {
          $push: {
            unavailableDates: { $each: allDates },
          },
        }
      );
      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Booking created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }
);

const Books = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await BookModel.countDocuments();
      const result = await BookModel.find()
        .populate("userId")
        .populate("roomId");
      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Books retrive successfully",
        total: count,
        data: result,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }
);
const userByBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await BookModel.countDocuments();
      const result = await BookModel.find();
      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Books retrive successfully",
        total: count,
        data: result,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }
);

const SignleBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await BookModel.findById(id);
      if (!result) {
        res.status(404).json({ success: false, message: "Booking not found" });
        return;
      }
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking retrieved successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }
);
// const UpdateRoom = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { title, rent, facilities, picture } = req.body;
//       const result = await RoomModel.findByIdAndUpdate(
//         req.params.id,
//         { title, rent, facilities, picture },
//         { new: true, runValidators: true }
//       );
//       if (!result) {
//         res.status(404).json({
//           success: false,
//           statusCode: 404,
//           message: "Room not found",
//         });
//         return;
//       }
//       res.status(200).json({
//         success: true,
//         statusCode: 200,
//         message: "Room updated successfully",
//         data: result,
//       });
//     } catch (error) {
//       res.status(500).json({ status: false, message: "Something went wrong" });
//     }
//   }
// );
// const DeleteRoom = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const result = await RoomModel.findByIdAndDelete(req.params.id);
//       if (!result) {
//         res.status(404).json({ success: false, message: "Room not found" });
//         return;
//       }
//       res.status(201).json({
//         success: true,
//         statusCode: 200,
//         message: "Room deleted successfully",
//         data: result,
//       });
//     } catch (error) {
//       res.status(500).json({ status: false, message: "Something went wrong" });
//     }
//   }
// );
export const BookController = {
  createBook,
  Books,
  userByBook,
  SignleBook,
};
