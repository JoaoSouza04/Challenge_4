import { Request, Response } from "express";
import { validateServiceData } from "../services/serviceValidation";

export const validService = (req: Request, res: Response, next) => {
  try {
    const valid = validateServiceData(req.body);
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