import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    roomId: { type: Schema.Types.ObjectId, ref: "Rooms" },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const BookModel = model<IBooking>("Books", bookingSchema);
