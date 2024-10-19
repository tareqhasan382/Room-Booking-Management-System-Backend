import { Schema, model } from "mongoose";
import { IRoom } from "./room.interface";
const userSchema = new Schema<IRoom>(
  {
    title: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    facilities: {
      type: [String],
      required: true,
    },
    picture: {
      type: String, // URL the picture
      required: true,
    },
  },
  { timestamps: true }
);

export const RoomModel = model<IRoom>("Rooms", userSchema);
