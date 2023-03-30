import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Service } from "../db/entities/service.entity";

export const getAllServices = async (req: Request, res: Response) => {
  const services = await myDataSource.getRepository(Service).find();
  res.json(services);
}

export const createService = async (req: Request, res: Response) => {

  const service = await myDataSource.getRepository(Service).create(req.body);
  await myDataSource.getRepository(Service).save(service);
  return res.json(service);
}

export const getOneService = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Service).findOneBy({
    serviceId: req.params.serviceId,
  })
  return res.send(results);
}

export const updateService = async (req: Request, res: Response) => {

  const service = await myDataSource.getRepository(Service).findOneBy({
    serviceId: req.params.serviceId,
  });
  await myDataSource.getRepository(Service).merge(service, req.body)
  const results = await myDataSource.getRepository(Service).save(service);
  return res.json(results);
}