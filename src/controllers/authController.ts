import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Client } from "../db/entities/client.entity";
import { Mechanic } from "../db/entities/mechanic.entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginClient = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const client = await myDataSource.getRepository(Client).findOne({ where: { email } });

  if (!client) {
    return res.status(404).json({
      message: "Client not found!, please check the fields"
    });
  }
  const isValidPassword = await bcrypt.compare(password, client.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: `Passwords aren't the same!`
    })
  }

  const token = jwt.sign({ client }, 'process.env.MY_SECRET', { expiresIn: "3h" });

  res.status(200).json({
    message: "Token Generated!",
    Token: token
  })
}


export const loginMechanic = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const mechanic = await myDataSource.getRepository(Mechanic).findOne({ where: { email } });

  if (!mechanic) {
    return res.status(404).json({
      message: "Mechanic not found!, please check the fields"
    });
  }

  console.log(mechanic.password);
  const isValidPassword = await bcrypt.compare(password, mechanic.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: `Passwords aren't the same!`
    })
  }

  const token = jwt.sign({ mechanic }, 'process.env.MY_SECRET', { expiresIn: "15m" });

  res.status(200).json({
    message: "Token Generated!",
    Token: token
  })
}

export const updateClientPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const client = await myDataSource.getRepository(Client).findOne({ where: { email } });

  if (!client) {
    return res.status(404).json({
      message: "Client not found!, please check the fields"
    });
  }

  client.password = password;
  await myDataSource.getRepository(Client).save(client);

  return res.status(200).json({
    message: "Your new Password",
    password: password
  })
}

export const updateMechanicPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const mechanic = await myDataSource.getRepository(Mechanic).findOne({ where: { email } });

  if (!mechanic) {
    return res.status(404).json({
      message: "Mechanic not found!, please check the fields"
    });
  }

  mechanic.password = password;
  await myDataSource.getRepository(Mechanic).save(mechanic);

  return res.status(200).json({
    message: "Your new Password",
    password: password
  })
}