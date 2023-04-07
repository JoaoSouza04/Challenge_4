import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authClientToken = (req: Request, res: Response, next) => {
  try {

    const { authorization } = req.headers;
    const token = authorization;
    jwt.verify(token, process.env.CLIENT_SECRET);
    next()

  } catch (err) {
    res.send(err);
  }
}

export const authMechanicToken = (req: Request, res: Response, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization;
    jwt.verify(token, process.env.MECHANIC_SECRET);
    next()

  } catch (err) {
    res.send(err);
  }
}

export const authGeneralToken = (req: Request, res: Response, next) => {
  try {
    if (req.headers.client) {
      const { client }: any = req.headers;
      const token = client;
      jwt.verify(token, process.env.CLIENT_SECRET);
    }
    else if (req.headers.mechanic) {
      const { mechanic }: any = req.headers;
      const token = mechanic;
      jwt.verify(token, process.env.MECHANIC_SECRET);
    }
    else {
      return res.status(400).json({
        type: "Header Token",
        Error: {
          resource: "Name of the key, from the Token",
          description: "Please name the key of the token as (client or Client) or (mechanic or Mechanic). Other names aren't accepted"
        }
      })
    }
    next();

  } catch (err) {
    res.send(err);
  }
}