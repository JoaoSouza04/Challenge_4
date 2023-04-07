import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Client } from "../db/entities/client.entity";

export const getAllClients = async (req: Request, res: Response) => {
  const clients = await myDataSource.getRepository(Client).find();

  clients.forEach(client => {
    client.password = undefined;
  });

  res.status(200).json(clients);
}

export const createClient = async (req: Request, res: Response) => {
  const client = await myDataSource.getRepository(Client).create(req.body);
  await myDataSource.getRepository(Client).save(client)
  return res.status(201).json(client);
}

export const getOneClient = async (req: Request, res: Response) => {
  const client = await myDataSource.getRepository(Client).findOneBy({
    id: req.params.id,
  })

  if (!client) return res.status(404).json({
    type: "UUID",
    Error: {
      resource: "URL ID",
      description: "Can't find the client with the client id entered!"
    }
  });

  client.password = undefined;
  return res.status(200).send(client);
}

export const updateClient = async (req: Request, res: Response) => {
  const client = await myDataSource.getRepository(Client).findOneBy({
    id: req.params.id,
  });

  if (!client) return res.status(404).json({
    type: "UUID",
    Error: {
      resource: "URL ID",
      description: "Can't find the client with the client id entered!"
    }
  });
  await myDataSource.getRepository(Client).merge(client, req.body)
  const results = await myDataSource.getRepository(Client).save(client);

  results.password = undefined;

  return res.status(200).json(results);
}
