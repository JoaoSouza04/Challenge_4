import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Car } from "../db/entities/car.entity";

export const getAllCars = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Car).findBy(
    { license_plate: req.params.id });
  return res.json(results);
}

export const createCar = async (req: Request, res: Response) => {
  const car = await myDataSource.getRepository(Car).create(req.body);
  await myDataSource.getRepository(Car).save(car);
  return res.json(car);
}

export const updateCar = async (req: Request, res: Response) => {
  const car = await myDataSource.getRepository(Car).findOneBy({
    carId: req.params.carId,
  });
  console.log(car)
  await myDataSource.getRepository(Car).merge(car, req.body)
  const results = await myDataSource.getRepository(Car).save(car);
  return res.json(results);
}

export const deleteCar = async (req: Request, res: Response) => {
  const car = await myDataSource.getRepository(Car).findBy({ carId: req.params.carId });
  const results = await myDataSource.getRepository(Car).delete(
    { carId: req.params.carId });

  if (results.affected == 0) return res.status(404).send("Car not found, please type another id!");

  return res.json({
    message: "This is what has been deleted!",
    Car: car
  })
}

export const getOneCar = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Car).findBy(
    { carId: req.params.carId }
  )
  return res.json(results);
}