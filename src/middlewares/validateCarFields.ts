import { Request, Response } from "express";
import { validateCarData } from "../services/createCarValidation";
import { validateCarUpdate } from "../services/updateCarValidation";

export const validCreateCar = (req: Request, res: Response, next) => {
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

export const validUpdateCar = (req: Request, res: Response, next) => {
  try {
    const valid = validateCarUpdate(req.body);
    if (valid.error) return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "Request Body",
        message: "The fields aren't valid"
      }
    });
    next();

  } catch (err) {
    return res.send(err);
  }
} 