import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Car } from "../db/entities/car.entity";

export const getAllCars = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Car).findBy(
    { license_plate: req.params.id });
  return res.json(results)
}

export const createCar = async (req: Request, res: Response) => {
  const car = await myDataSource.getRepository(Car).create({
    license_plate: req.params.id,
    model: req.body.model,
    year: req.body.year,
    manufacturer: req.body.manufacturer,
    color: req.body.color
  });
  return res.json(car);
}

export const updateCar = async (req: Request, res: Response) => {
  const car = await myDataSource.getRepository(Car).findOneBy({
    license_plate: req.params.id,
  });
  myDataSource.getRepository(Car).merge(car, req.body)
  const results = await myDataSource.getRepository(Car).save(car);
  return res.send(results);
}

export const deleteCar = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Car).delete(
    { license_plate: req.params.id }
  );
  return res.json(results)
}

export const getOneCar = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Car).findBy(
    { license_plate: req.params.id }
  )
  return res.json(results);
}