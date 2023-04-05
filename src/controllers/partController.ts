import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Part } from "../db/entities/part.entity";

export const getAllParts = async (req: Request, res: Response) => {
  const parts = await myDataSource.getRepository(Part).find();
  res.json(parts);
}

export const createPart = async (req: Request, res: Response) => {
  const part = await myDataSource.getRepository(Part).create(req.body);
  await myDataSource.getRepository(Part).save(part);
  return res.json(part);
}

export const getOnePart = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Part).findOneBy({
    partId: req.params.partId,
  })
  return res.send(results);
}

export const updatePart = async (req: Request, res: Response) => {
  const part = await myDataSource.getRepository(Part).findOneBy({
    partId: req.params.partId,
  });
  await myDataSource.getRepository(Part).merge(part, req.body)
  const results = await myDataSource.getRepository(Part).save(part);
  return res.send(results);
}