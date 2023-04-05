import { Request, Response } from "express";
import { validateClientData } from "../services/createClientValidation";
import { validateClientUpdate } from "../services/updateClientValidation";


export const validCreateClient = (req: Request, res: Response, next) => {
  try {
    const valid = validateClientData(req.body);

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

export const validUpdateClient = (req: Request, res: Response, next) => {
  try {
    const valid = validateClientUpdate(req.body);

    if (valid.error) return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "Request Body",
        message: "The fields aren't valid"
      }
    });

    if (req.body.password) {
      return res.status(400).json({
        type: "Request input",
        error: {
          resource: "password",
          message: "The password can't be updated in this route!"
        }
      });
    }
    next();

  } catch (err) {
    return res.send(err);
  }
}