import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";

export const authVerify =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if Authorization header exists
      const token = req.headers.authorization;
      // console.log("token:", token);
      if (!token) {
        return res.status(401).json("You Are Not Authorized");
      }
      if (!token) {
        return res.status(401).json("Token not found");
      }

      // Verify the token
      const verifiedUser = jwt.verify(
        token,
        config.jwt.secret as Secret
      ) as JwtPayload;

      req.user = verifiedUser;
      const { role } = verifiedUser;
      if (roles.length && !roles.includes(role)) {
        return res
          .status(403)
          .json("You are not authorized to access this route");
      }

      next();
    } catch (error) {
      console.error("JWT Verification Error:", error);

      if (error === "TokenExpiredError") {
        return res.status(403).json("Token has expired");
      } else if (error === "JsonWebTokenError") {
        return res.status(401).json("Invalid token");
      } else {
        return res.status(500).json("An error occurred");
      }
    }
  };
