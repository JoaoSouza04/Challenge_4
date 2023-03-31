import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Client } from "../db/entities/client.entity";
import { validateClientData } from "../services/createClientValidation";
import { validateClientUpdate } from "../services/updateClientValidation";

export const getAllClients = async (req: Request, res: Response) => {
  const clients = await myDataSource.getRepository(Client).find();

  clients.forEach(client => {
    client.password = undefined;
  });

  res.json(clients);
}

export const createClient = async (req: Request, res: Response) => {

  const valid = validateClientData(req.body);

  if (valid.error) return res.status(400).send("The fields aren't valid!");

  const client = await myDataSource.getRepository(Client).create(req.body);
  await myDataSource.getRepository(Client).save(client)
  return res.json(client);
}

export const getOneClient = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Client).findOneBy({
    id: req.params.id,
  })

  results.password = undefined;
  return res.send(results);
}

export const updateClient = async (req: Request, res: Response) => {
  if (req.body.password) {
    return res.status(400).send("The password can't be updated in this route!")
  }

  const valid = validateClientUpdate(req.body);
  if (valid.error) return res.status(400).send("The fields aren't valid!");

  const client = await myDataSource.getRepository(Client).findOneBy({
    id: req.params.id,
  });
  await myDataSource.getRepository(Client).merge(client, req.body)
  const results = await myDataSource.getRepository(Client).save(client);

  results.password = undefined;

  return res.json(results);
}
