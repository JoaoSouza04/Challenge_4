import { Request, Response } from "express";
import { validateServiceData } from "../services/createServiceValidation";
import { validateServiceUpdate } from "../services/updateServiceValidation"

export const validCreateService = (req: Request, res: Response, next) => {
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

export const validUpdateService = (req: Request, res: Response, next) => {
  try {
    const valid = validateServiceUpdate(req.body);
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