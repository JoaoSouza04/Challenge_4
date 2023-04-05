import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Car } from "../db/entities/car.entity";
import { Client } from "../db/entities/client.entity";

export const getAllCars = async (req: Request, res: Response) => {
  const results = await myDataSource.getRepository(Car).findBy(
    { ownerId: req.params.id });
  return res.json(results);
}

export const createCar = async (req: Request, res: Response) => {
  const client = await myDataSource.getRepository(Client).findOne(
    { where: { id: req.body.ownerId } });

  if (!client) {
    return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "Client id",
        message: "Invalid or not found id!"
      }
    });
  }

  if (req.body.ownerId != req.params.id) {
    return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "Client id",
        message: "The id of the URL and the ownerId aren't the same!"
      }
    })
  }

  const car = await myDataSource.getRepository(Car).create(req.body);
  await myDataSource.getRepository(Car).save(car);
  return res.json(car);
}

export const updateCar = async (req: Request, res: Response) => {
  const car = await myDataSource.getRepository(Car).findOneBy({
    carId: req.params.carId
  });

  const client = await myDataSource.getRepository(Client).findOne(
    { where: { id: req.body.ownerId } });

  if (!client) {
    return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "Client id",
        message: "Invalid or not found id!"
      }
    });
  }

  if (req.body.ownerId != req.params.id) {
    return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "Client id",
        message: "The id of the URL and the ownerId aren't the same!"
      }
    })
  }

  await myDataSource.getRepository(Car).merge(car, req.body)
  const results = await myDataSource.getRepository(Car).save(car);
  return res.json(results);
}

export const deleteCar = async (req: Request, res: Response) => {
  const client = await myDataSource.getRepository(Client).findOne(
    { where: { id: req.body.ownerId } });

  if (req.body.ownerId != req.params.id) {
    return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "Client id",
        message: "The id of the URL and the ownerId aren't the same!"
      }
    })
  }

  if (!client) {
    return res.status(400).json({
      type: "Validation Error",
      error: {
        resource: "Client id",
        message: "Invalid or not found id!"
      }
    });
  }

  const car = await myDataSource.getRepository(Car).findBy({ carId: req.params.carId });
  const results = await myDataSource.getRepository(Car).delete(
    { carId: req.params.carId });

  if (results.affected == 0) return res.status(404).json({
    type: "Failure Search",
    error: {
      resource: " Car id",
      message: "The car was not found!"
    }
  });

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