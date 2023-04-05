import { Request, Response } from "express";
import { validateMechanicData } from "../services/createMechanicValidation";
import { validateMechanicUpdate } from "../services/updateMechanicValidation";

export const validCreateMechanic = (req: Request, res: Response, next) => {
  try {
    const valid = validateMechanicData(req.body);
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

export const validUpdateMechanic = (req: Request, res: Response, next) => {
  try {
    if (req.body.password) {
      return res.status(400).json({
        type: "Request input",
        error: {
          resource: "password",
          message: "The password can't be updated in this route!"
        }
      });
    }

    const valid = validateMechanicUpdate(req.body);
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