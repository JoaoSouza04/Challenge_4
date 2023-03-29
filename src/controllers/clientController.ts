import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Client } from "../db/entities/client.entity";

export const getAllClients = async (req: Request, res: Response) => {
  const clients = await myDataSource.getRepository(Client).find();
  res.json(clients);
}

export const createClient = async (req: Request, res: Response) => {
  const client = await myDataSource.getRepository(Client).create(req.body);
  await myDataSource.getRepository(Client).save(client);
  return res.json(client);
}

export const getOneClient = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Client).findOneBy({
    id: req.params.id,
  })
  return res.send(results);
}

export const updateClient = async (req: Request, res: Response) => {
  if (req.body.password) {
    return res.status(400).send("The password can't be updated in this route!")
  }

  const client = await myDataSource.getRepository(Client).findOneBy({
    id: req.params.id,
  });
  await myDataSource.getRepository(Client).merge(client, req.body)
  const results = await myDataSource.getRepository(Client).save(client);
  return res.json(results);
}
