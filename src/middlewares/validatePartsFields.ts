import { Request, Response } from "express";
import { validatePartData } from "../services/createPartValidation";
import { validatePartUpdate } from "../services/updatePartValidation";

export const validCreatePart = (req: Request, res: Response, next) => {
  try {
    const valid = validatePartData(req.body);
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

export const validUpdatePart = (req: Request, res: Response, next) => {
  try {
    const valid = validatePartUpdate(req.body);
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