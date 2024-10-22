import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Applications route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: 200, message: " Our server is Running 🚀" });
});
app.use("/api/v1", router);
app.use(notFound);

export default app;
