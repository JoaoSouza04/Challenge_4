import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Mechanic } from "../db/entities/mechanic.entity";
import { validateMechanicData } from "../services/createMechanicValidation";
import { validateMechanicUpdate } from "../services/updateMechanicValidation";

export const getAllMechanics = async (req: Request, res: Response) => {
  const mechanics = await myDataSource.getRepository(Mechanic).find();

  mechanics.forEach(mechanic => {
    mechanic.password = undefined;
  });

  res.json(mechanics);
}

export const createMechanic = async (req: Request, res: Response) => {

  const valid = validateMechanicData(req.body);
  if (valid.error) return res.status(400).send("The fields aren't valid!");

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

  if (req.body.password) {
    return res.status(400).json({
      type: "Request input",
      error: {
        resource: "password",
        message: "The password can't be updated in this route!"
      }
    });
  }

  const valid = validateMechanicUpdate(req.body);
  if (valid.error) return res.status(400).send("The fields aren't valid!");

  const mechanic = await myDataSource.getRepository(Mechanic).findOneBy({
    id: req.params.id,
  });
  await myDataSource.getRepository(Mechanic).merge(mechanic, req.body)
  const results = await myDataSource.getRepository(Mechanic).save(mechanic);

  mechanic.password = undefined;
  return res.json(results);
}