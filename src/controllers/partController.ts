import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Part } from "../db/entities/part.entity";

export const getAllParts = async (req: Request, res: Response) => {
  const parts = await myDataSource.getRepository(Part).find();
  res.status(200).json(parts);
}

export const createPart = async (req: Request, res: Response) => {
  const part = await myDataSource.getRepository(Part).create(req.body);
  await myDataSource.getRepository(Part).save(part);
  return res.status(201).json(part);
}

export const getOnePart = async (req: Request, res: Response) => {
  const part = await myDataSource.getRepository(Part).findOneBy({
    partId: req.params.partId,
  })

  if (!part) return res.status(404).json({
    type: "UUID",
    Error: {
      resource: "URL ID",
      description: "Can't find the part with the part id entered!"
    }
  })

  return res.status(200).send(part);
}

export const updatePart = async (req: Request, res: Response) => {
  const part = await myDataSource.getRepository(Part).findOneBy({
    partId: req.params.partId
  });

  if (!part) return res.status(404).json({
    type: "UUID",
    Error: {
      resource: "URL ID",
      description: "Can't find the part with the part id entered!"
    }
  })

  await myDataSource.getRepository(Part).merge(part, req.body)
  const result = await myDataSource.getRepository(Part).save(part);
  return res.status(200).send(result);
}