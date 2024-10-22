import express from "express";
import { BookController } from "./booking.controller";
import { USER_Role } from "../users/user.constants";
import { authVerify } from "../../middlewares/authVerify";

const router = express.Router();

router.post("/create", BookController.createBook);
router.get("/books", BookController.Books);
router.get("/book/:id", BookController.Books);
// router.get(
//   "/userByBooks",
//   authVerify(USER_Role.USER),
//   BookController.userByBook
// );

export const BookRoute = router;
