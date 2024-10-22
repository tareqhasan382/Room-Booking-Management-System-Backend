import { Types } from "mongoose";

export type IBooking = {
  _id?: string;
  userId: Types.ObjectId;
  roomId: Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
};
