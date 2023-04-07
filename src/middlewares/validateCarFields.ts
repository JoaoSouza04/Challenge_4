import { Request, Response } from "express";
import { validateCarData } from "../services/carValidation";

export const validCar = (req: Request, res: Response, next) => {
  try {
    const valid = validateCarData(req.body);
    if (valid.error) return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "Request Body",
        message: "The fields aren't valid"
      }
    });
    next();

  } catch (err) {
    return res.send(err)
  }
}