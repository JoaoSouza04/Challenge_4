import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Mechanic } from "../db/entities/mechanic.entity";

export const getAllMechanics = async (req: Request, res: Response) => {
  const mechanics = await myDataSource.getRepository(Mechanic).find();

  mechanics.forEach(mechanic => {
    mechanic.password = undefined;
  });

  res.status(200).json(mechanics);
}

export const createMechanic = async (req: Request, res: Response) => {
  const mechanic = await myDataSource.getRepository(Mechanic).create(req.body);
  await myDataSource.getRepository(Mechanic).save(mechanic);
  return res.status(201).json(mechanic);
}

export const getOneMechanic = async (req: Request, res: Response) => {
  const mechanic = await myDataSource.getRepository(Mechanic).findOneBy({
    id: req.params.id,
  })

  if (!mechanic) return res.status(404).json({
    type: "UUID",
    Error: {
      resource: "URL ID",
      description: "Can't find the mechanic with the mechanic id entered!"
    }
  })

  mechanic.password = undefined;
  return res.status(200).json(mechanic);
}

export const updateMechanic = async (req: Request, res: Response) => {
  const mechanic = await myDataSource.getRepository(Mechanic).findOneBy({
    id: req.params.id,
  });

  if (!mechanic) return res.status(404).json({
    type: "UUID",
    error: {
      resource: "URL ID",
      message: "Can't find the mechanic with the mechanic id entered!"
    }
  });

  await myDataSource.getRepository(Mechanic).merge(mechanic, req.body)
  const results = await myDataSource.getRepository(Mechanic).save(mechanic);

  mechanic.password = undefined;
  return res.status(200).json(results);
}