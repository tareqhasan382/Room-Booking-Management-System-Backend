import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { UserRoute } from "./app/modules/users/user.route";
import { RoomRoute } from "./app/modules/rooms/room.route";
import { BookRoute } from "./app/modules/bookings/booking.route";

const corsOptions = {
  origin: ["*", "http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Applications route
app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: " Our server is Running 🚀" });
});

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/room", RoomRoute);
app.use("/api/v1/book", BookRoute);

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  // Split the error message by slash ('/') and check if it produces an array with more than one element
  const errorMessageParts = errorMessage.split("/");
  const messageAfterSlash =
    errorMessageParts.length > 1 ? errorMessageParts[1].trim() : errorMessage;

  const stack = err.stack || "";

  // Split the stack trace by slash ('/') and check if it produces an array with more than one element
  const stackAfterSlash =
    stack.split("/").length > 1 ? stack.split("/")[1].trim() : stack;

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: messageAfterSlash,
    stack: stackAfterSlash,
    name: err.name,
  });
});

// route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    messase: "Not Found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API NOT FOUND!",
      },
    ],
  });
  next();
});

export default app;
