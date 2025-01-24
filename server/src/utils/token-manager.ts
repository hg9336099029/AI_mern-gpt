import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import { promises } from "dns";

export const createToken = (id: string, email: string, expiresIn: string): string => {
  const payload = { id, email };
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    res.status(401).json({ message: "Token Not Received" });
    return;
  }
  return new Promise<void>((resolve, reject) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET is not defined" });
    }
    return jwt.verify(token, secret, (err: jwt.VerifyErrors | null, success: any) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
