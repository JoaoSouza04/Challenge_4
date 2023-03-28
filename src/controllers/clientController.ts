import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Client } from "../db/entities/client.entity";

export const createClient = async (req: Request, res: Response) => {
  const clients = await myDataSource.getRepository(Client).create(req.body);
  res.json(clients);
}

export const getAllClients = async (req: Request, res: Response) => {
  const clients = await myDataSource.getRepository(Client).find();
  res.json(clients);
}

export const getOneClient = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Client).findOneBy({
    id: req.params.id,
  })
  return res.send(results);
}

export const updateClient = async (req: Request, res: Response) => {
  const client = await myDataSource.getRepository(Client).findOneBy({
    id: req.params.id,
  });
  myDataSource.getRepository(Client).merge(client, req.body)
  const results = await myDataSource.getRepository(Client).save(client);
  return res.send(results);
}
