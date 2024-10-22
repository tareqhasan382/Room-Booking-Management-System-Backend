import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { UserModel } from "./user.model";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import { NextFunction, Request, Response } from "express";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await req.body;
      // console.log(" req create user data:", data);
      const existUser = await UserModel.findOne({ email: data.email });
      // console.log("existUser:", existUser);
      if (existUser) {
        res.status(400).json({
          status: false,
          message: "Email Already Exist. Email must be unique",
          data: data.email,
        });
      }
      const result = await UserModel.create(data);
      // console.log("result:", result);
      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "User registered successfully",
        data: {
          _id: result._id,
          name: result.name,
          email: result.email,
          role: result.role,
        },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }
);

const loginUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // console.log(" req login user data:", data);
    const existUser = await UserModel.findOne({ email: data.email }).select(
      "email password role name phone address"
    );

    if (!existUser) {
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      existUser.password
    );

    if (!isPasswordValid) {
      return;
    }

    const jwtToken = jwt.sign(
      { userId: existUser._id, email: existUser.email, role: existUser.role },
      config.jwt.secret as Secret,
      {
        expiresIn: "15d",
      }
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token: jwtToken,
      data: {
        _id: existUser._id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
});

export const UserController = {
  createUser,
  loginUser,
};
