import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Car } from "../db/entities/car.entity";
import { Client } from "../db/entities/client.entity";
import { Mechanic } from "../db/entities/mechanic.entity";
import { Part } from "../db/entities/part.entity";
import { Service } from "../db/entities/service.entity";
import { validateServiceData } from "../services/createServiceValidation";
import { validateServiceUpdate } from "../services/updateServiceValidation"

export const getAllServices = async (req: Request, res: Response) => {
  const services = await myDataSource.getRepository(Service).find();
  res.json(services);
}

export const createService = async (req: Request, res: Response) => {

  const client = await myDataSource.getRepository(Client).findOne(
    { where: { id: req.body.clientId } });

  const mechanic = await myDataSource.getRepository(Mechanic).findOne(
    { where: { id: req.body.mechanicId } });

  const car = await myDataSource.getRepository(Car).findOne(
    { where: { carId: req.body.carId } });

  const parts = req.body.parts;
  const part = await myDataSource.getRepository(Part).findOne(
    { where: { partId: parts.partId } })

  const result = (!client || !mechanic || !car || !part) ? true : false;

  if (result) {
    return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "UUID",
        message: "Invalid or not found id!"
      }
    });
  }

  const valid = validateServiceData(req.body);
  if (valid.error) return res.status(400).send("The fields aren't valid!");

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

  const client = await myDataSource.getRepository(Client).findOne(
    { where: { id: req.body.clientId } });

  const mechanic = await myDataSource.getRepository(Mechanic).findOne(
    { where: { id: req.body.mechanicId } });

  const car = await myDataSource.getRepository(Car).findOne(
    { where: { carId: req.body.carId } });

  const parts = req.body.parts;
  const part = await myDataSource.getRepository(Part).findOne(
    { where: { partId: parts.partId } })

  const result = (!client || !mechanic || !car || !part) ? true : false;

  if (result) {
    return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "UUID",
        message: "Invalid or not found id!"
      }
    });
  }

  const valid = validateServiceUpdate(req.body);
  if (valid.error) return res.status(400).send("The fields aren't valid!");

  const service = await myDataSource.getRepository(Service).findOneBy({
    serviceId: req.params.serviceId,
  });
  await myDataSource.getRepository(Service).merge(service, req.body);

  service.totalPrice = parts[0].qtd * part.unitPrice
  const results = await myDataSource.getRepository(Service).save(service);
  return res.json(results);
}