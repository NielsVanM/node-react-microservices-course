import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { RequestValidationError, DatabaseConnectionError } from "../errors";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be provided"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must be at least four characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    const { email, password } = req.body;

    console.log("Creating User");
    throw new DatabaseConnectionError();
  }
);

export { router as signupRouter };
