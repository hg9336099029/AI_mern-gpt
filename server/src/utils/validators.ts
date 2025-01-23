import { promises } from "dns";
import { Router, RequestHandler } from "express";
import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
    return;
  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain at least 6 characters"),
];

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
];

export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is required"),
];

// Example middleware function
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Replace the following line with your logic to get users
    const users = [{ id: 1, name: "John Doe" }];

    return res.status(200).json(users);
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};

// Setting up the router
const router = Router();

router.get("/users", getAllUsers as RequestHandler); // Attach the getAllUsers middleware

export default router;
