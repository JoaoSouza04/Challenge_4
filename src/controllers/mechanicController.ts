import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Mechanic } from "../db/entities/mechanic.entity";

export const getAllMechanics = async (req: Request, res: Response) => {
  const mechanics = await myDataSource.getRepository(Mechanic).find();

  mechanics.forEach(mechanic => {
    mechanic.password = undefined;
  });

  res.json(mechanics);
}

export const createMechanic = async (req: Request, res: Response) => {
  const mechanic = await myDataSource.getRepository(Mechanic).create(req.body);
  await myDataSource.getRepository(Mechanic).save(mechanic);
  return res.json(mechanic);
}

export const getOneMechanic = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Mechanic).findOneBy({
    id: req.params.id,
  })

  results.password = undefined;
  return res.json(results);
}

export const updateMechanic = async (req: Request, res: Response) => {
  const mechanic = await myDataSource.getRepository(Mechanic).findOneBy({
    id: req.params.id,
  });
  await myDataSource.getRepository(Mechanic).merge(mechanic, req.body)
  const results = await myDataSource.getRepository(Mechanic).save(mechanic);

  mechanic.password = undefined;
  return res.json(results);
}